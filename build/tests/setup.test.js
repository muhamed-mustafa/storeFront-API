"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_context_1 = require("./database-context");
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const static_data_1 = require("./static-data");
beforeAll(async () => {
    await database_context_1.Context.build();
    for (let i = 0; i < 3; i++) {
        await user_model_1.User.insert({ ...static_data_1.users[i] });
        await product_model_1.Product.insert({ ...static_data_1.products[i] });
    }
});
afterAll(async () => await database_context_1.Context.destroy());
