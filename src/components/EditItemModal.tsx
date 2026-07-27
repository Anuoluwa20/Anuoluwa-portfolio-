import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { handleFileUpload } from '../lib/storage';

export type EditType = 'uiWork' | 'caseStudy' | 'service' | 'testimonial' | 'tool' | 'profile';

interface EditItemModalProps {
  isOpen: boolean;
  type: EditType | null;
  initialData: any;
  onClose: () => void;
  onSave: (type: EditType, itemData: any) => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  type,
  initialData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      // Default blank templates based on edit type
      if (type === 'uiWork') {
        setFormData({
          title: '',
          category: 'Mobile Apps',
          imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
          subtext: '',
          description: '',
          tags: ['Mobile UX', 'Figma'],
          client: '',
          date: new Date().getFullYear().toString(),
          liveUrl: '',
        });
      } else if (type === 'caseStudy') {
        setFormData({
          title: '',
          companyName: '',
          tagline: '',
          description: '',
          subtext: '',
          metrics: ['100K+ Downloads'],
          tags: ['Fintech', 'Mobile UX'],
          imageUrl: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&q=80&w=1200',
          caseStudyUrl: '',
          featured: true,
        });
      } else if (type === 'service') {
        setFormData({
          title: '',
          description: '',
          iconName: 'PenTool',
          tags: ['UX Research', 'Design Systems'],
        });
      } else if (type === 'testimonial') {
        setFormData({
          quote: '',
          authorName: '',
          authorRole: '',
          company: '',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          badgeBg: 'bg-blue-600 text-white',
        });
      } else if (type === 'tool') {
        setFormData({
          name: '',
          bgHex: '#0055FF',
          rotationDeg: -3,
        });
      } else if (type === 'profile') {
        setFormData({ ...initialData });
      }
    }
  }, [initialData, type, isOpen]);

  if (!isOpen || !type) return null;

  // File Upload Handler
  const onFileChange = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const savedImageUrl = await handleFileUpload(file);
      if (type === 'profile') {
        setFormData((prev: any) => ({ ...prev, avatarUrl: savedImageUrl }));
      } else if (type === 'testimonial') {
        setFormData((prev: any) => ({ ...prev, avatarUrl: savedImageUrl }));
      } else {
        setFormData((prev: any) => ({ ...prev, imageUrl: savedImageUrl }));
      }
    } catch (err) {
      console.error('File upload failed:', err);
      alert('Could not upload image. Please try a different file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(type, formData);
  };

  // Helper for comma separated tags
  const tagsString = Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || '';
  const metricsString = Array.isArray(formData.metrics) ? formData.metrics.join(', ') : formData.metrics || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#F5F2ED] rounded-3xl shadow-2xl border border-[#D8D4CC] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans">
              {initialData?.id ? `Edit ${type}` : `Add New ${type}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">

          {/* Image Uploader Component for UI Work, Case Study, Profile or Testimonial */}
          {(type === 'uiWork' || type === 'caseStudy' || type === 'profile' || type === 'testimonial') && (
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Upload Image / Photo (Saved to Persistent Storage)
              </label>

              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  dragActive
                    ? 'border-amber-500 bg-amber-50/50'
                    : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50'
                }`}
              >
                {/* Image Preview Thumbnail */}
                {(formData.imageUrl || formData.avatarUrl) ? (
                  <div className="relative group w-full max-h-40 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300">
                    <img
                      src={formData.imageUrl || formData.avatarUrl}
                      alt="Preview"
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <span>Click or Drop to Replace</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-neutral-700">
                      {isUploading ? 'Compressing & Storing...' : 'Drag & drop image here or browse'}
                    </p>
                    <p className="text-[10px] text-neutral-400">PNG, JPG, WebP supported</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && onFileChange(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Or manual URL input */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Or paste image web URL (https://...)"
                  value={formData.imageUrl || formData.avatarUrl || ''}
                  onChange={(e) => {
                    const url = e.target.value;
                    if (type === 'profile' || type === 'testimonial') {
                      setFormData({ ...formData, avatarUrl: url });
                    } else {
                      setFormData({ ...formData, imageUrl: url });
                    }
                  }}
                  className="w-full px-3 py-1.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 placeholder:text-neutral-400"
                />
              </div>
            </div>
          )}

          {/* Title & Name fields */}
          {(type === 'uiWork' || type === 'caseStudy' || type === 'service' || type === 'tool') && (
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Title / Name</label>
              <input
                type="text"
                required
                value={formData.title || formData.name || ''}
                onChange={(e) => {
                  if (type === 'tool') setFormData({ ...formData, name: e.target.value });
                  else setFormData({ ...formData, title: e.target.value });
                }}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          )}

          {/* Profile fields */}
          {type === 'profile' && (
            <>
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Role / Title</label>
                <input
                  type="text"
                  required
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Bio / Tagline</label>
                <input
                  type="text"
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Twitter / X Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://x.com/yourusername"
                    value={formData.twitterUrl || ''}
                    onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourusername"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                  />
                </div>
              </div>
            </>
          )}

          {/* Category for UI Work */}
          {type === 'uiWork' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Category Filter</label>
                <input
                  type="text"
                  placeholder="e.g. Mobile Apps, Websites, Dashboard"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Culina AI, Self Project"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
            </div>
          )}

          {/* Subtext Field (Crucial as requested by User!) */}
          {(type === 'uiWork' || type === 'caseStudy') && (
            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1 flex items-center gap-1">
                <span>Subtext Field / Key Highlights</span>
              </label>
              <textarea
                rows={2}
                placeholder="Add subtext description or caption for this project..."
                value={formData.subtext || ''}
                onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>
          )}

          {/* Description field */}
          {(type === 'uiWork' || type === 'caseStudy' || type === 'service') && (
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Full Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
              />
            </div>
          )}

          {/* Case study metrics */}
          {type === 'caseStudy' && (
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Impact Metrics (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="100K+ Downloads, +38% Payouts, 4.8★ Rating"
                value={metricsString}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    metrics: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
              />
            </div>
          )}

          {/* Tags */}
          {(type === 'uiWork' || type === 'caseStudy' || type === 'service') && (
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="Mobile UX, Figma, Dark Mode"
                value={tagsString}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
              />
            </div>
          )}

          {/* Testimonial fields */}
          {type === 'testimonial' && (
            <>
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Client Quote</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formData.authorName || ''}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Company / Role</label>
                  <input
                    type="text"
                    required
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                  />
                </div>
              </div>
            </>
          )}

          {/* Tool fields */}
          {type === 'tool' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Badge Color (Hex)</label>
                <input
                  type="color"
                  value={formData.bgHex || '#0055FF'}
                  onChange={(e) => setFormData({ ...formData, bgHex: e.target.value })}
                  className="w-full h-10 p-1 rounded-xl border border-neutral-200 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Tilt Angle (°)</label>
                <input
                  type="number"
                  min="-15"
                  max="15"
                  value={formData.rotationDeg || 0}
                  onChange={(e) => setFormData({ ...formData, rotationDeg: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-900"
                />
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5 text-amber-400" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
