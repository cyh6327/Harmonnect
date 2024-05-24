const sequelize = require('../config/database');
const User = require('./User');
const Music = require('./Music');

module.exports = {
    User,
    Music,
    sequelize
};