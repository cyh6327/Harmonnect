import React, { useState } from 'react';

const RecentMusic = ({ index, id, title, image }) => {
  return (
    <li key={id} className="flex items-center py-2 border-b border-gray-800">
        <span className="w-6 text-gray-400">{index + 1}</span>
        <img src={image} alt={title} className="w-12 h-12 mr-4"/>
        <div className="flex-grow">
        <div className="flex items-center">
            <span className="font-semibold hover:text-violet-400"><a href={`https://www.youtube.com/watch?v=${id}`} target='_blank'>{title}</a></span>
        </div>
        </div>
    </li>
  );
};

export default RecentMusic;