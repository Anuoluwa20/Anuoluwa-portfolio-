import React from 'react';
import { Testimonial } from '../types';
import { Quote, Plus, Pencil, Trash2, Camera } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  isEditMode: boolean;
  onEditTestimonial: (testimonial: Testimonial) => void;
  onAddTestimonial: () => void;
  onDeleteTestimonial: (id: string) => void;
  onChangeImage?: (testimonial: Testimonial) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  isEditMode,
  onEditTestimonial,
  onAddTestimonial,
  onDeleteTestimonial,
  onChangeImage,
}) => {
  return (
    <section id="contact" className="py-16 px-4 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-12">
        <p className="micro-label mb-2">Client Praise</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight">
          What Clients say
        </h2>
      </div>

      {/* Testimonial Cards Grid (Matching Reference Image 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => {
          // Colorful background styles inspired by reference image
          const bgStyles = [
            'bg-blue-600 text-white',
            'bg-[#f1bf51] text-slate-950',
            'bg-neutral-900 text-white',
          ];
          const currentBg = t.badgeBg || bgStyles[idx % bgStyles.length];

          return (
            <div
              key={t.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-transform duration-300 card-shadow-hover ${currentBg}`}
            >
              <div>
                <Quote className="w-8 h-8 opacity-40 mb-4" />
                <p className="text-sm font-medium leading-relaxed mb-6 opacity-95">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <div 
                  className="relative group/avatar cursor-pointer"
                  onClick={() => onChangeImage && onChangeImage(t)}
                  title="Click to Change Client Photo"
                >
                  <img
                    src={t.avatarUrl}
                    alt={t.authorName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
                  />
                  {onChangeImage && (
                    <div className="absolute inset-0 bg-[#1A1A1A]/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition shadow-sm">
                      <Camera className="w-4 h-4 text-amber-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">{t.authorName}</h4>
                  <p className="text-xs opacity-80">{t.authorRole} • <span className="font-semibold">{t.company}</span></p>
                </div>
              </div>

              {/* Edit Mode Controls */}
              {isEditMode && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 text-neutral-900 p-1 rounded-full shadow-md">
                  {onChangeImage && (
                    <button
                      onClick={() => onChangeImage(t)}
                      className="p-1.5 rounded-full hover:bg-amber-100 text-amber-800"
                      title="Change Client Photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onEditTestimonial(t)}
                    className="p-1.5 rounded-full hover:bg-neutral-100"
                    title="Edit Testimonial"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteTestimonial(t.id)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-red-600"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {isEditMode && (
          <button
            onClick={onAddTestimonial}
            className="border-2 border-dashed border-neutral-300 rounded-3xl p-8 flex flex-col items-center justify-center gap-2 text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/50 transition cursor-pointer min-h-[220px]"
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs font-semibold">Add Client Recommendation</span>
          </button>
        )}
      </div>
    </section>
  );
};
