import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, User, Mail, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';
import { CareerAdvisor } from '../components/CareerAdvisor';
import { WEB3FORMS_ACCESS_KEY } from '../config';

export const CareerAdvice: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    domain: 'Full Stack Development',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert("Please fill in your Name and Mobile number.");
      return;
    }
    setIsSubmitting(true);

    if (WEB3FORMS_ACCESS_KEY) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: "New Career Advice Callback Request",
            from_name: "HirStack Career Portal",
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email || "Not Provided",
            interested_domain: formData.domain,
          }),
        });
        const result = await response.json();
        if (result.success) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: '', mobile: '', email: '', domain: 'Full Stack Development' });
          setTimeout(() => setIsSubmitted(false), 5000);
        } else {
          alert("Submission error: " + (result.message || "Failed to submit. Please try again."));
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Web3Forms Error:", error);
        alert("Failed to submit request. Please check your internet connection.");
        setIsSubmitting(false);
      }
    } else {
      // Local fallback simulation
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        const existing = JSON.parse(localStorage.getItem('callback_requests') || '[]');
        existing.push({ ...formData, date: new Date().toISOString() });
        localStorage.setItem('callback_requests', JSON.stringify(existing));
        setFormData({ name: '', mobile: '', email: '', domain: 'Full Stack Development' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1000);
    }
  };

  return (
    <main className="pt-24 sm:pt-28 min-h-screen relative overflow-hidden bg-slate-950">
      {/* Background glow flares */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 py-6 relative z-10">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 sm:mb-10 transition-colors group text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-xs sm:text-sm tracking-wide uppercase">
            Career Counselling
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6 leading-tight gradient-text pb-1 sm:pb-2">
            Design Your Professional Path
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Stuck at a crossroads or trying to land your dream role in tech? Our academic mentors and AI advisor are here to map out a concrete pathway tailored to your interests and aspirations.
          </p>
        </div>

        {/* AI Advisor Integration */}
        <div className="mb-16 sm:mb-24">
          <CareerAdvisor />
        </div>

        {/* Callback Section */}
        <div id="get-callback" className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center glass-card rounded-[32px] p-8 sm:p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />
            
            {/* Form Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">
                <HelpCircle className="w-4 h-4" /> Speak to a Mentor
              </div>
              <h2 className="text-3xl font-bold text-white">Get a Call Back</h2>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Provide your mobile number and one of our Senior Career Coaches in Lucknow will reach out within 24 hours. We will discuss your goals, fees structure, offline/online batches, and placement support.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-blue-400">
                    ✓
                  </div>
                  <span className="text-sm font-medium">100% Free Career Roadmap Session</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-blue-400">
                    ✓
                  </div>
                  <span className="text-sm font-medium">Placement and Batch timing guidance</span>
                </div>
              </div>
            </div>

            {/* Form Box */}
            <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-white/5 shadow-xl relative z-10">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Request Received!</h3>
                  <p className="text-slate-400 text-sm">
                    Thank you! A career advisor will contact you shortly on your mobile.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Zaid Khan"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="tel" 
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                        placeholder="+91 - XXXXX XXXXX"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="zaid@example.com"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Interested Domain</label>
                    <select 
                      value={formData.domain}
                      onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="Full Stack Development">Full Stack Web Development</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Cloud Engineering & DevOps">Cloud Engineering & DevOps</option>
                      <option value="Cybersecurity">Cybersecurity Specialist</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      "Request Call Back"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};
