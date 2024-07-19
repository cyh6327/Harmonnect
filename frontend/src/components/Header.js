// src/components/Header.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaMoon, FaSun, FaUser, FaUserPlus } from 'react-icons/fa';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDarkMode } from '../contexts/DarkModeContext';
import axiosInstance from '../utils/axiosInstance';
import Modal from './Modal';
import { showToast } from '../utils/toastNotifications'; // 실제 경로로 대체하세요

function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [toastMsg, setToastMsg] = useState('');
  const [open, setOpen] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);
  const [friendCode, setFriendCode] = useState('');

  const handleLoginModal = (isOpen) => {
    setOpen(isOpen);
  } 

  const handleLogout = async () => {
    try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/logout`);
        showToast('success', response.data.msg);
        setTimeout(() => {
          window.location.href = response.data.redirectUrl;
        }, 2000);
    } catch (error) {
        showToast('error', error.response.data.msg);
    }
  };

  const inputToggle = () => {
    setToggleInput(!toggleInput);
  }

  const handleInputChange = (e) => {
    setFriendCode(e.target.value);
  };

  const addFriend = async (e) => {
    if (e.key === 'Enter') {
      try {
          console.log(`add friend ... friendCode : ${friendCode}`);
          axiosInstance.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/friend`, {
            friendCode : friendCode
          })
          .then(response => {
              const data = response.data;
              console.log(`add friend info ..... ${JSON.stringify(data)}`)
              if (data && data.length > 0) {
                setToastMsg('친구 요청을 보냈습니다.');
              } else {
                setToastMsg('잘못된 친구 코드입니다.');
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
      } catch (error) {
          console.log(error);
      }
    }
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
              <button>
                <Link to="/profile">
                    <FaUser size={20} />
                </Link>
              </button>
              <button onClick={inputToggle}>
                  <FaUserPlus size={24} />
              </button>
              {toggleInput && (
                <div className="mt-2">
                  <input 
                    type="text" 
                    className="border border-gray-300 p-2 rounded w-full"
                    onKeyDown={addFriend}
                    onChange={handleInputChange}
                    placeholder="친구코드 입력"
                  />
                </div>
              )}
              <button onClick={toggleDarkMode}>
                  {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
              </button>
              <button onClick={() => handleLoginModal(true)}>
                  <FaSignInAlt size={24} />
                  <Modal isOpen={open} handleLoginModal={handleLoginModal}/>
              </button>
              <button onClick={handleLogout}>
                  <FaSignOutAlt size={24} />
              </button>
          </div>
      </nav>
  </header>
  );
}

export default Header;
