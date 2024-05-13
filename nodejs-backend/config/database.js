const { Sequelize } = require('sequelize');

// 환경 변수를 사용하여 Sequelize 인스턴스 생성
// public constructor(database: string, username: string, password: string, options: object)
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false
  }
);

module.exports = sequelize;