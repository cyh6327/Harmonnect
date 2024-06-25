// src/components/Header.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDarkMode } from '../contexts/DarkModeContext';
import Toast from './Toast';
import axiosInstance from '../utils/axiosInstance';

function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastSubMessage, setToastSubMessage] = useState('');

  const handleLogin = () => {
    try {
        window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
      } catch (error) {
        console.log(error);
      }
  };

  const handleLogout = async () => {
    try {
        console.log("logout")
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`);
        setToastMessage('로그아웃 되었습니다.');
        setShowToast(true);
      } catch (error) {
        console.log(error);
      }
  };

  const handleProfile = async () => {
    const returnObj = {};
    // 이용자 정보 가져오기
    await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/info`)
    .then(response => {
        const data = response.data;
        console.log(data)
        if (data && data.length > 0) {
          returnObj.userInfo = data;
        } else {
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    // // 이용자 음악 데이터 가져오기
    // axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile/music`, {
      
    // })
    // .then(response => {
    //     const data = response.data;
    //     if (data && data.length > 0) {
    //       returnObj.musicList = data;
    //     } else {
    //     }
    // })
    // .catch(error => {
    //     console.error('Error fetching data:', error);
    // });
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <header className="dark:bg-custom-dark-bg dark:text-custom-dark-text">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                  <span className="dark:text-custom-dark-text text-gray-900 text-xl font-bold">Harmonnect</span>
              </Link>
          </div>
          <div className="flex lg:hidden">
              <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
              <nav>
                  <Link to="/playlist" className="text-sm font-semibold leading-6 text-gray-900 dark:text-custom-dark-text">Playlist</Link>
                  {/* <a className="text-sm font-semibold leading-6 text-gray-900 dark:text-custom-dark-text">
                      Playlist
                  </a> */}
              </nav>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
              <button onClick={handleLogin}>
                  <FaSignInAlt size={24} />
              </button>
              <button onClick={handleLogout}>
                  <FaSignOutAlt size={24} />
              </button>
              <Link to="/profile">
                <button onClick={handleProfile}>
                    <FaUser size={24} />
                </button>
              </Link>
              <button onClick={toggleDarkMode}>
                  {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
              </button>
          </div>
      </nav>
      <Toast 
      message={toastMessage} 
      subMessage={toastSubMessage} 
      show={showToast} 
      onClose={handleToastClose} 
    />
  </header>
  );
}

export default Header;
