import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

function Profile() {
    const tracks = [
        {
          id: 1,
          title: "Fortnight (feat. Post Malone)",
          artist: "Taylor Swift, Post Malone",
          album: "THE TORTURED POETS DEPARTMENT",
          duration: "3:48",
          cover: "https://via.placeholder.com/50"
        },
        {
          id: 2,
          title: "Hoodie",
          artist: "Hey Violet",
          album: "From The Outside",
          duration: "3:39",
          cover: "https://via.placeholder.com/50"
        },
        {
          id: 3,
          title: "I Had Some Help (Feat. Morgan Wallen)",
          artist: "Post Malone, Morgan Wallen",
          album: "I Had Some Help",
          duration: "2:58",
          cover: "https://via.placeholder.com/50"
        },
        {
          id: 4,
          title: "Yours",
          artist: "Conan Gray",
          album: "Superache",
          duration: "3:24",
          cover: "https://via.placeholder.com/50"
        }
    ];

    return (
        <div className="text-white p-8 rounded-lg w-full">
          <div className="container mx-auto flex items-center">
            <div className="w-32 h-32 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a5 5 0 00-5 5v1a5 5 0 004 4.9V14H8.5a1.5 1.5 0 100 3H10v5h4v-5h1.5a1.5 1.5 0 100-3H14v-1.1a5 5 0 004-4.9V7a5 5 0 00-5-5zm-3 6V7a3 3 0 116 0v1a3 3 0 01-6 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ml-8">
              <h2 className="text-4xl font-bold">Name</h2>
              <p className="mt-2 text-gray-400">팔로잉 N명</p>
            </div>
          </div>

          <div className="container mx-auto p-8 bg-transparent text-white">
            <h2 className="text-2xl font-bold mb-4">최근 추가한 음악</h2>
            {/* <p className="mb-4 text-gray-400">나에게만 표시됩니다.</p> */}
            <div className="flex justify-between items-center mb-2">
                <span></span>
                <button className="text-sm text-gray-400 hover:underline">모두 표시</button>
            </div>
            <ul>
                {tracks.map((track, index) => (
                <li key={track.id} className="flex items-center py-2 border-b border-gray-800">
                    <span className="w-6 text-gray-400">{index + 1}</span>
                    <img src={track.cover} alt={`${track.title} cover`} className="w-12 h-12 mr-4"/>
                    <div className="flex-grow">
                    <div className="flex items-center">
                        <span className={`font-semibold`}>
                        {track.title}
                        </span>
                    </div>
                    <div className="text-gray-400">{track.artist}</div>
                    </div>
                    <div className="hidden md:block text-gray-400">{track.album}</div>
                    <div className="flex items-center ml-auto">
                    <span className="text-gray-400">{track.duration}</span>
                    </div>
                </li>
                ))}
            </ul>
          </div>
        </div>
    );
}

export default Profile;
