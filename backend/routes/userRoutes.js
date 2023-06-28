import express from "express";
const router = express.Router();
import {
  registerUser,
  userLogin,
  updateProfile,
  updateProfilePicture,
  getUserProfile,
  getTopTutors,
  findUsers,
} from "../controllers/userControllers.js";

router.get("/", getUserProfile);
router.get("/getTopTutors", getTopTutors);
router.post("/register", registerUser);
router.post("/login", userLogin);
router.put("/updateProfile", updateProfile);
router.put("/updateProfilePicture", updateProfilePicture);
router.post("/findUsers", findUsers);

export default router;
