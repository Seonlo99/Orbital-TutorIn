import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Upvote from "../models/Upvote.js";
import {
  uploadPicture,
  uploadPictureCloud,
} from "../middleware/uploadPictureMiddleware.js";
import { fileRemover } from "../utils/fileRemover.js";

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
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(req.body);
    let user = await User.findOne({ username });
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

const updateProfile = async (req, res) => {
  try {
    const { _id, fullname, email, password } = req.body;
    const user = await User.findById({ _id });
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      {
        name: fullname,
        email: email,
        password: password || user.password,
      },
      {
        new: true,
      }
    );
    return res.status(201).json({
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      verified: updatedUser.verified,
      tutor: updatedUser.tutor,
      token: await updatedUser.generateJWT(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
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
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCommunityStats = async (req, res) => {
  try {
    const _id = req.body._id;
    const filter = {
      userId: _id,
    };
    const postCount = await Post.countDocuments(filter);
    const commentCount = await Comment.countDocuments(filter);
    const UpVoteCount = await Upvote.countDocuments({
      authorId: _id,
      value: "1",
    });
    const DownVoteCount = await Upvote.countDocuments({
      authorId: _id,
      value: "-1",
    });
    const VoteCount = UpVoteCount - DownVoteCount;
    return res.status(200).json({
      postCount: postCount,
      commentCount: commentCount,
      VoteCount: VoteCount,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getRecentCreatedPosts = async (req, res) => {
  try {
    const RECENTCOUNT = 5;
    const _id = req.body._id;
    const filter = {
      userId: _id,
    };

    // Find recent created post
    const recentPosts = await Post.find(filter)
      .sort({
        updatedAt: -1,
      })
      .limit(RECENTCOUNT);
    return res.status(200).json({
      recentPosts: recentPosts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getRecentCommentedPosts = async (req, res) => {
  try {
    const RECENTCOUNT = 5;
    const _id = req.body._id;
    const filter = {
      userId: _id,
    };

    // Find recent comment
    const comments = await Comment.find(filter)
      .sort({
        updatedAt: -1,
      })
      .limit(RECENTCOUNT);

    // Remove duplicate post
    const recentPosts = comments.map((comment) => comment.postId.toString());
    for (let i = 0; i < recentPosts.length; ++i) {
      recentPosts[i] = await Post.findById(recentPosts[i]);
    }

    const recentPostsAndComments = Object.keys(recentPosts).map((key) => {
      return {
        key,
        posts: recentPosts[key],
        comments: comments[key],
      };
    });
    return res.status(200).json({
      recentPostsAndComments: recentPostsAndComments,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export {
  registerUser,
  userLogin,
  updateProfile,
  updateProfilePicture,
  getCommunityStats,
  getRecentCreatedPosts,
  getRecentCommentedPosts,
};
