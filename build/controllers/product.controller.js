"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestSeller = exports.getProductsByCategory = exports.getAllProducts = exports.getProductById = exports.createProduct = void 0;
const product_model_1 = require("../models/product.model");
const ProductPopulate_services_1 = require("../services/ProductPopulate.services");
const createProduct = async (req, res) => {
    const product = await product_model_1.Product.insert({ ...req.body });
    res.status(201).send({ status: 201, product, success: true });
};
exports.createProduct = createProduct;
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await product_model_1.Product.findById(id);
    if (!product) {
        return res
            .status(404)
            .send({ status: 404, message: 'Product Not Found', success: false });
    }
    res.status(200).send({ status: 200, product, success: true });
};
exports.getProductById = getProductById;
const getAllProducts = async (req, res) => {
    const products = await product_model_1.Product.find();
    res.status(200).send({ status: 200, products, success: true });
};
exports.getAllProducts = getAllProducts;
const getProductsByCategory = async (req, res) => {
    const { category } = req.query;
    if (!category) {
        return res.status(400).send({
            status: 400,
            message: 'category must be defined',
            success: false,
        });
    }
    const products = await product_model_1.Product.findByCategory(String(category));
    res.status(200).send({ status: 200, products, success: true });
};
exports.getProductsByCategory = getProductsByCategory;
const getBestSeller = async (req, res) => {
    const products = await ProductPopulate_services_1.ProductPopulate.bestSeller();
    res.status(200).send({ status: 200, products, success: true });
};
exports.getBestSeller = getBestSeller;
