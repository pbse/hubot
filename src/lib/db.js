/*
  DB Instance
 */
const Postgres = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;

const connectToDB = () => {
  if(!DATABASE_URL) {
    throw new Error('DATABASE_URL is required to be set.');
  }
  try {
    const client = new Postgres.Client(DATABASE_URL);
    client.connect();
    return client;
  }
  catch (err) {
    throw new Error(err);
  }
};

module.exports.connectToDB = connectToDB;
