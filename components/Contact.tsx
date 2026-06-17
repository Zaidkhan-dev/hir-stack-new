import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, User, MessageSquare, MapPin } from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY } from '../config';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    query: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            subject: "New Contact Form Submission",
            from_name: "HirStack Website",
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            query: formData.query,
          }),
        });
        const result = await response.json();
        if (result.success) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: '', mobile: '', query: '', email: '' });
          setTimeout(() => setIsSubmitted(false), 5000);
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
      // Simulate API request (Fallback)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Save query locally
        const existing = JSON.parse(localStorage.getItem('contact_queries') || '[]');
        existing.push({ ...formData, date: new Date().toISOString() });
        localStorage.setItem('contact_queries', JSON.stringify(existing));
        // Reset form
        setFormData({ name: '', mobile: '', query: '', email: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1200);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-slate-950/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5">Get in Touch</h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg">Have a question or query? Let us know and we'll get back to you shortly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Details Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
              {[
                {
                  icon: <MapPin className="w-6 h-6 text-blue-400" />,
                  title: "Our Location",
                  desc: "S-49 2nd Floor, Neelgiri Complex, Faizabad Road, Indira Nagar, Lucknow, Uttar Pradesh - 226016",
                  linkText: "View on Google Maps",
                  linkHref: "https://www.google.com/maps/search/?api=1&query=S-49+2nd+Floor,+Neelgiri+Complex,+Faizabad+Road,+Indira+Nagar,+Lucknow,+Uttar+Pradesh+-+226016"
                },
                {
                  icon: <Phone className="w-6 h-6 text-indigo-400" />,
                  title: "Call Us",
                  desc: "+91 - 8546004264",
                  linkText: "Call Now",
                  linkHref: "tel:+918546004264"
                },
                {
                  icon: <Mail className="w-6 h-6 text-purple-400" />,
                  title: "Email Us",
                  desc: "info@hirstack.com",
                  linkText: "Send Email",
                  linkHref: "mailto:info@hirstack.com"
                }
              ].map((item, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-white/5 flex gap-4 items-start flex-1 hover:border-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-200 text-base sm:text-lg">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    <a 
                      href={item.linkHref} 
                      target={item.linkHref.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline pt-1 transition-colors"
                    >
                      {item.linkText}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative flex flex-col justify-center">
              {isSubmitted && (
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md rounded-3xl z-20 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-400 max-w-sm">Thank you for contacting us. Our representative will contact you on your mobile number shortly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        className="bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-mobile" className="block text-sm font-semibold text-slate-300 mb-2">Mobile</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        type="tel"
                        id="contact-mobile"
                        required
                        value={formData.mobile}
                        onChange={e => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                        placeholder="Your phone number"
                        className="bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-300 mb-2">Email ID <span className="text-slate-500 font-normal">(optional)</span></label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Your email address"
                      className="bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-query" className="block text-sm font-semibold text-slate-300 mb-2">Query / Reason</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <textarea
                      id="contact-query"
                      required
                      rows={4}
                      value={formData.query}
                      onChange={e => setFormData(prev => ({ ...prev, query: e.target.value }))}
                      placeholder="Describe your query or reason for reaching out"
                      className="bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 w-full focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors text-sm sm:text-base resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.99] flex items-center justify-center gap-2 hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Query
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
