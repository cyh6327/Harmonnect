require('dotenv').config();
const passport = require('passport');
require('./config/passport')(passport);
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const { sequelize } = require('./models/Index')

const corsOptions = {
  origin: 'http://localhost:3000', // 허용할 도메인
  credentials: true,
  optionsSuccessStatus: 200, // 일부 브라우저에서의 CORS 문제가 해결되도록 상태 설정
};

const app = express();
const secret = crypto.randomBytes(64).toString('hex');

sequelize.sync()
  .then(() => {
    console.log('모든 테이블이 성공적으로 동기화되었습니다.');
  })
  .catch(error => {
    console.error('테이블 동기화 중 오류가 발생하였습니다:', error);
  });

app.use(cors(corsOptions));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 실제 배포 시에는 true로 설정
}));

app.get('/', async (req, res) => {
  res.send(`dashboard`);
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server Connected' });
});

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use('/api', apiRoutes);
// 인증 라우터
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;