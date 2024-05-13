const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback, authController.postGoogleLogin);

// 로그아웃 라우트
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
