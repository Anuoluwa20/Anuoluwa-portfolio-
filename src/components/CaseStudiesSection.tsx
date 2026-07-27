import React, { useState } from 'react';
import { CaseStudy } from '../types';
import { ArrowUpRight, Pencil, Plus, Trash2, CheckCircle2, Camera } from 'lucide-react';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  isEditMode: boolean;
  onEditCaseStudy: (caseStudy: CaseStudy) => void;
  onAddCaseStudy: () => void;
  onDeleteCaseStudy: (id: string) => void;
  onOpenDetailModal: (item: CaseStudy) => void;
  onChangeImage?: (caseStudy: CaseStudy) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies,
  isEditMode,
  onEditCaseStudy,
  onAddCaseStudy,
  onDeleteCaseStudy,
  onOpenDetailModal,
  onChangeImage,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  const activeCaseStudy = caseStudies[activeIndex] || caseStudies[0];

  return (
    <section id="case-studies" className="py-16 px-4 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-10">
        <p className="micro-label mb-2">Portfolio Overview</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight">
          Selected Case Studies
        </h2>
      </div>

      {/* Stacked Layer Deck Container */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Layered Tabs Deck */}
        <div className="flex flex-col items-center gap-1.5 mb-2">
          {caseStudies.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-full max-w-2xl px-5 py-3 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg scale-[1.02] z-20'
                    : 'bg-[#EFECE6] hover:bg-[#E5E1D8] text-[#1A1A1A] border-[#D8D4CC] opacity-95 scale-[0.98]'
                }`}
                style={{
                  marginTop: idx > 0 ? '-6px' : '0',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#D8D4CC] text-[#1A1A1A]'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-tight">
                    {item.companyName || item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.tags && item.tags.length > 0 && (
                    <span className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? 'bg-white/10 text-[#EFECE6]' : 'bg-[#D8D4CC] text-[#1A1A1A]/80'
                    }`}>
                      {item.tags[0]}
                    </span>
                  )}
                  <span className={`text-xs font-semibold ${isActive ? 'text-amber-400' : 'text-[#8E8E8E]'}`}>
                    {isActive ? 'Active' : 'View'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Case Study Active Details Card */}
        {activeCaseStudy && (
          <div className="relative bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl p-6 md:p-10 shadow-xl transition-all duration-300 mt-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Information & Subtext */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {activeCaseStudy.tagline && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#D8D4CC]">
                      {activeCaseStudy.tagline}
                    </span>
                  )}

                  <h3 className="text-2xl sm:text-3xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight leading-tight mb-4">
                    {activeCaseStudy.title}
                  </h3>

                  <p className="text-[#1A1A1A]/80 text-sm leading-relaxed mb-4">
                    {activeCaseStudy.description}
                  </p>

                  {/* Subtext Field */}
                  {activeCaseStudy.subtext && (
                    <div className="p-3.5 rounded-2xl bg-[#F5F2ED] border border-[#D8D4CC] text-xs text-[#1A1A1A]/90 leading-relaxed mb-6">
                      <span className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px] text-[#8E8E8E]">Key Scope & Details</span>
                      {activeCaseStudy.subtext}
                    </div>
                  )}

                  {/* Impact Metrics Badges */}
                  {activeCaseStudy.metrics && activeCaseStudy.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeCaseStudy.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-[#F5F2ED] text-[#1A1A1A] border border-[#D8D4CC] text-xs font-semibold flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenDetailModal(activeCaseStudy)}
                    className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {onChangeImage && (
                    <button
                      onClick={() => onChangeImage(activeCaseStudy)}
                      className="px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Image</span>
                    </button>
                  )}

                  {isEditMode && (
                    <button
                      onClick={() => onEditCaseStudy(activeCaseStudy)}
                      className="px-4 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-neutral-300"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: High Res Image Preview */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#F5F2ED] border border-[#D8D4CC] shadow-sm aspect-[4/3] group cursor-pointer"
                   onClick={() => onOpenDetailModal(activeCaseStudy)}>
                <img
                  src={activeCaseStudy.imageUrl}
                  alt={activeCaseStudy.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-xs font-bold shadow-md border border-[#D8D4CC]">
                      Inspect Details
                    </span>
                    {onChangeImage && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChangeImage(activeCaseStudy);
                        }}
                        className="px-4 py-2 rounded-full bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change Image</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Edit Mode Top-Right Controls */}
            {isEditMode && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 p-1.5 rounded-full border border-neutral-300 shadow-sm">
                <button
                  onClick={() => onEditCaseStudy(activeCaseStudy)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-700"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteCaseStudy(activeCaseStudy.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

        {/* Add Case Study Button in Edit Mode */}
        {isEditMode && (
          <div className="mt-4 text-center">
            <button
              onClick={onAddCaseStudy}
              className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Case Study</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
