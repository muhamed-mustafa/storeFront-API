"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    return res
        .status(404)
        .send({ status: 404, message: 'Route Not Found', success: false });
};
exports.errorHandler = errorHandler;
