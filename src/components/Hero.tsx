import React from 'react';
import { ArrowDown, MessageCircle, Phone, MapPin, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';
import { BookingServiceMode } from './InquiryModal';

interface HeroProps {
  onOpenInquiry: (mode?: BookingServiceMode) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocation = () => {
    const el = document.getElementById('location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with layered cinematic scrims */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_IMAGES.hero}
          alt="Authentic high-heat wok cooking with flames and fresh Asian noodles at Insta Chinese"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-105 animate-in fade-in duration-700"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Scrims for contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/70 to-[#0b0c10]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Regional indicator without pill enclosure - clean unboxed typography */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-400/90 mb-4 sm:mb-6">
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>{RESTAURANT_INFO.city}, {RESTAURANT_INFO.state}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>{RESTAURANT_INFO.cuisineType}</span>
        </div>

        {/* Brand headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-semibold text-white tracking-tight leading-[1.1] mb-5 sm:mb-6 text-balance max-w-4xl drop-shadow-md">
          The Art of High-Flame Asian Dining
        </h1>

        {/* Grounded supporting paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 text-balance px-2">
          Experience authentic wok hei, hand-folded dim sum, and rich Asian aromatics crafted fresh to order in the heart of Dehradun.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
          <button
            onClick={scrollToMenu}
            className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm tracking-wider uppercase rounded transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-[0.98] text-center"
          >
            Explore Menu
          </button>

          <button
            onClick={() => onOpenInquiry('table')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-100 font-semibold text-sm rounded transition-all duration-200 border border-stone-700/80 active:scale-[0.98]"
          >
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span>Book Table</span>
          </button>

          <button
            onClick={() => onOpenInquiry('pickup')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-100 font-semibold text-sm rounded transition-all duration-200 border border-stone-700/80 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Order Pickup</span>
          </button>
        </div>

        {/* Quick Highlights with zero pills */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-stone-800/80 w-full max-w-3xl flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-400 font-medium">
          <span>Fresh Wok Craft</span>
          <span aria-hidden="true" className="text-stone-700">·</span>
          <span>Dine-In & Takeaway</span>
          <span aria-hidden="true" className="text-stone-700">·</span>
          <button
            onClick={scrollToLocation}
            className="text-stone-300 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-stone-600 hover:decoration-amber-400"
          >
            Dehradun Location
          </button>
        </div>
      </div>

      {/* Subtle scroll down indicator */}
      <button
        onClick={scrollToMenu}
        aria-label="Scroll to menu section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-stone-400 hover:text-amber-400 transition-colors hidden sm:block animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};
