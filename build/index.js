"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const Environment = [
    'POSTGRES_HOST',
    'POSTGRES_DB',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'JWT_KEY',
];
Environment.forEach((el) => {
    if (!process.env[el]) {
        throw new Error(`${el} Must Be Defined`);
    }
});
database_1.default
    .connect({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})
    .then(() => {
    const port = 3000 || process.env.PORT;
    app_1.default.listen(port, () => console.log(`Listening to port ${port}`));
})
    .catch((err) => console.log(err));
