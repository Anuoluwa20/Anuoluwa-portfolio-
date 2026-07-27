import React, { useState } from 'react';
import { PortfolioData } from '../types';
import { saveToCodebase } from '../lib/storage';
import { 
  X, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  Database, 
  Share2, 
  Sparkles, 
  FileJson,
  RefreshCw,
  Save
} from 'lucide-react';

interface SyncDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onImportData: (newData: PortfolioData) => void;
  onResetDefault: () => void;
}

export const SyncDataModal: React.FC<SyncDataModalProps> = ({
  isOpen,
  onClose,
  data,
  onImportData,
  onResetDefault,
}) => {
  const [pastedJson, setPastedJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [savingCodebase, setSavingCodebase] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSaveCodebase = async () => {
    setSavingCodebase(true);
    setErrorMsg('');
    try {
      const ok = await saveToCodebase(data);
      if (ok) {
        setSuccessMsg('Successfully saved current edits directly into src/data/defaultData.ts!');
      } else {
        setErrorMsg('Could not write to codebase file.');
      }
    } catch (e) {
      setErrorMsg('Failed to save to codebase file.');
    } finally {
      setSavingCodebase(false);
    }
  };

  const handleDownload = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSuccessMsg('Portfolio backup downloaded successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setSuccessMsg('Portfolio JSON copied to clipboard!');
    setTimeout(() => {
      setCopied(false);
      setSuccessMsg('');
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.profile && parsed.services) {
          onImportData(parsed);
          setSuccessMsg('Portfolio data imported successfully!');
          setErrorMsg('');
          setTimeout(() => {
            setSuccessMsg('');
            onClose();
          }, 1500);
        } else {
          setErrorMsg('Invalid portfolio JSON structure.');
        }
      } catch (err) {
        setErrorMsg('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleApplyPasted = () => {
    setErrorMsg('');
    if (!pastedJson.trim()) {
      setErrorMsg('Please paste valid JSON text.');
      return;
    }
    try {
      const parsed = JSON.parse(pastedJson);
      if (parsed && parsed.profile && parsed.services) {
        onImportData(parsed);
        setSuccessMsg('Pasted portfolio data applied!');
        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 1500);
      } else {
        setErrorMsg('Invalid JSON structure: Missing profile or services field.');
      }
    } catch (e) {
      setErrorMsg('Invalid JSON text format. Please check syntax.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#D8D4CC] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] text-amber-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif-heading font-medium text-[#1A1A1A]">
                Backup & Sync Published Data
              </h2>
              <p className="text-xs text-[#8E8E8E] font-medium">
                Keep your edits, uploaded images, and projects synced across sessions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E5E1D8] text-[#1A1A1A] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-900 rounded-2xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Section 0: Save directly to Codebase */}
        <div className="bg-[#1A1A1A] text-white border border-[#333333] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Save Current Edits directly to Codebase</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Permanent Code Storage
            </span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Writes all current images, bio, case studies, and text edits straight into <code className="text-amber-300 bg-neutral-900 px-1 py-0.5 rounded">src/data/defaultData.ts</code> in the project source code.
          </p>
          <div>
            <button
              onClick={handleSaveCodebase}
              disabled={savingCodebase}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingCodebase ? 'Saving to Codebase...' : 'Save directly to defaultData.ts'}</span>
            </button>
          </div>
        </div>

        {/* Section 1: Download / Export */}
        <div className="bg-[#F5F2ED] border border-[#D8D4CC] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-bold text-[#1A1A1A]">Export Your Portfolio JSON</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Full Backup
            </span>
          </div>
          <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
            Download your portfolio state (including custom uploaded images) as a JSON file.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download JSON Backup</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="px-4 py-2.5 rounded-xl bg-[#EFECE6] hover:bg-[#E5E1D8] text-[#1A1A1A] text-xs font-bold flex items-center gap-2 border border-[#D8D4CC] transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        {/* Section 2: Import Backup File */}
        <div className="bg-[#F5F2ED] border border-[#D8D4CC] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-bold text-[#1A1A1A]">Import Saved JSON File</span>
          </div>
          <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
            Restore your projects and uploaded photos on any browser or published version by selecting a backup JSON file.
          </p>
          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition cursor-pointer shadow-xs">
              <Upload className="w-4 h-4" />
              <span>Select & Restore JSON File</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Section 3: Paste JSON direct load */}
        <div className="bg-[#F5F2ED] border border-[#D8D4CC] rounded-2xl p-4 space-y-3">
          <span className="text-xs font-bold text-[#1A1A1A] block">Or Paste Portfolio JSON Code</span>
          <textarea
            rows={3}
            placeholder="Paste raw portfolio JSON code here..."
            value={pastedJson}
            onChange={(e) => setPastedJson(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#EFECE6] border border-[#D8D4CC] text-xs font-mono text-[#1A1A1A] placeholder:text-[#8E8E8E] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
          />
          <button
            onClick={handleApplyPasted}
            disabled={!pastedJson.trim()}
            className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
          >
            Apply Pasted Data
          </button>
        </div>

        {/* Reset Option */}
        <div className="pt-2 border-t border-[#D8D4CC] flex items-center justify-between text-xs">
          <span className="text-[#8E8E8E]">Need to start fresh?</span>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all portfolio data to default templates?')) {
                onResetDefault();
                onClose();
              }
            }}
            className="text-red-700 hover:text-red-900 font-bold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Template Defaults</span>
          </button>
        </div>

      </div>
    </div>
  );
};
