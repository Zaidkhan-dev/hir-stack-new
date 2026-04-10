import React from 'react';
import { CheckCircle } from 'lucide-react';

const tiers = [
  {
    name: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Perfect for beginners starting their journey.',
    features: [
      'Access to 5 Basic Courses',
      'Community Forum Access',
      '720p Video Quality',
      'Basic Email Support'
    ]
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/month',
    description: 'For dedicated learners wanting the full experience.',
    isPopular: true,
    features: [
      'Access to All 20 Courses',
      'Private Discord Access',
      '4K Video Quality',
      'Priority 24/7 Support',
      'Downloadable Resources',
      '1-on-1 Mentorship Session'
    ]
  },
  {
    name: 'Lifetime',
    price: '$499',
    period: ' one-time',
    description: 'Pay once, master everything forever.',
    features: [
      'Lifetime Access to All Courses',
      'All Future Courses Included',
      'Private Discord Access',
      '4K Video Quality',
      'Priority 24/7 Support',
      'Weekly Group Q&A Calls',
      'Career Advisory Services'
    ]
  }
];

export const Subscription: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Invest in Your Future</h2>
          <p className="text-lg text-slate-400">Choose the perfect plan to accelerate your career. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <div 
              key={tier.name} 
              className={`glass-card rounded-3xl p-8 relative transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${
                tier.isPopular 
                  ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] transform md:scale-105 z-10 bg-slate-800/80' 
                  : 'border-white/5 hover:border-white/20 mt-0 md:mt-4 mb-0 md:mb-4'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-8 border-b border-white/10 pb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-slate-400 text-sm min-h-[40px]">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold">{tier.price}</span>
                  <span className="text-slate-400 font-medium">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 shrink-0 ${tier.isPopular ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className="text-slate-300 text-sm leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  tier.isPopular 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-[1.02]' 
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
