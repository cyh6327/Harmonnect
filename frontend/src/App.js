import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import io from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_API_BASE_URL; // 서버의 URL

function App() {
  useEffect(() => {
    // Socket.IO 클라이언트 인스턴스 생성
    const socket = io(SERVER_URL);

    // 서버로부터 메시지 수신
    socket.on('message', (data) => {
      console.log('서버로부터 메시지 수신:', data);
    });

    // 컴포넌트가 언마운트될 때 클린업
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <DarkModeProvider>
      <AppRoutes /> 
    </DarkModeProvider>

  //   <DarkModeProvider>
  //       <Router>
  //       <div className="min-h-screen flex flex-col">
  //         <Header />
  //         <Routes>
  //             <Route path="/" element={<MainPage />} />
  //             <Route path="/test" component={ServerTest} />
  //             {/* <Route path="/music-management" component={MusicManagementPage} /> */}
  //         </Routes>
  //       </div>
  //     </Router>
  // </DarkModeProvider>
  );
}

export default App;
