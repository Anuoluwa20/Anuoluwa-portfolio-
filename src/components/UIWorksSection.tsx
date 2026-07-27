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

      {/* Category Filter Pills in Editorial style */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <div className="inline-flex items-center gap-1.5 p-1 bg-[#EFECE6] rounded-full border border-[#D8D4CC]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm border border-[#1A1A1A]'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Add Bar */}
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

        <button
          onClick={onAddUIWork}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap shadow-md active:scale-95"
          title="Add a new UI design exploration"
        >
          <Plus className="w-4 h-4 text-neutral-950" />
          <span>+ Add UI Work</span>
        </button>
      </div>

      {/* UI Works Responsive Grid */}
      {filteredWorks.length === 0 ? (
        <div className="text-center py-16 bg-[#EFECE6] rounded-3xl border border-[#D8D4CC] p-8">
          <Filter className="w-10 h-10 text-[#8E8E8E] mx-auto mb-3" />
          <p className="text-sm font-medium text-[#1A1A1A]/80 mb-2">
            No UI works match your current filter.
          </p>
          {isEditMode && (
            <button
              onClick={onAddUIWork}
              className="mt-2 text-xs font-bold text-[#1A1A1A] underline cursor-pointer"
            >
              Upload a new image and subtext field
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="group relative bg-[#EFECE6] rounded-3xl border border-[#D8D4CC] overflow-hidden flex flex-col justify-between transition-all duration-300 card-shadow-hover"
            >
              {/* Image Preview Container */}
              <div
                className="relative aspect-[4/3] bg-[#E5E1D8] overflow-hidden cursor-pointer"
                onClick={() => onInspectUIWork(work)}
              >
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category Badge overlay */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#F5F2ED]/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider border border-[#D8D4CC] shadow-xs">
                    {work.category}
                  </span>
                </div>

                {/* Inspect / Change Image Overlay */}
                <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectUIWork(work);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    {onChangeImage && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChangeImage(work);
                        }}
                        className="px-3 py-1.5 rounded-full bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change Image</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Text & Subtext Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-serif-heading font-medium text-[#1A1A1A] mb-1.5 leading-snug tracking-tight">
                    {work.title}
                  </h3>

                  {/* Subtext Field */}
                  {work.subtext && (
                    <p className="text-xs text-[#1A1A1A]/80 line-clamp-2 leading-relaxed mb-3">
                      {work.subtext}
                    </p>
                  )}
                </div>

                {/* Tags & Actions */}
                <div>
                  {work.tags && work.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {work.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#F5F2ED] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider border border-[#D8D4CC]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-[#D8D4CC]/80 text-[11px] text-[#8E8E8E] font-medium">
                    <span>{work.client || 'UI Exploration'}</span>
                    <button
                      onClick={() => onInspectUIWork(work)}
                      className="text-[#1A1A1A] hover:text-amber-800 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Edit Mode Overlay Action Bar */}
              {isEditMode && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 p-1 rounded-full shadow-md border border-neutral-200">
                  {onChangeImage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeImage(work);
                      }}
                      className="p-1.5 rounded-full hover:bg-amber-100 text-amber-800"
                      title="Change Image"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditUIWork(work);
                    }}
                    className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-700"
                    title="Edit Title & Subtext"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteUIWork(work.id);
                    }}
                    className="p-1.5 rounded-full hover:bg-red-50 text-red-600"
                    title="Delete Work"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add New UI Work Action Card */}
          <div
            onClick={onAddUIWork}
            className="group min-h-[320px] bg-[#E5E1D8]/60 hover:bg-[#EFECE6] border-2 border-dashed border-[#D8D4CC] hover:border-amber-500/80 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-serif-heading font-medium text-[#1A1A1A] group-hover:text-amber-800 transition-colors">
                + Add New UI Work
              </h3>
              <p className="text-xs text-[#8E8E8E] max-w-[200px] mt-1">
                Upload image, set title, subtext, category & tags
              </p>
            </div>
            <span className="mt-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-wider group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors">
              Upload Work
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
