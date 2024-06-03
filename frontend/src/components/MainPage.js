import React, { useState } from 'react';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

function MainPage() {
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
