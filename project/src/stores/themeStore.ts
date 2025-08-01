import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => {
        set((state) => {
          const newIsDark = !state.isDark;
          // Update document class for Tailwind dark mode
          if (newIsDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: newIsDark };
        });
      },
    }),
    {
      name: 'crm-theme',
      onRehydrateStorage: () => (state) => {
        // Apply theme on app load
        if (state?.isDark) {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);