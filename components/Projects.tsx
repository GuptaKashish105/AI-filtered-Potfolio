
import React from 'react';
import { ExternalLink, Github, Terminal, ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECT_LINKS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-gray-950">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-4xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter">
              Built to <span className="text-blue-500">Scale.</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full mb-8"></div>
          </div>
          <p className="text-gray-400 max-w-md text-xl leading-relaxed">
            From enterprise-grade CRM modules to autonomous AI agents designed for the modern job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="group relative flex flex-col rounded-[3rem] overflow-hidden bg-gray-900/40 border border-gray-800/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 backdrop-blur-sm">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-90"></div>
                
                {/* Floating Label */}
                <div className="absolute top-8 left-8 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{project.role}</span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {project.about}
                </p>
                
                <div className="mt-auto space-y-8">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-gray-950/50 text-gray-400 text-[10px] font-bold uppercase tracking-wider border border-gray-800 group-hover:border-blue-500/20 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a 
                      href={PROJECT_LINKS[project.title]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-gray-950 hover:bg-blue-600 hover:text-white font-black py-5 rounded-2xl transition-all shadow-xl active:scale-95 text-sm"
                    >
                      {project.title === 'HireAI-Agent' ? 'Test Agent' : 'Explore Project'}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    
                    {/* Github Link for HireAI-Agent or Github detection */}
                    {(project.title === 'HireAI-Agent' || PROJECT_LINKS[project.title]?.includes('github.com')) && (
                      <a 
                        href={project.title === 'HireAI-Agent' ? 'https://github.com/GuptaKashish105/HireAI-Agent' : PROJECT_LINKS[project.title]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 hover:bg-gray-700 text-white rounded-2xl transition-all border border-gray-700 active:scale-90"
                      >
                        <Github className="w-6 h-6" />
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
