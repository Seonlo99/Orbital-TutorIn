import express from 'express';
const router = express.Router();
import { addComment, getComments, editComment, deleteComment } from '../controllers/commentControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addComment).get(getComments).patch(authChecker, editComment).delete(authChecker, deleteComment);

export default router;