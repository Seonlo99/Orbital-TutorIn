import express from 'express';
const router = express.Router();
import { addComment } from '../controllers/commentControllers';
import { authChecker } from '../middleware/authMiddleware';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addComment);

export default router;