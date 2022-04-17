"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../../models/product.model");
const static_data_1 = require("../static-data");
describe('Product Model Test', () => {
    it('Return All Products', async () => {
        const products = await product_model_1.Product.find();
        expect(products).toBeDefined();
    });
    it('Return Specific Product', async () => {
        const products = await product_model_1.Product.find();
        const product = await product_model_1.Product.findById(products[0].id);
        expect(product.id).toEqual(products[0].id);
        expect(product.name).toEqual('iphone 6');
        expect(product).toBeDefined();
    });
    it('Insert Product', async () => {
        const productData = {
            name: 'xiaomi note 8',
            price: 4000,
            category: 'phone',
        };
        const product = await product_model_1.Product.insert({ ...productData });
        expect(product.name).toEqual(productData.name);
        expect(product.category).toEqual(productData.category);
        expect(product).toBeDefined();
    });
    it('Find Product By Category', async () => {
        const { category } = static_data_1.products[1];
        const existingProduct = await product_model_1.Product.findByCategory(category);
        expect(existingProduct).toBeDefined();
    });
});
