"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const user_model_1 = require("../user.model");
const Password_service_1 = require("../../services/Password.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    static async authenticate(email, password) {
        const user = await user_model_1.User.findByEmail(email);
        if (!user) {
            return null;
        }
        const matchPassword = await Password_service_1.Password.compare(user.password, password);
        if (matchPassword) {
            return user;
        }
    }
    static async generateToken(id) {
        const userJwt = jsonwebtoken_1.default.sign({ id }, process.env.JWT_KEY);
        return { jwt: userJwt };
    }
}
exports.Auth = Auth;
