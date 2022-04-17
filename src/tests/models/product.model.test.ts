import { Product } from '../../models/product.model';
import { products } from '../static-data';

describe('Product Model Test', () => {
  it('Return All Products', async () => {
    const products = await Product.find();

    expect(products).toBeDefined();
  });

  it('Return Specific Product', async () => {
    const products = await Product.find();
    const product = await Product.findById(products[0].id);

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

    const product = await Product.insert({ ...productData });

    expect(product.name).toEqual(productData.name);
    expect(product.category).toEqual(productData.category);
    expect(product).toBeDefined();
  });

  it('Find Product By Category', async () => {
    const { category } = products[1];
    const existingProduct = await Product.findByCategory(category);

    expect(existingProduct).toBeDefined();
  });
});
