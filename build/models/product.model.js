"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = __importDefault(require("../database"));
const to_camel_case_1 = require("./utils/to-camel-case");
class Product {
    static async find() {
        const result = await database_1.default.query('SELECT * FROM products;');
        return (0, to_camel_case_1.toCamelCase)(result.rows);
    }
    static async findById(id) {
        const result = await database_1.default.query('SELECT * FROM products WHERE id = $1;', [
            id,
        ]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
    static async findByCategory(category) {
        const result = await database_1.default.query('SELECT * FROM products WHERE category = $1', [category]);
        return (0, to_camel_case_1.toCamelCase)(result.rows);
    }
    static async insert(product) {
        const { name, price, category } = product;
        const result = await database_1.default.query('INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *', [name, price, category]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
}
exports.Product = Product;
