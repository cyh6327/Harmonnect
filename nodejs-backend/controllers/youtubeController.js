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

    let nextPageToken = '';
    let musicVideos = [];

    try {
        // 사용자의 '좋아요' 목록에서 비디오 가져오기
        const likedVideosResponse = await youtube.videos.list({
            part: 'snippet,contentDetails',
            myRating: 'like', // 사용자가 '좋아요'를 누른 비디오
            maxResults: 50,
            pageToken: nextPageToken
        });

        while (musicVideos.length < 10) {
            const detailedVideos = likedVideosResponse.data.items;

            // 음악 카테고리(카테고리 ID가 '10')로 필터링
            const filteredMusicVideos = detailedVideos.filter(video => video.snippet.categoryId === '10');

            musicVideos = musicVideos.concat(filteredMusicVideos);

            // 더 이상 페이지가 없으면 반복 중지
            if (!likedVideosResponse.data.nextPageToken) {
                break;
            }

            nextPageToken = likedVideosResponse.data.nextPageToken;
        }

        // 최대 50개의 비디오로 제한
        musicVideos = musicVideos.slice(0, 10);
        
        res.send(musicVideos);

    } catch (err) {
        console.error('Error fetching YouTube videos', err);
        throw err;
    }
};
