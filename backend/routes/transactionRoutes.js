import express from 'express';
const router = express.Router();
import { getTransaction, addTransaction, cancelTransaction} from '../controllers/transactionControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';

router.route('/').get(getTransaction).post(authChecker, addTransaction).delete(authChecker, cancelTransaction);

export default router;