import express from 'express';
const router = express.Router();
import { addComment, getComments } from '../controllers/commentControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addComment).get(getComments);

export default router;