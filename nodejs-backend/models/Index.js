const sequelize = require('../config/database');
const User = require('./User');
const Music = require('./Music');
const Friend = require('./Friend');

User.belongsToMany(User, { through: Friend, as: 'Friends', foreignKey: 'requesterId', otherKey: 'receiverId' });
User.belongsToMany(User, { through: Friend, as: 'UserFriends', foreignKey: 'receiverId', otherKey: 'requesterId' });

// 양방향
Friend.belongsTo(User, { as: 'Requester', foreignKey: 'requesterId' });
Friend.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

module.exports = {
    User,
    Music,
    Friend,
    sequelize
};