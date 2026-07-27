import React from 'react';
import { Mail, Phone, Linkedin, MapPin, Sparkles, Send, ArrowUpRight } from 'lucide-react';
import { PortfolioProfile } from '../types';

interface ContactCTAProps {
  profile: PortfolioProfile;
  onOpenBookCall: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ profile, onOpenBookCall }) => {
  return (
    <section id="contact" className="pt-16 pb-12 px-4 max-w-6xl mx-auto">
      <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-[#333333]">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Let's Build Something Great</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-heading font-medium tracking-tight leading-tight text-white">
              Have a project in mind? Let's collaborate.
            </h2>

            <p className="text-sm sm:text-base text-[#8E8E8E] leading-relaxed max-w-xl">
              I'm always excited to collaborate on products that solve meaningful problems. Whether you're building a startup, improving an existing product, or looking for a Product Designer to join your team, I'd love to hear about your idea.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBookCall}
                className="px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm uppercase tracking-wider flex items-center gap-3 transition cursor-pointer shadow-lg active:scale-95"
              >
                <Send className="w-4 h-4 text-neutral-950" />
                <span>Book a Call / Send Message</span>
              </button>

              <a
                href={`mailto:${profile.email}`}
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2.5 transition border border-white/20"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Direct Email</span>
              </a>
            </div>
          </div>

          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 bg-[#262626] border border-[#333333] rounded-2xl p-6 sm:p-8 space-y-5 shadow-inner">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-[#333333] pb-3">
              Direct Channels
            </h3>

            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] transition group border border-[#333333]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#8E8E8E] font-bold uppercase">Email</p>
                  <p className="text-xs font-mono font-medium text-white group-hover:text-amber-300 transition-colors">
                    {profile.email}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8E8E8E] group-hover:text-amber-400 transition-colors" />
            </a>

            {/* Phone */}
            <a
              href="tel:+2347030269759"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] transition group border border-[#333333]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#8E8E8E] font-bold uppercase">Phone</p>
                  <p className="text-xs font-mono font-medium text-white group-hover:text-emerald-300 transition-colors">
                    +234 703 026 9759
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8E8E8E] group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedinUrl || "https://linkedin.com/in/oyebanji-anuoluwapo-163a62307"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] transition group border border-[#333333]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#8E8E8E] font-bold uppercase">LinkedIn</p>
                  <p className="text-xs font-mono font-medium text-white group-hover:text-blue-300 transition-colors">
                    oyebanji-anuoluwapo
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8E8E8E] group-hover:text-blue-400 transition-colors" />
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1A1A1A] border border-[#333333]">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#8E8E8E] font-bold uppercase">Location</p>
                <p className="text-xs text-white/90">Osun State, Nigeria (Open to Remote Opportunities)</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
