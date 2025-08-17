import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { getIcon } from '../utils/iconUtils';
import { useClipboard } from '../hooks/useClipboard';
import ComicTooltip from './ComicTooltip';

interface HeroProps {
  bubbleMessage?: string;
}

const Hero: React.FC<HeroProps> = ({ bubbleMessage = "The matrix has you..." }) => {
  const { personal, social } = portfolioData;
  const { copyToClipboard } = useClipboard();
  const [showTooltip, setShowTooltip] = useState(false);



  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-theme-primary">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-theme-primary"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-theme-accent-light rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-accent-light rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Avatar */}
          <div className="mb-8 relative">
            <img
              src={personal.avatar}
              alt={personal.name}
              className="w-32 h-32 rounded-full mx-auto border-2 border-theme-accent/30 hover:border-theme-accent shadow-2xl animate-scale-in transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            <ComicTooltip 
              message={bubbleMessage} 
              isVisible={showTooltip} 
            />
          </div>

          {/* Main content */}
          <h1 className="text-5xl md:text-7xl font-bold text-theme-primary mb-4 animate-slide-up">
            {personal.name}
          </h1>

          <h2 className="text-2xl md:text-3xl text-theme-accent font-medium mb-6 animate-slide-up delay-100">
            {personal.title}
          </h2>

          <p className="text-lg text-theme-secondary max-w-2xl mx-auto mb-8 animate-slide-up delay-200">
            {personal.subtitle}
          </p>

          {/* Social links */}
          <div className="flex justify-center space-x-6 mb-12 animate-slide-up delay-300">
            {social.map((link) => {
              const IconComponent = getIcon(link.icon);
              const isValidUrl = link.url.startsWith('http://') || link.url.startsWith('https://');
              
              if (!isValidUrl) {
                return (
                  <button
                    key={link.name}
                    onClick={() => copyToClipboard(link.url, `${link.name} copied to clipboard!`)}
                    className="p-3 bg-theme-card border border-theme-primary rounded-full hover:bg-theme-accent-light hover:border-theme-accent transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <IconComponent size={24} className="text-theme-secondary hover:text-theme-accent transition-colors duration-200" />
                  </button>
                );
              }
              
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-theme-card border border-theme-primary rounded-full hover:bg-theme-accent-light hover:border-theme-accent transition-all duration-300 hover:scale-110"
                >
                  <IconComponent size={24} className="text-theme-secondary hover:text-theme-accent transition-colors duration-200" />
                </a>
              );
            })}
          </div>

          {/* Scroll Down Indicator */}
          <div className="flex justify-center animate-slide-up delay-400">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="group flex flex-col items-center space-y-2 text-theme-secondary hover:text-theme-accent transition-all duration-500 cursor-pointer mt-8"
            >
              <span className="text-sm font-medium tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:tracking-wider">
                Scroll Down
              </span>
              <div className="scroll-indicator flex flex-col items-center space-y-1">
                <div className="scroll-line w-0.5 h-8 bg-gradient-to-b from-transparent via-theme-accent to-transparent group-hover:from-theme-accent group-hover:via-theme-accent group-hover:to-transparent transition-all duration-500"></div>
                <div className="p-2 rounded-full border border-theme-accent border-opacity-30 group-hover:border-opacity-100 group-hover:bg-theme-accent-light transition-all duration-300">
                  <svg 
                    className="w-4 h-4 text-theme-accent group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;