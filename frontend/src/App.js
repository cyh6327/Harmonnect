import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './index.css';
import AppRoutes from './routes/AppRoutes';

function App() {
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
