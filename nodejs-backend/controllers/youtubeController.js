const { google } = require('googleapis');
const passport = require('passport');
const Music = require('../models/Music');
const User = require('../models/User');
const axios = require('axios');

async function insertMusics(user, musicVideos) {
    let musics = [];
    for(const music of musicVideos) {
        let data = { 
            video_id: music.id,
            user_id: user.id,
            title: music.snippet.title,
            thumbnail: music.snippet.thumbnails.default.url,
            status: 'unshown'
        }
        musics.push(data);
    }

    await Music.bulkCreate(musics)
    .then(() => {
        console.log('Music have been inserted');

    })
    .catch(err => {
        console.error('Failed to insert musics:', err);
    });
}

exports.getDefaultMusic = async (req, res) => {
    const userId = req.user.id;
    console.log(`getDefaultMusic............................... userId = ${userId}`);

    const defaultMusics = await Music.findAll({ where : { status : 'default', user_id : userId } });

    if(defaultMusics.length > 0) {
        res.json(defaultMusics);
    } else {
        res.json({ message: "No music found", data: [] });
    }
}

exports.getUnshownMusic = async (req, res) => {
    const userId = req.user.id;
    console.log(`getUnshownMusic............................... userId = ${userId}`);

    // const unshownCount = await Music.count({ where: { status: 'unshown' } }); 
    
    // // unShownMusics 가 10 미만이면 유튜브 api 로 데이터를 받아온다
    // if(unshownCount < 10) {
    //     await getLikedYoutubeMusic(req.user);
    // } 

    // const unshownMusics = await Music.findAll({ where: { status: 'unshown' , user_id : userId }, limit : 10 });
    // console.log(`unshownMusics..... ${JSON.stringify(unshownMusics)}`)

    Music.findAll({ where: { status: 'unshown' , user_id : userId }, limit : 10 })
    .then(musics => {
        // 가져온 데이터를 업데이트할 내용으로 변경
        const updatedData = musics.map(music => ({
            id: music.id,
            video_id: music.video_id,
            user_id: music.user_id,
            title: music.title,
            thumbnail: music.thumbnail,
            status: 'default'
        }));

        // 업데이트된 데이터를 반영
        return Promise.all(updatedData.map(data => {
            return Music.update(data, { where: { id: data.id } });
        }));
    })
    .then(() => {
        console.log('데이터가 업데이트되었습니다.');
        return Music.findAll({ limit: 10 });
    })
    .then(updatedMusics => {
        // 클라이언트에 업데이트된 User 데이터를 JSON 형태로 응답
        res.json(updatedMusics);
    })
    .catch(err => {
        console.error('데이터 업데이트 중 오류 발생:', err);
    });

    // if(unshownMusics.length > 0) {
    //     res.json(unshownMusics);
    // } else {
    //     res.json({ message: "No music found", data: [] });
    // }
}

const getLikedYoutubeMusic = async (user) => {
    console.log(`getLikedYoutubeMusic................`);
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: user.accessToken
    });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    let nextPageToken = '';
    let musicVideos = [];

    try {
        do {
            // 사용자의 '좋아요' 목록에서 비디오 가져오기
            // https://developers.google.com/youtube/v3/docs/videos/list?hl=ko#usage
            const likedVideosResponse = await youtube.videos.list({
                part: 'snippet,contentDetails',
                myRating: 'like', // 사용자가 '좋아요'를 누른 비디오
                maxResults: 50,
                pageToken: nextPageToken
            });

            //console.log(`response : ${JSON.stringify(likedVideosResponse)}`)
            const detailedVideos = likedVideosResponse.data.items;

            // 음악 카테고리(카테고리 ID가 '10')로 필터링
            const filteredMusicVideos = detailedVideos.filter(video => video.snippet.categoryId === '10');

            musicVideos = musicVideos.concat(filteredMusicVideos);
            
            console.log(`musicVideos length : ${musicVideos.length}`)

            nextPageToken = likedVideosResponse.data.nextPageToken;
        } while (nextPageToken && musicVideos.length < 10);   
    } catch (err) {
        console.error('Error fetching YouTube videos', err);
        throw err;
    }

    await insertMusics(user, musicVideos);
};