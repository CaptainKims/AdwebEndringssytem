import type { LayoutMode } from '../components/LayoutToggle';

const STORAGE_KEY = 'adweb-layout-mode';

export function readLayoutMode(): LayoutMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'stacked' || stored === 'twoColumn') return stored;
  } catch {
    // localStorage unavailable
  }
  return 'stacked';
}

export function persistLayoutMode(mode: LayoutMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // localStorage unavailable
  }
}
