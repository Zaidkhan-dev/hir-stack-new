import React, { useState, useEffect } from 'react';
import { X, CheckCircle, User, BookOpen, GraduationCap, Users, Phone, Mail, Tv } from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY } from '../config';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, preselectedCourse = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    qualification: '',
    gender: '',
    mobile: '',
    email: '',
    mode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update course when preselectedCourse changes
  useEffect(() => {
    if (preselectedCourse) {
      setFormData(prev => ({ ...prev, course: preselectedCourse }));
    } else {
      setFormData(prev => ({ ...prev, course: '' }));
    }
  }, [preselectedCourse, isOpen]);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            subject: `New Admission Query: ${formData.course}`,
            from_name: "HirStack Academy",
            name: formData.name,
            course: formData.course,
            qualification: formData.qualification,
            gender: formData.gender,
            mobile: formData.mobile,
            email: formData.email,
            mode: formData.mode,
          }),
        });
        const result = await response.json();
        if (result.success) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({
            name: '',
            course: '',
            qualification: '',
            gender: '',
            mobile: '',
            email: '',
            mode: '',
          });
          setTimeout(() => {
            setIsSubmitted(false);
            onClose();
          }, 3500);
        } else {
          alert("Submission error: " + (result.message || "Failed to submit. Please try again."));
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Web3Forms Error:", error);
        alert("Failed to submit query. Please check your internet connection.");
        setIsSubmitting(false);
      }
    } else {
      // Simulate database submission (Local Storage Fallback)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Save locally
        const existing = JSON.parse(localStorage.getItem('join_queries') || '[]');
        existing.push({ ...formData, date: new Date().toISOString() });
        localStorage.setItem('join_queries', JSON.stringify(existing));

        // Reset form fields
        setFormData({
          name: '',
          course: '',
          qualification: '',
          gender: '',
          mobile: '',
          email: '',
          mode: '',
        });

        // Close modal after success animation shows
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 3500);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={() => !isSubmitting && !isSubmitted && onClose()}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl glass-card rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl z-[110] animate-in zoom-in-95 duration-300 my-auto">
        
        {/* Close Button */}
        {!isSubmitting && !isSubmitted && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-white rounded-full transition-all border border-white/10 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Success Screen */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Admission Query Submitted!</h3>
            <p className="text-slate-400 max-w-sm text-sm sm:text-base mb-2">
              Your details have been registered successfully.
            </p>
            <p className="text-blue-400 text-sm font-semibold">
              Our academic advisor will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Start Your Journey</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Fill out this query form and take your first step toward tech excellence.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="bg-slate-950 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Select Course</label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <select
                    required
                    value={formData.course}
                    onChange={e => setFormData(prev => ({ ...prev, course: e.target.value }))}
                    className="bg-slate-950 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 w-full focus:outline-none focus:border-blue-500 text-slate-300 transition-colors text-xs sm:text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a course</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud Engineering">Cloud Engineering</option>
                    <option value="Cybersecurity Specialist">Cybersecurity Specialist</option>
                    <option value="Other">Other / General Query</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Qualification & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Your Qualification</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.qualification}
                      onChange={e => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
                      placeholder="e.g. Graduate, B.Tech, etc."
                      className="bg-slate-950 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Gender</label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <select
                      required
                      value={formData.gender}
                      onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                      className="bg-slate-950 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 w-full focus:outline-none focus:border-blue-500 text-slate-300 transition-colors text-xs sm:text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={e => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                      placeholder="Enter mobile number"
                      className="bg-slate-950 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                      className="bg-slate-950 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Learning Mode */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">Online or Offline Mode</label>
                <div className="relative">
                  <Tv className="absolute left-3.5 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <select
                    required
                    value={formData.mode}
                    onChange={e => setFormData(prev => ({ ...prev, mode: e.target.value }))}
                    className="bg-slate-950 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 w-full focus:outline-none focus:border-blue-500 text-slate-300 transition-colors text-xs sm:text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select mode of learning</option>
                    <option value="Online Mode">Online Mode</option>
                    <option value="Offline Mode">Offline Mode</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 sm:py-3.5 mt-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Submit Admission Query'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
