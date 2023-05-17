import express from 'express';
const router = express.Router();
import { addPost, getAllPosts, getSinglePost } from '../controllers/postControllers';
import { authChecker } from '../middleware/authMiddleware';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addPost).get(getAllPosts);
router.route('/post').get(getSinglePost);

export default router;