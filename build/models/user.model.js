"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
const to_camel_case_1 = require("./utils/to-camel-case");
const Password_service_1 = require("../services/Password.service");
class User {
    static async find() {
        const result = await database_1.default.query('SELECT * FROM users;');
        return (0, to_camel_case_1.toCamelCase)(result.rows);
    }
    static async findById(id) {
        const result = await database_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
    static async insert(user) {
        const { first_name, last_name, email, password } = user;
        const passwordHashed = await Password_service_1.Password.toHash(password);
        const result = await database_1.default.query('INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, passwordHashed]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
    static async findByEmail(email) {
        const result = await database_1.default.query('SELECT * FROM users WHERE email = $1', [
            email,
        ]);
        return (0, to_camel_case_1.toCamelCase)(result.rows)[0];
    }
}
exports.User = User;
