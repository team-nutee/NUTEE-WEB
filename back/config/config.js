const dotenv = require('dotenv');
dotenv.config();

module.exports={
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'nutee',
    host: 'localhost',
    dialect: 'mysql',
    port:3307,
  },
  test: {
    username: 'nutee',
    password: process.env.DB_PASSWORD,
    database: 'nutee_test',
    host: 'nutee.cmwlqxe5se7d.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
  },
  production: {
    username: 'nutee',
    password: process.env.DB_PASSWORD,
    database: 'nutee',
    host: 'nutee.cmwlqxe5se7d.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
  }
};
