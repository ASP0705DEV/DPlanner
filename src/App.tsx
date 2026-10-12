import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DatePlannerProvider } from './context/DatePlannerContext';
import { Header } from './components/common/Header';
import { ScreenOneLetter } from './pages/ScreenOneLetter';
import { ScreenTwoVibe } from './pages/ScreenTwoVibe';
import { ScreenThreeCustomize } from './pages/ScreenThreeCustomize';
import { ScreenFourTimingNote } from './pages/ScreenFourTimingNote';
import { ScreenFiveWishlist } from './pages/ScreenFiveWishlist';
import { OwnerDashboard } from './pages/OwnerDashboard';

export const App: React.FC = () => {
  return (
    <DatePlannerProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#49333A] selection:bg-[#FFB7C5] selection:text-[#49333A]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ScreenOneLetter />} />
              <Route path="/vibe" element={<ScreenTwoVibe />} />
              <Route path="/customize" element={<ScreenThreeCustomize />} />
              <Route path="/timing-note" element={<ScreenFourTimingNote />} />
              <Route path="/wishlist" element={<ScreenFiveWishlist />} />
              <Route path="/our-secret-dashboard" element={<OwnerDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </DatePlannerProvider>
  );
};

export default App;
