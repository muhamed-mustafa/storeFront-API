"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getCompletedOrders = exports.getAllOrders = exports.getOrderById = exports.createOrder = void 0;
const order_model_1 = require("../models/order.model");
const user_model_1 = require("../models/user.model");
const createOrder = async (req, res) => {
    const order = await order_model_1.Order.insert({
        ...req.body,
        user_id: req.currentUser.id,
    });
    res.status(201).send({ status: 201, order, success: true });
};
exports.createOrder = createOrder;
const getOrderById = async (req, res) => {
    const { id } = req.params;
    const user = await user_model_1.User.findById(req.currentUser.id);
    const order = await order_model_1.Order.findById(id);
    if (!order) {
        return res
            .status(404)
            .send({ status: 404, message: 'order Not Found', success: false });
    }
    if (order.userId !== user.id) {
        return res.status(400).send({
            status: 400,
            message: 'You do not have this permission',
            success: false,
        });
    }
    res.status(200).send({ status: 200, order, success: true });
};
exports.getOrderById = getOrderById;
const getAllOrders = async (req, res) => {
    const orders = await order_model_1.Order.find(req.currentUser.id);
    res.status(200).send({ status: 200, orders, success: true });
};
exports.getAllOrders = getAllOrders;
const getCompletedOrders = async (req, res) => {
    const orders = await order_model_1.Order.findCompletedOrders('completed');
    res.status(200).send({ status: 200, orders, success: true });
};
exports.getCompletedOrders = getCompletedOrders;
const updateOrderStatus = async (req, res) => {
    const order = await order_model_1.Order.updateStatus(req.params.id);
    res.status(200).send({ status: 200, order, success: true });
};
exports.updateOrderStatus = updateOrderStatus;
