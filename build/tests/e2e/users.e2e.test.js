"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const static_data_1 = require("../static-data");
describe('User Route Test', () => {
    it('Create User', async () => {
        const { first_name, last_name, password } = static_data_1.users[1];
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/user/create')
            .send({
            first_name,
            last_name,
            email: 'test@example.com',
            password,
        })
            .expect(201);
        expect(res.body.user.email).toEqual('test@example.com');
    });
    it('Return 400 BadRequest If Email Is Already Exist', async () => {
        const { first_name, last_name, email, password } = static_data_1.users[1];
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/user/create')
            .send({
            first_name,
            last_name,
            email,
            password,
        })
            .expect(400);
        expect(res.body.success).toEqual(false);
    });
    it('User Login', async () => {
        const { email, password } = static_data_1.users[1];
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/user/login')
            .send({
            email,
            password,
        })
            .expect(200);
        expect(res.body.user.email).toEqual(email);
    });
    it('Return 400 BadRequest If Email Is Incorrect', async () => {
        const { password } = static_data_1.users[1];
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/user/login')
            .send({
            email: 'test3@test3.com',
            password,
        })
            .expect(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Email Or Password is Invalid');
    });
    it('Return 400 BadRequest If Password Is Incorrect', async () => {
        const { email } = static_data_1.users[1];
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/user/login')
            .send({
            email,
            password: 'test3',
        })
            .expect(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Email Or Password is Invalid');
    });
    it('Return 400 BadRequest If Email and Password Is Incorrect', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/user/login')
            .send({
            email: '',
            password: '',
        })
            .expect(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Email Or Password is Invalid');
    });
    it('Find User By Id', async () => {
        const { email, password } = static_data_1.users[1];
        const res1 = await (0, supertest_1.default)(app_1.default).post('/api/user/login').send({
            email,
            password,
        });
        const cookie = res1.get('Set-Cookie');
        const { id } = res1.body.user;
        const res2 = await (0, supertest_1.default)(app_1.default)
            .get(`/api/user/show/${id}`)
            .set('Cookie', cookie)
            .expect(200);
        expect(res2.body.success).toEqual(true);
    });
    it('Return 404 when user does not exist', async () => {
        const { email, password } = static_data_1.users[1];
        const user = await (0, supertest_1.default)(app_1.default).post('/api/user/login').send({
            email,
            password,
        });
        const cookie = user.get('Set-Cookie');
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/user/show/500')
            .set('Cookie', cookie)
            .expect(404);
        expect(res.body.message).toEqual('User Not Found');
        expect(res.body.success).toEqual(false);
    });
    it('Return 401 when user Not Authorized', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/user/show/20').expect(401);
        expect(res.body.message).toEqual('Not Authorized');
        expect(res.body.success).toEqual(false);
    });
    it('Find All Users', async () => {
        const { email, password } = static_data_1.users[1];
        const user = await (0, supertest_1.default)(app_1.default).post('/api/user/login').send({
            email,
            password,
        });
        const cookie = user.get('Set-Cookie');
        const res = await (0, supertest_1.default)(app_1.default)
            .get('/api/user/index')
            .set('Cookie', cookie)
            .expect(200);
        expect(res.body.success).toEqual(true);
    });
});
