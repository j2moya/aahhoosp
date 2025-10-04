
import { AppState } from '../types';
import { DEFAULT_APP_STATE } from '../constants';

const STORAGE_KEY = 'aahhoo_pop_up_store_config';

export const saveStateToStorage = (state: AppState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Could not save state to local storage", error);
  }
};

export const loadStateFromStorage = (): AppState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return DEFAULT_APP_STATE;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state from local storage", error);
    return DEFAULT_APP_STATE;
  }
};
