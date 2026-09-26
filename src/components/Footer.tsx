import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BookingServiceMode } from './InquiryModal';

interface FooterProps {
  onOpenInquiry: (mode?: BookingServiceMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#08090c] border-t border-stone-800/80 pt-16 pb-12 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Col 1: Brand & Grounded Identity */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-cinzel text-2xl font-semibold text-stone-100 tracking-wide block">
              {RESTAURANT_INFO.name}
            </span>
            <p className="text-stone-400 text-sm font-light max-w-sm leading-relaxed">
              Modern Chinese and Asian dining in Dehradun, Uttarakhand. Fresh wok craftsmanship, hand-folded dim sum, and genuine hospitality.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-500/90 font-medium">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{RESTAURANT_INFO.displayLocation}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
              <li>
                <button
                  onClick={() => handleLinkClick('#signature')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Signature Wok Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#menu')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Culinary Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#gallery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Visual Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#location')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Direct Contact
            </h4>
            <div className="space-y-2.5">
              <a
                href={RESTAURANT_INFO.phoneTel}
                className="flex items-center gap-2.5 text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono text-sm">{RESTAURANT_INFO.phoneDisplay}</span>
              </a>

              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-stone-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm">Message on WhatsApp</span>
              </a>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => onOpenInquiry('table')}
                  className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-stone-500 rounded text-xs font-medium transition-colors"
                >
                  Book Table
                </button>
                <button
                  onClick={() => onOpenInquiry('pickup')}
                  className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-700 hover:border-amber-500/60 rounded text-xs font-medium transition-colors"
                >
                  Order Pickup
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom footer row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            &copy; {currentYear} {RESTAURANT_INFO.name}. Dehradun, Uttarakhand, India.
          </div>

          <div className="flex items-center gap-4">
            <span>Authentic Chinese & Asian Dining</span>
            <span aria-hidden="true">·</span>
            <span>Client Preview Edition</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
