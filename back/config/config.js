const dotenv = require('dotenv');
dotenv.config();

module.exports={
  development: {
    username: 'nutee',
    password: process.env.DB_PASSWORD,
    database: 'nutee_test',
    host: 'nutee.cmwlqxe5se7d.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
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
    database: 'nutee_test',
    host: 'nutee.cmwlqxe5se7d.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
  }
};
