import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicBox from './MusicBox';
import axiosInstance from '../utils/axiosInstance';

function Playlist() {
    const [music, setMusic] = useState([]);

    useEffect(() => {
        getUnusedMusic();
    }, []);

    const addMusic = (newMusic) => {
        setMusic((prevMusic) => [...prevMusic, newMusic]);
    };

    const getUnusedMusic = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/music/unused`)
        .then(response => {
            const data = response.data;
            if (data.data && data.data.length > 0) {
                console.log('Music list:', data.data);
                setMusic(data.data);
            } else {
                // musicList가 없을 때 처리
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const getUnshownMusic = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/music/unshown`)
        .then(response => {
            const data = response.data;
            if (data.data && data.data.length > 0) {
                console.log('Music list:', data.data);
                addMusic(data.data);
            } else {
                // musicList가 없을 때 처리
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const getYoutubeMusic = async () => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/youtube/data`);
            setMusic(response.data);
            console.log(music);
            //setLoading(false);
          } catch (error) {
            // setError('Failed to fetch data');
            // setLoading(false);
          }
    };

    return (
        <div className="text-center">
            <button 
                onClick={getUnshownMusic} 
                class="bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            >
                Get Youtube Music
            </button>
            <table className="w-full">
                <thead className="bg-gray-800">
                {/* <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">제목</th>
                </tr> */}
                </thead>
                <tbody>
                {music.map((music, index) => (
                    <MusicBox 
                        index={index}
                        key={music.id} 
                        title={music.snippet.title} 
                        artist={music.snippet.title} 
                        image={music.snippet.thumbnails.default.url} 
                    />
                ))}
                </tbody>
            </table>
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-custom-dark-text sm:text-6xl">Playlist Page</h1> */}
        </div>
    )
}

export default Playlist;
