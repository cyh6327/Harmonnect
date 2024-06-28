import React, { useState } from 'react';

const RecentMusic = ({ index, id, title, image }) => {
  return (
    <li key={id} className="flex items-center py-2 border-b border-gray-800">
        <span className="w-6 text-gray-400">{index + 1}</span>
        <img src={image} alt={title} className="w-12 h-12 mr-4"/>
        <div className="flex-grow">
        <div className="flex items-center">
            <span className="font-semibold">{title}</span>
        </div>
        {/* <div className="text-gray-400">{music.artist}</div> */}
        </div>
        {/* <div className="hidden md:block text-gray-400">{music.album}</div>
        <div className="flex items-center ml-auto">
        <span className="text-gray-400">{music.duration}</span>
        </div> */}
    </li>
  );
};

export default RecentMusic;