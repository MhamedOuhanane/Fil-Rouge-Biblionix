// import { create } from 'zustand';

// export const useThemeStore = create((set) => ({
//   isDarkMode: false,
//   toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (value) => set({ isDarkMode: value }),
    }),
    {
      name: 'biblionix-theme-storage',
    }
  )
);