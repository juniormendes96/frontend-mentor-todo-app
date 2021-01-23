import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const getDarkModeAdapter = (): boolean => {
  return makeLocalStorageAdapter().get('darkMode');
};

export const setDarkModeAdapter = (darkMode: boolean): void => {
  makeLocalStorageAdapter().set('darkMode', darkMode);
};
