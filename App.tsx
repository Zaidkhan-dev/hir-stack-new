import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { CourseDetails } from './pages/CourseDetails';
// import { ChatBot } from './components/ChatBot';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter basename="/Hir-stack">
      <div className="min-h-screen selection:bg-blue-500/30">
        <CustomCursor />
        <Navbar scrolled={scrolled} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<CourseDetails />} />
        </Routes>
        {/* <ChatBot /> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;