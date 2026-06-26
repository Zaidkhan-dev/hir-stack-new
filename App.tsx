import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { CourseDetails } from './pages/CourseDetails';
import { CareerAdvice } from './pages/CareerAdvice';
import { JoinModal } from './components/JoinModal';
import { ChatBot } from './components/ChatBot';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ courseTitle?: string }>;
      setPreselectedCourse(customEvent.detail?.courseTitle || '');
      setJoinModalOpen(true);
    };
    window.addEventListener('open-join-modal', handleOpen);
    return () => window.removeEventListener('open-join-modal', handleOpen);
  }, []);

  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <BrowserRouter basename={basename}>
      <div className="min-h-screen selection:bg-blue-500/30">
        <CustomCursor />
        <Navbar scrolled={scrolled} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/career-advice" element={<CareerAdvice />} />
        </Routes>
        <ChatBot />
        <Footer />
        
        <JoinModal 
          isOpen={joinModalOpen} 
          onClose={() => setJoinModalOpen(false)} 
          preselectedCourse={preselectedCourse} 
        />
      </div>
    </BrowserRouter>
  );
};

export default App;