"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductPopulate_services_1 = require("../../services/ProductPopulate.services");
describe('Product Populate Service Test', () => {
    it('Show Top 5 most popular products', async () => {
        const products = await ProductPopulate_services_1.ProductPopulate.bestSeller();
        expect(~~products[0].numProduct).toEqual(3);
        expect(products).toBeDefined();
    });
});
