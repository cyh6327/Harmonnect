const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

router.get('/kakao', authController.kakaoLogin);
router.get('/kakao/callback', authController.kakaoCallback);

// 로그아웃 라우트
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(`${process.env.CLIENT_URL}/`);
  });
});

router.get('/session-message', (req, res) => {
  const message = req.session.toastMessage || '';
  req.session.toastMessage = ''; // 메시지 한번 사용 후 삭제
  res.json({ message });
});

module.exports = router;
