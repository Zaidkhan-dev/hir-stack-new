import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';

export const FeaturedCourses: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <section id="courses" className="py-24 bg-slate-900/30 transition-all duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Explore Our Curated Tracks</h2>
            <p className="text-slate-400">Handpicked industry specialist trainers are well-experienced to teach you any concept as easy as humanly possible.</p>
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-blue-400 font-bold hover:underline flex items-center gap-2 transition-all"
          >
            {showAll ? 'Show less courses' : 'View all 20 courses'}
            <svg 
              className={`w-4 h-4 transform transition-transform ${showAll ? 'rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedCourses.map((course, idx) => (
            <Link to={`/course/${course.id}`} key={course.id} className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 relative block">
              <div className="h-48 overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest">{course.level}</div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3">{course.title}</h4>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Live Labs
                  </span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                  <span className="text-2xl font-bold text-blue-400">{course.price}</span>
                  <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
