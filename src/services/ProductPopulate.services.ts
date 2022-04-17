import pool from '../database';
import { toCamelCase } from '../models/utils/to-camel-case';

export class ProductPopulate {
  static async bestSeller() {
    const result = await pool.query(`
        SELECT products.id, name, price, COUNT(product_id) AS num_product
        FROM orders 
        JOIN products ON products.id = orders.product_id
        GROUP BY products.id
        ORDER BY num_product DESC
        LIMIT 5;
    `);

    return toCamelCase(result!.rows);
  }
}
