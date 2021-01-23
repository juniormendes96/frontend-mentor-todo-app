import { useEffect, useState } from 'react';
import { getDarkModeAdapter, setDarkModeAdapter } from '@/main/adapters';

export const useDarkMode = (): [boolean, () => void] => {
  const [currentDarkMode, setCurrentDarkMode] = useState(false);

  const setDarkMode = (darkMode: boolean) => {
    setDarkModeAdapter(darkMode);
    setCurrentDarkMode(darkMode);
  };

  const toggleDarkMode = (): void => {
    setDarkMode(!currentDarkMode);
  };

  useEffect(() => {
    const darkModeStorage = getDarkModeAdapter();

    if (darkModeStorage) {
      setCurrentDarkMode(darkModeStorage);
    }
  }, []);

  return [currentDarkMode, toggleDarkMode];
};
