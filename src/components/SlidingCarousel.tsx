import React from 'react';
import { UIWork, CaseStudy } from '../types';
import { Eye } from 'lucide-react';

interface SlidingCarouselProps {
  items: (UIWork | CaseStudy)[];
  onInspectItem: (item: UIWork | CaseStudy) => void;
}

export const SlidingCarousel: React.FC<SlidingCarouselProps> = ({ items, onInspectItem }) => {
  if (!items || items.length === 0) return null;

  // Row 1 items (first half duplicated)
  const row1Items = [...items, ...items];
  
  // Row 2 items (reversed order duplicated for variety and opposite scrolling)
  const row2Original = [...items].reverse();
  const row2Items = [...row2Original, ...row2Original];

  return (
    <section className="py-10 overflow-hidden relative max-w-[1400px] mx-auto space-y-4">
      {/* Soft gradient edge masks */}
      <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F5F2ED] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Leftward Sliding Track */}
      <div className="animate-marquee flex items-center gap-5 py-1">
        {row1Items.map((item, idx) => (
          <div
            key={`row1-${item.id}-${idx}`}
            onClick={() => onInspectItem(item)}
            className="group relative w-60 sm:w-72 aspect-[16/10] bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer shrink-0"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-3 text-center">
              <span className="px-3.5 py-1.5 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-xs font-bold shadow-md border border-[#D8D4CC] flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>Inspect</span>
              </span>
              <span className="text-white text-[11px] font-semibold truncate max-w-[180px] drop-shadow-sm">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Rightward Sliding Track (Opposite Direction) */}
      <div className="animate-marquee-reverse flex items-center gap-5 py-1">
        {row2Items.map((item, idx) => (
          <div
            key={`row2-${item.id}-${idx}`}
            onClick={() => onInspectItem(item)}
            className="group relative w-60 sm:w-72 aspect-[16/10] bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer shrink-0"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-3 text-center">
              <span className="px-3.5 py-1.5 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-xs font-bold shadow-md border border-[#D8D4CC] flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>Inspect</span>
              </span>
              <span className="text-white text-[11px] font-semibold truncate max-w-[180px] drop-shadow-sm">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
