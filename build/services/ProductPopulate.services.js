"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPopulate = void 0;
const database_1 = __importDefault(require("../database"));
const to_camel_case_1 = require("../models/utils/to-camel-case");
class ProductPopulate {
    static async bestSeller() {
        const result = await database_1.default.query(`
        SELECT products.id, name, price, COUNT(product_id) AS num_product
        FROM orders 
        JOIN products ON products.id = orders.product_id
        GROUP BY products.id
        ORDER BY num_product DESC
        LIMIT 5;
    `);
        return (0, to_camel_case_1.toCamelCase)(result.rows);
    }
}
exports.ProductPopulate = ProductPopulate;
