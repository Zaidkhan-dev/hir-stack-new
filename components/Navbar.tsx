
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Subscription } from './Subscription';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-card' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/Hir-stack/logo-hirstack.png" alt="HirStack Logo" className="h-16 w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#courses" className="hover:text-blue-400 transition-colors">Courses</a>
          <a href="#advisor" className="hover:text-blue-400 transition-colors">Career Advice</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-full transition-all active:scale-95">
            Join Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg">About</a>
          <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-lg">Courses</a>
          <a href="#advisor" onClick={() => setMobileMenuOpen(false)} className="text-lg">Career Advice</a>
          <button onClick={() => { setMobileMenuOpen(false); setShowModal(true); }} className="bg-blue-600 w-full py-3 rounded-lg font-bold">Join Now</button>
        </div>
      )}

      {/* Subscription Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
          
          <button 
            onClick={() => setShowModal(false)}
            className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[200] p-3 bg-red-500/20 hover:bg-red-500/40 text-red-200 hover:text-white rounded-full transition-all hover:scale-110 shadow-lg shadow-black/50"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative z-[150] w-full max-w-6xl my-auto animate-in zoom-in-95 duration-300">
            <div className="scale-90 md:scale-95 origin-center">
              <Subscription />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
