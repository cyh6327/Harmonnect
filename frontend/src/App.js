import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ServerTest from './components/ServerTest';
import Header from './components/Header';
import MainPage from './components/MainPage';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './index.css';

function App() {
  return (
    <DarkModeProvider>
        <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/test" component={ServerTest} />
              {/* <Route path="/music-management" component={MusicManagementPage} /> */}
          </Routes>
        </div>
      </Router>
  </DarkModeProvider>
  );
}

export default App;
