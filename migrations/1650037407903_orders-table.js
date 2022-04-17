/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE orders(
          id  SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
          quantity INTEGER NOT NULL,
          status VARCHAR(15) DEFAULT 'active',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE orders;
    `);
};
