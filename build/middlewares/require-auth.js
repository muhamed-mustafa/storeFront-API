"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        return res
            .status(401)
            .send({ status: 401, message: 'Not Authorized', success: false });
    }
    next();
};
exports.requireAuth = requireAuth;
