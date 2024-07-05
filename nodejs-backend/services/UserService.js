const User = require('../models/User');
const crypto = require('crypto');

// SHA-256 해시 함수
const generateHash = (input) => {
  return crypto.createHash('sha256').update(input).digest('hex');
};

// 사용자 찾기 또는 생성 함수
const findOrCreateUser = async (profile) => {
    console.log('findOrCreate... profile :', profile);
    const [user, created] = await User.findOrCreate({
      where: { snsId: profile.id, provider: profile.provider },
      defaults: { // findOrCreate 메서드의 defaults 옵션은 새로 생성될 때 사용될 기본값 지정
        // snsId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        code: generateHash(`${profile.id}${profile.displayName}`)
      }
    });
  
    if (created) {
      console.log('새로운 사용자가 생성되었습니다.');
    } else {
      console.log('기존의 사용자가 반환되었습니다.');
    }
  
    return user;
}

module.exports = {
  findOrCreateUser
};
