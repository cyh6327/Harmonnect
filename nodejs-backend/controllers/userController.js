const { Op } = require('sequelize');
const Music = require('../models/Music');

exports.addToUserProfile = async (req, res) => {
    const userId = req.user.id;
    const musicIdList = req.body.musicId;

    console.log(`addToUserProfile............................... userId = ${userId} , musicId = ${musicIdList}`);
    console.log(Array.isArray(musicIdList));

    await Music.update(
        { status : 'added' },
        { where: { id: { [Op.in]: musicIdList } } }
    )
    .then(()=> {
        console.log('데이터가 업데이트되었습니다.');
        return Music.findAll({ where : { status : 'added', user_id : userId } });
    })
    .then(updatedMusics => {
        // 클라이언트에 업데이트된 User 데이터를 JSON 형태로 응답
        res.json(updatedMusics);
    })
    .catch(err => {
        console.error('데이터 업데이트 중 오류 발생:', err);
    });
}