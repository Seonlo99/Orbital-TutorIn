import express from "express";
const router = express.Router();
import {
  registerUser,
  userLogin,
  updateProfile,
} from "../controllers/userControllers.js";

router.post("/register", registerUser);
router.post("/login", userLogin);
router.put("/updateProfile", updateProfile);

export default router;
