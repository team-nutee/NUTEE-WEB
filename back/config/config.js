const dotenv = require('dotenv');

dotenv.config();

module.exports={
  development: {
    username: 'nutee',
    password: process.env.DB_PASSWORD,
    database: 'nutee_test',
    host: 'nuteedb.cmwlqxe5se7d.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
    operatorsAliases: false
  },
  test: {
    username: 'nutee',
    password: process.env.DB_PASSWORD,
    database: 'nutee_test',
    host: 'nuteedb.cmwlqxe5se7d.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
    operatorsAliases: false
  },
  production: {
    username: 'nutee',
    password: process.env.DB_PASSWORD,
    database: 'nutee_test',
    host: 'nuteedb.cmwlqxe5se7d.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306,
    operatorsAliases: false
  }
};
