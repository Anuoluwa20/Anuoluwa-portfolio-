import React from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Tag, Calendar, UserCheck, Camera } from 'lucide-react';
import { UIWork, CaseStudy } from '../types';

interface InspectModalProps {
  item: UIWork | CaseStudy | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChangeImage?: (item: UIWork | CaseStudy) => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
  onChangeImage,
}) => {
  if (!item) return null;

  const isCaseStudy = 'companyName' in item || 'metrics' in item;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#F5F2ED] rounded-3xl shadow-2xl border border-[#D8D4CC] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Top Bar */}
        <div className="px-6 py-4 bg-[#EFECE6] border-b border-[#D8D4CC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#F5F2ED] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider border border-[#D8D4CC]">
              {'category' in item ? item.category : 'Case Study'}
            </span>
            <h3 className="text-sm sm:text-base font-serif-heading font-medium text-[#1A1A1A] truncate max-w-xs sm:max-w-md">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {onChangeImage && (
              <button
                onClick={() => onChangeImage(item)}
                className="px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs mr-2"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Image</span>
              </button>
            )}
            {onPrev && (
              <button
                onClick={onPrev}
                className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
                title="Previous Work"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
                title="Next Work"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main High Res Image */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs max-h-[500px] group">
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain mx-auto max-h-[500px]"
            />
            {onChangeImage && (
              <button
                onClick={() => onChangeImage(item)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] text-amber-400 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md transition cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Swap Photo</span>
              </button>
            )}
          </div>

          {/* Details & Subtext Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Main Title & Subtext */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xl font-bold text-neutral-900 leading-snug">
                {item.title}
              </h4>

              {item.subtext && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed font-normal">
                  <span className="font-bold text-neutral-900 block mb-1">Subtext / Overview:</span>
                  {item.subtext}
                </div>
              )}

              {item.description && (
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Case study metrics if present */}
              {isCaseStudy && (item as CaseStudy).metrics && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {(item as CaseStudy).metrics.map((m, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                      ✓ {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Metadata */}
            <div className="space-y-4 bg-neutral-50/80 p-4 rounded-2xl border border-neutral-200/80 text-xs">
              {'client' in item && item.client && (
                <div className="flex items-center gap-2 text-neutral-700">
                  <UserCheck className="w-4 h-4 text-neutral-400" />
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">Client / Project</span>
                    <span className="font-semibold text-neutral-900">{item.client}</span>
                  </div>
                </div>
              )}

              {'date' in item && item.date && (
                <div className="flex items-center gap-2 text-neutral-700">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">Year</span>
                    <span className="font-semibold text-neutral-900">{item.date}</span>
                  </div>
                </div>
              )}

              {item.tags && item.tags.length > 0 && (
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold mb-1.5 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Tags
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-[10px] text-neutral-700 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {('liveUrl' in item && item.liveUrl) || ('caseStudyUrl' in item && item.caseStudyUrl) ? (
                <a
                  href={('liveUrl' in item ? item.liveUrl : (item as CaseStudy).caseStudyUrl) || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Open Live Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
