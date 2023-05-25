import express from 'express';
const router = express.Router();
import { addPost, getAllPosts, getSinglePost } from '../controllers/postControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';
import { editPost } from '../controllers/postControllers.js';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addPost).get(getAllPosts).put(authChecker,editPost);
router.route('/post').get(getSinglePost);

export default router;