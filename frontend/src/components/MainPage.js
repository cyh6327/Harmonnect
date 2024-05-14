import React, { useState } from 'react';

function MainPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white min-h-screen flex items-center justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}

export default MainPage;
