import React, { useState } from 'react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { Palette, Check, ChevronDown } from 'lucide-react';

const ThemeSelector: React.FC = () => {
  const { theme, changeTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { key: 'dark', name: 'Dark', color: '#3b82f6', bgColor: '#020617' },
    { key: 'light', name: 'Light', color: '#3b82f6', bgColor: '#ffffff' },
    { key: 'purple', name: 'Purple', color: '#a855f7', bgColor: '#0c0a1a' },
    { key: 'green', name: 'Green', color: '#22c55e', bgColor: '#0a1a0a' },
  ] as const;

  const currentThemeOption = themeOptions.find(option => option.key === theme.name);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        {/* Theme Selector Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full
            bg-theme-card border border-theme-primary
            hover:bg-theme-card-hover hover:border-theme-accent
            transition-all duration-300 ease-out
            backdrop-blur-sm shadow-lg
            ${isTransitioning ? 'animate-pulse' : ''}
            ${isOpen ? 'ring-2 ring-theme-accent ring-opacity-50' : ''}
          `}
          disabled={isTransitioning}
        >
          <div className="relative">
            <Palette 
              size={18} 
              className={`text-theme-accent transition-transform duration-300 ${isOpen ? 'rotate-12' : ''}`} 
            />
            {isTransitioning && (
              <div className="absolute inset-0 animate-spin">
                <div className="w-full h-full border-2 border-transparent border-t-theme-accent rounded-full"></div>
              </div>
            )}
          </div>
          
          <span className="text-sm font-medium text-theme-primary hidden sm:block">
            {currentThemeOption?.name}
          </span>
          
          <ChevronDown 
            size={16} 
            className={`text-theme-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Theme Options Dropdown */}
        <div className={`
          absolute top-full right-0 mt-2 w-48
          bg-theme-card border border-theme-primary rounded-xl
          backdrop-blur-sm shadow-xl
          transition-all duration-300 ease-out origin-top-right
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
        `}>
          <div className="p-2">
            <div className="text-xs font-semibold text-theme-secondary uppercase tracking-wider px-3 py-2">
              Choose Theme
            </div>
            
            {themeOptions.map((option, index) => (
              <button
                key={option.key}
                onClick={() => {
                  changeTheme(option.key);
                  setIsOpen(false);
                }}
                disabled={isTransitioning}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  text-left transition-all duration-200
                  hover:bg-theme-card-hover
                  ${theme.name === option.key ? 'bg-theme-accent-light' : ''}
                  ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {/* Theme Color Preview */}
                <div className="relative flex-shrink-0">
                  <div 
                    className="w-5 h-5 rounded-full border-2 border-theme-primary shadow-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${option.bgColor} 0%, ${option.color} 100%)` 
                    }}
                  />
                  {theme.name === option.key && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check size={12} className="text-white drop-shadow-sm" />
                    </div>
                  )}
                </div>

                {/* Theme Name */}
                <span className={`
                  text-sm font-medium flex-1
                  ${theme.name === option.key ? 'text-theme-accent' : 'text-theme-primary'}
                `}>
                  {option.name}
                </span>

                {/* Active Indicator */}
                {theme.name === option.key && (
                  <div className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Decorative Bottom Border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-theme-accent to-transparent opacity-30" />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSelector;