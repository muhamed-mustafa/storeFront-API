"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const require_auth_1 = require("../middlewares/require-auth");
const router = express_1.default.Router();
exports.usersRouter = router;
router.post('/api/user/create', user_controller_1.createUser);
router.post('/api/user/login', user_controller_1.login);
router.get('/api/user/show/:id', [require_auth_1.requireAuth], user_controller_1.getUserById);
router.get('/api/user/index', [require_auth_1.requireAuth], user_controller_1.getAllUsers);
