import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const base = import.meta.env.BASE_URL;

  const triggerJoinModal = () => {
    window.dispatchEvent(new CustomEvent('open-join-modal'));
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 glass-card shadow-lg shadow-black/40' : 'py-4 bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center justify-start shrink-0 max-w-[180px] sm:max-w-[220px] overflow-hidden">
            <Link 
              to="/" 
              className="flex items-center active:scale-95 transition-transform cursor-pointer w-full h-full"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src={`${import.meta.env.BASE_URL}logo-hirstack.png`} 
                alt="HirStack Logo" 
                className="h-12 sm:h-14 w-auto max-w-full object-contain shrink-0" 
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm lg:text-base">
            <a href={isHome ? "#about" : `${base}#about`} className="text-slate-300 hover:text-blue-400 transition-colors">About</a>
            <a href={isHome ? "#courses" : `${base}#courses`} className="text-slate-300 hover:text-blue-400 transition-colors">Courses</a>
            <Link to="/career-advice" className="text-slate-300 hover:text-blue-400 transition-colors">Career Advice</Link>
            <a href={isHome ? "#contact" : `${base}#contact`} className="text-slate-300 hover:text-blue-400 transition-colors">Contact</a>
            <button
              onClick={triggerJoinModal}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/30"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg glass-card text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu — full-screen overlay feel */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-1 shadow-2xl">
            <a
              href={isHome ? "#about" : `${base}#about`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 text-lg font-medium py-3 border-b border-white/5 hover:text-blue-400 transition-colors"
            >
              About
            </a>
            <a
              href={isHome ? "#courses" : `${base}#courses`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 text-lg font-medium py-3 border-b border-white/5 hover:text-blue-400 transition-colors"
            >
              Courses
            </a>
            <Link
              to="/career-advice"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 text-lg font-medium py-3 border-b border-white/5 hover:text-blue-400 transition-colors"
            >
              Career Advice
            </Link>
            <a
              href={isHome ? "#contact" : `${base}#contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 text-lg font-medium py-3 border-b border-white/5 hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
            <div className="pt-4">
              <button
                onClick={() => { setMobileMenuOpen(false); triggerJoinModal(); }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 w-full py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-600/30"
              >
                Join Now — Free Preview
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
