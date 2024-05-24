const { google } = require('googleapis');
const passport = require('passport');
const Music = require('../models/Music');
const User = require('../models/User');

//exports.getSesstion = passport.authenticate('session');

async function getOffset(userId) {
    try {
      const user = await User.findOne({ where: { google_id: userId } });
      return user ? user.offset : 0;
    } catch (error) {
      console.error('Error fetching offset:', error);
      throw error;
    }
}

exports.getSavedMusic = async (req, res) => {
    const userId = req.user.id;
    const offset = getOffset(userId);

    const musicList = await Music.findAll({ offset : offset, limit: 10 });

    // db에 저장된 플레이리스트가 10개 미만인 경우 api 를 통해 가져온다
    if(musicList.length > 10) {
        getLikedYoutubeMusic();
    } else {
        res.json(musicList);
    }
}

const getLikedYoutubeMusic = async (req, res) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: req.user.accessToken
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

    // 데이터베이스에 저장
    //insertMusics(musicVideos);

    //res.send(musicVideos);
};
