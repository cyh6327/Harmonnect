const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');
const sequelize = require('../config/database');

function authenticateUser(req, res, next) {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).send('User not authenticated or accessToken not found.');
  }
  next();
}

router.use(authenticateUser);

router.get('/dbtest', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        sequelize.close();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})

router.get('/music', youtubeController.getSavedMusic);
//router.get('/youtube/data', youtubeController.getSesstion, youtubeController.getLikedYoutubeMusic);

module.exports = router;