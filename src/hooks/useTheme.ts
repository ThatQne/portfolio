import { useState, useEffect } from 'react';
import { ThemeConfig, darkTheme, lightTheme, purpleTheme, greenTheme, getThemeCSS } from '../config/theme';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  purple: purpleTheme,
  green: greenTheme,
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeConfig>(darkTheme);
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
    }
  };

  const toggleTheme = () => {
    setTheme(current => current.name === 'dark' ? lightTheme : darkTheme);
  };

  const setDarkTheme = () => changeTheme('dark');
  const setLightTheme = () => changeTheme('light');
  const setPurpleTheme = () => changeTheme('purple');
  const setGreenTheme = () => changeTheme('green');

  return {
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
};