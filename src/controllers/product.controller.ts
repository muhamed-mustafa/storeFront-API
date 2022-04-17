import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductPopulate } from '../services/ProductPopulate.services';

const createProduct = async (req: Request, res: Response) => {
  const product = await Product.insert({ ...req.body });

  res.status(201).send({ status: 201, product, success: true });
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .send({ status: 404, message: 'Product Not Found', success: false });
  }

  res.status(200).send({ status: 200, product, success: true });
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  res.status(200).send({ status: 200, products, success: true });
};

const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).send({
      status: 400,
      message: 'category must be defined',
      success: false,
    });
  }

  const products = await Product.findByCategory(String(category));

  res.status(200).send({ status: 200, products, success: true });
};

const getBestSeller = async (req: Request, res: Response) => {
  const products = await ProductPopulate.bestSeller();
  res.status(200).send({ status: 200, products, success: true });
};

export {
  createProduct,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  getBestSeller,
};
