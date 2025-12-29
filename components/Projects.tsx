
import React from 'react';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import { PROJECTS, PROJECT_LINKS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-gray-400 max-w-md text-sm">
            High-performance solutions ranging from enterprise SaaS modules to intelligent AI interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="group relative flex flex-col rounded-xl overflow-hidden bg-gray-900 border border-gray-800 transition-all hover:border-blue-500/40 shadow-lg">
              <div className="aspect-[16/9] w-full overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent"></div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1 block">
                    {project.role}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {project.about}
                </p>
                
                <div className="space-y-1.5 mb-4">
                  {project.highlights.slice(0, 2).map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-gray-300">
                      <Terminal className="w-3 h-3 text-gray-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 text-[9px] font-bold uppercase border border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2.5">
                    <a 
                      href={PROJECT_LINKS[project.title]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View
                    </a>
                    {PROJECT_LINKS[project.title]?.includes('github.com') && (
                      <a 
                        href={PROJECT_LINKS[project.title]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all border border-gray-700"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
