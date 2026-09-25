import React, { useState, useMemo } from 'react';
import { Search, Flame, Leaf, Utensils, MessageCircle } from 'lucide-react';
import { MENU_CATEGORIES, SAMPLE_MENU_ITEMS, MenuItem, RESTAURANT_INFO } from '../data/restaurantData';

interface MenuSectionProps {
  onSelectItemForInquiry: (itemName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItemForInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'spicy'>('all');

  const filteredItems = useMemo(() => {
    return SAMPLE_MENU_ITEMS.filter((item) => {
      // Category check
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Search check
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary filter check
      let matchesDietary = true;
      if (dietaryFilter === 'veg') {
        matchesDietary = item.dietary === 'veg';
      } else if (dietaryFilter === 'spicy') {
        matchesDietary = (item.spicyLevel ?? 0) > 0;
      }

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#0b0c10] border-b border-stone-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-500 mb-2">
            The Kitchen Menu
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-semibold text-stone-100 tracking-tight">
            Flavors of the Wok
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            From hand-rolled dim sum to roaring wok-tossed noodles and rich Asian gravies. Explore our sample culinary catalog.
          </p>

          {/* Client Notice */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-stone-400 bg-stone-900/60 border border-stone-800 px-3.5 py-1.5 rounded">
            <span>Demo Catalog · Items & prices easily customizable to exact client menu</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          {/* Category Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-stone-800/80 -mx-4 px-4 sm:mx-0 sm:px-0">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                    isActive
                      ? 'border-amber-500 text-amber-400 font-semibold'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Dietary filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish or ingredient..."
                className="w-full bg-[#13151d] border border-stone-800 rounded pl-10 pr-4 py-2 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 hidden sm:inline mr-1">Filter:</span>
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-stone-800 text-white border border-stone-700'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded font-medium transition-colors ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                    : 'text-stone-400 hover:text-emerald-400'
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                <span>Vegetarian</span>
              </button>
              <button
                onClick={() => setDietaryFilter(dietaryFilter === 'spicy' ? 'all' : 'spicy')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded font-medium transition-colors ${
                  dietaryFilter === 'spicy'
                    ? 'bg-red-950/80 text-red-300 border border-red-800'
                    : 'text-stone-400 hover:text-red-400'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>Spicy Wok</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#11131a] rounded-lg border border-stone-800/80 p-8">
            <Utensils className="w-8 h-8 text-stone-600 mx-auto mb-3" />
            <p className="text-stone-300 font-medium">No dishes found matching your search.</p>
            <p className="text-stone-400 text-sm mt-1">Try resetting the search filter or view all categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#12141c] border border-stone-800/80 hover:border-stone-700/90 rounded-lg p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-black/50 group"
              >
                <div>
                  {/* Top line: Name & Price */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-cinzel font-semibold text-lg text-stone-100 group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-semibold text-amber-400 tabular-nums shrink-0">
                      {item.priceFormatted}
                    </span>
                  </div>

                  {/* Clean unboxed metadata: dietary & spice */}
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
                    <span className="capitalize">{item.category.replace('-', ' ')}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      {item.dietary === 'veg' ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 inline-block" />
                          <span>Veg</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 inline-block" />
                          <span>Special</span>
                        </>
                      )}
                    </span>
                    {(item.spicyLevel ?? 0) > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-0.5 text-red-400">
                          <Flame className="w-3 h-3" />
                          <span>{item.spicyLevel === 3 ? 'Extra Hot' : 'Spicy'}</span>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="pt-4 mt-4 border-t border-stone-800/60 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.rawPhone}?text=Hello%20Insta%20Chinese%2C%20I%20am%20interested%20in%20ordering%20or%20inquiring%20about%20the%20${encodeURIComponent(item.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp Order</span>
                  </a>

                  <button
                    onClick={() => onSelectItemForInquiry(item.name)}
                    className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Inquire Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Menu Action */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-[#141620] via-[#161824] to-[#141620] border border-stone-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-cinzel font-semibold text-stone-100">
              Planning a Meal or Party Order?
            </h4>
            <p className="text-stone-400 text-sm mt-1 font-light">
              Connect directly with Insta Chinese in Dehradun for custom dining, takeaway inquiries, or bulk gatherings.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Query</span>
            </a>
            <a
              href={RESTAURANT_INFO.phoneTel}
              className="flex items-center gap-2 px-4 py-2.5 border border-stone-700 hover:border-stone-500 text-stone-200 rounded text-xs font-medium transition-colors"
            >
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
