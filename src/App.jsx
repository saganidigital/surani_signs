import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import VisualizerPage from './pages/VisualizerPage';
import OrderQuoteModal from './components/OrderQuoteModal';
import { OrderModalProvider } from './context/OrderModalContext';
import { ThemeProvider } from './context/ThemeContext';

function ScrollToTopAndHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <OrderModalProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f1218] text-slate-800 dark:text-slate-100 transition-colors duration-300">
          <ScrollToTopAndHash />
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Page 1: Home Page */}
              <Route path="/" element={<Home />} />

              {/* Interactive Live Sign Studio Page */}
              <Route path="/visualizer" element={<VisualizerPage />} />
              <Route path="/sign-studio" element={<VisualizerPage />} />

              {/* Page 2: Services Hub & 13 Dynamic Service Detail Pages */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServicesPage />} />

              {/* Direct slug support for legacy suranisigns.com URLs */}
              <Route path="/:slug" element={<ServicesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <OrderQuoteModal />
        </div>
      </OrderModalProvider>
    </ThemeProvider>
  );
}
