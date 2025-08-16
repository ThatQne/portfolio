import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, darkTheme, lightTheme, purpleTheme, greenTheme, getThemeCSS } from '../config/theme';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  purple: purpleTheme,
  green: greenTheme,
};

interface ThemeContextType {
  theme: ThemeConfig;
  themes: typeof themes;
  isTransitioning: boolean;
  changeTheme: (themeName: keyof typeof themes) => void;
  toggleTheme: () => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
  setPurpleTheme: () => void;
  setGreenTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  isPurple: boolean;
  isGreen: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    // Load saved theme from localStorage on initialization
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && savedTheme in themes) {
      return themes[savedTheme as keyof typeof themes];
    }
    return darkTheme;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Apply theme CSS custom properties to document root
    const root = document.documentElement;
    const themeCSS = getThemeCSS(theme);
    
    // Add transition class for smooth theme changes
    root.classList.add('theme-transitioning');
    
    Object.entries(themeCSS).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Remove transition class after animation completes
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [theme]);

  const changeTheme = (themeName: keyof typeof themes) => {
    if (theme.name !== themeName) {
      setIsTransitioning(true);
      setTheme(themes[themeName]);
      // Save theme preference to localStorage
      localStorage.setItem('portfolio-theme', themeName);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme.name === 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
  };

  const setDarkTheme = () => changeTheme('dark');
  const setLightTheme = () => changeTheme('light');
  const setPurpleTheme = () => changeTheme('purple');
  const setGreenTheme = () => changeTheme('green');

  const value: ThemeContextType = {
    theme,
    themes,
    isTransitioning,
    changeTheme,
    toggleTheme,
    setDarkTheme,
    setLightTheme,
    setPurpleTheme,
    setGreenTheme,
    isDark: theme.name === 'dark',
    isLight: theme.name === 'light',
    isPurple: theme.name === 'purple',
    isGreen: theme.name === 'green',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};