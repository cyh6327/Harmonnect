// src/components/Header.js
import React, { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDarkMode } from '../contexts/DarkModeContext';

function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent dark:bg-transparent dark:text-custom-dark-text">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                <span className="dark:text-custom-dark-text text-gray-900 text-xl font-bold">Harmonnect</span>
                </a>
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
                <a className="text-sm font-semibold leading-6 text-gray-900 dark:text-custom-dark-text">
                    Playlist
                </a>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
                <button onClick={() => console.log('Login API Call')}>
                    <FaSignInAlt size={24} />
                </button>
                <button onClick={() => console.log('Logout API Call')}>
                    <FaSignOutAlt size={24} />
                </button>
                <button onClick={() => console.log('Profile API Call')}>
                    <FaUser size={24} />
                </button>
                <button onClick={toggleDarkMode}>
                    {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
                </button>
            </div>
        </nav>
    </header>
  );
}

export default Header;
