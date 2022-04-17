import express from 'express';
import {
  createOrder,
  getOrderById,
  getAllOrders,
  getCompletedOrders,
  updateOrderStatus,
} from '../controllers/order.controller';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.post('/api/order/create', [requireAuth], createOrder);

router.get('/api/order/show/:id', [requireAuth], getOrderById);

router.get('/api/order/index', [requireAuth], getAllOrders);

router.patch('/api/order/:id/status', [requireAuth], updateOrderStatus);

router.get('/api/order', [requireAuth], getCompletedOrders);

export { router as OrdersRouter };
