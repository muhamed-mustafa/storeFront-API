/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE users(
          id  SERIAL PRIMARY KEY,
          first_name VARCHAR(20) NOT NULL,
          last_name VARCHAR(20) NOT NULL,
          email VARCHAR(40) NOT NULL,
          password VARCHAR NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE users;
    `);
};