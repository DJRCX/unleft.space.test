import { atom } from 'nanostores';

export type GlobeId = 'dotted' | 'realistic';

export const GLOBE_STORAGE_KEY = 'unleft-globe-choice';

// Helper to get initial value safely (SSR friendly)
const getInitialGlobe = (): GlobeId => {
  if (typeof window === 'undefined') return 'dotted';
  const stored = localStorage.getItem(GLOBE_STORAGE_KEY) as GlobeId | null;
  if (stored && ['dotted', 'realistic'].includes(stored)) {
    return stored;
  }
  return 'dotted';
};

export const $globeId = atom<GlobeId>(getInitialGlobe());

// Listen for changes and persist
if (typeof window !== 'undefined') {
  $globeId.listen((value) => {
    localStorage.setItem(GLOBE_STORAGE_KEY, value);
  });
}
