import React from 'react';
import { Heart, Lock, Unlock } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface FooterProps {
  isUnlocked?: boolean;
  onLockClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ isUnlocked = false, onLockClick }) => {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme-primary border-t border-theme-primary py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-theme-muted flex items-center justify-center md:justify-start space-x-2">
              <span>© {currentYear} {personal.name}. Made with React</span>
            </p>
          </div>
          
          <div className="text-center md:text-right flex items-center justify-center md:justify-end space-x-4">
            <p className="text-theme-muted text-sm">
              Designed & Built by {personal.name}
            </p>
            <button
              onClick={onLockClick}
              className="p-2 text-theme-muted hover:text-theme-accent transition-colors duration-300 hover:scale-110"
              title={isUnlocked ? "Access Casual Corner" : "Unlock Secret Area"}
            >
              {isUnlocked ? <Unlock size={16} /> : <Lock size={16} />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;