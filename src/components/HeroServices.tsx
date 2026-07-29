import React from 'react';
import { ServiceCard, PortfolioProfile } from '../types';
import { PenTool, Layout, Code, Plus, Pencil, Trash2, ArrowDown, Calendar, CheckCircle2 } from 'lucide-react';

interface HeroServicesProps {
  profile?: PortfolioProfile;
  services: ServiceCard[];
  isEditMode: boolean;
  onEditService: (service: ServiceCard) => void;
  onAddService: () => void;
  onDeleteService: (id: string) => void;
  onOpenBookCall?: () => void;
}

const getServiceIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'pentool':
    case 'pen':
      return <PenTool className="w-6 h-6 text-neutral-800" />;
    case 'layout':
    case 'web':
      return <Layout className="w-6 h-6 text-neutral-800" />;
    case 'code':
    case 'framer':
      return <Code className="w-6 h-6 text-neutral-800" />;
    default:
      return <PenTool className="w-6 h-6 text-neutral-800" />;
  }
};

export const HeroServices: React.FC<HeroServicesProps> = ({
  profile,
  services,
  isEditMode,
  onEditService,
  onAddService,
  onDeleteService,
  onOpenBookCall,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-10 md:pt-14 pb-16 px-4 max-w-7xl mx-auto space-y-12">
      
      {/* Editorial Hero Header */}
      <div className="bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-sm card-shadow">
        
        {/* Subtle Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Main Serif Display Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-heading font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Product Designer crafting <span className="italic font-serif-heading text-neutral-700">intuitive digital experiences.</span>
          </h1>

          {/* Descriptive Narrative */}
          <p className="text-base sm:text-lg text-[#1A1A1A]/85 leading-relaxed font-normal max-w-3xl">
            {profile?.subtext ||
              "I'm Oyebanji Anuoluwapo Eniola, a Product Designer with over 2 years of experience designing web & mobile products across Fintech, SaaS, AI, E-commerce, and Cybersecurity. I bridge user problems, visual elegance, and product strategy to deliver high-impact digital products."}
          </p>

          {/* Quick Highlight Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {['Product Design', 'UI/UX Design', 'Fintech & SaaS', 'AI & Security Systems', 'Design Systems & Specs'].map((chip, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-xs font-semibold border border-[#D8D4CC] flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{chip}</span>
              </span>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection('case-studies')}
              className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md active:scale-95"
            >
              <span>VIEW MY WORK</span>
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </button>

            <a
              href={profile?.bookCallUrl || "https://cal.com/oyebanji-anuoluwa-ivsr2j/15min"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4 text-neutral-950" />
              <span>LET'S CONNECT / BOOK A CALL</span>
            </a>
          </div>

        </div>
      </div>

      {/* Specialization Section Label */}
      <div className="flex items-center justify-between border-b border-[#D8D4CC] pb-3 pt-2">
        <div>
          <p className="micro-label">CORE CAPABILITIES</p>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-medium text-[#1A1A1A]">
            Design Specializations
          </h2>
        </div>
        <span className="text-xs font-bold text-[#8E8E8E] font-mono">01 / OVERVIEW</span>
      </div>

      {/* Grid of 3 Primary Specialization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group relative bg-[#EFECE6] hover:bg-[#E7E3DC] border border-[#D8D4CC] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 card-shadow-hover"
          >
            {/* Top Icon */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] border border-[#D8D4CC] flex items-center justify-center mb-6 shadow-2xs group-hover:scale-105 transition-transform">
                {getServiceIcon(service.iconName)}
              </div>

              {/* Title with Serif heading */}
              <h3 className="text-2xl font-serif-heading font-medium text-[#1A1A1A] mb-3 tracking-tight leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#1A1A1A]/80 text-sm leading-relaxed font-normal mb-6">
                {service.description}
              </p>
            </div>

            {/* Tags / Subtext in Editorial style */}
            {service.tags && service.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#D8D4CC]/80">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-[10px] uppercase tracking-wider font-bold border border-[#D8D4CC]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Edit mode controls */}
            {isEditMode && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 p-1 rounded-full shadow-md border border-neutral-200">
                <button
                  onClick={() => onEditService(service)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-700 transition"
                  title="Edit Service Card"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteService(service.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition"
                  title="Delete Card"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add New Service Card (in Edit Mode) */}
        {isEditMode && (
          <button
            onClick={onAddService}
            className="border-2 border-dashed border-neutral-300 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/50 transition cursor-pointer min-h-[280px]"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold">Add Specialization Card</span>
          </button>
        )}
      </div>
    </section>
  );
};
