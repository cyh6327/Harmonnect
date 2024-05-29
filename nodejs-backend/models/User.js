const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize 설정

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  google_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  refreshtoken: {
    type: DataTypes.TEXT
  },
  expirydate: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Users',
  timestamps: false
});

// accessToken의 만료여부를 체크
User.prototype.isAccessTokenExpired = function() {
  return Date.now() >= this.expiryDate;
};

User.findOrCreateUser = async function(googleProfile) {
  console.log('Calling findOrCreate with:', googleProfile);
  const [user, created] = await User.findOrCreate({
    where: { google_id: googleProfile.id },
    defaults: { // findOrCreate 메서드의 defaults 옵션은 새로 생성될 때 사용될 기본값 지정
      google_id: googleProfile.id,
      name: googleProfile.displayName,
      email: googleProfile.emails[0].value
    }
  });

  if (created) {
    console.log('새로운 사용자가 생성되었습니다.');
  } else {
    console.log('기존의 사용자가 반환되었습니다.');
  }

  return user;
}

module.exports = User;