import express from 'express';
const router = express.Router();

import { addTag, getAllFormattedTags } from '../controllers/tagController.js';
import { authChecker } from '../middleware/authMiddleware.js';

router.route('/').get(getAllFormattedTags).post(addTag); //add check later on

export default router;