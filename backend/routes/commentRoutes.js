import express from 'express';
const router = express.Router();
import { addComment, getComments } from '../controllers/commentControllers';
import { authChecker } from '../middleware/authMiddleware';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addComment).get(getComments);

export default router;