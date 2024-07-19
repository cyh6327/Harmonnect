const passport = require('passport');

const scopes = ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'];

const googleLogin = passport.authenticate('google', { scope: scopes });

const googleCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/auth/google' }, (err, user, info) => {
      if (err) {
        req.session.message = '로그인에 실패하였습니다.';
        return res.redirect(`${process.env.CLIENT_URL}/`);
      }
      if (!user) {
        req.session.message = '로그인에 실패하였습니다.';
        return res.redirect(`${process.env.CLIENT_URL}/`);
      }
      // 세션에 사용자의 인증 상태 저장
      req.logIn(user, (err) => {
        if (err) {
          req.session.message = '로그인에 실패하였습니다.';
          return res.redirect(`${process.env.CLIENT_URL}/`);
        }
        req.session.message = '로그인 되었습니다.';
        return res.redirect(`${process.env.CLIENT_URL}/`);
      });
    })(req, res, next);
};

const kakaoLogin = passport.authenticate('kakao', { scope: scopes });

const kakaoCallback = (req, res, next) => {
    passport.authenticate('kakao', { failureRedirect: '/auth/kakao' }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/auth/kakao'); // Redirect to login page on failure
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect(`${process.env.CLIENT_URL}/`);
      });
    })(req, res, next);
};

module.exports = {
    googleLogin,
    googleCallback,
    kakaoLogin,
    kakaoCallback
};