const { Op } = require('sequelize');
const { Music, Friend } = require('../models/Index');

const addToUserProfile = async (req, res) => {
    const userId = req.user.id;
    const musicIdList = req.body.musicId;

    console.log(`addToUserProfile............................... userId = ${userId} , musicId = ${musicIdList}`);
    console.log(Array.isArray(musicIdList));

    await Music.update(
        { status : 'added', profile_added_date : new Date() },
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

const getUserInfo = async (req, res) => {
    const userId = req.user.id;
    console.log(`getUserInfo... userId = ${userId}`);

    const userInfo = {
        "name" : req.user.name,
        "introduction" : req.user.introduction
    }

    console.log(`userInfo... ${JSON.stringify(userInfo)}`);
    
    res.json(userInfo);
}

const getAddedMusic = async (req, res) => {
    const userId = req.user.id;
    const recentAddedMusic = await Music.findAll({ 
        where : { status : 'added', user_id : userId }, 
        limit : 5,
        order: [['profile_added_date', 'ASC']]
    });
    console.log(`recentAddedMusic... ${JSON.stringify(recentAddedMusic)}`);

    res.json(recentAddedMusic);
}

const getUserFriends = async (req, res) => {
    // TODO : 추후 데이터 추가하고 주석 풀기
    // const freinds = await Friend.findAll({ where : { user_id : userId } });
    // console.log(`freinds... ${JSON.stringify(freinds)}`);
    // returnObj.friends = freinds;
}

module.exports = {
    addToUserProfile,
    getUserInfo,
    getAddedMusic,
    getUserFriends
};
  