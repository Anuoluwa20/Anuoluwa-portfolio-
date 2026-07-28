import React, { useState, useEffect } from 'react';
import { PortfolioData, UIWork, CaseStudy, ServiceCard, Testimonial, ToolItem, PortfolioProfile } from './types';
import { loadPortfolioData, savePortfolioData, resetPortfolioData, saveToCodebase } from './lib/storage';
import { Navbar } from './components/Navbar';
import { HeroServices } from './components/HeroServices';
import { SlidingCarousel } from './components/SlidingCarousel';
import { ToolsSection } from './components/ToolsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { UIWorksSection } from './components/UIWorksSection';
import { AboutExperienceProcess } from './components/AboutExperienceProcess';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactCTA } from './components/ContactCTA';
import { ContactModal } from './components/ContactModal';
import { InspectModal } from './components/InspectModal';
import { EditItemModal, EditType } from './components/EditItemModal';
import { ChangeImageModal } from './components/ChangeImageModal';
import { SyncDataModal } from './components/SyncDataModal';
import { EditBar } from './components/EditBar';
import { ArrowUpRight, Send, Heart, Sparkles, Check, Globe } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Modals state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [inspectItem, setInspectItem] = useState<UIWork | CaseStudy | null>(null);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    type: EditType | null;
    initialData: any | null;
  }>({
    isOpen: false,
    type: null,
    initialData: null,
  });

  const [changeImageModal, setChangeImageModal] = useState<{
    isOpen: boolean;
    title: string;
    currentUrl: string;
    targetType: 'profile' | 'uiWork' | 'caseStudy' | 'testimonial' | null;
    targetId: string | null;
  }>({
    isOpen: false,
    title: 'Change Image',
    currentUrl: '',
    targetType: null,
    targetId: null,
  });

  // Load portfolio data on mount
  useEffect(() => {
    loadPortfolioData().then((loadedData) => {
      setData(loadedData);
    });
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2ED]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] border-t-transparent animate-spin" />
          <span className="text-xs font-semibold text-[#8E8E8E] uppercase tracking-widest">Loading Portfolio...</span>
        </div>
      </div>
    );
  }

  // Update & Save State Helper
  const updateAndSave = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
  };

  // Open Direct Change Image Modal
  const handleOpenChangeImage = (
    targetType: 'profile' | 'uiWork' | 'caseStudy' | 'testimonial',
    targetId: string | null,
    currentUrl: string,
    title = 'Change Image'
  ) => {
    setChangeImageModal({
      isOpen: true,
      title,
      currentUrl,
      targetType,
      targetId,
    });
  };

  // Save updated image to persistent storage
  const handleSaveNewImage = (newUrl: string) => {
    if (!data || !changeImageModal.targetType) return;
    const updated = { ...data };
    const { targetType, targetId } = changeImageModal;

    if (targetType === 'profile') {
      updated.profile = { ...updated.profile, avatarUrl: newUrl };
    } else if (targetType === 'uiWork' && targetId) {
      updated.uiWorks = updated.uiWorks.map((w) =>
        w.id === targetId ? { ...w, imageUrl: newUrl } : w
      );
    } else if (targetType === 'caseStudy' && targetId) {
      updated.caseStudies = updated.caseStudies.map((c) =>
        c.id === targetId ? { ...c, imageUrl: newUrl } : c
      );
    } else if (targetType === 'testimonial' && targetId) {
      updated.testimonials = updated.testimonials.map((t) =>
        t.id === targetId ? { ...t, avatarUrl: newUrl } : t
      );
    }

    updateAndSave(updated);

    // If inspectItem is open and matches this item, update inspectItem too
    if (inspectItem && 'id' in inspectItem && inspectItem.id === targetId) {
      setInspectItem({ ...inspectItem, imageUrl: newUrl } as any);
    }
  };

  // Open Edit Item Modal
  const handleOpenEdit = (type: EditType, itemData: any = null) => {
    setEditModal({
      isOpen: true,
      type,
      initialData: itemData || (type === 'profile' ? data.profile : null),
    });
  };

  const handleCloseEdit = () => {
    setEditModal({ isOpen: false, type: null, initialData: null });
  };

  // Save Item from Edit Modal
  const handleSaveItem = (type: EditType, itemData: any) => {
    const updated = { ...data };

    if (type === 'profile') {
      updated.profile = itemData as PortfolioProfile;
    } else if (type === 'uiWork') {
      const works = [...updated.uiWorks];
      if (itemData.id) {
        const idx = works.findIndex((w) => w.id === itemData.id);
        if (idx !== -1) works[idx] = itemData;
      } else {
        const newWork: UIWork = {
          ...itemData,
          id: `ui_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          order: works.length + 1,
        };
        works.unshift(newWork);
      }
      updated.uiWorks = works;
    } else if (type === 'caseStudy') {
      const cases = [...updated.caseStudies];
      if (itemData.id) {
        const idx = cases.findIndex((c) => c.id === itemData.id);
        if (idx !== -1) cases[idx] = itemData;
      } else {
        const newCase: CaseStudy = {
          ...itemData,
          id: `cs_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        };
        cases.push(newCase);
      }
      updated.caseStudies = cases;
    } else if (type === 'service') {
      const services = [...updated.services];
      if (itemData.id) {
        const idx = services.findIndex((s) => s.id === itemData.id);
        if (idx !== -1) services[idx] = itemData;
      } else {
        const newService: ServiceCard = {
          ...itemData,
          id: `srv_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        };
        services.push(newService);
      }
      updated.services = services;
    } else if (type === 'testimonial') {
      const testimonials = [...updated.testimonials];
      if (itemData.id) {
        const idx = testimonials.findIndex((t) => t.id === itemData.id);
        if (idx !== -1) testimonials[idx] = itemData;
      } else {
        const newTestimonial: Testimonial = {
          ...itemData,
          id: `t_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        };
        testimonials.push(newTestimonial);
      }
      updated.testimonials = testimonials;
    } else if (type === 'tool') {
      const tools = [...updated.tools];
      if (itemData.id) {
        const idx = tools.findIndex((t) => t.id === itemData.id);
        if (idx !== -1) tools[idx] = itemData;
      } else {
        const newTool: ToolItem = {
          ...itemData,
          id: `tool_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        };
        tools.push(newTool);
      }
      updated.tools = tools;
    }

    updateAndSave(updated);
    handleCloseEdit();
  };

  // Delete Item
  const handleDeleteItem = (type: EditType, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const updated = { ...data };

    if (type === 'uiWork') {
      updated.uiWorks = updated.uiWorks.filter((w) => w.id !== id);
    } else if (type === 'caseStudy') {
      updated.caseStudies = updated.caseStudies.filter((c) => c.id !== id);
    } else if (type === 'service') {
      updated.services = updated.services.filter((s) => s.id !== id);
    } else if (type === 'testimonial') {
      updated.testimonials = updated.testimonials.filter((t) => t.id !== id);
    } else if (type === 'tool') {
      updated.tools = updated.tools.filter((t) => t.id !== id);
    }

    updateAndSave(updated);
  };

  // Export JSON Backup
  const handleExportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'portfolio_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.profile) {
            updateAndSave(parsed);
            alert('Portfolio data imported successfully!');
          }
        } catch (err) {
          alert('Invalid portfolio JSON file.');
        }
      };
    }
  };

  // Reset to Defaults
  const handleResetData = async () => {
    if (window.confirm('Reset portfolio back to default template? Custom uploaded photos will be cleared.')) {
      const resetData = await resetPortfolioData();
      setData(resetData);
    }
  };

  // Lightbox Navigation Next/Prev
  const handleInspectNext = () => {
    if (!inspectItem) return;
    const allWorks = data.uiWorks;
    const currentIndex = allWorks.findIndex((w) => w.id === inspectItem.id);
    if (currentIndex !== -1 && currentIndex < allWorks.length - 1) {
      setInspectItem(allWorks[currentIndex + 1]);
    } else {
      setInspectItem(allWorks[0]);
    }
  };

  const handleInspectPrev = () => {
    if (!inspectItem) return;
    const allWorks = data.uiWorks;
    const currentIndex = allWorks.findIndex((w) => w.id === inspectItem.id);
    if (currentIndex > 0) {
      setInspectItem(allWorks[currentIndex - 1]);
    } else {
      setInspectItem(allWorks[allWorks.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] pb-24 font-sans selection:bg-[#1A1A1A] selection:text-white">
      
      {/* Floating Pill Navbar */}
      <Navbar
        profile={data.profile}
        isEditMode={false}
        onToggleEditMode={() => {}}
        onOpenBookCall={() => setContactModalOpen(true)}
        onOpenProfileEdit={() => {}}
      />

      {/* Hero & Specialization Cards */}
      <HeroServices
        profile={data.profile}
        services={data.services}
        isEditMode={isEditMode}
        onEditService={(srv) => handleOpenEdit('service', srv)}
        onAddService={() => handleOpenEdit('service', null)}
        onDeleteService={(id) => handleDeleteItem('service', id)}
        onOpenBookCall={() => setContactModalOpen(true)}
      />

      {/* Infinite Horizontal Sliding Carousel Showcase */}
      <SlidingCarousel
        items={[...data.uiWorks, ...data.caseStudies]}
        onInspectItem={(item) => setInspectItem(item)}
      />

      {/* Selected Case Studies Deck */}
      <CaseStudiesSection
        caseStudies={data.caseStudies}
        isEditMode={false}
        onEditCaseStudy={() => {}}
        onAddCaseStudy={() => {}}
        onDeleteCaseStudy={() => {}}
        onOpenDetailModal={(item) => setInspectItem(item)}
      />

      {/* UI Works & Explorations Grid with Category Filters */}
      <UIWorksSection
        uiWorks={data.uiWorks}
        isEditMode={false}
        onEditUIWork={() => {}}
        onAddUIWork={() => {}}
        onDeleteUIWork={() => {}}
        onInspectUIWork={(work) => setInspectItem(work)}
      />

      {/* About, Career Experience Timeline & 10-Step Process */}
      <AboutExperienceProcess
        onOpenBookCall={() => setContactModalOpen(true)}
        avatarUrl={data.profile.avatarUrl}
      />

      {/* Tools Section */}
      <ToolsSection
        tools={data.tools}
        isEditMode={false}
        onOpenBookCall={() => setContactModalOpen(true)}
        onEditTool={() => {}}
        onAddTool={() => {}}
        onDeleteTool={() => {}}
      />

      {/* What Clients Say / Testimonials */}
      <TestimonialsSection
        testimonials={data.testimonials}
        isEditMode={false}
        onEditTestimonial={() => {}}
        onAddTestimonial={() => {}}
        onDeleteTestimonial={() => {}}
      />

      {/* Let's Build Something Great CTA */}
      <ContactCTA
        profile={data.profile}
        onOpenBookCall={() => setContactModalOpen(true)}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-neutral-200/80 py-10 text-center px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
          <p>© {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setContactModalOpen(true)}
              className="hover:text-neutral-900 transition underline cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        profile={data.profile}
      />

      <InspectModal
        item={inspectItem}
        onClose={() => setInspectItem(null)}
        onNext={handleInspectNext}
        onPrev={handleInspectPrev}
      />

    </div>
  );
}
