import pool from '../database';
import { toCamelCase } from './utils/to-camel-case';

export type OrderAttrs = {
  id?: string;
  user_id: number;
  product_id: number;
  quantity: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export class Order {
  static async find(user_id: string) {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [
      user_id,
    ]);

    return toCamelCase(result!.rows);
  }

  static async findById(id: string) {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1;', [
      id,
    ]);

    return toCamelCase(result!.rows)[0];
  }

  static async insert(order: OrderAttrs) {
    const { user_id, product_id, quantity } = order;

    const result = await pool.query(
      'INSERT INTO orders(user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity]
    );

    return toCamelCase(result!.rows)[0];
  }

  static async findCompletedOrders(status: string) {
    const result = await pool.query('SELECT * FROM orders WHERE status=$1', [
      status,
    ]);
    return toCamelCase(result!.rows);
  }

  static async updateStatus(id: string) {
    const result = await pool.query(
      'UPDATE orders SET status=\'completed\' WHERE id = $1 RETURNING * ;',
      [id]
    );
    return toCamelCase(result!.rows)[0];
  }
}
