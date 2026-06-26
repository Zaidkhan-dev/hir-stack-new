import React from 'react';
import Orb from './Orb';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-48 lg:pb-32 min-h-screen flex flex-col justify-center overflow-hidden bg-[#020617]">
      {/* Interactive Orb Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90 pointer-events-auto">
        <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Orb
            hue={275}
            hoverIntensity={0.8}
            rotateOnHover={true}
            backgroundColor="#020617"
          />
        </div>
      </div>

      {/* Dark radial overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.65)_100%)] backdrop-blur-[1px]" />

      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 text-center relative z-10 pointer-events-none">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/30 text-sm font-semibold text-blue-400 mb-6 sm:mb-8 pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          Award Winning IT Training 2026
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-5 sm:mb-7 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          Design Your Career with{' '}
          <span className="gradient-text block sm:inline">
            Advanced Full-Stack Technologies
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 mb-8 sm:mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium px-2">
          Master cutting-edge technologies with guidance from seasoned industry professionals. Work on real-time production-level projects and gain hands-on experience employers value.
          <span className="text-blue-400 font-bold mt-2 block">Learn. Build. Deploy. Get Placed.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-12 md:mb-20 pointer-events-auto w-full px-2 sm:px-0">
          <a
            href="#courses"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-base transition-all shadow-2xl shadow-blue-600/30 active:scale-95 inline-flex items-center justify-center"
          >
            Explore Courses
          </a>
          <button className="w-full sm:w-auto px-8 py-4 glass-card hover:bg-white/10 text-white rounded-2xl font-bold text-base transition-all active:scale-95">
            Speak to an Expert
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto py-8 border-t border-white/10 bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/50 pointer-events-auto px-6">
          {[
            { val: '15k+', label: 'Students' },
            { val: '50+', label: 'Industry Partners' },
            { val: '98%', label: 'Placement Rate' },
            { val: '4.9/5', label: 'Reviews' },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{val}</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-bold leading-tight text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
