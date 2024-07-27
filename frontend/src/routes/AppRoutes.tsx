// src/Routes.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Inbox from '../pages/Inbox';
import Sent from '../pages/Sent';
import Drafts from '../pages/Drafts';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inbox" element={< Inbox/>} />
        <Route path="/sent" element={< Sent/>} />
        <Route path="/drafts" element={< Drafts/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
