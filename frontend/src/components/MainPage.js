import React, { useState, useEffect } from 'react';
// import Toast from './Toast';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

function MainPage() {
  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ]

  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    let isMounted = true;
    axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/msg`)
      .then(response => {
        if(isMounted) {
          console.log(response);
          setToastMsg(response.data.msg);
        }
      })
      .catch(error => {
        if(isMounted) {
          setToastMsg(error.response.data.msg);
        }
      });
    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    if (toastMsg) {
      toast.success(toastMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [toastMsg]);

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
    </div>
  );
}

export default MainPage;
