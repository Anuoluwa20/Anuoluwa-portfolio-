import React, { useState, useMemo } from 'react';
import { UIWork } from '../types';
import { Search, Plus, Pencil, Trash2, Eye, Filter, ArrowUpRight, Camera } from 'lucide-react';

interface UIWorksSectionProps {
  uiWorks: UIWork[];
  isEditMode: boolean;
  onEditUIWork: (work: UIWork) => void;
  onAddUIWork: () => void;
  onDeleteUIWork: (id: string) => void;
  onInspectUIWork: (work: UIWork) => void;
  onChangeImage?: (work: UIWork) => void;
}

export const UIWorksSection: React.FC<UIWorksSectionProps> = ({
  uiWorks,
  isEditMode,
  onEditUIWork,
  onAddUIWork,
  onDeleteUIWork,
  onInspectUIWork,
  onChangeImage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories dynamically from uiWorks
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    uiWorks.forEach((w) => {
      if (w.category) cats.add(w.category);
    });
    return Array.from(cats);
  }, [uiWorks]);

  // Filtered UI works
  const filteredWorks = useMemo(() => {
    return uiWorks.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [uiWorks, selectedCategory, searchQuery]);

  return (
    <section id="ui-works" className="py-16 px-4 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-8">
        <p className="micro-label mb-2">Visual Gallery</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight">
          UI Works & Explorations
        </h2>
      </div>

      {/* Category Filter Pills (matching reference screenshot interaction) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#EFECE6] rounded-full border border-[#D8D4CC] shadow-xs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === 'All'
              ? uiWorks.length
              : uiWorks.filter((w) => w.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-md border border-[#1A1A1A] scale-[1.03]'
                    : 'text-[#1A1A1A]/75 hover:text-[#1A1A1A] hover:bg-[#E5E1D8]/60'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#D8D4CC] text-[#1A1A1A]/70'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-3xl mx-auto">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E8E]" />
          <input
            type="text"
            placeholder="Search explorations, tags or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#EFECE6] border border-[#D8D4CC] text-xs font-medium text-[#1A1A1A] placeholder:text-[#8E8E8E] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E8E8E] hover:text-[#1A1A1A]"
            >
              Clear
            </button>
          )}
        </div>

        {isEditMode && (
          <button
            onClick={onAddUIWork}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap shadow-md active:scale-95"
            title="Add a new UI design exploration"
          >
            <Plus className="w-4 h-4 text-neutral-950" />
            <span>+ Add UI Work</span>
          </button>
        )}
      </div>

      {/* UI Works 2-Column Animated Grid matching reference screenshot */}
      {filteredWorks.length === 0 ? (
        <div className="text-center py-16 bg-[#EFECE6] rounded-3xl border border-[#D8D4CC] p-8">
          <Filter className="w-10 h-10 text-[#8E8E8E] mx-auto mb-3" />
          <p className="text-sm font-medium text-[#1A1A1A]/80 mb-2">
            No UI works match your current filter.
          </p>
        </div>
      ) : (
        <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 animate-in fade-in zoom-in-95 duration-300">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="group relative flex flex-col cursor-pointer"
              onClick={() => onInspectUIWork(work)}
            >
              {/* Large Image Frame Container */}
              <div className="relative aspect-[16/10] bg-[#EFECE6] rounded-[28px] border border-[#D8D4CC] overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:border-[#1A1A1A]/40">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category Badge overlay */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-[#F5F2ED]/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider border border-[#D8D4CC] shadow-xs">
                    {work.category}
                  </span>
                </div>

                {/* Inspect Overlay on Hover */}
                <div className="absolute inset-0 bg-[#1A1A1A]/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-5 py-2.5 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-xs font-bold flex items-center gap-2 shadow-lg border border-[#D8D4CC] transform group-hover:scale-105 transition-transform">
                    <Eye className="w-4 h-4 text-amber-700" />
                    <span>View Project Details</span>
                  </span>
                </div>
              </div>

              {/* Title & Date Metadata Row (matching screenshot layout) */}
              <div className="flex items-baseline justify-between pt-4 px-1">
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] group-hover:text-amber-900 transition-colors leading-snug tracking-tight">
                  {work.title}
                </h3>
                <span className="text-xs font-mono font-medium text-[#8E8E8E] shrink-0 ml-3">
                  {work.date || '2026'}
                </span>
              </div>

              {/* Subtext Description */}
              {work.subtext && (
                <p className="text-xs sm:text-sm text-[#1A1A1A]/75 line-clamp-2 mt-1.5 px-1 font-normal leading-relaxed">
                  {work.subtext}
                </p>
              )}

              {/* Tags & Client footer */}
              {work.tags && work.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 px-1">
                  {work.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-[#EFECE6] text-[#1A1A1A]/80 text-[10px] font-semibold border border-[#D8D4CC]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
