"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const users_route_1 = require("./routes/users.route");
const products_route_1 = require("./routes/products.route");
const orders_route_1 = require("./routes/orders.route");
const dotenv_1 = __importDefault(require("dotenv"));
const current_user_middleware_1 = require("./middlewares/current-user.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use([
    body_parser_1.default.json(),
    (0, cookie_session_1.default)({ signed: false }),
    current_user_middleware_1.currentUser,
    users_route_1.usersRouter,
    products_route_1.productsRouter,
    orders_route_1.OrdersRouter,
]);
app.use('*', errorHandler_middleware_1.errorHandler);
exports.default = app;
