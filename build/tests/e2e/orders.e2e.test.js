"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../models/order.model");
const static_data_1 = require("../static-data");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe('Order Route Test', () => {
    let cookie;
    beforeEach(async () => {
        const { email, password } = static_data_1.users[1];
        const user = await (0, supertest_1.default)(app_1.default).post('/api/user/login').send({
            email,
            password,
        });
        cookie = user.get('Set-Cookie');
    });
    it('Create Order', async () => {
        const { user_id, product_id, quantity } = static_data_1.orders[2];
        const res = await (0, supertest_1.default)(app_1.default)
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
        const orderData = await order_model_1.Order.insert({ ...static_data_1.orders[0] });
        const order = await (0, supertest_1.default)(app_1.default)
            .get(`/api/order/show/${orderData.id}`)
            .set('Cookie', cookie)
            .expect(200);
        expect(order.body.success).toEqual(true);
    });
    it('Return 404 when order does not exist', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/order/show/500')
            .set('Cookie', cookie)
            .expect(404);
        expect(res.body.message).toEqual('order Not Found');
        expect(res.body.success).toEqual(false);
    });
    it('Return 400 when user does not have permission', async () => {
        const orderData = await order_model_1.Order.insert({ ...static_data_1.orders[1] });
        const order = await (0, supertest_1.default)(app_1.default)
            .get(`/api/order/show/${orderData.id}`)
            .set('Cookie', cookie)
            .expect(400);
        expect(order.body.success).toEqual(false);
        expect(order.body.message).toEqual('You do not have this permission');
    });
    it('Find All Orders', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/order/index')
            .set('Cookie', cookie)
            .expect(200);
        expect(res.body.success).toEqual(true);
    });
    it('Update Order Status', async () => {
        const res1 = await (0, supertest_1.default)(app_1.default)
            .get('/api/order/index')
            .set('Cookie', cookie)
            .expect(200);
        const res2 = await (0, supertest_1.default)(app_1.default)
            .patch(`/api/order/${res1.body.orders[1].id}/status`)
            .set('Cookie', cookie)
            .expect(200);
        expect(res2.body.order.status).toEqual('completed');
        expect(res2.body.success).toEqual(true);
    });
    it('Find All Order Completed Status', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/order')
            .set('Cookie', cookie)
            .expect(200);
        expect(res.body.success).toEqual(true);
    });
});
