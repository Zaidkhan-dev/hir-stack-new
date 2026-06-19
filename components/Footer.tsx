import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-16 sm:pt-20 lg:pt-24 pb-10 bg-black border-t border-white/10">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 lg:mb-16">

          {/* Brand — full width on smallest screens */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-5 max-w-[180px] sm:max-w-[220px] overflow-hidden shrink-0">
              <img 
                src={`${import.meta.env.BASE_URL}logo-hirstack.png`} 
                alt="HirStack Logo" 
                className="h-12 sm:h-14 w-auto max-w-full object-contain shrink-0" 
              />
            </div>
            <p className="text-slate-500 leading-relaxed mb-5 text-sm sm:text-base">
              Premier technical training and IT development institute based in Lucknow, India. Bridging the gap between academic learning and industry demands.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-slate-400 rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-500 text-sm sm:text-base">
              {[['#about', 'About Us'], ['#courses', 'Browse Courses'], ['#', 'Admissions'], ['#', 'Job Portal']].map(([href, label]) => (
                <li key={label}><a href={href} className="hover:text-blue-400 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-3.5 text-slate-500 text-xs sm:text-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="font-semibold text-slate-400 shrink-0">Add:</span>
                <span>S-49 2nd Floor, Neelgiri Complex, Faizabad Road, Indira Nagar, Lucknow - 226016</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-slate-400 shrink-0">Tel:</span>
                <a href="tel:+918546004264" className="hover:text-blue-400 transition-colors">+91 - 8546004264</a>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-slate-400 shrink-0">Mail:</span>
                <a href="mailto:info@hirstack.com" className="hover:text-blue-400 transition-colors">info@hirstack.com</a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Subscribe</h4>
            <p className="text-slate-500 mb-4 text-sm sm:text-base">Stay updated on new batches and tech insights.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-slate-900 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 w-full focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
              <button className="p-2.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-600 text-xs sm:text-sm text-center sm:text-left">
          <p>© 2024 hirstack Training Institute. All rights reserved.</p>
          <p>Made with passion for the tech community.</p>
        </div>
      </div>
    </footer>
  );
};
