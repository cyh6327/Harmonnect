const passport = require('passport');

const scopes = ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'];

const googleLogin = passport.authenticate('google', { scope: scopes });

const googleCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/auth/google' }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/auth/google'); // Redirect to login page on failure
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
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