import app from './app';
import pool from './database';
import dotenv from 'dotenv';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

const Environment = [
  'POSTGRES_HOST',
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'JWT_KEY',
];

Environment.forEach((el) => {
  if (!process.env[el]) {
    throw new Error(`${el} Must Be Defined`);
  }
});

pool
  .connect({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
  .then(() => {
    const port: number = 3000 || process.env.PORT;

    app.listen(port, () => console.log(`Listening to port ${port}`));
  })
  .catch((err) => console.log(err));
