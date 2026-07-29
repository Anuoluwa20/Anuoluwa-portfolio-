import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar, Send, CheckCircle, Sparkles, Clock, Mail, User } from 'lucide-react';
import { PortfolioProfile } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PortfolioProfile;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Product Design (SaaS & Mobile)',
    budget: '',
    date: '',
    time: '10:00 AM',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#F5F2ED] rounded-3xl shadow-2xl border border-[#D8D4CC] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#1A1A1A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="micro-label text-amber-300 mb-0.5">Inquiry</p>
              <h3 className="text-xl font-serif-heading font-medium text-white">Book a Call or Message</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-2">Request Received!</h4>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto mb-6">
                Thank you for reaching out, <span className="font-semibold text-neutral-900">{formData.name || 'there'}</span>! I've logged your request for <span className="font-semibold text-neutral-900">{formData.date || 'your selected date'}</span>. I will follow up via email within 12 hours.
              </p>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer transition shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Project Type
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <option value="Product Design (SaaS & Mobile)">Product Design (SaaS & Mobile)</option>
                    <option value="Landing Page & Rebrand">Landing Page & Rebrand</option>
                    <option value="Framer / Webflow Dev">Framer / Webflow Dev</option>
                    <option value="Design System & UI Audit">Design System & UI Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Custom Budget / Price ($)
                  </label>
                  <div className="relative">
                    <span className="text-neutral-400 text-xs font-bold absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <input
                      type="text"
                      placeholder="e.g. 2,500 or Flexible"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <option value="09:00 AM">09:00 AM EST</option>
                    <option value="11:00 AM">11:00 AM EST</option>
                    <option value="02:00 PM">02:00 PM EST</option>
                    <option value="04:00 PM">04:00 PM EST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Project Details / Subtext
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell me a bit about your goals, timelines, or inspiration..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-md active:scale-98"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Confirm Call Booking & Send</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
