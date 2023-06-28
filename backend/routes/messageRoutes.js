import express from "express";
const router = express.Router();

import { getMessages, newMessages } from "../controllers/messageControllers.js";

router.get("/", getMessages);
router.post("/", newMessages);

export default router;
