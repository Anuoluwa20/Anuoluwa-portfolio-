import React from 'react';
import { Mail, Phone, Linkedin, MapPin, Sparkles, Send, ArrowUpRight, Calendar } from 'lucide-react';
import { PortfolioProfile } from '../types';

interface ContactCTAProps {
  profile: PortfolioProfile;
  onOpenBookCall: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ profile, onOpenBookCall }) => {
  return (
    <section id="contact" className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
      {/* Clean White End-of-Page Section matching reference screenshot */}
      <div className="bg-white border border-[#D8D4CC] rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden shadow-sm">
        
        {/* Centered Profile Avatar */}
        <div className="relative inline-block mb-4">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-md mx-auto ring-4 ring-[#EFECE6]"
          />
        </div>

        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F2ED] border border-[#D8D4CC] text-xs font-semibold text-[#1A1A1A] mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Taking bookings for Q3 2026</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-heading font-normal text-[#1A1A1A] tracking-tight leading-tight max-w-3xl mx-auto mb-8">
          Let's think carefully, move deliberately, and build something distinctive.
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <a
            href={profile.bookCallUrl || "https://cal.com/oyebanji-anuoluwapo-ivsr2j/15min"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md active:scale-95"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book a call</span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="px-6 py-3.5 rounded-full bg-[#EFECE6] hover:bg-[#E5E1D8] text-[#1A1A1A] text-xs font-bold flex items-center gap-2 transition border border-[#D8D4CC]"
          >
            <Send className="w-4 h-4 text-amber-700" />
            <span>Send a Message</span>
          </a>
        </div>

        {/* Footer Contact Info Columns Divider */}
        <div className="pt-10 border-t border-[#D8D4CC]/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
          
          {/* Email */}
          <div>
            <span className="text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest block mb-1">
              SEND AN EMAIL
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="text-xs font-mono font-semibold text-[#1A1A1A] hover:text-amber-800 transition truncate block"
            >
              {profile.email}
            </a>
          </div>

          {/* Phone */}
          <div>
            <span className="text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest block mb-1">
              PHONE NUMBER
            </span>
            <a
              href="tel:+2347030269759"
              className="text-xs font-mono font-semibold text-[#1A1A1A] hover:text-amber-800 transition block"
            >
              +234 703 026 9759
            </a>
          </div>

          {/* LinkedIn */}
          <div>
            <span className="text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest block mb-1">
              LINKEDIN
            </span>
            <a
              href={profile.linkedinUrl || "https://linkedin.com/in/oyebanji-anuoluwapo-163a62307"}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-semibold text-[#1A1A1A] hover:text-amber-800 transition truncate block"
            >
              oyebanji-anuoluwapo
            </a>
          </div>

          {/* Location */}
          <div>
            <span className="text-[10px] font-bold text-[#8E8E8E] uppercase tracking-widest block mb-1">
              LOCATION
            </span>
            <span className="text-xs font-mono font-semibold text-[#1A1A1A] block">
              Nigeria (Remote)
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
