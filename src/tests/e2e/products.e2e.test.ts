import request from 'supertest';
import app from '../../app';
import { products, users } from '../static-data';

describe('Product Route Test', () => {
  let cookie: string[];
  beforeEach(async () => {
    const { email, password } = users[0];
    const user = await request(app).post('/api/user/login').send({
      email,
      password,
    });
    cookie = user.get('Set-Cookie');
  });
  it('Create Product', async () => {
    const { name, price, category } = products[0];
    const res = await request(app)
      .post('/api/product/create')
      .set('Cookie', cookie)
      .send({
        name,
        price,
        category,
      })
      .expect(201);

    expect(res.body.product.name).toEqual(name);
  });

  it('Find Product By Category', async () => {
    const res = await request(app)
      .get('/api/product')
      .query({ category: 'phone' })
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.success).toEqual(true);
  });

  it('Return 400 BadRequest If category is not be defined', async () => {
    const res = await request(app)
      .get('/api/product')
      .set('Cookie', cookie)
      .expect(400);

    expect(res.body.success).toEqual(false);
    expect(res.body.message).toEqual('category must be defined');
  });

  it('Find Product By Id', async () => {
    const res = await request(app)
      .get('/api/product/index')
      .set('Cookie', cookie)
      .expect(200);

    const product = await request(app)
      .get(`/api/product/show/${res.body.products[0].id}`)
      .set('Cookie', cookie)
      .expect(200);

    expect(product.body.success).toEqual(true);
  });

  it('Return 404 when product does not exist', async () => {
    const res = await request(app)
      .get('/api/product/show/500')
      .set('Cookie', cookie)
      .expect(404);

    expect(res.body.message).toEqual('Product Not Found');
    expect(res.body.success).toEqual(false);
  });

  it('Find All Products', async () => {
    const res = await request(app)
      .get('/api/product/index')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.success).toEqual(true);
  });

  it('Products Best Seller ', async () => {
    const res = await request(app)
      .get('/api/product/best')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.success).toEqual(true);
  });
});
