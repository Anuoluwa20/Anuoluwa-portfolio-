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
    period: '2026',
    industry: 'UI/UX Design · Product Design · Mobile App Design',
    description:
      'QuickByte is a fast, convenient food delivery app designed to make ordering meals simple, seamless, and enjoyable.',
    responsibilities: [
      'QuickByte is a food delivery experience designed for people who want to discover meals, order quickly, and manage their food purchases with ease.',
      'Designed the product experience around simple navigation, effortless ordering, and a smooth checkout journey.',
      'Created a visual system that feels modern, bold, and engaging.',
    ],
    keyFeatures: [
      'Simple Navigation',
      'Effortless Ordering',
      'Smooth Checkout',
      'Modern & Bold Visual System',
      'Food Discovery',
    ],
  },
  {
    company: 'One Tap — Frictionless Payment Platform',
    role: 'Lead Product Designer',
    period: '2026',
    industry: 'Fintech / Payment Product',
    description:
      'One Tap is a fast and secure payment solution that lets businesses accept seamless one-time payments with just a tap.',
    responsibilities: [
      'One Tap is a payment solution designed to make transactions faster, simpler, and more secure for businesses and their customers.',
      'Designed the product experience with a strong focus on simplicity, speed, trust, and ease of use.',
      'Worked across the user journey to create intuitive payment flows and a clean interface that makes completing transactions feel effortless.',
    ],
    outcome:
      'Engineered an effortless, high-trust payment experience allowing users to complete transactions quickly without checkout friction.',
    keyFeatures: ['One-Time Payments', 'Payment Experience', 'User Flows', 'Interaction Design', 'Simplicity & Speed'],
  },
  {
    company: 'Glance Captions — UI Recreation',
    role: 'Product Designer',
    period: '2026',
    industry: 'UI Recreation / Design Exploration',
    description:
      'A UI recreation of Glance Captions, exploring its interface, visual language, and user experience through a hands-on design exercise.',
    responsibilities: [
      'Recreated key parts of the Glance Captions interface to study typography, spacing, and component structure.',
      'Analysed interaction patterns, visual hierarchy, and usability flow across mobile light mode screens.',
      'Strengthened systematic UI translation capabilities for complex app interfaces.',
    ],
    outcome:
      'Produced a high-fidelity mobile UI recreation that dissects Glance Captions’ design system and layout architecture.',
    keyFeatures: ['UI Design', 'Visual Design', 'Interaction Design', 'Design Systems', 'Mobile Screens'],
  },
  {
    company: 'World Builder — Story & World-Building Platform',
    role: 'Product Designer',
    period: '2026',
    industry: 'Creative / World-Building Platform',
    description:
      'World Builder helps creatives and authors organize complex stories, connect ideas, and keep track of characters, timelines, and storylines without losing the bigger picture.',
    responsibilities: [
      'Gave creatives a structured space to build and organize fictional worlds, connect characters, and map out timelines.',
      'Designed intuitive node diagrams, timeline event forms, faction dashboards, and lore documentation interfaces.',
      'Focused on simplifying complex narrative information architecture into approachable web interactions.',
    ],
    outcome:
      'Engineered an intuitive creative workspace that enables authors to seamlessly connect complex narrative elements.',
    keyFeatures: ['World Building', 'Character Graphs', 'Timeline Events', 'Faction Dashboards', 'Lore Documentation'],
  },
  {
    company: 'Wander — Travel Discovery & Planning App',
    role: 'Product Designer',
    period: '2026',
    industry: 'Travel Tech & Mobile App',
    description:
      'A travel app designed to help users discover destinations, explore curated experiences, find places to stay, and plan trips seamlessly in one place.',
    responsibilities: [
      'Designed end-to-end travel discovery flows from destination search to stay bookings.',
      'Created interactive itinerary cards, search filters, and trip management tools.',
      'Focused on high-impact visual presentation and intuitive mobile travel navigation.',
    ],
    outcome:
      'Delivered a comprehensive travel discovery app interface that streamlines itinerary planning and booking.',
    keyFeatures: ['Travel Discovery', 'Itinerary Planning', 'Stay Bookings', 'Destination Search', 'Mobile UX'],
  },
  {
    company: 'Wealth — Personal Finance & Investment App',
    role: 'Product Designer',
    period: '2026',
    industry: 'Fintech & Personal Finance',
    description:
      'A personal finance app designed to help users track their net worth, manage assets, understand their portfolio, and gain financial insights through a simple and intuitive experience.',
    responsibilities: [
      'Designed net worth dashboards, asset allocation donut charts, and portfolio analytics.',
      'Created AI financial insights, personalized tips, and goal tracking interfaces.',
      'Transformed complex personal financial metrics into clear, visual mobile cards.',
    ],
    outcome:
      'Built a clear, high-trust financial dashboard empowering users to monitor wealth and asset distribution effortlessly.',
    keyFeatures: ['Net Worth Tracking', 'Asset Breakdown', 'Portfolio Mix', 'Financial Insights', 'Fintech UI'],
  },
  {
    company: 'QuickTask — Smart Reminder & Productivity App',
    role: 'Product Designer',
    period: '2026',
    industry: 'Productivity & Mobile App',
    description:
      'A productivity app designed to help users stay organized by managing tasks, schedules, and payment reminders in one simple and intuitive experience.',
    responsibilities: [
      'Designed payment reminder widgets, scheduled task cards, and outing calendar timelines.',
      'Created onboarding screens and frictionless task creation workflows.',
      'Focused on reducing cognitive clutter and keeping users punctual on financial and daily commitments.',
    ],
    outcome:
      'Engineered a clean mobile productivity interface that unifies payment deadlines and daily scheduling.',
    keyFeatures: ['Payment Reminders', 'Task Schedules', 'Outing Calendar', 'Productivity UI', 'Onboarding Flows'],
  },
  {
    company: 'E-commerce Shopping App — Mobile Experience',
    role: 'Product Designer',
    period: '2026',
    industry: 'E-commerce & Mobile App',
    description:
      'A mobile shopping experience designed to help users discover products, explore categories, view detailed product information, manage their cart, and complete purchases with minimal friction.',
    responsibilities: [
      'Focused on creating a clean and intuitive shopping journey from initial discovery to checkout.',
      'Designed product browsing, category navigation, detailed item specs, and interactive cart flows.',
      'Optimized micro-interactions and mobile layout hierarchy to make shopping visual and effortless.',
    ],
    outcome:
      'Delivered a polished mobile shopping UI with a frictionless checkout and cart experience.',
    keyFeatures: ['Product Discovery', 'Category Navigation', 'Item Details', 'Cart UI', 'Frictionless Checkout'],
  },
  {
    company: 'Healthcare Management Dashboard — Practice Platform',
    role: 'Product Designer',
    period: '2026',
    industry: 'Healthcare / SaaS Dashboard',
    description:
      'A healthcare management dashboard designed to help medical professionals efficiently manage appointments, patients, schedules, and practice operations in one place.',
    responsibilities: [
      'Centralized medical appointments, patient records, practice schedules, reminders, and activity reports.',
      'Transformed complex healthcare information into clear, scannable data visualizations and medical calendar workflows.',
      'Designed dashboard navigation and key clinic administration workflows with high clarity and usability.',
    ],
    outcome:
      'Engineered an intuitive SaaS practice management dashboard that streamlines day-to-day medical clinic operations.',
    keyFeatures: ['Appointment Calendar', 'Patient Records', 'Practice Analytics', 'Medical UX', 'Design Systems'],
  },
  {
    company: 'MindAI — Conversational AI Assistant',
    role: 'Product Designer',
    period: '2026',
    industry: 'AI & Mobile Application',
    description:
      'An AI assistant designed to provide users with a simple, conversational space to ask questions, share thoughts, and get helpful responses through an intuitive chat experience.',
    responsibilities: [
      'Focused on designing a conversational experience that feels clear, human, and lightweight to navigate.',
      'Worked on chat flows, message state indicators, input bar micro-interactions, and message feedback actions (like/dislike/copy).',
      'Designed a smooth mobile experience from starting a conversation to receiving AI responses.',
    ],
    outcome:
      'Delivered a friendly, intuitive mobile conversational interface that simplifies AI interaction.',
    keyFeatures: ['Conversational UX', 'AI Assistant', 'Mobile Chat UI', 'Message Feedback', 'Interaction Design'],
  },
  {
    company: 'EventConnect — Event Discovery & Social Platform',
    role: 'Product Designer',
    period: '2026',
    industry: 'Social / Event Platform',
    description:
      'EventConnect is designed to make it easier for people to find events they care about, connect with like-minded people, and stay engaged before, during, and after an event.',
    responsibilities: [
      'Brought event discovery and social connections together into one seamless mobile experience.',
      'Designed attendee connection lists, 1-on-1 direct messaging flows, and chat inbox interfaces.',
      'Focused on discovery, community building, and friction-free interactions for upcoming activities.',
    ],
    outcome:
      'Created a vibrant social event platform that enables users to transition seamlessly from discovering events to joining active communities.',
    keyFeatures: ['Event Discovery', 'Social UX', 'Attendee Connections', '1-on-1 Chat', 'Community Platform'],
  },
  {
    company: 'AI Assistant — Landing Page',
    role: 'Product Designer',
    period: '2026',
    industry: 'Landing Page / Web Design',
    description:
      'An AI assistant landing page designed to showcase a smart, intuitive, and conversational AI experience through a clean and modern interface.',
    responsibilities: [
      'Built a modern landing page concept for an AI assistant to communicate product capabilities.',
      'Designed approachable, intelligent, and easy-to-understand conversational AI showcase components.',
      'Established a strong visual hierarchy, clear messaging, engaging interactions, and a polished web interface.',
    ],
    outcome:
      'Created an engaging web landing page experience that guides visitors seamlessly from product discovery to value comprehension.',
    keyFeatures: ['AI Landing Page', 'Web Design', 'Visual Hierarchy', 'Conversational AI UI', 'Interaction Design'],
  },
  {
    company: 'VulnWatch — Cybersecurity Vulnerability Scanning Platform',
    role: 'Lead Product Designer',
    period: '2026',
    industry: 'Cybersecurity / SaaS',
    description:
      'VulnWatch is a cybersecurity platform designed to make website security more accessible to businesses and individuals. Users can scan their domains to identify vulnerabilities, security weaknesses, and potential risks across their digital infrastructure.',
    responsibilities: [
      'Focused on turning a technically complex security process into an experience that feels clear, trustworthy, and easy to understand.',
      'Designed core user flows, domain scanning experience, vulnerability reports, security compliance export UI, and dashboard.',
      'Helped users quickly understand what is wrong, how serious the issue is, and what needs attention.',
    ],
    outcome:
      'Transformed complex cybersecurity technical data into an intuitive SaaS dashboard that empowers users to configure and export compliance reports effortlessly.',
    keyFeatures: ['Cybersecurity', 'SaaS Dashboard', 'Security UX', 'Data Visualization', 'Vulnerability Reports', 'User Flows'],
  },

  {
    company: 'Jiji Marketplace — UX/UI Redesign',
    role: 'Product Designer',
    period: '2026',
    industry: 'UI/UX Redesign · E-commerce & Marketplace',
    description:
      'I redesigned the Jiji marketplace experience to address areas where the existing interface felt visually crowded and difficult to navigate, focusing on visual hierarchy, product discovery, and filtering.',
    responsibilities: [
      'Reworked product listing layouts, navigation, search experience, filters, product cards, and information hierarchy.',
      'Designed a cleaner, more organized marketplace interface while preserving familiar core functionality.',
      'Improved product discovery and listing comparison speed for shoppers.',
    ],
    outcome:
      'Created a modernized marketplace experience that eliminates visual clutter and streamlines search and filtering.',
    keyFeatures: ['UX/UI Redesign', 'Visual Hierarchy', 'Product Discovery', 'Filtering Systems', 'Marketplace UI'],
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
                <span>Nigeria (Open to Remote Opportunities)</span>
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
              <p className="text-xs font-mono text-amber-300 select-all">anuoluwaoyebanji20@gmail.com</p>
              <p className="text-xs font-mono text-white/80">+234 703 026 9759</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: DESIGN EXPERIENCE LIST (Matching reference screenshot) */}
      <section id="experience" className="space-y-8 py-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif-heading font-normal text-[#1A1A1A] tracking-tight">
            Design Experience
          </h2>
        </div>

        {/* Single Clean Table Container matching screenshot */}
        <div className="bg-[#EFECE6] border border-[#D8D4CC] rounded-3xl p-4 sm:p-6 shadow-sm max-w-2xl mx-auto space-y-1">
          {EXPERIENCES.map((exp, idx) => {
            // Get first letter of company name for icon badge
            const initial = exp.company.charAt(0);
            return (
              <div
                key={idx}
                className="flex items-center justify-between py-3.5 px-4 rounded-2xl hover:bg-[#E5E1D8]/70 transition-colors border-b border-[#D8D4CC]/60 last:border-b-0 group"
              >
                {/* Left: Logo Badge + Company Name + Role Title */}
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    {initial}
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] tracking-tight truncate">
                      {exp.company}
                    </span>
                    <span className="text-[11px] font-medium text-[#8E8E8E] truncate">
                      {exp.role}
                    </span>
                  </div>
                </div>

                {/* Right: Period / Date Range */}
                <div className="shrink-0 text-right">
                  <span className="text-[11px] sm:text-xs font-mono font-medium text-[#1A1A1A]/80">
                    {exp.period}
                  </span>
                </div>
              </div>
            );
          })}
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
