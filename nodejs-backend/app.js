require('dotenv').config();
const passport = require('passport');
require('./config/passport')(passport);
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');

const app = express();
const secret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // 실제 배포 시에는 true로 설정
}));

app.get('/', async (req, res) => {
  res.send(`dashboard`);
});

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiRoutes);
// 인증 라우터
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

