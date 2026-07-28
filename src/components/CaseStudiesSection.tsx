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

  // Take top featured case studies for the stacked deck (matching reference screenshot layout)
  const featuredDeck = caseStudies.slice(0, 5);
  const activeCaseStudy = featuredDeck[activeIndex] || featuredDeck[0];

  return (
    <section id="case-studies" className="py-16 px-4 max-w-6xl mx-auto relative">
      {/* Editorial Header with Click to View Annotation */}
      <div className="relative text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif-heading font-normal text-[#1A1A1A] tracking-tight">
          Selected Case Studies
        </h2>

        {/* Script Annotation on the Right (matching reference screenshot) */}
        <div className="hidden sm:flex flex-col items-center absolute right-0 -top-2 lg:-right-8 text-[#1A1A1A]/60 pointer-events-none select-none">
          <span className="font-serif italic text-sm tracking-wide text-[#1A1A1A]/70">Click to View</span>
          <svg className="w-8 h-8 text-[#1A1A1A]/40 -rotate-45 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Stacked Layer Folder Deck Container */}
      <div className="relative max-w-3xl mx-auto">
        
        {/* Layered Folder Tabs Header (matching reference screenshot) */}
        <div className="flex flex-col items-center gap-1.5 mb-1">
          {featuredDeck.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-full max-w-xl px-6 py-3 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#EFECE6] text-[#1A1A1A] border-[#D8D4CC] shadow-md font-bold z-20 scale-[1.01]'
                    : 'bg-[#F5F2ED] hover:bg-[#EFECE6] text-[#1A1A1A]/80 border-[#D8D4CC]/80 scale-[0.97]'
                }`}
                style={{
                  marginTop: idx > 0 ? '-10px' : '0',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-[#1A1A1A] text-white' : 'bg-[#D8D4CC] text-[#1A1A1A]'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold tracking-tight">
                    {item.companyName || item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.tags && item.tags.length > 0 && (
                    <span className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      isActive ? 'bg-[#D8D4CC] text-[#1A1A1A]' : 'bg-[#D8D4CC]/60 text-[#1A1A1A]/70'
                    }`}>
                      {item.tags[0]}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Case Study Active Details Card (matching reference screenshot layout) */}
        {activeCaseStudy && (
          <div className="relative bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 mt-2">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Title, Narrative & Read Case Study Button */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Top Tagline */}
                  {activeCaseStudy.tagline && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#D8D4CC]">
                      {activeCaseStudy.tagline}
                    </span>
                  )}

                  {/* Main Title */}
                  <h3 className="text-2xl sm:text-3xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight leading-tight mb-4">
                    {activeCaseStudy.title}
                  </h3>

                  {/* Description Narrative */}
                  <p className="text-[#1A1A1A]/85 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                    {activeCaseStudy.description}
                  </p>

                  {/* Scope / Subtext Box */}
                  {activeCaseStudy.subtext && (
                    <div className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#D8D4CC] text-xs text-[#1A1A1A]/90 leading-relaxed mb-4">
                      <span className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px] text-[#8E8E8E]">
                        Key Scope & Details
                      </span>
                      {activeCaseStudy.subtext}
                    </div>
                  )}

                  {/* Impact Metrics Badges */}
                  {activeCaseStudy.metrics && activeCaseStudy.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {activeCaseStudy.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-[#F5F2ED] text-[#1A1A1A] border border-[#D8D4CC] text-[11px] font-semibold flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Read Case Study Button (Black Pill matching screenshot) */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onOpenDetailModal(activeCaseStudy)}
                    className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md active:scale-95"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>

                  {onChangeImage && (
                    <button
                      onClick={() => onChangeImage(activeCaseStudy)}
                      className="p-3 rounded-full bg-[#E5E1D8] hover:bg-[#D8D4CC] text-[#1A1A1A] transition cursor-pointer"
                      title="Change Image"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Project Image Preview (matching screenshot layout) */}
              <div
                className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#F5F2ED] border border-[#D8D4CC] shadow-sm aspect-[4/3] group cursor-pointer"
                onClick={() => onOpenDetailModal(activeCaseStudy)}
              >
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
                <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                  <span className="px-5 py-2.5 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-xs font-bold shadow-lg border border-[#D8D4CC]">
                    Inspect Case Study
                  </span>
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
