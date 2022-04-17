"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Password_service_1 = require("../../services/Password.service");
describe('Password Services Test', () => {
    let password;
    it('Convert Plain text Password to Hash Password', async () => {
        password = await Password_service_1.Password.toHash('test@test*');
        expect(password).toBeDefined();
    });
    it('Compare Stored Password and Supplied Password', async () => {
        const matchedPassword = await Password_service_1.Password.compare(String(password), 'test@test*');
        expect(matchedPassword).toBeTrue();
    });
});
