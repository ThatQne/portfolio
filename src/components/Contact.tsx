import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { getIcon } from '../utils/iconUtils';
import { useClipboard } from '../hooks/useClipboard';

const Contact: React.FC = () => {
  const { personal, social } = portfolioData;
  const { copyToClipboard } = useClipboard();



  return (
    <section id="contact" className="py-20 bg-theme-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-theme-accent mx-auto mb-6"></div>
          <p className="text-lg text-theme-secondary max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, creative ideas, or partnerships.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-4xl mx-auto">
          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <button
              onClick={() => copyToClipboard(personal.email, 'Email copied to clipboard!')}
              className="w-full bg-theme-card border border-theme-primary rounded-xl p-6 text-center hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-300 hover:scale-105 theme-card cursor-pointer"
            >
              <div className="p-4 bg-theme-accent-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="text-theme-accent" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary mb-2">Email</h3>
              <p className="text-theme-secondary hover:text-theme-accent transition-colors text-sm break-all">
                {personal.email}
              </p>
            </button>

            <button
              onClick={() => copyToClipboard(personal.phone, 'Phone number copied to clipboard!')}
              className="w-full bg-theme-card border border-theme-primary rounded-xl p-6 text-center hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-300 hover:scale-105 theme-card cursor-pointer"
            >
              <div className="p-4 bg-theme-accent-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="text-theme-accent" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary mb-2">Phone</h3>
              <p className="text-theme-secondary hover:text-theme-accent transition-colors text-sm">
                {personal.phone}
              </p>
            </button>

            <div className="bg-theme-card border border-theme-primary rounded-xl p-6 text-center hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-300 hover:scale-105 theme-card">
              <div className="p-4 bg-theme-accent-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="text-theme-accent" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-theme-primary mb-2">Location</h3>
              <p className="text-theme-secondary text-sm">{personal.location}</p>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-theme-primary mb-8">Let's Connect</h3>
            <div className="flex justify-center space-x-6">
              {social.map((link) => {
                const IconComponent = getIcon(link.icon);
                const isValidUrl = link.url.startsWith('http://') || link.url.startsWith('https://');
                
                if (!isValidUrl) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => copyToClipboard(link.url, `${link.name} copied to clipboard!`)}
                      className="group relative p-4 bg-theme-card border border-theme-primary rounded-xl hover:bg-theme-accent-light hover:border-theme-accent transition-all duration-300 hover:scale-110 theme-card cursor-pointer"
                    >
                      <IconComponent size={28} className="text-theme-secondary group-hover:text-theme-accent transition-colors duration-200" />
                      
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-theme-tertiary border border-theme-secondary rounded-lg px-3 py-1 text-sm text-theme-primary whitespace-nowrap shadow-lg">
                          {link.name}
                        </div>
                      </div>
                    </button>
                  );
                }
                
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 bg-theme-card border border-theme-primary rounded-xl hover:bg-theme-accent-light hover:border-theme-accent transition-all duration-300 hover:scale-110 theme-card"
                  >
                    <IconComponent size={28} className="text-theme-secondary group-hover:text-theme-accent transition-colors duration-200" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-theme-tertiary border border-theme-secondary rounded-lg px-3 py-1 text-sm text-theme-primary whitespace-nowrap shadow-lg">
                        {link.name}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;