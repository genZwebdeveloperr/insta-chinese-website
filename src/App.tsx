/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureShowcase } from './components/SignatureShowcase';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { FoodGallery } from './components/FoodGallery';
import { ExperienceSection } from './components/ExperienceSection';
import { LocationContact } from './components/LocationContact';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { InquiryModal, BookingServiceMode } from './components/InquiryModal';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedDishForInquiry, setSelectedDishForInquiry] = useState<string>('');
  const [modalMode, setModalMode] = useState<BookingServiceMode>('table');

  const handleOpenInquiry = (dishName?: string, mode: BookingServiceMode = 'table') => {
    setSelectedDishForInquiry(dishName || '');
    setModalMode(mode);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setSelectedDishForInquiry('');
    setModalMode('table');
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-stone-200 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* 1. Navbar */}
      <Navbar onOpenInquiry={(mode) => handleOpenInquiry(undefined, mode || 'table')} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onOpenInquiry={(mode) => handleOpenInquiry(undefined, mode || 'table')} />

        {/* 3. Signature Food Showcase */}
        <SignatureShowcase onSelectDishForInquiry={(dish) => handleOpenInquiry(dish, 'pickup')} />

        {/* 4. Menu Section */}
        <MenuSection onSelectItemForInquiry={(dish) => handleOpenInquiry(dish, 'pickup')} />

        {/* 5. Restaurant / About Section */}
        <AboutSection />

        {/* 6. Food Gallery with Lightbox */}
        <FoodGallery />

        {/* 7. Restaurant Experience Section */}
        <ExperienceSection />

        {/* 8. Location & Contact Section */}
        <LocationContact onOpenInquiry={(mode) => handleOpenInquiry(undefined, mode || 'table')} />

        {/* 9. Final Call to Action */}
        <FinalCta onOpenInquiry={(mode) => handleOpenInquiry(undefined, mode || 'table')} />
      </main>

      {/* 10. Footer */}
      <Footer onOpenInquiry={(mode) => handleOpenInquiry(undefined, mode || 'table')} />

      {/* Interactive Table & Dining Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        preselectedDish={selectedDishForInquiry}
        initialMode={modalMode}
      />
    </div>
  );
}
