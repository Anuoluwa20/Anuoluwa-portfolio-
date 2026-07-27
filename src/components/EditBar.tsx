import React, { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Sparkles,
  Database,
  Save,
  X
} from 'lucide-react';

interface EditBarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onAddUIWork: () => void;
  onAddCaseStudy: () => void;
  onEditProfile: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  onOpenSyncModal?: () => void;
  onSaveToCodebase?: () => Promise<boolean>;
}

export const EditBar: React.FC<EditBarProps> = ({
  isEditMode,
  onToggleEditMode,
  onAddUIWork,
  onAddCaseStudy,
  onEditProfile,
  onExportData,
  onImportData,
  onResetData,
  onOpenSyncModal,
  onSaveToCodebase,
}) => {
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isEditMode) return null;

  const handleSaveToCodebase = async () => {
    if (!onSaveToCodebase) return;
    setSaving(true);
    const ok = await onSaveToCodebase();
    setSaving(false);
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-4xl pointer-events-none animate-in slide-in-from-bottom-6 duration-300">
      <div className="pointer-events-auto bg-[#1A1A1A]/95 text-white backdrop-blur-md rounded-2xl p-3 border border-[#333333] shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Status Indicator & Direct Save */}
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-center gap-1 text-[#8E8E8E] font-medium text-[11px] uppercase tracking-wider">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Storage: Auto-Sync</span>
          </div>
        </div>

        {/* Quick Add Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onAddUIWork}
            className="px-3 py-1.5 rounded-xl bg-[#EFECE6] hover:bg-[#E5E1D8] text-[#1A1A1A] font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload UI Work</span>
          </button>

          <button
            onClick={onAddCaseStudy}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </button>

          <button
            onClick={onEditProfile}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium flex items-center gap-1 transition cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Bio & Avatar</span>
          </button>

          {onSaveToCodebase && (
            <button
              onClick={handleSaveToCodebase}
              disabled={saving}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition cursor-pointer ${
                savedSuccess
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
              }`}
              title="Save all edits directly into defaultData.ts in source code"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savedSuccess ? 'Saved to Codebase!' : saving ? 'Saving...' : 'Save to Codebase'}</span>
            </button>
          )}
        </div>

        {/* Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExportData}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer"
            title="Export Backup JSON"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <label
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition cursor-pointer"
            title="Import Backup JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <input type="file" accept=".json" onChange={onImportData} className="hidden" />
          </label>

          <button
            onClick={onResetData}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-red-400 transition cursor-pointer"
            title="Reset to Template Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleEditMode}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium flex items-center gap-1 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Editor</span>
          </button>
        </div>

      </div>
    </div>
  );
};
