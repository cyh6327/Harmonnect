const { google } = require('googleapis');
const passport = require('passport');

exports.getSesstion = passport.authenticate('session');

exports.getLikedYoutubeMusic = async (req, res) => {
    console.log("req.user: ",req.user)
    if (!req.user || !req.user.accessToken) {
        return res.status(401).send('User not authenticated or accessToken not found.');
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: req.user.accessToken
    });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    try {
        // 사용자의 '좋아요' 목록에서 비디오 가져오기
        const likedVideosResponse = await youtube.videos.list({
            part: 'snippet,contentDetails',
            myRating: 'like', // 사용자가 '좋아요'를 누른 비디오
            maxResults: 50
        });

        const musicVideos = likedVideosResponse.data.items.filter(video => {
            // 카테고리 ID가 '10'인 비디오만 필터링 (음악 카테고리)
            return video.snippet.categoryId === '10';
        });

        console.log('Filtered Music Videos:', musicVideos);
        res.send(musicVideos);
        //return musicVideos;
    } catch (err) {
        console.error('Error fetching YouTube videos', err);
        throw err;
    }
};
