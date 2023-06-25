import express from 'express';
const router = express.Router();
import { addApplication, getApplications, editApplication } from '../controllers/applicationControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';

// router.post('/register', registerUser);
router.route('/').post(authChecker, addApplication).get(authChecker, getApplications).patch(authChecker, editApplication)

export default router;