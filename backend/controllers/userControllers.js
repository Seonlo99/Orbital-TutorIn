import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Upvote from "../models/Upvote.js";
import Review from "../models/Review.js";
import {
  uploadPicture,
  uploadPictureCloud,
} from "../middleware/uploadPictureMiddleware.js";
import { fileRemover } from "../utils/fileRemover.js";
import {OAuth2Client} from 'google-auth-library'
import { v4 as uuid } from "uuid";


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
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(req.body);
    let user = await User.findOne({ username, isGoogleSignUp:false });
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

async function verify({token}) {
  try{
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_PUBLIC_API_TOKEN,  
    });
    const payload = ticket.getPayload();
    return payload
  } catch(error){
      console.log(error)
      return null
  }
}

const googleAuth = async (req,res)=>{
  try {
    const { token } = req.body;
    // console.log(req.body);
    // console.log(token.token)
    const googleUser = await verify({token:token.token})
    // console.log(googleUser)
    if(!googleUser){
      return res
        .status(404)
        .json({ message: "Invalid Google User" });
    }

    let user = await User.findOne({ googleSub: googleUser.sub });
    if(!user){
      user = await User.create({
        username: googleUser.email,
        name: googleUser.name,
        email: googleUser.email,
        password: uuid(),
        isGoogleSignUp: true,
        googleSub: googleUser.sub,
        avatar: googleUser.picture
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
}

const updateProfile = async (req, res) => {
  try {
    const { _id, fullname, about, email, password } = req.body;
    const user = await User.findById({ _id });
    let changes;
    if (password) {
      changes = {
        name: fullname,
        about: about,
        email: email,
        password: password,
      };
    } else {
      changes = {
        name: fullname,
        about: about,
        email: email,
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

    const { postCount, commentCount, VoteCount } = await getCommunityStats(
      userId
    );
    const { recentPosts } = await getRecentCreatedPosts(userId);
    const { recentComments } = await getRecentComments(userId);
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
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCommunityStats = async (id) => {
  const filter = {
    userId: id,
    isDeleted: false,
  };
  const postCount = await Post.countDocuments(filter);
  const commentCount = await Comment.countDocuments(filter);
  const UpVoteCount = await Upvote.countDocuments({
    authorId: id,
    value: "1",
  });
  const DownVoteCount = await Upvote.countDocuments({
    authorId: id,
    value: "-1",
  });
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

const getRecentComments = async (id) => {
  const RECENTCOUNT = 5;
  // const _id = req.body._id;
  const filter = {
    userId: id,
    isDeleted: false,
  };

  // Find recent comment
  const recentComments = await Comment.find(filter)
    .sort({
      updatedAt: -1,
    })
    .populate("postId", "title body slug")
    .limit(RECENTCOUNT);

  return { recentComments };
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
    const nameRegex = new RegExp(search, "i");
    const filter = {
      tutor: true,
      name: { $regex: nameRegex },
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

    const topTutors = await User.find(filter)
      .sort(sortOrder)
      .select("-password");

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
  googleAuth
};
