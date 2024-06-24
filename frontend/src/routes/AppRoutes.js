import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import MainPage from '../components/MainPage';
import ServerTest from '../components/ServerTest';
import Playlist from '../components/Playlist';
import Profile from '../components/Profile';

const AppRoutes = () => {
  return (
    <Router>
        <Layout>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/test" component={ServerTest} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/music-management" component={MusicManagementPage} /> */}
          </Routes>
        </Layout>
    </Router>
  );
};

export default AppRoutes;
