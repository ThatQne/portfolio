import React from 'react';
import { Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Footer: React.FC = () => {
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
          
          <div className="text-center md:text-right">
            <p className="text-theme-muted text-sm">
              Designed & Built by {personal.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;