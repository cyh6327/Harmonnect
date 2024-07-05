import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import googleIcon from '../assets/images/btn_google.svg';
import kakaoIcon from '../assets/images/btn_kakao.svg';

export default function Modal({ isOpen, handleLoginModal }) {
  const googleLogin = () => {
    try {
        window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
      } catch (error) {
        console.log(error);
      }
  };

  const kakaoLogin = () => {
  };

  return (
      <Dialog className="relative z-10 font-default" open={isOpen} onClose={() => handleLoginModal(false)}> 
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-opacity-75 bg-neutral-900 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex flex-col min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 ">
            <DialogPanel
              transition
              className="relative text-left data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
               <div className="flex flex-col items-center justify-center bg-neutral-800 rounded-3xl border-neutral-700 border-2 shadow-lg shadow-neutral-800">
                <div className="text-center my-10">
                  <h1 className="text-white text-xl font-bold mb-2">HARMONNECT</h1>
                  <p className="text-neutral-300 text-md font-medium">이용하시려면 로그인 해주세요.</p>
                </div>

                <div className="flex space-x-2 mb-8">
                  <button className="p-4 bg-neutral-900 rounded-full"
                    onClick={() => googleLogin(true)}
                  >
                    <img src={googleIcon} />
                  </button>
                  <button className="p-4 bg-neutral-900 rounded-full"
                    onClick={() => kakaoLogin(true)}
                  >
                    <img src={kakaoIcon} />
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}