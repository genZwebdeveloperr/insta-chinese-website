import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  span: string;
  aspect: string;
}

export const FoodGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0b0c10] border-b border-stone-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-500 mb-2">
            Visual Ambiance
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-semibold text-stone-100 tracking-tight">
            Culinary Gallery
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 font-light">
            A glimpse into the sizzle, steam, and vibrant craft of our kitchen in Dehradun.
          </p>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`${item.span} group relative rounded-lg overflow-hidden border border-stone-800/80 bg-stone-900 cursor-pointer shadow-lg`}
              onClick={() => setSelectedImage(item)}
            >
              <div className={`w-full ${item.aspect} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Hover overlay with smooth gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-1 block">
                      Plate 0{index + 1}
                    </span>
                    <h3 className="font-cinzel text-lg sm:text-xl font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
                      {item.caption}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-white/10 text-white backdrop-blur-sm shrink-0 ml-3">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Note */}
        <p className="text-center text-xs text-stone-400 mt-8 font-light">
          *Gallery photography features representative Asian culinary preparations. Photos can be supplemented with actual restaurant venue & plate photography upon client provision.
        </p>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedImage(null)}
          />

          <div className="relative max-w-4xl w-full bg-[#12141c] border border-stone-800 rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white hover:bg-black transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="p-6 bg-[#12141c] border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-cinzel text-xl font-medium text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-stone-400 text-sm mt-1">
                  {selectedImage.caption}
                </p>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded font-medium transition-colors self-start sm:self-auto"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
