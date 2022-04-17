import { ProductPopulate } from '../../services/ProductPopulate.services';

describe('Product Populate Service Test', () => {
  it('Show Top 5 most popular products', async () => {
    const products = await ProductPopulate.bestSeller();

    expect(~~products[0].numProduct).toEqual(3);
    expect(products).toBeDefined();
  });
});
