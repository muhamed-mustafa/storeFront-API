import express from 'express';
import {
  createProduct,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  getBestSeller,
} from '../controllers/product.controller';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.post('/api/product/create', [requireAuth], createProduct);

router.get('/api/product', [requireAuth], getProductsByCategory);

router.get('/api/product/show/:id', [requireAuth], getProductById);

router.get('/api/product/index', [requireAuth], getAllProducts);

router.get('/api/product/best', [requireAuth], getBestSeller);

export { router as productsRouter };
