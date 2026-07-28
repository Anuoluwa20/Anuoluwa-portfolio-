import { openDB, IDBPDatabase } from 'idb';
import { PortfolioData } from '../types';
import { defaultPortfolioData } from '../data/defaultData';

const DB_NAME = 'PortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'portfolioStore';
const IMAGES_STORE = 'imagesStore';
const DATA_KEY = 'currentPortfolio';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
        if (!db.objectStoreNames.contains(IMAGES_STORE)) {
          db.createObjectStore(IMAGES_STORE);
        }
      },
    });
  }
  return dbPromise;
}

function sanitizeData(parsed: PortfolioData): PortfolioData {
  if (!parsed) return defaultPortfolioData;
  const removedIds = new Set(['cs_4', 'cs_5', 'cs_7', 'ui_4', 'ui_5', 'ui_7', 'ui_8', 'cs_travel', 'cs_onboarding', 'ui_travel', 'ui_onboarding']);
  if (parsed.caseStudies) {
    parsed.caseStudies = parsed.caseStudies.filter(
      (c) => !removedIds.has(c.id) && !c.title.includes('CBT') && !c.title.includes("Children's Coding")
    );
    ['cs_1', 'cs_2', 'cs_glance', 'cs_world_builder', 'cs_wander', 'cs_wealth', 'cs_quicktask', 'cs_ecommerce', 'cs_healthcare', 'cs_mindai', 'cs_eventconnect', 'cs_ai_assistant', 'cs_6'].forEach((id) => {
      const target = defaultPortfolioData.caseStudies.find((c) => c.id === id);
      if (target) {
        const idx = parsed.caseStudies.findIndex((c) => c.id === id);
        if (idx !== -1) {
          parsed.caseStudies[idx] = { ...parsed.caseStudies[idx], ...target };
        } else {
          parsed.caseStudies.push(target);
        }
      }
    });
  } else {
    parsed.caseStudies = defaultPortfolioData.caseStudies;
  }

  if (parsed.uiWorks) {
    parsed.uiWorks = parsed.uiWorks.filter(
      (u) => !removedIds.has(u.id) && !u.title.includes('CBT Exam') && !u.title.includes("Children's Gamified") && !u.title.includes('QuickByte Vendor & Admin')
    );
    ['ui_1', 'ui_2', 'ui_glance', 'ui_eventconnect', 'ui_mindai', 'ui_wander', 'ui_wealth', 'ui_quicktask', 'ui_ecommerce', 'ui_healthcare', 'ui_world_builder', 'ui_ai_assistant', 'ui_6'].forEach((id) => {
      const target = defaultPortfolioData.uiWorks.find((u) => u.id === id);
      if (target) {
        const idx = parsed.uiWorks.findIndex((u) => u.id === id);
        if (idx !== -1) {
          parsed.uiWorks[idx] = { ...parsed.uiWorks[idx], ...target };
        } else {
          parsed.uiWorks.push(target);
        }
      }
    });
  } else {
    parsed.uiWorks = defaultPortfolioData.uiWorks;
  }

  if (parsed.profile) {
    if (!parsed.profile.twitterUrl || parsed.profile.twitterUrl.includes('oyebanji_design')) {
      parsed.profile.twitterUrl = 'https://x.com/OyebanjiAnu12';
    }
    if (!parsed.profile.linkedinUrl) {
      parsed.profile.linkedinUrl = 'https://linkedin.com/in/oyebanji-anuoluwapo-163a62307';
    }
    parsed.profile.avatarUrl = defaultPortfolioData.profile.avatarUrl;
  }
  return parsed;
}

/**
 * Loads the saved portfolio data from IndexedDB / localStorage or returns default initial data.
 */
export async function loadPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await getDB();
    const saved = await db.get(STORE_NAME, DATA_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-migrate if previous dataset had old placeholder name
      if (parsed.profile && (parsed.profile.name === 'John Doe' || parsed.profile.name === 'Your Name')) {
        await savePortfolioData(defaultPortfolioData);
        return defaultPortfolioData;
      }
      return sanitizeData(parsed);
    }
  } catch (err) {
    console.warn('Error reading from IndexedDB, trying localStorage fallback:', err);
    const local = localStorage.getItem(DATA_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.profile && (parsed.profile.name === 'John Doe' || parsed.profile.name === 'Your Name')) {
          await savePortfolioData(defaultPortfolioData);
          return defaultPortfolioData;
        }
        return sanitizeData(parsed);
      } catch (e) {
        console.error('Failed to parse localStorage data:', e);
      }
    }
  }
  return defaultPortfolioData;
}

/**
 * Saves updated portfolio data to IndexedDB, localStorage, and directly to defaultData.ts in the codebase.
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const jsonStr = JSON.stringify(data);
  try {
    const db = await getDB();
    await db.put(STORE_NAME, jsonStr, DATA_KEY);
  } catch (err) {
    console.warn('IndexedDB save failed:', err);
  }
  try {
    localStorage.setItem(DATA_KEY, jsonStr);
  } catch (e) {
    console.warn('localStorage save failed (quota limit might be reached for inline images):', e);
  }

  // Persist directly to codebase disk (defaultData.ts)
  await saveToCodebase(data);
}

/**
 * Directly persists current portfolio state to src/data/defaultData.ts in the codebase.
 */
export async function saveToCodebase(data: PortfolioData): Promise<boolean> {
  try {
    const jsonStr = JSON.stringify(data);
    const res = await fetch('/api/save-to-codebase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonStr,
    });
    if (res.ok) {
      const result = await res.json();
      return result.success;
    }
  } catch (err) {
    console.warn('Failed to save directly to codebase:', err);
  }
  return false;
}

/**
 * Resets portfolio data back to default template.
 */
export async function resetPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await getDB();
    await db.delete(STORE_NAME, DATA_KEY);
  } catch (err) {
    console.warn('Failed to clear IndexedDB store:', err);
  }
  localStorage.removeItem(DATA_KEY);
  return defaultPortfolioData;
}

/**
 * Handles image file upload:
 * Converts file to data URL or stores image blob in IndexedDB and returns a persistent Data URL or Object URL.
 */
export async function handleFileUpload(file: File, maxDimension = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        // Resize canvas if image is huge to optimize storage and render performance
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.88);

          // Store image in IndexedDB image store
          try {
            const db = await getDB();
            const imageId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            await db.put(IMAGES_STORE, compressedDataUrl, imageId);
          } catch (storageErr) {
            console.warn('Could not store in IndexedDB image store:', storageErr);
          }

          resolve(compressedDataUrl);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsDataURL(file);
  });
}
