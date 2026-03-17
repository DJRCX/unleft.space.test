import { atom } from 'nanostores';

export type BackgroundId = 'beams' | 'hexagon' | 'novatrix' | 'grainient' | 'aurora' | 'react-beams' | 'darkveil' | 'etheralshadow';

export const STORAGE_KEY = 'unleft-bg-choice';

// Helper to get initial value safely (SSR friendly)
const getInitialBackground = (): BackgroundId => {
  if (typeof window === 'undefined') return 'grainient';
  const stored = localStorage.getItem(STORAGE_KEY) as BackgroundId | null;
  if (stored && ['beams', 'hexagon', 'novatrix', 'grainient', 'aurora', 'react-beams', 'darkveil', 'etheralshadow'].includes(stored)) {
    return stored;
  }
  return 'grainient';
};

export const $backgroundId = atom<BackgroundId>(getInitialBackground());

// Listen for changes and persist
if (typeof window !== 'undefined') {
  $backgroundId.listen((value) => {
    localStorage.setItem(STORAGE_KEY, value);
  });
}
