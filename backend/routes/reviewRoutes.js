import express from 'express';
const router = express.Router();

import { addReview } from '../controllers/reviewControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';


router.route('/').post(authChecker, addReview);

export default router;