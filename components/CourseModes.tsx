import React from 'react';

export const CourseModes: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">How Do You Want to Learn?</h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">Choose the delivery method that best fits your lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Offline Card */}
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl glass-card p-7 sm:p-10 hover:border-blue-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-24 h-24 sm:w-32 sm:h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Offline Class</h3>
            <p className="text-blue-400 font-medium mb-4 sm:mb-5 text-sm sm:text-base">With flexible courses</p>
            <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
              Experience our best-in-class campus. Engage directly with trainers and peers in high-energy classroom environments.
            </p>
            <ul className="space-y-3 mb-8 text-slate-300 text-sm sm:text-base">
              {['24/7 Lab Access', 'Face-to-Face Mentorship', 'Physical Project Showcases'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=S-49+2nd+Floor,+Neelgiri+Complex,+Faizabad+Road,+Indira+Nagar,+Lucknow,+Uttar+Pradesh+-+226016', '_blank')}
              className="w-full py-3.5 sm:py-4 border border-white/10 rounded-xl font-bold text-sm sm:text-base group-hover:bg-white group-hover:text-black transition-all"
            >
              Find a Center
            </button>
          </div>

          {/* Online Card */}
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl glass-card p-7 sm:p-10 hover:border-indigo-500/50 transition-all duration-500 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-24 h-24 sm:w-32 sm:h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Online Class</h3>
            <p className="text-indigo-400 font-medium mb-4 sm:mb-5 text-sm sm:text-base">Study flexibly online</p>
            <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
              Access world-class teaching from anywhere. Our interactive platform brings the hirstack experience to your home.
            </p>
            <ul className="space-y-3 mb-8 text-slate-300 text-sm sm:text-base">
              {['Live Streamed Sessions', 'Cloud-based Development Labs', 'Digital Portfolio Building'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-join-modal'))}
              className="w-full py-3.5 sm:py-4 border border-white/10 rounded-xl font-bold text-sm sm:text-base group-hover:bg-indigo-600 transition-all"
            >
              Browse Online Catalog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
