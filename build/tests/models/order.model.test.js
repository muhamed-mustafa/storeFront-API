"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../models/order.model");
const static_data_1 = require("../static-data");
describe('Order Model Test', () => {
    beforeAll(async () => {
        for (let i in static_data_1.orders) {
            await order_model_1.Order.insert({ ...static_data_1.orders[i] });
        }
    });
    it('Return All Orders', async () => {
        const { user_id } = static_data_1.orders[1];
        const ordersData = await order_model_1.Order.find(String(user_id));
        expect(ordersData).toBeDefined();
    });
    it('Return Specific Order', async () => {
        const order = await order_model_1.Order.findById(String(static_data_1.orders[1].user_id));
        expect(order).toBeDefined();
    });
    it('Insert Order', async () => {
        const orderData = {
            user_id: 2,
            product_id: 1,
            quantity: 3,
        };
        const order = await order_model_1.Order.insert({ ...orderData });
        expect(order.status).toEqual('active');
        expect(order).toBeDefined();
    });
    it('Update Order Status', async () => {
        const order = await order_model_1.Order.updateStatus('2');
        expect(order.status).toEqual('completed');
        expect(order).toBeDefined();
    });
    it('Find Completed Order', async () => {
        await order_model_1.Order.updateStatus('2');
        const existingOrder = await order_model_1.Order.findCompletedOrders('completed');
        expect(existingOrder).toBeDefined();
    });
});
