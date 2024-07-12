import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import axios from 'axios';

function MainPage() {
  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ]

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');

  useEffect(() => {
    axios.get('/')
      .then(response => {
        setLoginMsg(response.data.message); // 서버에서 받은 메시지 설정
        console.log(loginMsg)
      })
      .then(() => {
        if(loginMsg) {
          setToastMessage(loginMsg);
          setShowToast(true);
        }
      })
      .catch(error => {
        console.error('데이터를 가져오는 동안 오류 발생:', error);
      });
  }, []);

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className='text-center'>
      <div className='text-center flex flex-col justify-center items-center h-full space-y-4'>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-custom-dark-text sm:text-6xl">
          Share your favorite music with your friends!
        </h1>
        <div className="mt-20 flex items-center justify-center gap-x-6">
         <a
           href="#"
           className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-600"
         >
           Get started
         </a>
         <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-custom-dark-text">
           Learn more <span aria-hidden="true">→</span>
         </a>
       </div>
      </div>
      <Toast 
      message={toastMessage} 
      show={showToast} 
      onClose={handleToastClose} 
    />
    </div>
  );
}

export default MainPage;
