"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const auth_utils_1 = require("../models/utils/auth.utils");
const createUser = async (req, res) => {
    const { email } = req.body;
    const existingUser = await user_model_1.User.findByEmail(email);
    if (existingUser) {
        return res
            .status(400)
            .send({ status: 400, message: 'email is already exist', success: false });
    }
    const user = await user_model_1.User.insert({ ...req.body });
    req.session = await auth_utils_1.Auth.generateToken(user.id);
    res.status(201).send({ status: 201, user, success: true });
};
exports.createUser = createUser;
const getUserById = async (req, res) => {
    const user = await user_model_1.User.findById(req.params.id);
    if (!user) {
        return res
            .status(404)
            .send({ status: 404, message: 'User Not Found', success: false });
    }
    res.status(200).send({ status: 200, user, success: true });
};
exports.getUserById = getUserById;
const getAllUsers = async (req, res) => {
    const users = await user_model_1.User.find();
    res.status(200).send({ status: 200, users, success: true });
};
exports.getAllUsers = getAllUsers;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await auth_utils_1.Auth.authenticate(email, password);
    if (!user) {
        return res.status(400).send({
            status: 400,
            message: 'Email Or Password is Invalid',
            success: false,
        });
    }
    req.session = await auth_utils_1.Auth.generateToken(user.id);
    res.status(200).send({ status: 200, user, success: true });
};
exports.login = login;
