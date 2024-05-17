import React, { useState } from 'react';
import axios from 'axios';
import MusicBox from './MusicBox';
import axiosInstance from '../utils/axiosInstance';

function Playlist() {
    const [music, setMusic] = useState([]);

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
                onClick={getYoutubeMusic} 
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
