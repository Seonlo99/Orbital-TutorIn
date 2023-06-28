import express from "express";
const router = express.Router();

import {
  newConversation,
  getConversations,
} from "../controllers/conversationControllers.js";

router.get("/", getConversations);
router.post("/", newConversation);

export default router;
