import React from 'react';
import Orb from './Orb';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[95vh] flex flex-col justify-center overflow-hidden bg-[#020617]">
      {/* Primary Background Layer: Interactive Orb */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90 pointer-events-auto">
        <div className="w-full h-full lg:w-[130%] lg:h-[130%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Orb 
            hue={275} 
            hoverIntensity={0.8} 
            rotateOnHover={true}
            backgroundColor="#020617"
          />
        </div>
      </div>

      {/* Visibility Filter Layer: Subtle dark overlay and light blur to make text pop */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(2,6,23,0.1)_0%,rgba(2,6,23,0.6)_100%)] backdrop-blur-[1px]"></div>

      {/* Secondary Glow Layer for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[140px]"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/30 text-sm font-medium text-blue-400 mb-8 animate-bounce pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Award Winning IT Training 2024
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          Design Your Career with <br />
          <span className="gradient-text">Advanced Full-Stack Technologies and Emerging Tools</span>
        </h1>
        
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-slate-100 mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
          Master cutting-edge technologies with guidance from seasoned industry professionals. Work on real-time, production-level projects, strengthen your problem-solving skills, and gain hands-on experience that employers truly value.<br />
          <span className="text-blue-400 font-bold mt-2 inline-block">Learn. Build. Deploy. Get Placed.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 pointer-events-auto">
          <a href="#courses" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/30 active:scale-95 inline-flex items-center justify-center">
            Explore Courses
          </a>
          <button className="w-full sm:w-auto px-10 py-5 glass-card hover:bg-white/10 text-white rounded-2xl font-bold text-lg transition-all active:scale-95">
            Speak to an Expert
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto py-12 border-t border-white/5 bg-slate-900/50 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/50 pointer-events-auto">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-1">15k+</span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Students</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-1">50+</span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Industry Partners</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-1">98%</span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Placement Rate</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-1">4.9/5</span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};
