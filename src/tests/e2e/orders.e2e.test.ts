import { Order } from '../../models/order.model';
import { orders, users } from '../static-data';
import request from 'supertest';
import app from '../../app';

describe('Order Route Test', () => {
  let cookie: string[];
  beforeEach(async () => {
    const { email, password } = users[1];
    const user = await request(app).post('/api/user/login').send({
      email,
      password,
    });
    cookie = user.get('Set-Cookie');
  });

  it('Create Order', async () => {
    const { user_id, product_id, quantity } = orders[2];
    const res = await request(app)
      .post('/api/order/create')
      .set('Cookie', cookie)
      .send({
        user_id,
        product_id,
        quantity,
      })
      .expect(201);

    expect(res.body.success).toEqual(true);
    expect(res.body.order.status).toEqual('active');
  });

  it('Find Order By Id', async () => {
    const orderData = await Order.insert({ ...orders[0] });

    const order = await request(app)
      .get(`/api/order/show/${orderData.id}`)
      .set('Cookie', cookie)
      .expect(200);

    expect(order.body.success).toEqual(true);
  });

  it('Return 404 when order does not exist', async () => {
    const res = await request(app)
      .get('/api/order/show/500')
      .set('Cookie', cookie)
      .expect(404);

    expect(res.body.message).toEqual('order Not Found');
    expect(res.body.success).toEqual(false);
  });

  it('Return 400 when user does not have permission', async () => {
    const orderData = await Order.insert({ ...orders[1] });

    const order = await request(app)
      .get(`/api/order/show/${orderData.id}`)
      .set('Cookie', cookie)
      .expect(400);

    expect(order.body.success).toEqual(false);
    expect(order.body.message).toEqual('You do not have this permission');
  });

  it('Find All Orders', async () => {
    const res = await request(app)
      .get('/api/order/index')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.success).toEqual(true);
  });

  it('Update Order Status', async () => {
    const res1 = await request(app)
      .get('/api/order/index')
      .set('Cookie', cookie)
      .expect(200);

    const res2 = await request(app)
      .patch(`/api/order/${res1.body.orders[1].id}/status`)
      .set('Cookie', cookie)
      .expect(200);

    expect(res2.body.order.status).toEqual('completed');
    expect(res2.body.success).toEqual(true);
  });

  it('Find All Order Completed Status', async () => {
    const res = await request(app)
      .get('/api/order')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.body.success).toEqual(true);
  });
});
