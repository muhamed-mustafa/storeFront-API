"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.products = exports.users = void 0;
exports.users = [
    {
        first_name: 'test1',
        last_name: 'test1',
        email: 'test1@test.com',
        password: 'test1',
    },
    {
        first_name: 'test2',
        last_name: 'test2',
        email: 'test2@test.com',
        password: 'test2',
    },
    {
        first_name: 'test3',
        last_name: 'test3',
        email: 'test3@test.com',
        password: 'test3',
    },
];
exports.products = [
    {
        name: 'iphone 6',
        price: 3000,
        category: 'phone',
    },
    {
        name: 'samsung 20',
        price: 7000,
        category: 'phone',
    },
    {
        name: 'oppo 12',
        price: 6000,
        category: 'phone',
    },
];
exports.orders = [
    {
        user_id: 2,
        product_id: 1,
        quantity: 3,
    },
    {
        user_id: 3,
        product_id: 2,
        quantity: 5,
    },
    {
        user_id: 1,
        product_id: 3,
        quantity: 2,
    },
];
