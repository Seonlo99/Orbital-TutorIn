import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Upvote from "../models/Upvote.js";
import Review from "../models/Review.js";
import Qualification from "../models/Qualification.js";
import {
  uploadPicture,
  uploadPictureCloud,
} from "../middleware/uploadPictureMiddleware.js";
import { fileRemover } from "../utils/fileRemover.js";
import { OAuth2Client } from "google-auth-library";
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

const client = new OAuth2Client(process.env.GOOGLE_PUBLIC_API_TOKEN);

const registerUser = async (req, res) => {
  try {
    const { username, fullname, email, password, isTutor: tutor } = req.body;
    // console.log(req);
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User have already registered" });
    }
    // console.log(tutor)
    user = await User.create({
      username,
      name: fullname,
      email,
      password,
      tutor,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      username: user.username,
      name: user.name,
      email: user.email,
      verified: user.verified,
      tutor: user.tutor,
      token: await user.generateJWT(),
      isAdmin: user.isAdmin,
      about: user.about,
      hourlyRate:user.hourlyRate
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(req.body);
    let user = await User.findOne({ username, isGoogleSignUp: false });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist or invalid password." });
    }
    if (await user.verifyPassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
        name: user.name,
        email: user.email,
        verified: user.verified,
        tutor: user.tutor,
        token: await user.generateJWT(),
        isAdmin: user.isAdmin,
        about: user.about,
        hourlyRate:user.hourlyRate
      });
    } else {
      return res
        .status(400)
        .json({ message: "User does not exist or invalid password." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function verify({ token }) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_PUBLIC_API_TOKEN,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log(req.body);
    // console.log(token.token)
    const googleUser = await verify({ token: token.token });
    // console.log(googleUser)
    if (!googleUser) {
      return res.status(404).json({ message: "Invalid Google User" });
    }

    let user = await User.findOne({ googleSub: googleUser.sub });
    if (!user) {
      user = await User.create({
        username: googleUser.email,
        name: googleUser.name,
        email: googleUser.email,
        password: uuid(),
        isGoogleSignUp: true,
        googleSub: googleUser.sub,
        avatar: googleUser.picture,
      });
    }
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      username: user.username,
      name: user.name,
      email: user.email,
      verified: user.verified,
      tutor: user.tutor,
      token: await user.generateJWT(),
      isAdmin: user.isAdmin,
      about: user.about,
      isGoogleSignUp: user.isGoogleSignUp,
    });

    // console.log(googleUser)

    // let user = await User.findOne({ username });
    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ message: "User does not exist or invalid password." });
    // }
    // if (await user.verifyPassword(password)) {
    //   return res.status(201).json({
    //     _id: user._id,
    //     avatar: user.avatar,
    //     username: user.username,
    //     name: user.name,
    //     email: user.email,
    //     verified: user.verified,
    //     tutor: user.tutor,
    //     token: await user.generateJWT(),
    //     isAdmin: user.isAdmin,
    //     about: user.about,
    //   });
    // } else {
    //   return res
    //     .status(400)
    //     .json({ message: "User does not exist or invalid password." });
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { _id, fullname, about, email, password, rate } = req.body;
    const user = await User.findById({ _id });
    let changes;
    if (password) {
      changes = {
        name: fullname,
        about: about,
        email: email,
        password: password,
        hourlyRate: rate
      };
    } else {
      changes = {
        name: fullname,
        about: about,
        email: email,
        hourlyRate: rate
      };
    }
    const updatedUser = await User.findByIdAndUpdate({ _id }, changes, {
      new: true,
    });
    return res.status(201).json({
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      username: updatedUser.username,
      name: updatedUser.name,
      about: updatedUser.about,
      email: updatedUser.email,
      verified: updatedUser.verified,
      tutor: updatedUser.tutor,
      token: await updatedUser.generateJWT(),
      isAdmin: updatedUser.isAdmin,
      hourlyRate: updatedUser.hourlyRate
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const { formData } = req.body;
    console.log(formData);
    const upload = uploadPicture.single("avatar");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        return res.status(500).json({ message: error.message });
      } else {
        // every thing went well
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.body._id);
          filename = updatedUser.avatar;
          if (process.env.NODE_ENV === "production") {
            //use cloud image storage
            const cloudImgUrl = await uploadPictureCloud(req.file);
            updatedUser.avatar = cloudImgUrl;
          } else {
            //stored locally on backend
            if (filename) {
              fileRemover(filename);
            }
            updatedUser.avatar = req.file.filename;
          }
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            tutor: updatedUser.tutor,
            token: await updatedUser.generateJWT(),
            isAdmin: updatedUser.isAdmin,
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.body._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          if (process.env.NODE_ENV !== "production") {
            //remove file from local backend server
            fileRemover(filename);
          }
          res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            tutor: updatedUser.tutor,
            token: await updatedUser.generateJWT(),
            isAdmin: updatedUser.isAdmin,
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    // console.log(userId)
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let modulesOffer = null;
    if (user.tutor) {
      modulesOffer = await getModulesOffer(userId);
    }
    const { postCount, commentCount, VoteCount } = await getCommunityStats(
      userId
    );
    const { recentPosts } = await getRecentCreatedPosts(userId);
    const { recentComments } = await getRecentComments({userId});
    const { recentReviews } = await getRecentReview(userId);
    // console.log({user, postCount,commentCount,VoteCount,recentPosts,recentPostsAndComments})
    return res.json({
      user,
      postCount,
      commentCount,
      VoteCount,
      recentPosts,
      recentComments,
      recentReviews,
      modulesOffer,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getModulesOffer = async (id) => {
  const filter = {
    tutorId: id,
  };
  const qualification = await Qualification.findOne(filter);
  return qualification ? qualification.modules : null;
};

const getCommunityStats = async (id) => {
  const filter = {
    userId: id,
    isDeleted: false,
  };
  let userId = mongoose.Types.ObjectId(id._id);
  const postCount = await Post.countDocuments(filter);
  // const commentCount = await Comment.countDocuments(filter);

  const countCommentsQuery = [
    {
      $match: {
        userId: userId,
        isDeleted: false,
      }
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'postId',
        foreignField: '_id',
        as: 'post'
      }
    },
    {
      $unwind: '$post'
    },
    {
      $match: {
        'post.isDeleted': false
      }
    },
    {
      $count: 'commentCount'
    }
  ];
  
  // Execute the aggregate query
  let commentRes = await Comment.aggregate(countCommentsQuery).exec()
  const commentCount = commentRes.length > 0 ? commentRes[0].commentCount : 0;

  const countUpvoteQuery = [
    {
      $match: {
        authorId: userId,
        value: 1,
      }
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'postId',
        foreignField: '_id',
        as: 'post'
      }
    },
    {
      $unwind: '$post'
    },
    {
      $match: {
        'post.isDeleted': false
      }
    },
    {
      $count: 'upvoteCount'
    }
  ];

  const countDownvoteQuery = [
    {
      $match: {
        authorId: userId,
        value: -1,
      }
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'postId',
        foreignField: '_id',
        as: 'post'
      }
    },
    {
      $unwind: '$post'
    },
    {
      $match: {
        'post.isDeleted': false
      }
    },
    {
      $count: 'downvoteCount'
    }
  ];

  let res;
  res = await Upvote.aggregate(countUpvoteQuery).exec()
  const UpVoteCount = res.length > 0 ? res[0].upvoteCount : 0;

  res = await Upvote.aggregate(countDownvoteQuery).exec()
  const DownVoteCount = res.length > 0 ? res[0].downvoteCount : 0;

  const voteCount = UpVoteCount - DownVoteCount;
  return {
    postCount: postCount,
    commentCount: commentCount,
    VoteCount: voteCount,
  };
};

const getRecentCreatedPosts = async (id) => {
  const RECENTCOUNT = 5;
  const filter = {
    userId: id,
    isDeleted: false,
  };

  // Find recent created post
  const recentPosts = await Post.find(filter)
    .sort({
      updatedAt: -1,
    })
    .limit(RECENTCOUNT);
  return {
    recentPosts: recentPosts,
  };
};

const getRecentComments = async ({userId}) => {
  const RECENTCOUNT = 5;
  
  let id = mongoose.Types.ObjectId(userId._id);

  const aggregate = [
    {
      $match: {
        isDeleted: false,
        userId:id
      }
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'postId',
        foreignField: '_id',
        as: 'post'
      }
    },
    {
      $unwind: '$post'
    },
    {
      $match: {
        'post.isDeleted': false,
      }
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        body: 1,
        postId: {
          _id: '$post._id',
          title: '$post.title',
          body: '$post.body',
          slug: '$post.slug'
        },
        commentSlug: 1,
        parent: 1,
        replyUser: 1,
        isDeleted: 1,
        createdAt: 1,
        updatedAt: 1
      }
    },
    {
      $sort: {
        updatedAt: -1
      }
    },
    {
      $limit: RECENTCOUNT
    }
  ];

  try {
    const recentComments = await Comment.aggregate(aggregate).exec();
    return { recentComments };
  } catch (err) {
    console.error(err);
    return { recentComments: [] }; // Return an empty array
  }

};

const getRecentReview = async (id) => {
  const RECENTCOUNT = 5;
  const filter = {
    revieweeId: id,
  };

  const recentReviews = await Review.find(filter)
    .sort({ updatedAt: -1 })
    .populate("reviewerId", "name avatar")
    .limit(RECENTCOUNT);

  // console.log(recentReviews);
  return {
    recentReviews: recentReviews,
  };
};

const getTopTutors = async (req, res) => {
  try {
    const selection = req.query.selected.selected;
    const search = req.query.selected.search;
    const searchRegex = new RegExp(search, "i");
    const filter = {
      tutor: true,
      name: { $regex: searchRegex },
    };
    let sortOrder = {};
    if (selection == "Highest Rating") {
      sortOrder = { rating: -1, tutoringCount: -1 };
    } else if (selection == "Most Service") {
      sortOrder = { tutoringCount: -1, rating: -1 };
    } else if (selection == "Verified") {
      filter.verified = true;
      sortOrder = { verified: -1, rating: -1, tutoringCount: -1 };
    }

    const topTutors = await User.aggregate([
      {
        $lookup: {
          from: "qualifications",
          localField: "_id",
          foreignField: "tutorId",
          as: "qualifications",
        },
      },
      {
        $match: {
          $or: [filter, { "qualifications.modules": { $regex: searchRegex } }],
        },
      },
      {
        $sort: sortOrder,
      },
      {
        $project: { password: 0 },
      },
    ]);

    return res.json({
      topTutors: topTutors,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findUsers = async (req, res) => {
  try {
    const search = req.body.search;
    const nameRegex = new RegExp(search, "i");
    const filter = {
      name: { $regex: nameRegex },
    };

    const users = await User.find(filter).select("-password -isAdmin").limit(5);

    return res.json({
      users: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  registerUser,
  userLogin,
  updateProfile,
  updateProfilePicture,
  getUserProfile,
  getTopTutors,
  findUsers,
  googleAuth,
};
