import React from 'react';
import { ExternalLink, Github, ImageOff } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  // Get project image URL or return null for placeholder
  const getProjectImage = (imagePath?: string) => {
    if (!imagePath) return null;

    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Otherwise, treat as local image in src/data/images/
    return `/src/data/images/${imagePath}`;
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'finished': { label: 'Finished', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'in-progress': { label: 'In Progress', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'abandoned': { label: 'Abandoned', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
      'paused': { label: 'Paused', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'planned': { label: 'Planned', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
    };

    return statusConfig[status as keyof typeof statusConfig] || statusConfig['paused'];
  };

  // Get status border color for card outline
  const getStatusBorderColor = (status: string) => {
    const borderConfig = {
      'finished': 'border-green-500/50 hover:border-green-500',
      'in-progress': 'border-blue-500/50 hover:border-blue-500',
      'abandoned': 'border-red-500/50 hover:border-red-500',
      'paused': 'border-yellow-500/50 hover:border-yellow-500',
      'planned': 'border-purple-500/50 hover:border-purple-500'
    };

    return borderConfig[status as keyof typeof borderConfig] || borderConfig['paused'];
  };

  return (
    <section id="projects" className="py-20 bg-theme-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-theme-accent mx-auto"></div>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => {
            const statusBadge = getStatusBadge(project.status);
            const statusBorderColor = getStatusBorderColor(project.status);
            const imageUrl = getProjectImage(project.image);

            return (
              <div
                key={index}
                className={`group bg-theme-card border rounded-xl overflow-hidden hover:bg-theme-card-hover transition-all duration-300 hover:scale-105 hover:shadow-2xl theme-card flex flex-col ${statusBorderColor}`}
              >
                <div className="relative overflow-hidden h-48 bg-theme-card border-b border-theme-primary">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-theme-secondary">
                      <ImageOff size={48} />
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-theme-primary mb-3">
                    {project.title}
                  </h3>

                  <p className="text-theme-secondary text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-theme-card border border-theme-primary text-theme-accent text-xs rounded-full hover:border-theme-accent transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex space-x-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-theme-accent hover:text-theme-accent transition-colors"
                      >
                        <ExternalLink size={20} />
                        <span className="text-sm">Live Demo</span>
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-theme-secondary hover:text-theme-primary transition-colors"
                      >
                        <Github size={20} />
                        <span className="text-sm">Code</span>
                      </a>
                    </div>

                    <span className={`px-2 py-1 text-xs rounded-full border ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-theme-primary mb-8 text-center">
              Other Projects
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => {
                const statusBadge = getStatusBadge(project.status);
                const statusBorderColor = getStatusBorderColor(project.status);
                return (
                  <div
                    key={index}
                    className={`bg-theme-card border rounded-lg p-6 hover:bg-theme-card-hover transition-all duration-300 hover:scale-105 theme-card flex flex-col ${statusBorderColor}`}
                  >
                    <h4 className="text-lg font-semibold text-theme-primary mb-3">
                      {project.title}
                    </h4>

                    <p className="text-theme-secondary text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-theme-card border border-theme-primary text-theme-accent text-xs rounded hover:border-theme-accent transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex space-x-4">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-theme-accent hover:text-theme-accent transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-theme-secondary hover:text-theme-primary transition-colors"
                        >
                          <Github size={18} />
                        </a>
                      </div>

                      <span className={`px-2 py-1 text-xs rounded-full border ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;