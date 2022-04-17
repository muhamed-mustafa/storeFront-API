import { Order } from '../../models/order.model';
import { orders } from '../static-data';

describe('Order Model Test', () => {
  beforeAll(async () => {
    for (let i in orders) {
      await Order.insert({ ...orders[i] });
    }
  });

  it('Return All Orders', async () => {
    const { user_id } = orders[1];
    const ordersData = await Order.find(String(user_id));

    expect(ordersData).toBeDefined();
  });

  it('Return Specific Order', async () => {
    const order = await Order.findById(String(orders[1].user_id));

    expect(order).toBeDefined();
  });

  it('Insert Order', async () => {
    const orderData = {
      user_id: 2,
      product_id: 1,
      quantity: 3,
    };

    const order = await Order.insert({ ...orderData });

    expect(order.status).toEqual('active');
    expect(order).toBeDefined();
  });

  it('Update Order Status', async () => {
    const order = await Order.updateStatus('2');

    expect(order.status).toEqual('completed');
    expect(order).toBeDefined();
  });

  it('Find Completed Order', async () => {
    await Order.updateStatus('2');
    const existingOrder = await Order.findCompletedOrders('completed');
    expect(existingOrder).toBeDefined();
  });
});
