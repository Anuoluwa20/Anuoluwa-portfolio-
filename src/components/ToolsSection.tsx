import React from 'react';
import { ToolItem } from '../types';
import { Send, Calendar, Plus, Pencil, Trash2 } from 'lucide-react';

interface ToolsSectionProps {
  tools: ToolItem[];
  isEditMode: boolean;
  onOpenBookCall: () => void;
  onEditTool?: (tool: ToolItem) => void;
  onAddTool?: () => void;
  onDeleteTool?: (id: string) => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  tools,
  isEditMode,
  onOpenBookCall,
  onEditTool,
  onAddTool,
  onDeleteTool,
}) => {
  return (
    <section id="about" className="py-12 px-4 max-w-5xl mx-auto text-center">
      <p className="micro-label mb-6">Tools & Stack</p>

      {/* Floating Interactive Tool Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 max-w-3xl mx-auto">
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              transform: `rotate(${tool.rotationDeg || 0}deg)`,
            }}
            className="group relative px-4 py-2.5 rounded-2xl bg-[#EFECE6] border border-[#D8D4CC] shadow-xs flex items-center gap-2.5 cursor-default hover:scale-110 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            {/* Tool Colored Circle / Badge */}
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-xs"
              style={{ backgroundColor: tool.bgHex }}
            >
              {tool.name.charAt(0)}
            </div>

            <span className="text-xs font-bold text-[#1A1A1A] tracking-tight">
              {tool.name}
            </span>

            {/* Edit mode quick actions */}
            {isEditMode && onEditTool && onDeleteTool && (
              <div className="absolute -top-2 -right-2 flex items-center bg-neutral-900 text-white rounded-full p-0.5 shadow-md text-[10px]">
                <button
                  onClick={() => onEditTool(tool)}
                  className="p-1 hover:text-amber-300 transition"
                >
                  <Pencil className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => onDeleteTool(tool.id)}
                  className="p-1 hover:text-red-400 transition"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            )}
          </div>
        ))}

        {isEditMode && onAddTool && (
          <button
            onClick={onAddTool}
            className="px-3 py-2 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tool</span>
          </button>
        )}
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onOpenBookCall}
          className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-sm active:scale-95 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Book a call</span>
        </button>

        <button
          onClick={onOpenBookCall}
          className="px-6 py-3 rounded-full bg-[#EFECE6] hover:bg-[#E5E1D8] border border-[#D8D4CC] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4 text-[#8E8E8E]" />
          <span>Send a Message</span>
        </button>
      </div>
    </section>
  );
};
