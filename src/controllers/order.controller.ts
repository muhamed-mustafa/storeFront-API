import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';

const createOrder = async (req: Request, res: Response) => {
  const order = await Order.insert({
    ...req.body,
    user_id: req.currentUser!.id,
  });

  res.status(201).send({ status: 201, order, success: true });
};

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(req.currentUser!.id);

  const order = await Order.findById(id);

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

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find(req.currentUser!.id);

  res.status(200).send({ status: 200, orders, success: true });
};

const getCompletedOrders = async (req: Request, res: Response) => {
  const orders = await Order.findCompletedOrders('completed');

  res.status(200).send({ status: 200, orders, success: true });
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const order = await Order.updateStatus(req.params.id);

  res.status(200).send({ status: 200, order, success: true });
};

export {
  createOrder,
  getOrderById,
  getAllOrders,
  getCompletedOrders,
  updateOrderStatus,
};
