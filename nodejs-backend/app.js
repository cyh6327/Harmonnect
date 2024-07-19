require('dotenv').config();
const { passport, googleLogin } = require('./config/passport')
const express = require('express');
const http = require('http');
const session = require('express-session');
const crypto = require('crypto');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const { sequelize, User, Friend } = require('./models/Index');
const isAuthenticated = require('./isAuthenticated'); // 인증 체크 미들웨어
const morgan = require('morgan'); // 미들웨어 연결
const socketIo = require('socket.io');

googleLogin();
//kakaoLogin();

const corsOptions = {
  origin: 'http://localhost:3000', // 허용할 도메인
  credentials: true,
  optionsSuccessStatus: 200, // 일부 브라우저에서의 CORS 문제가 해결되도록 상태 설정
};

const app = express();
const server = http.createServer(app);
const secret = crypto.randomBytes(64).toString('hex');

app.use(cors(corsOptions));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000, secure: false } // 유지시간 : 1시간, 실제 배포 시에는 secure true로 설정
}));

// 로그 기록
if (process.env.NODE_ENV === 'production') { 
  app.use(morgan('combined')); // 배포환경이면
} else {
  app.use(morgan('dev')); // 개발환경이면
}

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(express.json()); // JSON 형태의 본문을 파싱

// Socket.IO를 서버에 연결합니다.
const io = socketIo(server, {
  cors: {
    origin: "*", // 모든 출처 허용 (보안상 적절히 설정 필요)
  },
});

// ./sockets/index.js 를 가져온다(파일명을 명시하지 않을시 index.js 파일이 존재하면 index.js 파일을 가져온다)
require('./sockets')(io);

sequelize.sync()
  .then(() => {
    console.log('모든 테이블이 성공적으로 동기화되었습니다.');
  })
  .catch(error => {
    console.error('테이블 동기화 중 오류가 발생하였습니다:', error);
  });

// User 테이블 동기화
async function syncUserModel() {
    try {
        await User.sync({ force: true });
        console.log('User table recreated successfully.');
    } catch (error) {
        console.error('Error recreating User table:', error);
    }
}
//syncUserModel();

async function syncFriendModel() {
  try {
      await Friend.sync({ force: true });
      console.log('User table recreated successfully.');
  } catch (error) {
      console.error('Error recreating User table:', error);
  }
}
//syncFriendModel();

app.get('/', async (req, res) => {
  const loginMsg = req.session.message; // 로그인 성공/실패 메시지
  delete req.session.message; // 메시지 삭제

  res.json({ loginMsg });
});

app.get('/msg', (req, res) => {
  console.log('GET /msg 요청 수신'); // 로그 추가
  const msg = req.session.message;
  delete req.session.message; // 메시지 삭제

  console.log(msg)
  res.json({ msg : msg });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server Connected' });
});

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: '로그아웃에 실패하였습니다.' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: '로그아웃에 실패하였습니다.' });
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.json({ msg: '로그아웃 되었습니다.', redirectUrl: process.env.CLIENT_URL});
    });
  });
});

// 모든 라우팅 요청에 대해 인증 체크 미들웨어를 적용
app.use((req, res, next) => {
  // 모든 요청에 대해 인증 체크
  if (!req.path.startsWith('/auth')) {
    return isAuthenticated(req, res, next);
  }
  next(); // 그 외의 요청은 다음 미들웨어로 진행
});

app.use('/api', apiRoutes);
// 인증 라우터
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});