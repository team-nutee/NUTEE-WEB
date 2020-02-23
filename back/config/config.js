const dotenv = require('dotenv');

dotenv.config();

module.exports={
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'nutee',
    host: '127.0.0.1',
    dialect: 'mysql',
    port:3306,
    operatorsAliases: false
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'nutee',
    host: '127.0.0.1',
    dialect: 'mysql',
    port:3307,
    operatorsAliases: false
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'nutee',
    host: '127.0.0.1',
    dialect: 'mysql',
    port:3307,
    operatorsAliases: false
  }
};
