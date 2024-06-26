import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import defaultImg from '../assets/images/default_profile.png';
import FriendsList from './FriendsList';

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
                  {tracks.map((track, index) => (
                    <li key={track.id} className="flex items-center py-2 border-b border-gray-800">
                      <span className="w-6 text-gray-400">{index + 1}</span>
                      <img src={track.cover} alt={`${track.title} cover`} className="w-12 h-12 mr-4"/>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <span className="font-semibold">{track.title}</span>
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
              <div className="flex-none w-full md:w-72 p-4 rounded-lg mt-8 md:mt-0 md:ml-8">
                <FriendsList />
              </div>
            </div>
          </div>
        </div>
    );
}

export default Profile;
