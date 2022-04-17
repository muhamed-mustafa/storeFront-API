/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE products(
          id  SERIAL PRIMARY KEY,
          price INTEGER NOT NULL,
          name VARCHAR(20) NOT NULL,
          category VARCHAR(40) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE products;
    `);
};