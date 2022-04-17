"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const require_auth_1 = require("../middlewares/require-auth");
const router = express_1.default.Router();
exports.OrdersRouter = router;
router.post('/api/order/create', [require_auth_1.requireAuth], order_controller_1.createOrder);
router.get('/api/order/show/:id', [require_auth_1.requireAuth], order_controller_1.getOrderById);
router.get('/api/order/index', [require_auth_1.requireAuth], order_controller_1.getAllOrders);
router.patch('/api/order/:id/status', [require_auth_1.requireAuth], order_controller_1.updateOrderStatus);
router.get('/api/order', [require_auth_1.requireAuth], order_controller_1.getCompletedOrders);
