import Post from "../models/Post.js";
import User from "../models/User.js";
import { v4 as uuid } from "uuid";

import { getCommentCount } from "./commentControllers.js";
import { getUserVotesbyPost, getVoteCount } from "./upvoteController.js";
import { getAllTagsArray } from "./tagController.js";
// import { ObjectId } from 'mongoose'
import mongoose from "mongoose";
import Upvote from "../models/Upvote.js";

const getAllPosts = async (req, res) => {
  try {
    let { page = 1, search, sortBy, selectedTags = [] } = req.query;
    // console.log(sortBy)
    let filteredSelectedTags;
    const availableTags = await getAllTagsArray();
    let tagFilter;
    if (selectedTags.length === 0) {
      //user did not filter for any tag
      filteredSelectedTags = availableTags;
      tagFilter = [{ tags: { $in: filteredSelectedTags } }, { tags: [] }]
    } else {
      filteredSelectedTags = selectedTags.map((tag) => {
        if (availableTags.includes(tag.value)) {
          return tag.value;
        }
      }); //check to ensure the tags exists in the database

      tagFilter = [{ tags: { $in: filteredSelectedTags } }]
    }

    search = search || "";
    const searchFilter = { $regex: search, $options: "i" };

    const POSTLIMIT = 10;
    // console.log(search)

    // tags=["CS2103"]

    let lookup = {};
    let addField = {};
    let sort = {};
    if (sortBy === "Upvote") {
      lookup = {
        $lookup: {
          from: "upvotes",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$postId"] },
                commentId: null, //ensure that only posts is included, not comments
              },
            },
          ],
          as: "votes",
        },
      };

      addField = {
        $addFields: {
          dummyVotes: {
            //dummy variable so that those posts with 0 likes will also be included in the results
            $ifNull: [{ $size: "$votes" }, 0],
          },
          totalVotes: {
            //actual variable storing the sum of upvotes
            $sum: "$votes.value",
          },
        },
      };

      sort = {
        $sort: { totalVotes: -1, _id: -1 },
      };
    } else if (sortBy === "Comment") {
      lookup = {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$postId"] },
              },
            },
          ],
          as: "cmts",
        },
      };

      addField = {
        $addFields: {
          totalComments: {
            $ifNull: [{ $size: "$cmts" }, 0],
          },
        },
      };

      sort = {
        $sort: { totalComments: -1, _id: -1 },
      };
    } else {
      sort = {
        $sort: { _id: -1 }, //-1 is desc, 1 is asc
      };
    }

    let aggregate = [];
    if (sortBy === "Upvote" || sortBy === "Comment") {
      aggregate = [
        {
          $match: {
            $or: tagFilter,
          },
        },
        lookup,
        {
          $match: {
            isDeleted: false,
            title: searchFilter,
          },
        },
        addField,
        sort,
        {
          $skip: (parseInt(page) - 1) * POSTLIMIT, // Number of documents to skip
        },
        {
          $limit: POSTLIMIT, // Number of documents to return
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
      ];
    } else {
      aggregate = [
        {
          $match: {
            isDeleted: false,
            title: searchFilter,
            $or: tagFilter,
          },
        },
        sort,
        {
          $skip: (parseInt(page) - 1) * POSTLIMIT,
        },
        {
          $limit: POSTLIMIT,
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
      ];
    }

    // let posts = await Post.find({isDeleted:false, title:searchFilter}, null, {skip: (parseInt(page)-1) * POSTLIMIT, limit:POSTLIMIT}).sort({ _id: -1 }).populate({
    //     path:"userId",
    //     select: ['username','tutor']
    // });
    let posts;

    Post.aggregate(aggregate).exec(async (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      posts = results;
      // console.log(posts)
      posts = await Promise.all(
        posts.map(async (post) => {
          let count = await getCommentCount(post._id);
          const voteCount = await getVoteCount(post._id, null);
          return { ...post, commentCount: count, voteCount: voteCount };
        })
      );
      // console.log(posts);

      const totalCount = await Post.countDocuments({
        isDeleted: false,
        title: searchFilter,
        tags: { $in: filteredSelectedTags },
      });

      const postsWithPic = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.userId.toString());
          const avatar = user.avatar;
          return { ...post, avatar };
        })
      );
      posts = postsWithPic;

      // console.log(posts)
      return res.json({ posts, totalCount });
    });

    // posts = await Promise.all(posts.map( async (post) => {
    //     let count = await getCommentCount(post._id)
    //     const voteCount = await getVoteCount(post._id, null)
    //     return ({...post, commentCount:count, voteCount:voteCount})
    // }))
    // // console.log(posts)

    // const totalCount = await Post.countDocuments({isDeleted:false, title:searchFilter})
    // console.log(posts)
    // return res.json({posts, totalCount})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { slug, userId } = req.query;

    // let post = await Post.find({slug}).populate({
    //     path:"comments",
    //     select: ['userId','body']
    // });
    // console.log(userId)

    let post = await Post.findOne({ slug, isDeleted: false }).populate([
      {
        path: "userId",
        select: ["username", "tutor"],
      },
      {
        path: "comments",
        select: ["userId", "body"],
      },
    ]);
    // console.log(post.comments)
    if (post) {
      // console.log(post)
      let count = await getCommentCount(post._id);
      let votes = {};
      let formattedVotes = {};
      if (userId) {
        //user is logged in
        votes = await getUserVotesbyPost(userId, post._id);

        votes.forEach(
          (vote) =>
            (formattedVotes[vote.commentId ? vote.commentId : vote.postId] =
              vote)
        ); //format it such that either the postId or commentId is the key for easier searching later on

        // console.log(formattedVotes)
      }

      const voteCount = await getVoteCount(post._id, null);
      // console.log(voteCount)
      return res.json({
        post,
        commentCount: count,
        votes: formattedVotes,
        voteCount: voteCount,
      });
    } else {
      return res.status(404).json({ message: "Unable to find post!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { title, content, selectedTags } = req.body;
    const availableTags = await getAllTagsArray();
    const allTags = selectedTags.map((tag) => {
      if (availableTags.includes(tag.value)) {
        return tag.value;
      }
    }); //check to ensure the tags exists in the database
    const post = await Post.create({
      title: title,
      contents: content,
      userId: req.user._id,
      upvoteCount: 0,
      slug: uuid(),
      tags: allTags,
    });

    // const upvote = await Upvote.create({  //add a dummy upvote for aggregation purpose during filtering
    //     userId: mongoose.Types.ObjectId("645caa1b46a261e43e33f592"),
    //     authorId: mongoose.Types.ObjectId("645caa1b46a261e43e33f592"),
    //     postId: post._id,
    //     commentId: null,
    //     value: 0,
    // });

    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { title, content, slug, selectedTags } = req.body;

    let post = await Post.findOne({ slug, isDeleted: false });
    if (!post) {
      return res.status(404).json({ message: "Unable to find post!" });
    }
    // console.log(post.userId)
    // console.log(req.user._id)
    if (!post.userId.equals(req.user._id)) {
      //check if the user is owner of the post
      return res.status(404).json({ message: "Not the owner!" });
    }
    const availableTags = await getAllTagsArray();
    const allTags = selectedTags.map((tag) => {
      if (availableTags.includes(tag.value)) {
        return tag.value;
      }
    });
    post = await Post.findOneAndUpdate(
      { slug },
      { title, contents: content, tags: allTags }
    );

    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { slug } = req.query;
    // console.log(slug)
    let post = await Post.findOne({ slug, isDeleted: false });
    // console.log(post)
    if (!post) {
      return res.status(404).json({ message: "Unable to find post!" });
    }
    if (!post.userId.equals(req.user._id)) {
      //check if the user is owner of the post
      return res.status(404).json({ message: "Not the owner!" });
    }
    post = await Post.findOneAndUpdate({ slug }, { isDeleted: true });

    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getAllPosts, getSinglePost, addPost, editPost, deletePost };
