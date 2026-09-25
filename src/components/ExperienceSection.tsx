import React from 'react';
import { Sparkles, UtensilsCrossed, Wind, Flame } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      icon: Flame,
      title: 'Wok Hei Dynamics',
      detail: 'The unmistakable breath of the wok captured through intensely timed heat, searing crispness into every toss.',
    },
    {
      icon: Wind,
      title: 'Aromatic Balance',
      detail: 'A delicate interplay of toasted sesame, fermented garlic, star anise, and fresh ginger reductions.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Made to Savor',
      detail: 'From piping-hot dim sum steamers to family-style sharing platters built for conversation and delight.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0d0e13] border-b border-stone-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Banner Card */}
        <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-[#12141c]">
          {/* Background image backdrop */}
          <div className="absolute inset-0">
            <img
              src={RESTAURANT_IMAGES.interior}
              alt="Insta Chinese dining room ambience"
              className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10]/95 via-[#0b0c10]/80 to-transparent" />
          </div>

          {/* Content inside banner */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-500 mb-3">
              The Dining Ambiance
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-semibold text-stone-100 tracking-tight leading-tight">
              An Immersive Asian Savor in Dehradun
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-4 font-light leading-relaxed">
              Step inside {RESTAURANT_INFO.name} for an inviting ambiance where the sounds of the active kitchen and the warm scent of Sichuan spices greet you at the door.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-stone-800">
              {experiences.map((exp, idx) => {
                const Icon = exp.icon;
                return (
                  <div key={idx} className="space-y-1.5">
                    <Icon className="w-5 h-5 text-amber-400 mb-2" />
                    <h3 className="font-cinzel text-sm font-semibold text-stone-200">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      {exp.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
