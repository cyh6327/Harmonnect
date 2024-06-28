import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import defaultImg from '../assets/images/default_profile.png';
import FriendsList from './FriendsList';
import RecentMusic from './RecentMusic';
import axios from 'axios';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [recentMusic, setRecentMusic] = useState([]);

  useEffect(() => {
      getUserInfo();
      getAddedMusic();
  }, []); // 처음 렌더링 될 때 한 번만 실행

  const getUserInfo = async () => {
    console.log(`getUserInfo..........`)
    await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/info`)
    .then(response => {
        const data = response.data;
        console.log(data)
        if (data && data.length > 0) {
          setUserInfo(data);
          console.log(`userInfo : ${JSON.stringify(userInfo)}`)
        } else {
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const getAddedMusic = async () => {
    // 이용자가 최근 추가한 음악 5개 가져오기
    await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/music`)
    .then(response => {
        const data = response.data;
        console.log(data)
        if (data && data.length > 0) {
          setRecentMusic(data);
          console.log(`recentMusic : ${JSON.stringify(recentMusic)}`)
        } else {
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  return (
    <div className="text-white p-8 rounded-lg w-full">
      <div className="container mx-auto flex items-center">
        <div className="w-32 h-32 rounded-full flex items-center justify-center">
          <img src={defaultImg} className="w-full h-full rounded-full mr-3" />
        </div>
        <div className="ml-8">
          <h2 className="text-4xl font-bold">Name</h2>
          <p className="mt-2 text-gray-400">팔로잉 N명</p>
        </div>
      </div>

      <div className="flex min-h-screen text-white">
        <div className="container mx-auto p-8 flex flex-col md:flex-row">
          <div className="flex-1 bg-transparent p-4">
            <h2 className="text-2xl font-bold mb-4">최근 추가한 음악</h2>
            <div className="flex justify-between items-center mb-2">
              <span></span>
              <button className="text-sm text-gray-400 hover:underline">모두 표시</button>
            </div>
            <ul>
              {recentMusic.map((music, index) => (
                <RecentMusic 
                    index={index}
                    id={music.video_id} 
                    title={music.title} 
                    image={music.thumbnail}
                />
              ))} 
            </ul>
          </div>
          <div className="flex-none w-full md:w-72 p-4 rounded-lg mt-8 md:mt-0 md:ml-8">
            <FriendsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
