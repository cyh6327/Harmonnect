import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicBox from './MusicBox';
import axiosInstance from '../utils/axiosInstance';

function Playlist() {
    const [music, setMusic] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    useEffect(() => {
        getDefaultMusic();
        setMusic(music.map(item => ({...item, isChecked: false})));
    }, []);

    const getDefaultMusic = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/music/default`)
        .then(response => {
            const defaultMusic = response.data;
            if (defaultMusic && defaultMusic.length > 0) {
                console.log('Music list:', defaultMusic);
                const newMusic = defaultMusic.map(item => ({
                    ...item,
                    "isChecked" : false
                }));
                console.log('Music list:', newMusic);
                setMusic(newMusic);
            } else {

            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const getUnshownMusic = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/music/unshown`)
        // .then(response => {
        //     const defaultMusic = response.data;
        //     if (defaultMusic && defaultMusic.length > 0) {
        //         console.log('Music list:', defaultMusic);
        //         const newMusic = defaultMusic.map(item => ({
        //             ...item,
        //             "isChecked" : false
        //         }));
        //         console.log('Music list:', newMusic);
        //         setMusic(newMusic);
        //     } else {

        //     }
        // })
        .then(response => {
            const data = response.data;
            console.log(`responed unshown music ..... ${JSON.stringify(data)}`)
            if (data && data.length > 0) {
                console.log('Music list:', data);
                const mergedMusic = [...music, ...data];
                setMusic(data);
                console.log('after merge Music :', mergedMusic);
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
        const selectedMusic = music.filter((item) => item.isChecked);
        const selectedMusicId = selectedMusic.map(item => item.id);

        console.log(`addToUserProfile........ selectedMusicId : ${Array.isArray(selectedMusicId)}`);

        //axios를 사용한 POST 요청
        axiosInstance.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/music`, {
            musicId : selectedMusicId
        })
        .then(response => {
            const data = response.data;
            console.log(`added music ..... ${JSON.stringify(data)}`)
            if (data && data.length > 0) {
                console.log('Music list:', data);
                // 기존 음악에서 추가된 음악은 제거
                setMusic(music => music.filter(object => !data.map(obj => obj.id).includes(object.id)));
                console.log('after add Music :', music);
            } else {
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const checkItemHandler = (index) => (event) => {
        const newMusic = [...music];
        newMusic[index].isChecked = event.target.checked;
        console.log(`checked music info ..... ${JSON.stringify(newMusic)}`)
        setMusic(newMusic);
    }  

    const allCheckedHandler = (checked) => {
        console.log(`all check click, checked : ${checked}`)
        setMusic(music.map(item => ({...item, isChecked: checked})));
        console.log(`all checked music info : ${JSON.stringify(music)}`)
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
                        <thead>
                            <tr>
                                <th className="p-3 text-left">
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                            onChange={(e) => allCheckedHandler(e.target.checked)}
                                        />
                                    </label>
                                </th>
                                <th className="p-3 text-left">No</th>
                                <th className="p-3 text-center">Title</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {music.map((music, index) => (
                                <MusicBox 
                                    index={index}
                                    id={music.video_id} 
                                    title={music.title} 
                                    image={music.thumbnail}
                                    isChecked={music.isChecked}
                                    onCheck={checkItemHandler(index)}
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
