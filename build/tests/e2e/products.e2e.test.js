"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const static_data_1 = require("../static-data");
describe('Product Route Test', () => {
    let cookie;
    beforeEach(async () => {
        const { email, password } = static_data_1.users[0];
        const user = await (0, supertest_1.default)(app_1.default).post('/api/user/login').send({
            email,
            password,
        });
        cookie = user.get('Set-Cookie');
    });
    it('Create Product', async () => {
        const { name, price, category } = static_data_1.products[0];
        const res = await (0, supertest_1.default)(app_1.default)
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
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/product')
            .query({ category: 'phone' })
            .set('Cookie', cookie)
            .expect(200);
        expect(res.body.success).toEqual(true);
    });
    it('Return 400 BadRequest If category is not be defined', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/product')
            .set('Cookie', cookie)
            .expect(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('category must be defined');
    });
    it('Find Product By Id', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/product/index')
            .set('Cookie', cookie)
            .expect(200);
        const product = await (0, supertest_1.default)(app_1.default)
            .get(`/api/product/show/${res.body.products[0].id}`)
            .set('Cookie', cookie)
            .expect(200);
        expect(product.body.success).toEqual(true);
    });
    it('Return 404 when product does not exist', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/product/show/500')
            .set('Cookie', cookie)
            .expect(404);
        expect(res.body.message).toEqual('Product Not Found');
        expect(res.body.success).toEqual(false);
    });
    it('Find All Products', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/product/index')
            .set('Cookie', cookie)
            .expect(200);
        expect(res.body.success).toEqual(true);
    });
    it('Products Best Seller ', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/product/best')
            .set('Cookie', cookie)
            .expect(200);
        expect(res.body.success).toEqual(true);
    });
});
