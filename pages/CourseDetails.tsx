import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Lock, Clock, BookOpen, Award, ArrowLeft, X } from 'lucide-react';
import { courses } from '../data/courses';
import { Subscription } from '../components/Subscription';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const [showModal, setShowModal] = useState(false);
  const [playingFreeVideo, setPlayingFreeVideo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <main className="pt-32 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Course not found</h1>
        <Link to="/" className="text-blue-400 hover:underline">Go back home</Link>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              {course.level}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight gradient-text pb-2">
              {course.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>{course.videos?.length || 0} Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Certificate Included</span>
              </div>
            </div>
          </div>

          {/* 3D Image Card */}
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden glass-card border-white/10 transform transition-all duration-500 hover:rotate-y-12 hover:scale-[1.02] shadow-2xl">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="flex justify-between w-full items-center">
                  <span className="text-3xl font-bold text-white">{course.price}</span>
                  <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2 cursor-pointer">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
            <h2 className="text-3xl font-bold">Course Curriculum</h2>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Play className="w-4 h-4 text-green-400" /> 1 Free Preview</span>
              <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-slate-500" /> {course.videos?.length ? course.videos.length - 1 : 0} Locked</span>
            </div>
          </div>

          <div className="space-y-4">
            {course.videos?.map((video, idx) => {
              const previewFree = idx === 0 || video.isFree;
              return (
                <div 
                  key={video.id}
                  onClick={() => { 
                    if (!previewFree) setShowModal(true); 
                    else setPlayingFreeVideo(true);
                  }}
                  className={`glass-card p-4 md:p-6 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                    previewFree ? 'hover:bg-white/5 cursor-pointer border-blue-500/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]' : 'opacity-75 cursor-pointer border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      previewFree ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {previewFree ? <Play className="w-5 h-5 ml-1" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-bold mb-1 transition-colors ${previewFree ? 'text-white group-hover:text-blue-300' : 'text-slate-400'}`}>
                        {idx + 1}. {video.title}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-500 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {video.duration}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    {previewFree ? (
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                        FREE PREVIEW
                      </span>
                    ) : (
                      <span className="text-slate-600 text-sm font-medium pr-4">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-16 glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-xl border-blue-500/20 group">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-400/30 transition-colors duration-700" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Unlock All Content</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Get access to all 20 professional courses, hundreds of hours of HD video content, hands-on labs, and private community access.
              </p>
              <button onClick={() => setShowModal(true)} className="inline-block bg-white text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                View Subscription Plans
              </button>
            </div>
          </div>

        </div>
      </div>

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
      {/* Free Video Modal */}
      {playingFreeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setPlayingFreeVideo(false)} />
          
          <button 
            onClick={() => setPlayingFreeVideo(false)}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-[200] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110 shadow-lg shadow-black/50 border border-white/10"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative z-[150] w-full max-w-5xl aspect-video animate-in zoom-in-95 duration-300 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 glass-card">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </main>
  );
};
