import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { usersRouter } from './routes/users.route';
import { productsRouter } from './routes/products.route';
import { OrdersRouter } from './routes/orders.route';
import dotenv from 'dotenv';
import { currentUser } from './middlewares/current-user.middleware';
dotenv.config();

const app: express.Application = express();

app.use([
  bodyParser.json(),
  cookieSession({ signed: false }),
  currentUser,
  usersRouter,
  productsRouter,
  OrdersRouter,
]);

app.use('*', errorHandler);

export default app;
