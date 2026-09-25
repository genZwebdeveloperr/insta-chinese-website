import React, { useState, useEffect } from 'react';
import { X, Send, Phone, Calendar, Users, MessageCircle, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDish?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedDish = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [date, setDate] = useState('');
  const [specialRequest, setSpecialRequest] = useState(
    preselectedDish ? `Inquiring about: ${preselectedDish}` : ''
  );
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (preselectedDish) {
      setSpecialRequest(`Inquiring about: ${preselectedDish}`);
    }
  }, [preselectedDish]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const messageLines = [
      `*New Reservation / Dining Inquiry* - Insta Chinese (Dehradun)`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Type: ${orderType === 'dine-in' ? 'Dine-In Table Reservation' : 'Takeaway Order'}`,
      `Party Size: ${guests}`,
      date ? `Date / Timing: ${date}` : '',
      specialRequest ? `Notes / Dish: ${specialRequest}` : '',
    ].filter(Boolean);

    const whatsappMessage = messageLines.join('\n');
    const url = `https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    setSent(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
      setSent(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#12141c] border border-stone-800 rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-[#151722]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Insta Chinese · Dehradun
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-semibold text-white mt-1">
              Table & Dining Inquiry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4">
            
            {/* Dining type segmented control */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-2">
                Service Type
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#181a24] p-1 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2 text-xs font-medium rounded transition-colors ${
                    orderType === 'dine-in'
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Dine-In Table
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 text-xs font-medium rounded transition-colors ${
                    orderType === 'takeaway'
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Takeaway / Pickup
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="inquiry-name" className="block text-xs font-medium text-stone-300 mb-1">
                Your Name <span className="text-amber-500">*</span>
              </label>
              <input
                id="inquiry-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-[#181a24] border border-stone-800 rounded px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="inquiry-phone" className="block text-xs font-medium text-stone-300 mb-1">
                Contact Phone Number <span className="text-amber-500">*</span>
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#181a24] border border-stone-800 rounded px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80"
              />
            </div>

            {/* Party Size & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inquiry-guests" className="block text-xs font-medium text-stone-300 mb-1">
                  Party Size
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="inquiry-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#181a24] border border-stone-800 rounded pl-9 pr-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500/80"
                  >
                    <option value="1-2 Guests">1 - 2 Guests</option>
                    <option value="3-4 Guests">3 - 4 Guests</option>
                    <option value="5-8 Guests">5 - 8 Guests</option>
                    <option value="9+ Large Party">9+ Large Gathering</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-date" className="block text-xs font-medium text-stone-300 mb-1">
                  Preferred Date / Time
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="inquiry-date"
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Tonight, 8:00 PM"
                    className="w-full bg-[#181a24] border border-stone-800 rounded pl-9 pr-3 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80"
                  />
                </div>
              </div>
            </div>

            {/* Special Request or Dish of interest */}
            <div>
              <label htmlFor="inquiry-request" className="block text-xs font-medium text-stone-300 mb-1">
                Special Requests or Specific Dishes
              </label>
              <textarea
                id="inquiry-request"
                rows={2}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="Mention specific dishes or preferences..."
                className="w-full bg-[#181a24] border border-stone-800 rounded px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80 resize-none"
              />
            </div>
          </form>

          {/* Quick Call Alternative */}
          <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-md flex items-center justify-between text-xs">
            <span className="text-stone-400">Need immediate confirmation?</span>
            <a
              href={RESTAURANT_INFO.phoneTel}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +91 97601 24125</span>
            </a>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 sm:p-6 border-t border-stone-800 bg-[#151722] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs text-stone-300 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="inquiry-form"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors shadow-lg shadow-emerald-600/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{sent ? 'Opening WhatsApp...' : 'Submit via WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
