import pool from '../database';
const { default: migrate } = require('node-pg-migrate');
import dotenv from 'dotenv';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;
const DEFAULT_OPTS = {
  host: POSTGRES_HOST,
  port: 5432,
  database: POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

export class Context {
  static async build() {
    // Create connection with database
    await pool.connect(DEFAULT_OPTS);

    const result = await pool.query(
      'SELECT 1 FROM information_schema.schemata WHERE schema_name = \'public\''
    );

    if (!result!.rows.length) {
      await pool.query('CREATE SCHEMA public;');
    }

    // Run our migrations in the new schema
    await migrate({
      direction: 'up',
      migrationsTable: 'pgmigrations',
      checkOrder: true,
      noLock: true,
      dir: 'migrations',
      singleTransaction: true,
      databaseUrl: {
        host: POSTGRES_HOST,
        port: 5432,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
      },
    });
  }

  static async destroy() {
    await pool.query('DROP SCHEMA public CASCADE;');

    await pool.close();
  }
}
