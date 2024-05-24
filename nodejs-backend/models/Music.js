const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize 설정

const Music = sequelize.define('Music', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  video_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  google_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Music',
  timestamps: false
});

module.exports = Music;