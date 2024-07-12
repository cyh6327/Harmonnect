const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize 설정
const crypto = require('crypto');

// SHA-256 해시 함수
const generateHash = (input) => {
  return crypto.createHash('sha256').update(input).digest('hex').substring(0, 10);
};

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
  code: { // 친구 추가시 필요한 개인 고유 코드
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
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
  timestamps: false,
  hooks: {
    beforeCreate: async (user, options) => {
      // 각 컬럼의 정보를 조합하여 고유 문자열 생성
      const uniqueString = `${user.getDataValue('id')}${user.getDataValue('snsId')}${user.getDataValue('name')}`;
      // 고유 문자열을 해시하여 a 컬럼에 저장
      user.code = generateHash(uniqueString);
    }
  }
});

module.exports = User;