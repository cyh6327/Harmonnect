import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Toast = ({ message, subMessage, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3초 후에 자동으로 닫히도록 설정
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    show && (
      <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs flex items-start space-x-2 z-50">
        <FaCheckCircle className="text-green-500 mt-1" size={20} />
        <div>
          <div className="font-semibold text-gray-800">{message}</div>
          {subMessage && <div className="text-gray-600 text-sm">{subMessage}</div>}
        </div>
        <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    )
  );
};

export default Toast;
