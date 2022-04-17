"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const require_auth_1 = require("../middlewares/require-auth");
const router = express_1.default.Router();
exports.productsRouter = router;
router.post('/api/product/create', [require_auth_1.requireAuth], product_controller_1.createProduct);
router.get('/api/product', [require_auth_1.requireAuth], product_controller_1.getProductsByCategory);
router.get('/api/product/show/:id', [require_auth_1.requireAuth], product_controller_1.getProductById);
router.get('/api/product/index', [require_auth_1.requireAuth], product_controller_1.getAllProducts);
router.get('/api/product/best', [require_auth_1.requireAuth], product_controller_1.getBestSeller);
