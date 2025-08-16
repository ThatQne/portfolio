import React from 'react';
import { portfolioData } from '../data/portfolio';
import { getIcon } from '../utils/iconUtils';

const About: React.FC = () => {
  const { personal, aboutItems, experience } = portfolioData;

  return (
    <section id="about" className="py-20 bg-theme-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-theme-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <div className="space-y-6">
            <p className="text-lg text-theme-secondary leading-relaxed">
              {personal.bio}
            </p>
            
            <div className="space-y-4">
              {aboutItems.map((item, index) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <div key={index} className="flex items-center space-x-3 text-theme-secondary">
                    <IconComponent className="text-theme-accent" size={20} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-theme-primary mb-6">Experience</h3>
            
            {experience.map((job, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-theme-accent/20 last:border-l-0">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-theme-accent rounded-full"></div>
                
                <div className="bg-theme-card border border-theme-primary rounded-lg p-6 hover:bg-theme-card-hover transition-all duration-300 theme-card">
                  <h4 className="text-xl font-semibold text-theme-primary mb-1">
                    {job.position}
                  </h4>
                  <div className="text-theme-accent font-medium mb-2">
                    {job.company} • {job.duration}
                  </div>
                  <p className="text-theme-secondary text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;