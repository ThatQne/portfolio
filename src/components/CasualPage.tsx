import React from 'react';
import { ArrowLeft, Gamepad2, Music, Coffee, Camera, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface CasualPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const CasualPage: React.FC<CasualPageProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { casualProjects, casualStats } = portfolioData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'gamepad': return <Gamepad2 className="text-theme-accent" size={24} />;
      case 'music': return <Music className="text-theme-accent" size={24} />;
      case 'coffee': return <Coffee className="text-theme-accent" size={24} />;
      case 'camera': return <Camera className="text-theme-accent" size={24} />;
      default: return <Gamepad2 className="text-theme-accent" size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-theme-primary z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-theme-card border-b border-theme-primary sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 text-theme-secondary hover:text-theme-accent transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Portfolio</span>
              </button>
              <h1 className="text-2xl font-bold text-theme-primary">Casual Corner</h1>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-theme-primary mb-4">
              Welcome to the Secret Zone! 🎮
            </h2>
            <p className="text-theme-secondary max-w-2xl mx-auto">
              You found the hidden area! Here's where I share my more casual interests, 
              hobbies, and side projects that don't quite fit the professional portfolio.
            </p>
          </div>

          {/* Casual Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {casualProjects.map((project, index) => (
              <div
                key={index}
                className="bg-theme-card border border-theme-primary rounded-lg p-6 hover:border-theme-accent transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-theme-accent-light rounded-lg">
                    {getIcon(project.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-theme-primary">
                        {project.title}
                      </h3>
                      {project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-theme-accent hover:text-theme-accent/80"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    <p className="text-theme-secondary mb-2">
                      {project.description}
                    </p>
                    <p className="text-theme-muted text-sm mb-4">
                      {project.details}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-theme-accent-light text-theme-accent text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fun Stats */}
          <div className="bg-theme-card border border-theme-primary rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-theme-primary mb-6">
              Random Stats & Facts
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {casualStats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-theme-accent mb-2">{stat.value}</div>
                  <div className="text-theme-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Easter Egg Message */}
          <div className="text-center mt-12">
            <p className="text-theme-muted text-sm">
              🎉 Congratulations on finding this hidden page! You're clearly someone who pays attention to details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasualPage;