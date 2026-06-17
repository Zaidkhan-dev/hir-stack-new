import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Laptop, Briefcase, MapPin, Award } from 'lucide-react';

export const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-slate-900/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center mb-12 sm:mb-16">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
            <img
              src="/Hir-stack/phillo.jpeg"
              alt="Learning Environment at Hir Stack"
              className="rounded-2xl sm:rounded-3xl shadow-2xl w-full grayscale hover:grayscale-0 transition-all duration-750 relative z-10"
            />
            <div className="absolute -bottom-5 -right-3 sm:-bottom-8 sm:-right-8 p-4 sm:p-6 glass-card rounded-xl sm:rounded-2xl hidden sm:block z-20 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-blue-400" />
                <p className="text-blue-400 font-bold text-lg sm:text-xl">Lucknow, India</p>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm">Faizabad Road, Indira Nagar</p>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-5 sm:space-y-6">
            <div>
              <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-2">Who We Are</h2>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">Empowering Minds & Nurturing IT Talent</h3>
            </div>
            
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              We are <strong className="text-white font-bold">Hir Stack</strong>, a premier technical training and IT development institute based in Lucknow, India. We specialize in empowering students and professionals through specialized courses in cutting-edge technologies.
            </p>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              By offering expert guidance in development, consultancy, and hands-on, on-the-job training, we actively bridge the gap between academic learning and today's high-demand industry requirements. Our mission is to build highly skilled developers who can innovate and lead in the modern IT landscape.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>10+ Years Experience</span>
              </div>
              <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
              <div>20+ Domain Specializations</div>
            </div>
          </div>
        </div>

        {/* Competencies Grid */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8 sm:mb-12">
            <h4 className="text-slate-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-2">Our Core Competencies</h4>
            <div className="h-0.5 w-12 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: 'Technical Training',
                desc: 'Over 10 years of experience nurturing talent with specialized courses covering over 20 modern domains including Python, Data Science, Machine Learning, .NET, Java, CCNA, and AutoCAD.',
                color: 'from-blue-600/20 to-cyan-600/20',
                borderColor: 'group-hover:border-blue-500/50',
                iconColor: 'text-blue-400',
              },
              {
                icon: <Laptop className="w-6 h-6" />,
                title: 'Project & IT Development',
                desc: 'Providing unique custom software solutions, creative digital interfaces, and modern full-stack application development to foster critical thinking and technological innovation.',
                color: 'from-indigo-600/20 to-purple-600/20',
                borderColor: 'group-hover:border-indigo-500/50',
                iconColor: 'text-indigo-400',
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: 'Career Support',
                desc: 'Going far beyond technical coding skills to offer professional resume preparation, simulated mock interviews, continuous industry mentorship, and direct recruitment assistance.',
                color: 'from-violet-600/20 to-fuchsia-600/20',
                borderColor: 'group-hover:border-violet-500/50',
                iconColor: 'text-violet-400',
              },
            ].map(({ icon, title, desc, color, borderColor, iconColor }, idx) => (
              <div 
                key={title} 
                className={`group glass-card rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-slate-800/40`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} ${iconColor} flex items-center justify-center mb-5 border border-white/10 shadow-lg`}>
                  {icon}
                </div>
                <h5 className="font-bold text-lg sm:text-xl mb-3 group-hover:text-white transition-colors">{title}</h5>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
