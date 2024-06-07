import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicBox from './MusicBox';
import axiosInstance from '../utils/axiosInstance';

function Playlist() {
    const [music, setMusic] = useState([]);
    const [checkItems, setCheckItems] = useState(new Set);
    const [isAllChecked, setIsAllChecked] = useState(false);

    useEffect(() => {
        getDefaultMusic();
    }, []);

    const getDefaultMusic = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/music/default`)
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

    const addToUserProfile = (event) => {
        event.preventDefault();

        // axios를 사용한 POST 요청
        axiosInstance.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/music`)
        .then(response => {
            console.log('서버 응답:', response.data);
        })
        .catch(error => {
            console.error('서버 요청 오류:', error);
        });
    }

    const checkItemHandler = (id, isChecked) => {
        if (isChecked) {
          checkItems.add(id) 
          setCheckItems(checkItems)
        } else if (!isChecked) {
          checkItems.delete(id)
          setCheckItems(checkItems)
        }
        console.log(checkItems)
    }  

    const allCheckedHandler = ({target}) => {
        console.log(`all check : ${target.checked}`)
        if (target.checked) {
          setCheckItems(new Set(music.map((checkbox, index) => `id`+index)))
          setIsAllChecked(true)
        } else {
          checkItems.clear();
          setCheckItems(checkItems);
          setIsAllChecked(false)
        }
    }

    return (
        <div className='text-center py-10'>
            <form onSubmit={addToUserProfile}>
                <button 
                    onClick={getUnshownMusic} 
                    class="bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Get Youtube Music
                </button>
                <button 
                    type="submit"
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
                                            onChange={allCheckedHandler} 
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
                                    checkItemHandler={checkItemHandler}
                                />
                            ))}
                        </tbody>
                    </table>
                    {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-custom-dark-text sm:text-6xl">Playlist Page</h1> */}
                </div>
            </form>
        </div>
    )
}

export default Playlist;
