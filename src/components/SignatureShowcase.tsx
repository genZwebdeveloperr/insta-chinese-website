import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SIGNATURE_DISHES } from '../data/restaurantData';

interface SignatureShowcaseProps {
  onSelectDishForInquiry: (dishName: string) => void;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({ onSelectDishForInquiry }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="signature" className="py-20 sm:py-28 bg-[#0d0e13] border-b border-stone-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-500 mb-2">
              Culinary Highlights
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-semibold text-stone-100 tracking-tight">
              Signature Wok Creations
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl font-light">
              Crafted with fierce heat and distinct Asian aromatics. Sample signature selections curated for the Insta Chinese experience.
            </p>
          </div>

          {/* Desktop Carousel Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:text-white hover:border-amber-500/50 hover:bg-stone-800 transition-colors"
              aria-label="Scroll signatures left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-stone-800 bg-stone-900/80 text-stone-300 hover:text-white hover:border-amber-500/50 hover:bg-stone-800 transition-colors"
              aria-label="Scroll signatures right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Showcase Grid / Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {SIGNATURE_DISHES.map((dish, idx) => (
            <div
              key={dish.id}
              className="snap-start shrink-0 w-[84vw] sm:w-[360px] lg:w-[380px] bg-[#12141c] border border-stone-800/90 rounded-lg overflow-hidden flex flex-col group hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40"
            >
              {/* Image Container with Fallback Protection */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent opacity-80" />
                
                {/* Number / Editorial marker */}
                <div className="absolute top-3 left-3 text-xs font-mono text-stone-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                  0{idx + 1}
                </div>

                {/* Tag as clean text */}
                <div className="absolute bottom-3 left-4 text-xs font-medium text-amber-400 tracking-wider uppercase">
                  {dish.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-cinzel font-semibold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {dish.title}
                  </h3>
                  <div className="text-xs text-stone-400 mt-1 font-medium">
                    {dish.subtitle}
                  </div>
                  <p className="text-stone-300/80 text-sm mt-3 leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-mono">
                    Sample Signature
                  </span>
                  <button
                    onClick={() => onSelectDishForInquiry(dish.title)}
                    className="text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors py-1 hover:underline underline-offset-4"
                  >
                    Inquire Item &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo indicator banner */}
        <div className="mt-8 text-center text-xs text-stone-400 bg-stone-900/40 border border-stone-800/60 rounded px-4 py-2.5 max-w-2xl mx-auto">
          <span className="text-stone-400 font-medium">Client Demo Note:</span> Signature dishes above represent curated Asian culinary styles. Real kitchen specialties and items will be configured upon approval.
        </div>
      </div>
    </section>
  );
};
