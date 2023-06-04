import express from "express";
const router = express.Router();
import {
  registerUser,
  userLogin,
  updateProfilePicture,
} from "../controllers/userControllers.js";

router.post("/register", registerUser);
router.post("/login", userLogin);
router.put("/updateProfilePiture", updateProfilePicture);

export default router;
