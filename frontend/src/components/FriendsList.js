import React, { useState } from 'react';
import defaultImg from '../assets/images/default_profile.png';

const friends = [
  { id: 1, username: 'test1', introduction: 'introduction', image: defaultImg },
  { id: 2, username: 'test2', introduction: 'introduction', image: defaultImg },
  { id: 3, username: 'test3', introduction: 'introduction', image: defaultImg },
  { id: 4, username: 'test4', introduction: 'introduction', image: defaultImg},
  { id: 5, username: 'test5', introduction: 'introduction', image: defaultImg },
];

const FriendsList = () => {
  return (
    <div className="text-white p-5 rounded-lg w-72">
      <div>
        <div className="text-white mb-3 text-center font-bold">My Friends</div>
        <div>
          {friends.map(friend => (
            <div key={friend.id} className="flex items-center mb-4">
              <img src={friend.image} alt={friend.username} className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="font-bold">{friend.username}</div>
                <div className="text-gray-500 text-sm">{friend.introduction}</div>
              </div>
              <button className="bg-blue-500 text-white py-1 px-3 rounded">방문</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;