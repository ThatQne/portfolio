export interface ThemeConfig {
  name: string;
  colors: {
    // Background colors
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      card: string;
      cardHover: string;
    };
    // Text colors
    text: {
      primary: string;
      secondary: string;
      muted: string;
      accent: string;
    };
    // Border colors
    border: {
      primary: string;
      secondary: string;
      accent: string;
    };
    // Accent colors
    accent: {
      primary: string;
      secondary: string;
      hover: string;
      light: string;
    };
    // Status colors
    status: {
      success: string;
      warning: string;
      error: string;
    };
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    background: {
      primary: '#020617', // dark-950
      secondary: '#0f172a', // dark-900
      tertiary: '#1e293b', // dark-800
      card: 'rgba(30, 41, 59, 0.5)', // dark-800/50
      cardHover: 'rgba(30, 41, 59, 0.7)', // dark-800/70
    },
    text: {
      primary: '#ffffff',
      secondary: '#cbd5e1', // dark-300
      muted: '#94a3b8', // dark-400
      accent: '#60a5fa', // accent-400
    },
    border: {
      primary: '#334155', // dark-700
      secondary: '#475569', // dark-600
      accent: '#3b82f6', // accent-500
    },
    accent: {
      primary: '#3b82f6', // accent-500
      secondary: '#60a5fa', // accent-400
      hover: '#2563eb', // accent-600
      light: 'rgba(59, 130, 246, 0.2)', // accent-500/20
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
    secondary: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    accent: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
  },
};

export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    background: {
      primary: '#fafafa', // warm off-white
      secondary: '#f0f0f0', // light warm gray
      tertiary: '#e5e5e5', // medium warm gray
      card: '#ffffff', // pure white cards for contrast
      cardHover: '#f8f8f8', // subtle warm hover
    },
    text: {
      primary: '#1a1a1a', // rich dark gray (not pure black)
      secondary: '#4a4a4a', // medium dark gray
      muted: '#737373', // balanced gray
      accent: '#0066cc', // professional blue
    },
    border: {
      primary: '#d4d4d4', // visible neutral border
      secondary: '#a3a3a3', // stronger border
      accent: '#0066cc', // matching accent blue
    },
    accent: {
      primary: '#0066cc', // professional blue
      secondary: '#3388dd', // lighter blue
      hover: '#0052a3', // darker blue hover
      light: 'rgba(0, 102, 204, 0.08)', // subtle blue tint
    },
    status: {
      success: '#16a34a', // fresh green
      warning: '#ea580c', // warm orange
      error: '#dc2626', // clear red
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #e5e5e5 100%)',
    secondary: 'linear-gradient(135deg, #0066cc 0%, #3388dd 100%)',
    accent: 'linear-gradient(135deg, rgba(0, 102, 204, 0.04) 0%, rgba(51, 136, 221, 0.08) 100%)',
  },
};

export const purpleTheme: ThemeConfig = {
  name: 'purple',
  colors: {
    background: {
      primary: '#0c0a1a', // very dark purple
      secondary: '#1a1625', // dark purple
      tertiary: '#2d2438', // medium dark purple
      card: 'rgba(45, 36, 56, 0.5)',
      cardHover: 'rgba(45, 36, 56, 0.7)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d8b4fe', // purple-200
      muted: '#c4b5fd', // purple-300
      accent: '#a855f7', // purple-500
    },
    border: {
      primary: '#4c1d95', // purple-800
      secondary: '#6b21a8', // purple-700
      accent: '#a855f7', // purple-500
    },
    accent: {
      primary: '#a855f7', // purple-500
      secondary: '#c084fc', // purple-400
      hover: '#9333ea', // purple-600
      light: 'rgba(168, 85, 247, 0.2)',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0c0a1a 0%, #1a1625 50%, #2d2438 100%)',
    secondary: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
    accent: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(192, 132, 252, 0.1) 100%)',
  },
};

export const greenTheme: ThemeConfig = {
  name: 'green',
  colors: {
    background: {
      primary: '#0a1a0a', // very dark green
      secondary: '#0f2415', // dark green
      tertiary: '#1a3d2e', // medium dark green
      card: 'rgba(26, 61, 46, 0.5)',
      cardHover: 'rgba(26, 61, 46, 0.7)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbf7d0', // green-200
      muted: '#86efac', // green-300
      accent: '#22c55e', // green-500
    },
    border: {
      primary: '#14532d', // green-800
      secondary: '#166534', // green-700
      accent: '#22c55e', // green-500
    },
    accent: {
      primary: '#22c55e', // green-500
      secondary: '#4ade80', // green-400
      hover: '#16a34a', // green-600
      light: 'rgba(34, 197, 94, 0.2)',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0a1a0a 0%, #0f2415 50%, #1a3d2e 100%)',
    secondary: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
    accent: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(74, 222, 128, 0.1) 100%)',
  },
};

// Current active theme - change this to switch themes
export const currentTheme = darkTheme;

// Helper function to get CSS custom properties
export const getThemeCSS = (theme: ThemeConfig): Record<string, string> => {
  return {
    '--bg-primary': theme.colors.background.primary,
    '--bg-secondary': theme.colors.background.secondary,
    '--bg-tertiary': theme.colors.background.tertiary,
    '--bg-card': theme.colors.background.card,
    '--bg-card-hover': theme.colors.background.cardHover,
    '--text-primary': theme.colors.text.primary,
    '--text-secondary': theme.colors.text.secondary,
    '--text-muted': theme.colors.text.muted,
    '--text-accent': theme.colors.text.accent,
    '--border-primary': theme.colors.border.primary,
    '--border-secondary': theme.colors.border.secondary,
    '--border-accent': theme.colors.border.accent,
    '--accent-primary': theme.colors.accent.primary,
    '--accent-secondary': theme.colors.accent.secondary,
    '--accent-hover': theme.colors.accent.hover,
    '--accent-light': theme.colors.accent.light,
    '--gradient-primary': theme.gradients.primary,
    '--gradient-secondary': theme.gradients.secondary,
    '--gradient-accent': theme.gradients.accent,
  };
};