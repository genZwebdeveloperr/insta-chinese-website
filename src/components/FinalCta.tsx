import React from 'react';
import { Phone, MessageCircle, ArrowRight, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';
import { BookingServiceMode } from './InquiryModal';

interface FinalCtaProps {
  onOpenInquiry: (mode?: BookingServiceMode) => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenInquiry }) => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-b border-stone-800">
      {/* Background with wok sizzle atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_IMAGES.hero}
          alt="Insta Chinese wok culinary atmosphere"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.15]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10] via-transparent to-[#0b0c10]" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-500 mb-3">
          Dehradun Dining Invitation
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-semibold text-white tracking-tight leading-[1.15] text-balance mb-6">
          Ready for Fresh Wok Flavors?
        </h2>

        <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed mb-10 text-balance">
          Join us at {RESTAURANT_INFO.name} for an authentic Asian culinary experience in Dehradun. Reserve your table or order fresh takeaway for pickup.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => onOpenInquiry('table')}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm tracking-wider uppercase rounded transition-all duration-200 shadow-xl shadow-amber-500/20 active:scale-[0.98]"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Book Table</span>
          </button>

          <button
            onClick={() => onOpenInquiry('pickup')}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-100 font-bold text-xs sm:text-sm tracking-wider uppercase rounded transition-all duration-200 border border-stone-700/80 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Order Pickup</span>
          </button>

          <button
            onClick={scrollToMenu}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white font-medium text-xs sm:text-sm rounded transition-all duration-200 border border-stone-800 active:scale-[0.98]"
          >
            <span>View Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Verified Phone Callout */}
        <div className="mt-8 text-xs text-stone-400">
          Or speak directly with our team at{' '}
          <a
            href={RESTAURANT_INFO.phoneTel}
            className="text-amber-400 hover:text-amber-300 font-mono font-medium underline underline-offset-4"
          >
            {RESTAURANT_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
};

