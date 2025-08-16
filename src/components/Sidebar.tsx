import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Code, Briefcase, Mail, ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import usePhysics from '../hooks/usePhysics';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const { handleLogoClick } = usePhysics(logoRef);

  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(Math.min(progress, 100));

          // Update active section based on scroll position
          const sectionElements = sections.map(section => ({
            id: section.id,
            element: document.getElementById(section.id),
          }));

          // Check if we're at the bottom of the page
          const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
          
          if (isAtBottom) {
            // If at bottom, highlight the last section
            setActiveSection(sections[sections.length - 1].id);
          } else {
            // Find the section that's currently in view
            const currentSection = sectionElements.find(({ element }) => {
              if (!element) return false;
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            });

            if (currentSection) {
              setActiveSection(currentSection.id);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-full w-16 bg-theme-secondary/95 backdrop-blur-md border-r border-theme-primary z-40 flex flex-col items-center py-8 ${className}`}>
      {/* Logo with Physics Easter Egg */}
      <div className="mb-8">
        <div
          ref={logoRef}
          onClick={handleLogoClick}
          className="w-8 h-8 bg-theme-accent rounded-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer select-none transition-transform hover:scale-110 active:scale-95"
        >
          •ᴗ•
        </div>
      </div>

      {/* Section Icons */}
      <div className="flex flex-col space-y-6">
        {sections.map((section) => {
          const IconComponent = section.icon;
          const isActive = activeSection === section.id;

          return (
            <div key={section.id} className="relative group">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 ${isActive
                  ? 'bg-theme-accent border-theme-accent text-white'
                  : 'bg-theme-tertiary border-theme-secondary text-theme-muted hover:border-theme-accent hover:text-theme-accent'
                  }`}
                style={isActive ? {
                  boxShadow: `0 4px 20px ${theme.colors.accent.light}`
                } : {}}
              >
                <IconComponent size={16} />

                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-theme-accent rounded-full"></div>
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                <div className="bg-theme-tertiary border border-theme-secondary rounded-lg px-3 py-2 text-sm text-theme-primary whitespace-nowrap shadow-lg">
                  {section.label}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2">
                    <ChevronRight size={12} className="text-theme-secondary rotate-180" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative w-full flex-1 flex flex-col items-center mt-6 mb-4">
        {/* Progress Line Background */}
        <div className="w-1.5 h-full bg-gray-600/60 rounded-full"></div>

        {/* Progress Line Active */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 rounded-full will-change-transform shadow-sm"
          style={{
            height: `${scrollProgress}%`,
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))'
          }}
        ></div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="text-xs text-theme-muted font-mono">
        {Math.round(scrollProgress)}%
      </div>
    </div>
  );
};

export default Sidebar;