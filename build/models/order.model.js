"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = __importDefault(require("../database"));
const to_camel_case_1 = require("./utils/to-camel-case");
class Order {
    static async find(user_id) {
        const result = await database_1.default.query('SELECT * FROM orders WHERE user_id = $1', [
            user_id,
        ]);
        return (0, to_camel_case_1.toCamelCase)(result.rows);
    }
    static async findById(id) {
        const result = await database_1.default.query('SELECT * FROM orders WHERE id = $1;', [
            id,
        ]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
    static async insert(order) {
        const { user_id, product_id, quantity } = order;
        const result = await database_1.default.query('INSERT INTO orders(user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [user_id, product_id, quantity]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
    static async findCompletedOrders(status) {
        const result = await database_1.default.query('SELECT * FROM orders WHERE status=$1', [
            status,
        ]);
        return (0, to_camel_case_1.toCamelCase)(result.rows);
    }
    static async updateStatus(id) {
        const result = await database_1.default.query("UPDATE orders SET status='completed' WHERE id = $1 RETURNING * ;", [id]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
}
exports.Order = Order;
