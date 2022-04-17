"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const database_1 = __importDefault(require("../database"));
const { default: migrate } = require('node-pg-migrate');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const DEFAULT_OPTS = {
    host: POSTGRES_HOST,
    port: 5432,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
};
class Context {
    static async build() {
        // Create connection with database
        await database_1.default.connect(DEFAULT_OPTS);
        const result = await database_1.default.query("SELECT 1 FROM information_schema.schemata WHERE schema_name = 'public'");
        if (!result.rows.length) {
            await database_1.default.query('CREATE SCHEMA public;');
        }
        // Run our migrations in the new schema
        await migrate({
            direction: 'up',
            migrationsTable: 'pgmigrations',
            checkOrder: true,
            noLock: true,
            dir: 'migrations',
            singleTransaction: true,
            databaseUrl: {
                host: POSTGRES_HOST,
                port: 5432,
                database: POSTGRES_DB_TEST,
                user: POSTGRES_USER,
                password: POSTGRES_PASSWORD,
            },
        });
    }
    static async destroy() {
        await database_1.default.query('DROP SCHEMA public CASCADE;');
        await database_1.default.close();
    }
}
exports.Context = Context;
