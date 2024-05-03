require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const { Pool } = require('pg');
const User = require('./models/User');  // 사용자 모델을 가져옵니다.

const app = express();

// PostgreSQL 연결 설정
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

app.use(session({
    secret: 'secretKey',  // 이 부분은 .env 파일로 옮겨 관리하는 것이 좋습니다.
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 개발 중에는 false, 실제 배포 시에는 true로 설정하세요.
}));

// 데이터베이스 연결 테스트
app.get('/', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT NOW()');
      res.send(`Database time: ${rows[0].now}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
});

// 쿠키 세션 설정
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, // 24시간
//     keys: ['secretKey']
// }));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// Passport 적용을 위한 serialize, deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);  // ID로 사용자 찾기
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOrCreate({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
}));

// Google 인증 라우트
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/dashboard', (req, res) => {
    if (!req.user) {
        res.redirect('/auth/google');
    } else {
        res.send('You are logged in');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

