const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const UserService = require('../services/UserService');
const User = require('../models/User');

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
    // Google OAuth 2.0 전략 설정
const googleLogin = () => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID, // Google Cloud에서 발급받은 클라이언트 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Cloud에서 발급받은 클라이언트 시크릿
      callbackURL: "/auth/google/callback", // Google 로그인 후 리디렉션될 콜백 URL
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'], // 필요한 권한을 요청
      access_type: 'offline'
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(`google profile : ${JSON.stringify(profile)}`)
    try {
        const user = await UserService.findOrCreateUser(profile);
        user.accessToken = accessToken;
        if (user) {
          done(null, user);
        }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
}

// const kakaoLogin = () => {
//   passport.use(new KakaoStrategy({
//     clientID: config.kakao.clientID, // Kakao 클라이언트 ID
//     clientSecret: config.kakao.clientSecret, // Kakao 클라이언트 시크릿
//     callbackURL: config.kakao.callbackURL // Kakao 인증 후 리디렉션될 콜백 URL
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     console.log(`kakao profile : ${JSON.stringify(profile)}`)
//     try {
//       const user = await UserService.findOrCreateUser(profile);

//       if (user) {
//         done(null, user);
//       }
//     } catch (error) {
//       console.error(error);
//       done(error);
//    }
//   }));
// }

module.exports = {
  passport,
  googleLogin,
  //kakaoLogin
};
