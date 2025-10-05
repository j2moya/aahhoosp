import { AppState } from '../types';

export const storageService = {
  getItem<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  },
  setItem<T>(key: string, value: T): void {
    try {
      const valueToStore = JSON.stringify(value);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  },
  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }
};

export const loadState = (): AppState | null => {
    return storageService.getItem<AppState>('appState');
};

export const saveState = (state: AppState): void => {
    storageService.setItem('appState', state);
};
