import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Lock, Clock, BookOpen, Award, ArrowLeft, X } from 'lucide-react';
import { courses } from '../data/courses';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const [playingFreeVideo, setPlayingFreeVideo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <main className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-5">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Course not found</h1>
        <Link to="/" className="text-blue-400 hover:underline">Go back home</Link>
      </main>
    );
  }

  return (
    <main className="pt-20 sm:pt-24 min-h-screen relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 py-8 sm:py-12 relative z-10">

        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 sm:mb-8 transition-colors group text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </Link>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-20 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-xs sm:text-sm tracking-wide">
              {course.level}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-text pb-1 sm:pb-2">
              {course.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-2 text-slate-300 text-sm sm:text-base">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm sm:text-base">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span>{course.videos?.length || 0} Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm sm:text-base">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                <span>Certificate Included</span>
              </div>
            </div>
          </div>

          {/* Course Image Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-700" />
            <div className="relative h-[240px] sm:h-[320px] lg:h-[400px] w-full rounded-2xl overflow-hidden glass-card shadow-2xl">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-5 sm:p-8">
                <div className="flex justify-center w-full items-center">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { courseTitle: course.title } }))}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-blue-500/50 text-center"
                  >
                    Join Course Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-white/10 gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold">Course Curriculum</h2>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" /> 1 Free Preview</span>
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" /> {course.videos?.length ? course.videos.length - 1 : 0} Locked</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {course.videos?.map((video, idx) => {
              const isFree = idx === 0 || video.isFree;
              return (
                <div
                  key={video.id}
                  onClick={() => isFree ? setPlayingFreeVideo(true) : window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { courseTitle: course.title } }))}
                  className={`glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-center justify-between cursor-pointer group transition-all duration-300 ${
                    isFree
                      ? 'border-blue-500/20 hover:bg-white/5 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(59,130,246,0.1)]'
                      : 'border-white/5 opacity-75 hover:border-white/15 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isFree
                        ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isFree ? <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" /> : <Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm sm:text-base lg:text-lg font-bold mb-0.5 sm:mb-1 truncate ${isFree ? 'text-white group-hover:text-blue-300' : 'text-slate-400'}`}>
                        {idx + 1}. {video.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        {video.duration}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block shrink-0 ml-4">
                    {isFree ? (
                      <span className="px-2.5 sm:px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 whitespace-nowrap">
                        FREE PREVIEW
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs sm:text-sm font-medium">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-16 glass-card rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-center relative overflow-hidden border-blue-500/20 group">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/15 rounded-full blur-[70px] group-hover:bg-blue-400/25 transition-colors duration-700" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Unlock All Content</h3>
              <p className="text-slate-400 text-sm sm:text-base mb-7 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                Get access to all 20 professional courses, hundreds of hours of HD video content, hands-on labs, and private community access.
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { courseTitle: course.title } }))}
                className="bg-white text-black font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] text-sm sm:text-base"
              >
                Register & Inquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Centralized JoinModal is handled at App layout level */}

      {/* Video Modal */}
      {playingFreeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" onClick={() => setPlayingFreeVideo(false)} />
          <button
            onClick={() => setPlayingFreeVideo(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[200] p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all hover:scale-110"
          >
            <X className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
          <div className="relative z-[150] w-full max-w-4xl aspect-video animate-in zoom-in-95 duration-300 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1"
              title="Free Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
};
