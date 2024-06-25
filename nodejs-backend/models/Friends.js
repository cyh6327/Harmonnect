const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize 설정
const User = require('./Index')

const Friend = sequelize.define('Friend', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    friendId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = Friend;