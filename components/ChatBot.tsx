import React, { useState, useEffect, useRef } from 'react';
import { WEB3FORMS_ACCESS_KEY } from '../config';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

const PRESET_CONVERSATION = {
  initial: "Hi there! 👋 I'm the hirstack Assistant. How can I help you design your career today?",
  options: [
    { 
      label: "🚀 Popular Courses", 
      response: "Our most popular tracks are Full-Stack Development and AI & Machine Learning. Both feature 100% live projects and industry certification!",
      nextOptions: ["Tell me about fees", "How long are courses?", "📞 Request Callback"]
    },
    { 
      label: "💼 Placement Support", 
      response: "We have a dedicated career cell that provides resume building, mock interviews, and direct referrals to our 50+ hiring partners like Amazon and Google.",
      nextOptions: ["Success stories", "📞 Request Callback"]
    },
    { 
      label: "💰 Course Fees", 
      response: "Our courses range from $2,100 to $3,200 depending on the track. we offer flexible EMI options and early-bird scholarships!",
      nextOptions: ["Scholarship info", "📞 Request Callback"]
    },
    { 
      label: "📍 Location", 
      response: "We offer both high-tech physical campuses for offline learning in Lucknow and a state-of-the-art virtual lab for online students.",
      nextOptions: ["Online catalog", "Find a center", "📞 Request Callback"]
    },
    {
      label: "📞 Request Callback",
      response: "Need personalized assistance? Fill in your details below and our coordinator will call you back shortly.",
      nextOptions: []
    },
    {
      label: "Speak to expert",
      response: "Sure! Let me set up a human expert callback for you.",
      nextOptions: []
    },
    {
      label: "Tell me about fees",
      response: "Our courses offer flexible monthly payment options and early-bird scholarship discounts of up to 25%.",
      nextOptions: ["Scholarship info", "📞 Request Callback", "Back to main menu"]
    },
    {
      label: "How long are courses?",
      response: "Courses typically range from 4 to 8 months. Full-Stack Web Development is 6 months, and AI & Machine Learning is 8 months.",
      nextOptions: ["🚀 Popular Courses", "📞 Request Callback", "Back to main menu"]
    },
    {
      label: "Success stories",
      response: "Over 90% of our graduates land software engineering roles within 6 months of graduation, with an average salary package hike of 70%!",
      nextOptions: ["🚀 Popular Courses", "📞 Request Callback", "Back to main menu"]
    },
    {
      label: "Scholarship info",
      response: "Scholarships are based on a brief tech aptitude test and background interview. Contact us to schedule yours!",
      nextOptions: ["📞 Request Callback", "Back to main menu"]
    },
    {
      label: "Online catalog",
      response: "All courses are listed on our homepage. We use Discord labs and gather live 3 times a week for peer coding and mentor feedback.",
      nextOptions: ["🚀 Popular Courses", "📞 Request Callback", "Back to main menu"]
    },
    {
      label: "Find a center",
      response: "Our premier center is based in Neelgiri Complex, Faizabad Road, Indira Nagar, Lucknow, India.",
      nextOptions: ["📞 Request Callback", "Back to main menu"]
    }
  ]
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: Date.now(), type: 'bot', text: PRESET_CONVERSATION.initial }
  ]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([...PRESET_CONVERSATION.options.slice(0, 5).map(o => o.label)]);
  
  // Callback states
  const [callbackStep, setCallbackStep] = useState<'none' | 'active' | 'submitting'>('none');
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleOptionClick = (label: string) => {
    // Add user message
    const userMsg: Message = { id: Date.now(), type: 'user', text: label };
    setMessages(prev => [...prev, userMsg]);

    // Check if user requests callback or speak to expert
    if (label === "📞 Request Callback" || label === "Speak to expert") {
      setTimeout(() => {
        const botMsg: Message = { 
          id: Date.now() + 1, 
          type: 'bot', 
          text: "Sure! Please fill in your name and phone number in the form below so our mentor can call you back." 
        };
        setMessages(prev => [...prev, botMsg]);
        setCallbackStep('active');
      }, 600);
      return;
    }

    // Find response
    const option = PRESET_CONVERSATION.options.find(o => o.label === label);
    
    // Simulate typing delay
    setTimeout(() => {
      const botMsg: Message = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: option ? option.response : "That's a great question! Let me connect you with a human expert for more details." 
      };
      setMessages(prev => [...prev, botMsg]);
      
      // Update options if specified, otherwise reset to main
      if (option && option.nextOptions && option.nextOptions.length > 0) {
        setCurrentOptions([...option.nextOptions]);
      } else if (label === "Back to main menu" || !option) {
        setCurrentOptions([...PRESET_CONVERSATION.options.slice(0, 5).map(o => o.label)]);
      }
    }, 600);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;

    setCallbackStep('submitting');

    // Add request notification in chat log
    const requestMsg: Message = {
      id: Date.now(),
      type: 'user',
      text: `Requested callback for ${callbackName} at ${callbackPhone}`
    };
    setMessages(prev => [...prev, requestMsg]);

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
            subject: "Callback Request from ChatBot",
            from_name: "HirStack Chatbot",
            name: callbackName,
            mobile: callbackPhone,
          }),
        });
        const result = await response.json();
        if (result.success) {
          const botMsg: Message = {
            id: Date.now() + 1,
            type: 'bot',
            text: `Thank you, ${callbackName}! 👍 We have received your callback request. A senior coach will call you back on ${callbackPhone} shortly.`
          };
          setMessages(prev => [...prev, botMsg]);
          setCallbackStep('none');
          setCallbackName('');
          setCallbackPhone('');
        } else {
          alert("Submission error: " + (result.message || "Failed to submit request. Please try again."));
          setCallbackStep('active');
        }
      } catch (error) {
        console.error("Chatbot Callback Error:", error);
        alert("Failed to submit request. Please check your network.");
        setCallbackStep('active');
      }
    } else {
      // Local fallback simulation
      setTimeout(() => {
        const existing = JSON.parse(localStorage.getItem('callback_requests') || '[]');
        existing.push({ name: callbackName, mobile: callbackPhone, source: 'Chatbot', date: new Date().toISOString() });
        localStorage.setItem('callback_requests', JSON.stringify(existing));

        const botMsg: Message = {
          id: Date.now() + 1,
          type: 'bot',
          text: `Thank you, ${callbackName}! (Demo Mode) We've logged your request. We'll call you back at ${callbackPhone} shortly.`
        };
        setMessages(prev => [...prev, botMsg]);
        setCallbackStep('none');
        setCallbackName('');
        setCallbackPhone('');
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] glass-card rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 border border-white/10">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">H</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-bold text-white">hirstack Assistant</h4>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Online & Ready</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in zoom-in-95 duration-200`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Footer - Either standard options or callback form */}
          <div className="p-4 bg-black/40 border-t border-white/5">
            {callbackStep === 'active' ? (
              <form onSubmit={handleCallbackSubmit} className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold px-1">Get a Callback Form</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 outline-none transition-all"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setCallbackStep('none');
                      setCallbackName('');
                      setCallbackPhone('');
                      setCurrentOptions([...PRESET_CONVERSATION.options.slice(0, 5).map(o => o.label)]);
                    }}
                    className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded-xl text-[10px] text-slate-400 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-[10px] shadow-lg shadow-blue-600/20 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : callbackStep === 'submitting' ? (
              <div className="py-4 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                Sending request...
              </div>
            ) : (
              <>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 font-bold px-1">Quick Actions</p>
                <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto pr-1">
                  {currentOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 rounded-full text-xs text-slate-300 hover:text-blue-400 transition-all active:scale-95 whitespace-nowrap"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 group ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20 pointer-events-none group-hover:opacity-40"></div>
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
};
