import express from 'express';
import {
  createUser,
  getUserById,
  getAllUsers,
  login,
} from '../controllers/user.controller';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.post('/api/user/create', createUser);

router.post('/api/user/login', login);

router.get('/api/user/show/:id', [requireAuth], getUserById);

router.get('/api/user/index', [requireAuth], getAllUsers);

export { router as usersRouter };
