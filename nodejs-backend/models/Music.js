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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM,
    values: ['unused', 'added', 'unshown'],
    defaultValue: 'unused',
    allowNull: false
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profile_added_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  like_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'Music',
  timestamps: false
});

module.exports = Music;