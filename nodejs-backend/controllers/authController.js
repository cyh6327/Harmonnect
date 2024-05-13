const passport = require('passport');
const User = require('../models/User');
const url = require('url');

const scopes = ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'];

exports.googleLogin = passport.authenticate('google', { scope: scopes });

// Google 로그인 콜백 처리 함수
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/login' });

// 추가적인 로그인 성공 처리
exports.postGoogleLogin = (req, res) => {
    if (req.user) {
        req.session.accessToken = req.user.accessToken; // 세션에 accessToken 저장
        console.log(`login User Info : ${JSON.stringify(req.user)}`);

        // refresh token 반환 확인
        const queryData = url.parse(req.url, true).query;
        const refreshToken = queryData.code;
        console.log(`refreshToken : ${refreshToken}`);
        
        res.redirect('/')
    } else {
        res.redirect('/auth/google'); // 실패 시 다시 Google 로그인으로 리다이렉션
    }
};
