const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize 설정

const Friend = sequelize.define('Friend', {
    requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
        allowNull: false
    }
}, {
    tableName: 'Friend',
    timestamps: true
});

module.exports = Friend;