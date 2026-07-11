import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';

export const FeaturedCourses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Civil' | 'Mechanical' | 'Electrical'>('All');

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  const handleApplyClick = (e: React.MouseEvent, courseTitle: string) => {
    e.preventDefault(); // Prevent parent Link from navigating to Details page
    e.stopPropagation(); // Prevent bubbling
    window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { courseTitle } }));
  };

  return (
    <section id="courses" className="py-16 sm:py-20 lg:py-24 bg-slate-900/30 transition-all duration-500">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-8 max-w-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">Explore Our Curated Tracks</h2>
          <p className="text-slate-400 text-sm sm:text-base">Get trained by expert mentors in Lucknow using advanced industrial platforms. Standard syllabus designed for jobs.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3.5 mb-10 pb-2 border-b border-white/5">
          {(['All', 'Civil', 'Mechanical', 'Electrical'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 border ${
                activeCategory === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
              }`}
            >
              {cat === 'All' ? 'All Courses' : `${cat} Section`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {filteredCourses.map((course) => (
            <Link
              to={`/course/${course.id}`}
              key={course.id}
              className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 sm:h-48 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-200">
                    {course.level}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">{course.category} Engineering</span>
                  <h4 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 leading-snug text-white">{course.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 sm:mb-5">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Live Labs
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={(e) => handleApplyClick(e, course.title)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 text-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
