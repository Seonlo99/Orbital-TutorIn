import express from "express";
const router = express.Router();

import {
  newConversation,
  getConversations,
  deleteConversation,
} from "../controllers/conversationControllers.js";

router.get("/", getConversations);
router.post("/", newConversation);
router.post("/delete", deleteConversation);

export default router;
