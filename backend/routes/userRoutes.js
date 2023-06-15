import express from "express";
const router = express.Router();
import {
  registerUser,
  userLogin,
  updateProfile,
  updateProfilePicture,
  getCommunityStats,
  getRecentCreatedPosts,
  getRecentCommentedPosts,
} from "../controllers/userControllers.js";

router.post("/register", registerUser);
router.post("/login", userLogin);
router.put("/updateProfile", updateProfile);
router.put("/updateProfilePicture", updateProfilePicture);
router.post("/getCommunityStats", getCommunityStats);
router.post("/getRecentCreatedPosts", getRecentCreatedPosts);
router.post("/getRecentCommentedPosts", getRecentCommentedPosts);

export default router;
