import express from 'express';
const router = express.Router();
import { registerUser, userLogin } from '../controllers/userControllers.js';

router.post('/register', registerUser);
router.post('/login', userLogin);

export default router;