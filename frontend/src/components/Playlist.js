import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicBox from './MusicBox';
import axiosInstance from '../utils/axiosInstance';

function Playlist() {
    const [music, setMusic] = useState([]);

    useEffect(() => {
        getDefaultMusic();
    }, []);

    const getDefaultMusic = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/music/unused`)
        .then(response => {
            const data = response.data;
            if (data && data.length > 0) {
                console.log('Music list:', data);
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
            console.log(`responed unshown music ..... ${JSON.stringify(data)}`)
            if (data && data.length > 0) {
                console.log('Music list:', data);
                setMusic(data);
                console.log('after save Music :', music);
            } else {
                // musicList가 없을 때 처리
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const addToUserProfile = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/music`)
        .then(response => {
            
        })
        .catch(error => {
            console.error('Error addToUserProfile:', error);
        });
    }

    return (
        <div className='text-center py-10'>
            <button 
                onClick={getUnshownMusic} 
                class="bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            >
                Get Youtube Music
            </button>
            <button 
                onClick={addToUserProfile} 
                class="bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            >
                Add to My Profile
            </button>
            <div className="text-center py-10">

                <table className="w-full">
                    {/* <thead className="bg-gray-800">
                    { <tr>
                        <th className="p-3 text-left">#</th>
                        <th className="p-3 text-left">제목</th>
                    </tr> }
                    </thead> */}
                    <tbody>
                    {music.map((music, index) => (
                        <MusicBox 
                            index={index}
                            id={music.video_id} 
                            title={music.title} 
                            image={music.thumbnail} 
                        />
                    ))}
                    </tbody>
                </table>
                {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-custom-dark-text sm:text-6xl">Playlist Page</h1> */}
            </div>
        </div>
    )
}

export default Playlist;
