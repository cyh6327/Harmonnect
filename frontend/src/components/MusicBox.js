import React, { useState } from 'react';

const MusicBox = ({ index, id, title, image, checkItemHandler }) => {
  const [checked, setChecked] = useState(false); // 체크 여부 판단

  const checkHandled = ({target}) => {
    setChecked(!checked);
    checkItemHandler(target.id, target.checked);
  }

  return (
    <tr className="border-b border-gray-700 last:border-none">
    <td>
        <label className="inline-flex items-center">
          <input 
            id={id}
            type="checkbox" 
            checked={checked} 
            onChange={(e) => checkHandled(e)} 
            className="form-checkbox h-5 w-5 text-blue-600" 
          />
        </label>
    </td>
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
        </div>
        </div>
    </td>
    </tr>
  );
};

export default MusicBox;