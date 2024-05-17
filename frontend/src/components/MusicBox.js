import React from 'react';

const MusicBox = ({ index, id, title, artist, image }) => {
  return (
    <tr key={id} className="border-b border-gray-700 last:border-none">
    {<td className="p-3">{index + 1}</td> }
    <td className="p-3">
        <div className="flex items-center">
        <img
            src={image}
            alt={title}
            className="w-12 h-12 mr-3 rounded"
        />
        <div>
            <div className="text-lg font-bold">{title}</div>
            <div className="text-sm text-gray-400">{artist}</div>
        </div>
        </div>
    </td>
    </tr>
  );
};

export default MusicBox;