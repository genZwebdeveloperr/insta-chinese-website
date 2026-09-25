import React from 'react';
import { Flame, Utensils, HeartHandshake } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0d0e13] border-b border-stone-800/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-lg overflow-hidden border border-stone-800 shadow-2xl">
              <img
                src={RESTAURANT_IMAGES.interior}
                alt="Insta Chinese welcoming dining atmosphere in Dehradun"
                className="w-full aspect-[4/3] object-cover filter contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13] via-transparent to-transparent opacity-60" />
            </div>

            {/* Overlapping secondary image highlight */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-1/2 aspect-[4/3] rounded-lg overflow-hidden border-2 border-stone-700/80 shadow-2xl z-20">
              <img
                src={RESTAURANT_IMAGES.manchurian}
                alt="Wok-tossed savory Asian dish"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Subtle background glow */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right Column: Editorial & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-500 mb-2">
              Our Culinary Journey
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-semibold text-stone-100 tracking-tight leading-tight">
              Passionate Asian Craftsmanship in Dehradun
            </h2>

            <div className="space-y-4 text-stone-300/90 text-sm sm:text-base font-light leading-relaxed mt-6">
              <p>
                At <span className="text-amber-400 font-medium">{RESTAURANT_INFO.name}</span>, we bring the unmistakable aroma, high-heat intensity, and soul-comforting richness of Chinese culinary tradition to Dehradun, Uttarakhand.
              </p>
              <p>
                Every dish begins with the raw flame of the wok—searing crisp vegetables, balancing bold garlic, ginger, and soy reductions, and infusing every noodle and grain of rice with authentic wok-hei character.
              </p>
              <p className="text-stone-400 text-xs sm:text-sm italic">
                *Note for Client Review: This story section is designed to represent your team&apos;s culinary philosophy and can be updated with your exact founding story upon request.
              </p>
            </div>

            {/* Unboxed Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-stone-800">
              <div>
                <Flame className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-cinzel font-medium text-stone-200 text-sm">Fierce Wok Heat</h4>
                <p className="text-xs text-stone-400 mt-1 font-light">Seared at intense temperatures for distinct texture & taste.</p>
              </div>

              <div>
                <Utensils className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-cinzel font-medium text-stone-200 text-sm">Fresh Ingredients</h4>
                <p className="text-xs text-stone-400 mt-1 font-light">Crisp produce, authentic sauces, and freshly ground aromatics.</p>
              </div>

              <div>
                <HeartHandshake className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-cinzel font-medium text-stone-200 text-sm">Warm Hospitality</h4>
                <p className="text-xs text-stone-400 mt-1 font-light">Dedicated to welcoming locals and visitors in Dehradun.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
