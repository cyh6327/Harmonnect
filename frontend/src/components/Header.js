// src/components/Header.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaMoon, FaSun, FaUser, FaUserPlus } from 'react-icons/fa';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDarkMode } from '../contexts/DarkModeContext';
import Toast from './Toast';
import axiosInstance from '../utils/axiosInstance';
import Modal from './Modal';

function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastSubMessage, setToastSubMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);

  const handleLoginModal = (isOpen) => {
    setOpen(isOpen);
  } 

  // const handleLogin = () => {
  //   try {
  //       window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };

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

  const handleToastClose = () => {
    setShowToast(false);
  };

  const inputToggle = () => {
    setToggleInput(!toggleInput);
  }

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
                    placeholder="친구코드"
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
