import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Phone,
  Calendar,
  Clock,
  Users,
  MessageCircle,
  UtensilsCrossed,
  ShoppingBag,
  FileText,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export type BookingServiceMode = 'table' | 'pickup';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDish?: string;
  initialMode?: BookingServiceMode;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedDish = '',
  initialMode = 'table',
}) => {
  const [activeTab, setActiveTab] = useState<BookingServiceMode>(initialMode);

  // Table Booking State
  const [tableName, setTableName] = useState('');
  const [tablePhone, setTablePhone] = useState('');
  const [tableDate, setTableDate] = useState('');
  const [tableTime, setTableTime] = useState('7:30 PM');
  const [tableCustomTime, setTableCustomTime] = useState('');
  const [tableGuests, setTableGuests] = useState('2 Guests');
  const [tableRequests, setTableRequests] = useState('');

  // Pickup Order State
  const [pickupName, setPickupName] = useState('');
  const [pickupPhone, setPickupPhone] = useState('');
  const [pickupFoodDetails, setPickupFoodDetails] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP (30-40 mins)');
  const [pickupCustomTime, setPickupCustomTime] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');

  const [submittedMode, setSubmittedMode] = useState<BookingServiceMode | null>(null);

  // Helper for minimum date (today)
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = getTodayDateString();

  // Reset or initialize state when opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      setSubmittedMode(null);
      // Set default date to today if empty
      if (!tableDate) setTableDate(todayStr);
      if (!pickupDate) setPickupDate(todayStr);

      if (preselectedDish) {
        // If a dish was clicked, populate pickup food details and table request
        setPickupFoodDetails(`1x ${preselectedDish}`);
        setTableRequests(`Interested in ordering: ${preselectedDish}`);
        // If preselectedDish was passed from a menu dish inquiry, switch to pickup by default if initialMode isn't forced
        if (initialMode === 'pickup') {
          setActiveTab('pickup');
        }
      }
    }
  }, [isOpen, preselectedDish, initialMode, todayStr]);

  // Lock body scroll and handle Escape key
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

  // Handle Table Booking Submission
  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableName.trim() || !tablePhone.trim()) return;

    const chosenTime = tableTime === 'custom' ? tableCustomTime : tableTime;

    const messageLines = [
      `*Table Reservation Request* - Insta Chinese (Dehradun)`,
      `---------------------------------------`,
      `• Customer Name: ${tableName.trim()}`,
      `• Phone Number: ${tablePhone.trim()}`,
      `• Booking Date: ${tableDate || 'Today'}`,
      `• Booking Time: ${chosenTime || '7:30 PM'}`,
      `• Number of Guests: ${tableGuests}`,
      `• Special Requests: ${tableRequests.trim() || 'None'}`,
      `---------------------------------------`,
      `Location: Dehradun, Uttarakhand`,
    ];

    const text = messageLines.join('\n');
    const url = `https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent(text)}`;

    setSubmittedMode('table');
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
      setSubmittedMode(null);
    }, 800);
  };

  // Handle Pickup Order Submission
  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupName.trim() || !pickupPhone.trim() || !pickupFoodDetails.trim()) return;

    const chosenTime = pickupTime === 'custom' ? pickupCustomTime : pickupTime;

    const messageLines = [
      `*Pickup Order Request* - Insta Chinese (Dehradun)`,
      `---------------------------------------`,
      `• Customer Name: ${pickupName.trim()}`,
      `• Phone Number: ${pickupPhone.trim()}`,
      `• Food / Order Details:`,
      `${pickupFoodDetails.trim()}`,
      `• Pickup Date: ${pickupDate || 'Today'}`,
      `• Pickup Time: ${chosenTime || 'ASAP'}`,
      `• Special Instructions: ${pickupInstructions.trim() || 'Standard preparation'}`,
      `---------------------------------------`,
      `Takeaway Kitchen: Dehradun, Uttarakhand`,
    ];

    const text = messageLines.join('\n');
    const url = `https://wa.me/${RESTAURANT_INFO.rawPhone}?text=${encodeURIComponent(text)}`;

    setSubmittedMode('pickup');
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
      setSubmittedMode(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#12141c] border border-stone-800 rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800/90 bg-[#161824] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
              <span>Insta Chinese</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Dehradun</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-semibold text-white mt-1">
              {activeTab === 'table' ? 'Table Reservation' : 'Pickup Order'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light mt-0.5">
              {activeTab === 'table'
                ? 'Reserve dining seating at our restaurant in Dehradun'
                : 'Order fresh Asian dishes ahead for fast takeaway pickup'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors shrink-0"
            aria-label="Close booking window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher - Clean Segmented Control */}
        <div className="px-4 sm:px-6 pt-4 pb-2 bg-[#12141c]">
          <div className="grid grid-cols-2 p-1 bg-[#181a24] rounded-lg border border-stone-800" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'table'}
              onClick={() => setActiveTab('table')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                activeTab === 'table'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Table Booking</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'pickup'}
              onClick={() => setActiveTab('pickup')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                activeTab === 'pickup'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pickup Order</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-grow">
          
          {submittedMode ? (
            <div className="py-12 px-4 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="font-cinzel text-xl font-semibold text-white">
                {submittedMode === 'table'
                  ? 'Opening WhatsApp for Table Booking...'
                  : 'Opening WhatsApp for Pickup Order...'}
              </h4>
              <p className="text-sm text-stone-300 max-w-md mx-auto font-light leading-relaxed">
                Your details are being transferred directly to Insta Chinese (+91 97601 24125). Please tap send in WhatsApp to finalize.
              </p>
            </div>
          ) : activeTab === 'table' ? (
            /* ======================================================== */
            /* 1. TABLE BOOKING FORM FLOW                               */
            /* Fields: Name, Phone, Date, Time, Number of Guests, Requests */
            /* ======================================================== */
            <form id="table-booking-form" onSubmit={handleTableSubmit} className="space-y-4">
              
              {/* Row 1: Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="table-name" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Customer Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="table-name"
                    type="text"
                    required
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="e.g. Vikram Negi"
                    className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="table-phone" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Phone Number <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="table-phone"
                    type="tel"
                    required
                    value={tablePhone}
                    onChange={(e) => setTablePhone(e.target.value)}
                    placeholder="e.g. +91 97601 24125"
                    className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Booking Date & Booking Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="table-date" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Booking Date <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="table-date"
                      type="date"
                      required
                      min={todayStr}
                      value={tableDate}
                      onChange={(e) => setTableDate(e.target.value)}
                      className="w-full bg-[#181a24] border border-stone-800 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500/80 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="table-time" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Booking Time <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="table-time"
                      value={tableTime}
                      onChange={(e) => setTableTime(e.target.value)}
                      className="w-full bg-[#181a24] border border-stone-800 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500/80 transition-colors"
                    >
                      <optgroup label="Lunch Hours">
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="2:30 PM">2:30 PM</option>
                      </optgroup>
                      <optgroup label="Dinner Hours">
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="9:30 PM">9:30 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                      </optgroup>
                      <option value="custom">Other / Custom Time...</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Custom time text input if custom selected */}
              {tableTime === 'custom' && (
                <div>
                  <label htmlFor="table-custom-time" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Specify Custom Time
                  </label>
                  <input
                    id="table-custom-time"
                    type="text"
                    required
                    value={tableCustomTime}
                    onChange={(e) => setTableCustomTime(e.target.value)}
                    placeholder="e.g. 6:45 PM"
                    className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
                  />
                </div>
              )}

              {/* Row 3: Number of Guests */}
              <div>
                <label htmlFor="table-guests" className="block text-xs font-medium text-stone-300 mb-1.5">
                  Number of Guests <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="table-guests"
                    value={tableGuests}
                    onChange={(e) => setTableGuests(e.target.value)}
                    className="w-full bg-[#181a24] border border-stone-800 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500/80 transition-colors"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Couple Table)</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests (Standard Family Table)</option>
                    <option value="5-6 Guests">5 - 6 Guests</option>
                    <option value="7-8 Guests">7 - 8 Guests</option>
                    <option value="9+ Large Party">9+ Guests (Large Gathering / Celebration)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Special Requests */}
              <div>
                <label htmlFor="table-requests" className="block text-xs font-medium text-stone-300 mb-1.5">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="table-requests"
                  rows={2}
                  value={tableRequests}
                  onChange={(e) => setTableRequests(e.target.value)}
                  placeholder="Seating preferences (quiet table / window), dietary requirements, birthday celebration..."
                  className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors resize-none"
                />
              </div>

              {/* Notice */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2.5 text-xs text-amber-300/90 font-light">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Table bookings are confirmed directly by the Insta Chinese team via WhatsApp or phone call.
                </span>
              </div>
            </form>
          ) : (
            /* ======================================================== */
            /* 2. PICKUP ORDER FORM FLOW                                */
            /* Fields: Name, Phone, Food/Order Details, Date, Time, Instructions */
            /* NO GUESTS, NO TABLE WORDING                              */
            /* ======================================================== */
            <form id="pickup-order-form" onSubmit={handlePickupSubmit} className="space-y-4">
              
              {/* Row 1: Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickup-name" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Customer Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="pickup-name"
                    type="text"
                    required
                    value={pickupName}
                    onChange={(e) => setPickupName(e.target.value)}
                    placeholder="e.g. Priya Rawat"
                    className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="pickup-phone" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Phone Number <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="pickup-phone"
                    type="tel"
                    required
                    value={pickupPhone}
                    onChange={(e) => setPickupPhone(e.target.value)}
                    placeholder="e.g. +91 97601 24125"
                    className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Food / Order Details */}
              <div>
                <label htmlFor="pickup-food-details" className="block text-xs font-medium text-stone-300 mb-1.5">
                  Food & Order Details <span className="text-amber-500">*</span>
                </label>
                <textarea
                  id="pickup-food-details"
                  required
                  rows={3}
                  value={pickupFoodDetails}
                  onChange={(e) => setPickupFoodDetails(e.target.value)}
                  placeholder="List dishes and quantities (e.g. 1x Szechuan Wok Noodles, 1x Steamed Dim Sum, 1x Veg Manchurian Gravy)..."
                  className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors resize-none"
                />
                <span className="text-[11px] text-stone-500 block mt-1">
                  Specify items from our menu. Our kitchen prepares each dish fresh for pickup.
                </span>
              </div>

              {/* Row 3: Pickup Date & Pickup Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickup-date" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Pickup Date <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="pickup-date"
                      type="date"
                      required
                      min={todayStr}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-[#181a24] border border-stone-800 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500/80 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pickup-time" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Pickup Time <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="pickup-time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-[#181a24] border border-stone-800 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500/80 transition-colors"
                    >
                      <option value="ASAP (30-40 mins)">ASAP (Within 30–40 mins)</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                      <option value="In 1 hour">In 1 hour</option>
                      <optgroup label="Afternoon Pickup">
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="2:30 PM">2:30 PM</option>
                      </optgroup>
                      <optgroup label="Evening Pickup">
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="9:30 PM">9:30 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                      </optgroup>
                      <option value="custom">Other / Custom Time...</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Custom pickup time if selected */}
              {pickupTime === 'custom' && (
                <div>
                  <label htmlFor="pickup-custom-time" className="block text-xs font-medium text-stone-300 mb-1.5">
                    Specify Custom Pickup Time
                  </label>
                  <input
                    id="pickup-custom-time"
                    type="text"
                    required
                    value={pickupCustomTime}
                    onChange={(e) => setPickupCustomTime(e.target.value)}
                    placeholder="e.g. 8:15 PM"
                    className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors"
                  />
                </div>
              )}

              {/* Row 4: Special Instructions */}
              <div>
                <label htmlFor="pickup-instructions" className="block text-xs font-medium text-stone-300 mb-1.5">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="pickup-instructions"
                  rows={2}
                  value={pickupInstructions}
                  onChange={(e) => setPickupInstructions(e.target.value)}
                  placeholder="Spice level (mild / spicy / extra hot), extra dipping sauce, packaging notes..."
                  className="w-full bg-[#181a24] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/80 transition-colors resize-none"
                />
              </div>

              {/* Notice */}
              <div className="p-3 bg-stone-900/80 border border-stone-800 rounded-lg flex items-start gap-2.5 text-xs text-stone-400 font-light">
                <ShoppingBag className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Pickup counter located at Insta Chinese, Dehradun. You will receive a WhatsApp confirmation with estimated preparation timing.
                </span>
              </div>
            </form>
          )}

          {/* Quick Direct Phone Call Assistance */}
          {!submittedMode && (
            <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
              <span className="text-stone-400">Need instant clarification?</span>
              <a
                href={RESTAURANT_INFO.phoneTel}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 97601 24125</span>
              </a>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        {!submittedMode && (
          <div className="p-4 sm:p-6 border-t border-stone-800 bg-[#161824] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs text-stone-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            {activeTab === 'table' ? (
              <button
                type="submit"
                form="table-booking-form"
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Table via WhatsApp</span>
              </button>
            ) : (
              <button
                type="submit"
                form="pickup-order-form"
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Send Pickup Order via WhatsApp</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
