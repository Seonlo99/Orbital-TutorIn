import express from 'express';
const router = express.Router();

import { addUpvote, editUpvote, deleteUpvote } from '../controllers/upvoteController.js';
import { authChecker } from '../middleware/authMiddleware.js';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addUpvote).patch(authChecker, editUpvote).delete(authChecker, deleteUpvote);

export default router;