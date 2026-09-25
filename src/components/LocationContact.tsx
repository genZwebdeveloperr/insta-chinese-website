import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Copy, Check, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationContactProps {
  onOpenInquiry: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenInquiry }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.phoneDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Build WhatsApp URL with the user's message
    const text = `Hello Insta Chinese! My name is ${name} (${phone}). ${message ? `Message: ${message}` : 'I would like to inquire about dining / table availability in Dehradun.'}`;
    const url = `https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent(text)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#0b0c10] border-b border-stone-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-500 mb-2">
            Find & Connect
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-semibold text-stone-100 tracking-tight">
            Location & Contact
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 font-light">
            Conveniently situated in Dehradun, Uttarakhand. Call or message us directly for dine-in, takeaway, and queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Card 1: Verified Location & Direct Actions */}
          <div className="lg:col-span-6 bg-[#12141c] border border-stone-800 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <MapPin className="w-4 h-4" />
                <span>Restaurant Location</span>
              </div>
              
              <h3 className="font-cinzel text-2xl sm:text-3xl font-semibold text-white">
                {RESTAURANT_INFO.name}
              </h3>
              
              <p className="text-stone-300 text-base mt-2 font-medium">
                {RESTAURANT_INFO.displayLocation}
              </p>

              <p className="text-stone-400 text-xs sm:text-sm mt-3 font-light leading-relaxed">
                Nestled in picturesque Dehradun against the foothills of the Himalayas. For landmark navigation or exact entrance directions, contact our team below.
              </p>

              {/* Direct Phone Highlight */}
              <div className="mt-8 p-4 bg-[#181a24] border border-stone-800 rounded-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 font-medium">Direct Telephone</div>
                    <a
                      href={RESTAURANT_INFO.phoneTel}
                      className="font-mono text-base sm:text-lg font-semibold text-stone-100 hover:text-amber-400 transition-colors"
                    >
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 text-stone-400 hover:text-white rounded border border-stone-700/80 hover:border-stone-500 transition-colors"
                  title="Copy Phone Number"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Hours / Service Note */}
              <div className="mt-4 p-4 bg-[#181a24] border border-stone-800 rounded-md flex items-start gap-3">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-medium text-stone-300">Kitchen & Service Schedule</div>
                  <div className="text-xs text-stone-400 font-light mt-0.5">
                    *Exact operating hours to be confirmed by Insta Chinese management. Please call or WhatsApp ahead to check current daily service timings.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-stone-800">
              <a
                href={RESTAURANT_INFO.phoneTel}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Directly</span>
              </a>

              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Interactive Inquiry & Fast Table Message */}
          <div className="lg:col-span-6 bg-[#12141c] border border-stone-800 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <MessageCircle className="w-4 h-4" />
                <span>Instant Inquiry</span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-semibold text-white">
                Send a Message to Insta Chinese
              </h3>

              <p className="text-stone-400 text-xs sm:text-sm mt-1.5 font-light">
                Fill out the quick form below. It connects directly with our team on WhatsApp for immediate response.
              </p>

              {submitted ? (
                <div className="my-8 p-6 bg-emerald-950/40 border border-emerald-800/80 rounded-lg text-center">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-cinzel text-lg font-medium text-emerald-200">
                    Connecting to WhatsApp...
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 max-w-sm mx-auto">
                    Your inquiry has been prepared and WhatsApp is opening now to message +91 97601 24125.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4 mt-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-stone-300 mb-1">
                      Your Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#181a24] border border-stone-800 rounded px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-stone-300 mb-1">
                      Your Phone Number <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#181a24] border border-stone-800 rounded px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-stone-300 mb-1">
                      Message / Table Inquiry (Optional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Number of guests, date, favorite dishes, or takeaway inquiries..."
                      className="w-full bg-[#181a24] border border-stone-800 rounded px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs tracking-wider uppercase rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 text-center">
              <span className="text-xs text-stone-400">
                Prefer a detailed table reservation?{' '}
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="text-amber-400 hover:text-amber-300 underline underline-offset-2 ml-1"
                >
                  Open Table Booker
                </button>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
