const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    url: process.env.DEV_DB_URL,
    dialect: 'postgres',
    logging: false
  },
  test: {
    url: process.env.TEST_DB_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  travis: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  }
};
module.exports = config[process.env.NODE_ENV || 'production'];
