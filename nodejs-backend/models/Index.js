const sequelize = require('../config/database');
const User = require('./User');
const Music = require('./Music');
const Friend = require('./Friends');

User.belongsToMany(User, { through: Friend, as: 'Friends', foreignKey: 'userId' });
User.belongsToMany(User, { through: Friend, as: 'UserFriends', foreignKey: 'friendId' });

module.exports = {
    User,
    Music,
    Friend,
    sequelize
};