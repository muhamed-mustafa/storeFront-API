import pool from '../database';
import { toCamelCase } from './utils/to-camel-case';

export type ProductAttrs = {
  id?: string;
  price: number;
  name: string;
  category: string;
  created_at?: string;
  updated_at?: string;
};

export class Product {
  static async find() {
    const result = await pool.query('SELECT * FROM products;');

    return toCamelCase(result!.rows);
  }

  static async findById(id: string) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1;', [
      id,
    ]);

    return toCamelCase(result!.rows)[0];
  }

  static async findByCategory(category: string) {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1',
      [category]
    );

    return toCamelCase(result!.rows);
  }

  static async insert(product: ProductAttrs) {
    const { name, price, category } = product;

    const result = await pool.query(
      'INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *',
      [name, price, category]
    );

    return toCamelCase(result!.rows)[0];
  }
}
