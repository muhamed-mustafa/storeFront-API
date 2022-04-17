"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const static_data_1 = require("../static-data");
describe('User Model Test', () => {
    it('Return All Users', async () => {
        const users = await user_model_1.User.find();
        expect(users).toBeDefined();
    });
    it('Return Specific User', async () => {
        const users = await user_model_1.User.find();
        const user = await user_model_1.User.findById(users[0].id);
        expect(user.id).toEqual(users[0].id);
        expect(user.email).toEqual('test1@test.com');
        expect(user).toBeDefined();
    });
    it('Insert User', async () => {
        const userData = {
            first_name: 'test3',
            last_name: 'test3',
            email: 'test3@test.com',
            password: 'test3',
        };
        const user = await user_model_1.User.insert({ ...userData });
        expect(user.email).toEqual('test3@test.com');
        expect(user).toBeDefined();
    });
    it('Find User By Email', async () => {
        const { email } = static_data_1.users[1];
        const existingUser = await user_model_1.User.findByEmail(email);
        expect(existingUser.email).toEqual('test2@test.com');
        expect(existingUser).toBeDefined();
    });
});
