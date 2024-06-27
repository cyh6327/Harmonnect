const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // 인증된 경우 다음 미들웨어로 진행
    }
    res.redirect('/'); // 인증되지 않은 경우 로그인 페이지로 리디렉션
  }
  
module.exports = isAuthenticated;