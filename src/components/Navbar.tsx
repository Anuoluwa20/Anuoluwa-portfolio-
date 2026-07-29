import React, { useState } from 'react';
import { 
  Twitter, 
  Linkedin,
  Calendar, 
  Pencil, 
  Check, 
  Menu,
  X,
  Camera,
  Database
} from 'lucide-react';
import { PortfolioProfile } from '../types';

interface NavbarProps {
  profile: PortfolioProfile;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenBookCall: () => void;
  onOpenProfileEdit: () => void;
  onChangeAvatar?: () => void;
  onOpenSyncModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isEditMode,
  onToggleEditMode,
  onOpenBookCall,
  onOpenProfileEdit,
  onChangeAvatar,
  onOpenSyncModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-4 z-50 px-4 max-w-7xl mx-auto pointer-events-none">
      <div className="pointer-events-auto bg-[#EFECE6]/90 backdrop-blur-md border border-[#D8D4CC] rounded-full px-3 py-2 shadow-sm flex items-center justify-between gap-2 md:gap-4 transition-all">
        
        {/* Left: Avatar & Profile Info */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="relative group">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#D8D4CC] transition group-hover:scale-105"
            />
            {profile.availableForHire && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-600 border-2 border-[#EFECE6] rounded-full" title="Available for hire" />
            )}
          </div>
          
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-[#1A1A1A] leading-tight tracking-tight">{profile.name}</h1>
            <p className="text-xs text-[#8E8E8E] font-medium">{profile.role}</p>
          </div>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#E5E1D8] p-1 rounded-full border border-[#D8D4CC] text-xs font-semibold text-[#1A1A1A]/70">
          <button
            onClick={() => scrollToSection('home')}
            className="px-4 py-1.5 rounded-full hover:text-[#1A1A1A] hover:bg-[#F5F2ED] transition cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('case-studies')}
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1A1A] hover:bg-[#F5F2ED] transition cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('ui-works')}
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1A1A] hover:bg-[#F5F2ED] transition cursor-pointer"
          >
            UI Works
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1A1A] hover:bg-[#F5F2ED] transition cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1A1A] hover:bg-[#F5F2ED] transition cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="px-3.5 py-1.5 rounded-full hover:text-[#1A1A1A] hover:bg-[#F5F2ED] transition cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-1.5 rounded-full hover:text-[#1A1A1A] hover:bg-[#F5F2ED] transition cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right: Socials + Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-1">
            {profile.twitterUrl && (
              <a
                href={profile.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition"
                title="X (Twitter)"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Book a Call Primary Button */}
          <button
            onClick={onOpenBookCall}
            className="px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Book a call</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 p-4 bg-white/95 backdrop-blur-lg border border-neutral-200 rounded-2xl shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollToSection('home')}
            className="text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('case-studies')}
            className="text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            Selected Case Studies
          </button>
          <button
            onClick={() => scrollToSection('ui-works')}
            className="text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            UI Works & Explorations
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            About & Tools
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            Design Experience
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            Design Process
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-sm font-medium text-neutral-800"
          >
            Contact
          </button>
          <div className="pt-2 border-t border-neutral-100 flex items-center gap-3">
            {profile.twitterUrl && (
              <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="p-2 bg-neutral-100 rounded-full text-neutral-700" title="X (Twitter)">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 bg-neutral-100 rounded-full text-neutral-700" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
