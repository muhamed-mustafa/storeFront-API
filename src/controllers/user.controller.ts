import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Auth } from '../models/utils/auth.utils';

const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const existingUser = await User.findByEmail(email);

  if (existingUser) {
    return res
      .status(400)
      .send({ status: 400, message: 'email is already exist', success: false });
  }

  const user = await User.insert({ ...req.body });

  req.session = await Auth.generateToken(user!.id);

  res.status(201).send({ status: 201, user, success: true });
};

const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res
      .status(404)
      .send({ status: 404, message: 'User Not Found', success: false });
  }

  res.status(200).send({ status: 200, user, success: true });
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).send({ status: 200, users, success: true });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Auth.authenticate(email, password);

  if (!user) {
    return res.status(400).send({
      status: 400,
      message: 'Email Or Password is Invalid',
      success: false,
    });
  }

  req.session = await Auth.generateToken(user!.id);

  res.status(200).send({ status: 200, user, success: true });
};

export { createUser, getUserById, getAllUsers, login };
