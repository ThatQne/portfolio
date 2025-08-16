import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-theme-card border border-theme-primary rounded-xl overflow-hidden hover:bg-theme-card-hover transition-all duration-300 hover:scale-105 hover:shadow-2xl theme-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Star className="text-theme-accent fill-current" size={20} />
                </div>
              </div>

              <div className="p-6">
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

                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-theme-accent hover:text-theme-accent transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-theme-secondary hover:text-theme-primary transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-theme-primary mb-8 text-center">
              Other Projects
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-theme-card border border-theme-primary rounded-lg p-6 hover:bg-theme-card-hover transition-all duration-300 hover:scale-105 theme-card"
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

                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-accent hover:text-theme-accent transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-secondary hover:text-theme-primary transition-colors"
                    >
                      <Github size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;