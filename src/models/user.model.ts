import pool from '../database';
import { toCamelCase } from './utils/to-camel-case';
import { Password } from '../services/Password.service';

export type UserAttrs = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
};

export class User {
  static async find() {
    const result = await pool.query('SELECT * FROM users;');

    return toCamelCase(result!.rows);
  }

  static async findById(id: string) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    return toCamelCase(result!.rows)[0];
  }

  static async insert(user: UserAttrs) {
    const { first_name, last_name, email, password } = user;

    const passwordHashed = await Password.toHash(password);

    const result = await pool.query(
      'INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, passwordHashed]
    );

    return toCamelCase(result!.rows)[0];
  }

  static async findByEmail(email: string) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return toCamelCase(result!.rows)[0];
  }
}
