const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');
const sequelize = require('../config/database');

router.get('/dbtest', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        sequelize.close();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})

router.get('/youtube/data', youtubeController.getSesstion, youtubeController.getLikedYoutubeMusic);

module.exports = router;