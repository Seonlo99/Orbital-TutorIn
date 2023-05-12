import express from 'express';
const router = express.Router();
import { addPost, getAllPosts } from '../controllers/postControllers';
import { authChecker } from '../middleware/authMiddleware';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addPost).get(getAllPosts);

export default router;