import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-default">
      <Header />
      <main className="dark:bg-custom-dark-bg dark:text-custom-dark-text flex-grow flex justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;