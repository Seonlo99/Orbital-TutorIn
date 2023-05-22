import express from 'express';
const router = express.Router();
import { addPost, getAllPosts, getSinglePost } from '../controllers/postControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addPost).get(getAllPosts);
router.route('/post').get(getSinglePost);

export default router;