const { google } = require('googleapis');
const passport = require('passport');
const Music = require('../models/Music');
const User = require('../models/User');
const axios = require('axios');
const qs = require('qs');

let spotifyToken = "";

async function getSpotifyAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    });

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getSpotifyMusicInfo(tags) {
    if(spotifyToken == "") {
        spotifyToken = await getSpotifyAccessToken();
    }

    console.log(`spotifyToken : ${spotifyToken}`);
    console.log(`tags : ${tags} , ${typeof tags}`);
    
    for(const tag of tags) {
        const url = `https://api.spotify.com/v1/search?q=${tag}&type=track&limit=1&offset=1`;
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        })
        .then(response => {
            console.log('Spotify Response:', response.data);
            //return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
}

async function insertMusics(musicVideos) {
    let musics = [];
    for(const music of musicVideos) {
        let data = { 
            vedio_id: music.id,
            google_id: req.user.google_id,
        }
        musics.push(data);
    }

    Music.bulkCreate(musics)
    .then(() => {
        console.log('Music have been inserted');
    })
    .catch(err => {
        console.error('Failed to insert musics:', err);
    });
}

exports.getUnusedMusic = (req, res) => {
    const userId = req.user.id;
    console.log(`getUnusedMusic............................... userId = ${userId}`);

    const unUsedMusics = Music.findAll({ where : { status : 'unused', user_id : userId } });

    if(unUsedMusics.length > 0) {
        res.json(unUsedMusics);
    } else {
        res.json({ message: "No music found", data: [] });
    }
}

exports.getUnshownMusic = async (req, res) => {
    const userId = req.user.id;
    console.log(`getUnshownMusic............................... userId = ${userId}`);

    const unshownCount = await Music.count({ where: { status: 'unshown' } }); 
    
    // unShownMusics 가 10 미만이면 유튜브 api 로 데이터를 받아온다
    if(unshownCount < 10) {
        await getLikedYoutubeMusic(req.user);
    } 

    const unshownMusics = await Music.findAll({ where: { status: 'unshown' , user_id : userId , limit : 10 } });

    if(unshownMusics.length > 0) {
        res.json(unshownMusics);
    } else {
        res.json({ message: "No music found", data: [] });
    }
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

            for(const music of filteredMusicVideos) {
                getSpotifyMusicInfo(music.snippet.tags);
            }

            //musicVideos = musicVideos.concat(filteredMusicVideos);
            
            console.log(`musicVideos length : ${musicVideos.length}`)

            nextPageToken = likedVideosResponse.data.nextPageToken;
        } while (nextPageToken && musicVideos.length < 10);   
    } catch (err) {
        console.error('Error fetching YouTube videos', err);
        throw err;
    }

    //getSpotifyMusicInfo(musicVideos)
    // 데이터베이스에 저장
    //insertMusics(musicVideos);

    //res.send(musicVideos);
};
