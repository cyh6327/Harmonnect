const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // 가정된 User 모델 경로

module.exports = function(passport) {
    // Google OAuth 2.0 전략 설정
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID, // Google Cloud에서 발급받은 클라이언트 ID
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Cloud에서 발급받은 클라이언트 시크릿
        callbackURL: "/auth/google/callback", // Google 로그인 후 리디렉션될 콜백 URL
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'], // 필요한 권한을 요청
        access_type: 'offline'
    },
    async (accessToken, refreshToken, profile, callback) => {
        try {
            const user = await User.findOrCreateUser(profile);

            if (user) {
                user.accessToken = accessToken;
                return callback(null, user);    // req.user 로 접근
            } else {
                return callback(null, false); 
            }
        } catch (error) {
            console.error('Error during user registration or lookup', error);
            return callback(error);
        }
    }));

    // 사용자 세션 관리
    passport.serializeUser((user, done) => {
        done(null, { id: user.id, accessToken: user.accessToken });
    });

    passport.deserializeUser(async (data, done) => {
        try {
          const user = await User.findByPk(data.id);
          if (user) {
            user.accessToken = data.accessToken;  // `accessToken`도 복원
            user.introduction = data.introduction;
            done(null, user);
          } else {
            done(new Error('User not found'), null);
          }
        } catch (error) {
          done(error, null);
        }
      });
};
