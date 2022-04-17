"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pg_1 = __importDefault(require("pg"));
class Pool {
    connect(options) {
        this._pool = new pg_1.default.Pool(options);
        return this._pool.query('SELECT 1+1;');
    }
    close() {
        return this._pool?.end();
    }
    query(sql, params) {
        return this._pool?.query(sql, params);
    }
}
module.exports = new Pool();
