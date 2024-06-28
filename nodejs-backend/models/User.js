const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize 설정

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  snsId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaulteValue: DataTypes.DATE(Date.now)
  },
  refreshToken: {
    type: DataTypes.TEXT
  },
  expirydate: {
    type: DataTypes.DATE
  },
  introduction: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = User;