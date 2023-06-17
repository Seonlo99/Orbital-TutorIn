import express from 'express';
const router = express.Router();
import { getTransaction, addTransaction, cancelTransaction, getSelectedTransactions, modifyTransaction} from '../controllers/transactionControllers.js';
import { authChecker } from '../middleware/authMiddleware.js';

router.route('/').get(getTransaction).post(authChecker, addTransaction).delete(authChecker, cancelTransaction).patch(authChecker, modifyTransaction);

router.route('/filter').get(authChecker, getSelectedTransactions)

export default router;