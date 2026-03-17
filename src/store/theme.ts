import { atom } from 'nanostores';

export type ThemeId = 'default' | 'silver' | 'platinum' | 'cyan';

export const THEME_STORAGE_KEY = 'unleft-theme-choice';

// Helper to get initial value safely (SSR friendly)
const getInitialTheme = (): ThemeId => {
  if (typeof window === 'undefined') return 'default';
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
  if (stored && ['default', 'silver', 'platinum', 'cyan'].includes(stored)) {
    return stored;
  }
  return 'default';
};

export const $themeId = atom<ThemeId>(getInitialTheme());

// Helper to apply class to document
const applyThemeClass = (value: ThemeId) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.remove('theme-silver', 'theme-platinum', 'theme-cyan');
  if (value !== 'default') {
    document.documentElement.classList.add(`theme-${value}`);
  }
};

// Listen for changes and persist
if (typeof window !== 'undefined') {
  $themeId.listen((value) => {
    localStorage.setItem(THEME_STORAGE_KEY, value);
    applyThemeClass(value);
  });

  // Handle Astro View Transitions
  document.addEventListener('astro:after-swap', () => {
    applyThemeClass($themeId.get());
  });
}
