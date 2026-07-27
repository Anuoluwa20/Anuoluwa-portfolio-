import React, { useState } from 'react';
import {
  Briefcase,
  Compass,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Layers,
  Cpu,
  Workflow
} from 'lucide-react';

interface AboutExperienceProcessProps {
  onOpenBookCall?: () => void;
  onChangeAvatar?: () => void;
  avatarUrl?: string;
}

const EXPERIENCES = [
  {
    company: 'QuickByte Food Delivery',
    role: 'Product Designer',
    period: 'March 2026 – Present',
    industry: 'FoodTech & E-commerce',
    description:
      'QuickByte is a comprehensive food delivery platform connecting customers, restaurants, and administrators through an intuitive digital ecosystem.',
    responsibilities: [
      'Designed the complete ordering journey from restaurant discovery to checkout.',
      'Created customer, vendor, and admin dashboards with real-time analytics.',
      'Designed wallet and digital payment experiences.',
      'Built a scalable design system for web and mobile platforms.',
      'Created interactive prototypes and collaborated closely with developers throughout implementation.',
    ],
    keyFeatures: [
      'Restaurant Discovery',
      'Order Tracking',
      'Wallet & Payouts',
      'Vendor Dashboard',
      'Admin Console',
      'Personalized Recommendations',
    ],
  },
  {
    company: 'Tap Ontime Payment',
    role: 'Product Designer',
    period: '2026',
    industry: 'Fintech',
    description:
      'Tap Ontime Payment is a fintech platform focused on making digital payments secure, simple, and reliable.',
    responsibilities: [
      'Designed secure payment flows and zero-friction transfer journeys.',
      'Created wallet funding, balance summaries, and transaction history logs.',
      'Designed biometrics authentication flows and QR payment confirmation.',
      'Built responsive interfaces and reusable design system components.',
    ],
    outcome:
      'Developed a frictionless payment experience focused on speed, trust, and usability across desktop and mobile.',
    keyFeatures: ['Money Transfer', 'Wallet', 'Transaction History', 'Authentication', 'QR Payments'],
  },
  {
    company: 'VulnWatch AI',
    role: 'Product Designer',
    period: 'April 2026',
    industry: 'Cybersecurity & AI',
    description:
      'VulnWatch AI is an AI-powered cybersecurity platform that enables businesses to scan websites and web applications for security vulnerabilities.',
    responsibilities: [
      'Designed website vulnerability scanning experience and threat dashboards.',
      'Created intuitive vulnerability reports, security scores, and remediation workflows.',
      'Built reusable UI components for complex security metric visualizers.',
    ],
    outcome:
      'Simplified complex cybersecurity information into an easy-to-understand experience that enables organizations to identify and resolve security issues efficiently.',
    keyFeatures: ['Website Scanner', 'Security Dashboard', 'Risk Scores', 'Vulnerability Reports', 'Remediation Workflows'],
  },
  {
    company: 'Xtreeq Campus Transit',
    role: 'Product Designer',
    period: 'April 2026',
    industry: 'Mobility & Transportation',
    description:
      'Xtreeq is a campus mobility platform that simplifies transportation for students through digital booking and cashless payments.',
    responsibilities: [
      'Designed ride booking experience and student wallet funding flow.',
      'Designed contactless QR ticketing, trip history, and real-time shuttle tracking.',
      'Created responsive interfaces and improved campus commuting usability.',
    ],
    outcome:
      'Delivered a streamlined transportation experience that reduced booking friction and simplified campus commuting.',
    keyFeatures: ['Ride Booking', 'Wallet Funding', 'QR Tickets', 'Trip History', 'Real-time Tracking'],
  },
];

const PROCESS_STEPS = [
  { step: '01', name: 'Discover', desc: 'Understand business objectives, target users, and key product goals.' },
  { step: '02', name: 'Research', desc: 'Conduct competitive audits and user research to pinpoint core friction.' },
  { step: '03', name: 'Define', desc: 'Clarify core problem statements, user needs, and measurable success metrics.' },
  { step: '04', name: 'Ideate', desc: 'Explore multiple design directions, information architectures, and user flows.' },
  { step: '05', name: 'Wireframe', desc: 'Create low-fidelity structural layouts to establish screen hierarchy.' },
  { step: '06', name: 'Design', desc: 'Develop polished, high-fidelity interfaces backed by scalable design systems.' },
  { step: '07', name: 'Prototype', desc: 'Build interactive prototypes to validate micro-interactions and journeys.' },
  { step: '08', name: 'Test', desc: 'Gather feedback through usability testing sessions and stakeholder reviews.' },
  { step: '09', name: 'Iterate', desc: 'Refine designs based on real user insights, accessibility, and scale.' },
  { step: '10', name: 'Deliver', desc: 'Prepare developer-ready specs, Figma tokens, and component documentation.' },
];

const SKILLS_LIST = [
  'Product Design',
  'User Experience (UX) Design',
  'User Interface (UI) Design',
  'Interaction Design',
  'Design Systems',
  'Information Architecture',
  'UX Research',
  'Wireframing',
  'Interactive Prototyping',
  'Usability Testing',
  'Responsive Design',
  'Accessibility (WCAG)',
  'Developer Handoff',
  'Visual Design',
  'AI-Assisted Design',
];

export const AboutExperienceProcess: React.FC<AboutExperienceProcessProps> = ({
  onOpenBookCall,
  onChangeAvatar,
  avatarUrl,
}) => {
  const [activeExpIndex, setActiveExpIndex] = useState(0);

  return (
    <div className="space-y-20 py-12 px-4 max-w-6xl mx-auto">
      
      {/* SECTION 1: ABOUT ME & DESIGN PHILOSOPHY */}
      <section id="about" className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bio Column */}
          <div className="lg:col-span-7 bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="flex items-center gap-2">
              <span className="micro-label">About Me</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight leading-tight">
              Designing intuitive products that solve real problems through thoughtful user experiences.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed font-normal">
              <p>
                I'm <strong>Oyebanji Anuoluwapo Eniola</strong>, a Product Designer with over 2 years of experience designing digital products across <strong>Fintech, Food Delivery, Cybersecurity, Mobility, E-commerce, AI, and EdTech</strong>.
              </p>
              <p>
                My design process combines research, user flows, information architecture, wireframing, prototyping, design systems, and close collaboration with developers to deliver products that are scalable, accessible, and implementation-ready.
              </p>
              <p>
                I continuously explore emerging AI technologies, interaction patterns, and modern product design methodologies to create experiences that delight users while driving measurable business value.
              </p>
            </div>

            {/* Location & Links */}
            <div className="pt-6 border-t border-[#D8D4CC] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Osun State, Nigeria (Open to Remote Opportunities)</span>
              </div>

              {onOpenBookCall && (
                <button
                  onClick={onOpenBookCall}
                  className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get in Touch</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Design Philosophy Column */}
          <div className="lg:col-span-5 bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="micro-label text-amber-300">Core Belief</span>
                <Compass className="w-5 h-5 text-amber-400" />
              </div>

              <h3 className="text-2xl font-serif-heading font-medium leading-snug text-white">
                "Great products aren't created by adding more features—they're built by removing friction."
              </h3>

              <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed">
                My process starts with understanding users, identifying pain points, and exploring multiple solutions before crafting polished interfaces. Every decision is guided by usability, accessibility, scalability, and measurable business impact.
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="pt-6 border-t border-[#333333] space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-[#8E8E8E] font-bold">Contact Direct</p>
              <p className="text-xs font-mono text-amber-300 select-all">anuoluwaoyebanjo20@gmail.com</p>
              <p className="text-xs font-mono text-white/80">+234 703 026 9759</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: PROFESSIONAL EXPERIENCE TIMELINE */}
      <section id="experience" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="micro-label">Career Journey</p>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm text-[#8E8E8E]">
            Over 2 years of hands-on product design across diverse tech ecosystems.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline Selector Tabs (Left) */}
          <div className="lg:col-span-4 space-y-3">
            {EXPERIENCES.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveExpIndex(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                  activeExpIndex === idx
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md scale-[1.02]'
                    : 'bg-[#EFECE6] hover:bg-[#E5E1D8] border-[#D8D4CC] text-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    activeExpIndex === idx ? 'text-amber-400' : 'text-[#8E8E8E]'
                  }`}>
                    {exp.period}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeExpIndex === idx ? 'bg-white/10 text-white' : 'bg-[#F5F2ED] text-[#1A1A1A]'
                  }`}>
                    {exp.industry}
                  </span>
                </div>

                <h3 className="text-base font-bold leading-tight mt-1">{exp.company}</h3>
                <p className={`text-xs ${activeExpIndex === idx ? 'text-[#8E8E8E]' : 'text-[#8E8E8E]'}`}>
                  {exp.role}
                </p>
              </button>
            ))}
          </div>

          {/* Detailed Experience View (Right) */}
          <div className="lg:col-span-8 bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl p-8 space-y-6">
            {(() => {
              const exp = EXPERIENCES[activeExpIndex];
              return (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8D4CC]">
                    <div>
                      <span className="micro-label text-amber-700">{exp.industry}</span>
                      <h3 className="text-2xl font-serif-heading font-medium text-[#1A1A1A] mt-1">{exp.company}</h3>
                      <p className="text-xs text-[#8E8E8E] font-semibold">{exp.role} • {exp.period}</p>
                    </div>

                    <div className="px-3 py-1.5 rounded-full bg-[#F5F2ED] border border-[#D8D4CC] text-xs font-bold text-[#1A1A1A]">
                      Active Record
                    </div>
                  </div>

                  <p className="text-sm text-[#1A1A1A] font-normal leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-3">
                    <h4 className="micro-label">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs text-[#1A1A1A]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome if available */}
                  {exp.outcome && (
                    <div className="p-4 bg-[#F5F2ED] rounded-2xl border border-[#D8D4CC] space-y-1">
                      <p className="micro-label text-amber-800">Impact & Outcome</p>
                      <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">{exp.outcome}</p>
                    </div>
                  )}

                  {/* Feature Chips */}
                  <div className="pt-4 border-t border-[#D8D4CC]/80 space-y-2">
                    <p className="micro-label">Core Modules Designed</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.keyFeatures.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-3 py-1 rounded-full bg-[#F5F2ED] border border-[#D8D4CC] text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

        </div>
      </section>

      {/* SECTION 3: 10-STEP DESIGN PROCESS */}
      <section id="process" className="space-y-8 bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="micro-label text-amber-300">Methodology</p>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-medium text-white tracking-tight">
            My Design Process
          </h2>
          <p className="text-xs sm:text-sm text-[#8E8E8E]">
            A structured, 10-step iterative framework for solving complex problems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
          {PROCESS_STEPS.map((ps, idx) => (
            <div
              key={idx}
              className="bg-[#262626] border border-[#333333] hover:border-amber-400/50 rounded-2xl p-5 space-y-3 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 group-hover:scale-110 transition-transform">
                  {ps.step}
                </span>
                <Workflow className="w-3.5 h-3.5 text-[#8E8E8E]" />
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {ps.name}
              </h3>

              <p className="text-[11px] text-[#8E8E8E] leading-snug">
                {ps.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: SKILLS & CAPABILITIES */}
      <section id="skills" className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="micro-label">Core Competencies</p>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-medium text-[#1A1A1A] tracking-tight">
            Skills & Capabilities
          </h2>
        </div>

        <div className="bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl p-8 flex flex-wrap gap-2.5 justify-center">
          {SKILLS_LIST.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2.5 rounded-full bg-[#F5F2ED] hover:bg-white text-[#1A1A1A] text-xs font-bold border border-[#D8D4CC] shadow-xs transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
};
