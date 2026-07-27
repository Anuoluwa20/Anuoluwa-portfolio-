import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, Sparkles, RefreshCw } from 'lucide-react';
import { handleFileUpload } from '../lib/storage';

interface ChangeImageModalProps {
  isOpen: boolean;
  title?: string;
  currentImageUrl?: string;
  onClose: () => void;
  onSaveImage: (newUrl: string) => void;
}

// Preset design samples for quick 1-click selection
const PRESET_IMAGES = [
  {
    label: 'Modern Minimal UI',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Editorial Layout',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Dark Mode App',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Brand Identity',
    url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Mobile Banking App',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: '3D Mesh Gradient',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Editorial Designer Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Creative Studio',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
];

export const ChangeImageModal: React.FC<ChangeImageModalProps> = ({
  isOpen,
  title = 'Change Image',
  currentImageUrl = '',
  onClose,
  onSaveImage,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMsg('');
    try {
      const dataUrl = await handleFileUpload(file);
      setPreviewUrl(dataUrl);
    } catch (err: any) {
      setErrorMsg('Failed to process image file. Please try another image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMsg('');
    try {
      const dataUrl = await handleFileUpload(file);
      setPreviewUrl(dataUrl);
    } catch (err: any) {
      setErrorMsg('Failed to process image file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
  };

  const handleSelectPreset = (url: string) => {
    setPreviewUrl(url);
  };

  const handleSave = () => {
    if (!previewUrl) {
      setErrorMsg('Please select or upload an image first.');
      return;
    }
    onSaveImage(previewUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#F5F2ED] rounded-3xl shadow-2xl border border-[#D8D4CC] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-sans">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#D8D4CC] bg-[#EFECE6] shrink-0 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition border-t border-x cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#F5F2ED] border-[#D8D4CC] text-[#1A1A1A]'
                : 'border-transparent text-[#8E8E8E] hover:text-[#1A1A1A]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Local</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition border-t border-x cursor-pointer ${
              activeTab === 'url'
                ? 'bg-[#F5F2ED] border-[#D8D4CC] text-[#1A1A1A]'
                : 'border-transparent text-[#8E8E8E] hover:text-[#1A1A1A]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image URL</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition border-t border-x cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-[#F5F2ED] border-[#D8D4CC] text-[#1A1A1A]'
                : 'border-transparent text-[#8E8E8E] hover:text-[#1A1A1A]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Presets</span>
            </div>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-2xl text-xs text-red-800 font-semibold">
              {errorMsg}
            </div>
          )}

          {/* TAB 1: UPLOAD LOCAL FILE */}
          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D8D4CC] hover:border-[#1A1A1A] rounded-3xl p-8 bg-[#EFECE6]/60 hover:bg-[#EFECE6] transition-all text-center cursor-pointer group flex flex-col items-center justify-center gap-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div className="w-12 h-12 rounded-full bg-[#F5F2ED] border border-[#D8D4CC] flex items-center justify-center text-[#1A1A1A] shadow-xs group-hover:scale-110 transition-transform">
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-600" />
                ) : (
                  <Upload className="w-5 h-5 text-[#1A1A1A]" />
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">
                  Click or drag photo here to upload
                </p>
                <p className="text-xs text-[#8E8E8E] mt-1">
                  Supports PNG, JPG, WEBP, GIF (Auto-optimized for crisp resolution)
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: URL INPUT */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="micro-label block">Direct Image Link</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="editorial-input flex-1"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 rounded-2xl bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#333333]"
                >
                  Preview
                </button>
              </div>
              <p className="text-[11px] text-[#8E8E8E]">
                Paste any valid image web link from Unsplash, Behance, Dribbble, or Imgur.
              </p>
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_IMAGES.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectPreset(preset.url)}
                  className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer aspect-square group transition-all ${
                    previewUrl === preset.url
                      ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A]/30 scale-95'
                      : 'border-[#D8D4CC] hover:border-[#1A1A1A]'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <span className="text-[10px] text-white font-semibold line-clamp-1 block">
                      {preset.label}
                    </span>
                  </div>
                  {previewUrl === preset.url && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-[#1A1A1A] rounded-full text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PREVIEW CONTAINER */}
          {previewUrl && (
            <div className="border border-[#D8D4CC] rounded-3xl p-3 bg-[#EFECE6]">
              <p className="micro-label mb-2">Live Image Preview</p>
              <div className="relative rounded-2xl overflow-hidden bg-[#F5F2ED] max-h-56 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-52 w-full object-contain rounded-xl"
                  onError={() => setErrorMsg('Unable to display preview. Please check image URL.')}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#EFECE6] border-t border-[#D8D4CC] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-[#D8D4CC] hover:bg-[#F5F2ED] text-xs font-bold text-[#1A1A1A] uppercase tracking-wider cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            disabled={!previewUrl}
            className="px-6 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4 text-amber-400" />
            <span>Apply New Image</span>
          </button>
        </div>

      </div>
    </div>
  );
};
