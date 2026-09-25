import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Signature', href: '#signature' },
    { label: 'Menu', href: '#menu' },
    { label: 'The Kitchen', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit & Contact', href: '#location' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0e12]/95 backdrop-blur-md border-b border-stone-800/80 py-3.5 shadow-xl shadow-black/40'
            : 'bg-gradient-to-b from-[#0b0c10]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#"
              className="text-xl sm:text-2xl font-cinzel font-semibold tracking-wide text-stone-100 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Insta Chinese
            </a>

            {/* Zone 2: 4-6 clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="hover:text-amber-400 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.phoneTel}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 rounded transition-colors whitespace-nowrap"
                title={`Call ${RESTAURANT_INFO.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Call Us</span>
              </a>

              <button
                onClick={onOpenInquiry}
                className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-stone-950 bg-amber-500 hover:bg-amber-400 rounded transition-colors shadow-sm whitespace-nowrap"
              >
                Table Inquiry
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 sm:hidden">
              <a
                href={RESTAURANT_INFO.phoneTel}
                aria-label="Direct Phone Call"
                className="p-2 text-stone-300 hover:text-amber-400 border border-stone-800 rounded bg-stone-900/60"
              >
                <Phone className="w-4 h-4 text-amber-400" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2.5 text-stone-200 hover:text-white rounded border border-stone-800 bg-stone-900/70"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-[#111218] border-l border-stone-800 p-6 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <span className="text-xl font-cinzel font-semibold text-stone-100">
                  Insta Chinese
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-400 hover:text-white rounded"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Location indicator */}
              <div className="py-3 text-xs text-stone-400 font-medium">
                Dehradun · Uttarakhand
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-2 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="px-3 py-3 text-base font-medium text-stone-200 hover:text-amber-400 hover:bg-stone-800/40 rounded transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-6 border-t border-stone-800 flex flex-col gap-3">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={RESTAURANT_INFO.phoneTel}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{RESTAURANT_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-sm font-semibold transition-colors mt-1"
              >
                Reserve / Inquire Table
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
