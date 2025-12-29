
import React from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-gray-900/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Professional Journey</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative pl-8 md:pl-0">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-800 md:left-1/2 md:-ml-px"></div>
              
              <div className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-1/2"></div>
                
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] top-2 md:left-1/2 md:-ml-3 w-6 h-6 rounded-full bg-blue-600 border-4 border-gray-950 z-10 shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                
                <div className="w-full md:w-1/2">
                  <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                        <p className="text-blue-400 font-semibold">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.achievements.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Key Achievements</p>
                        {exp.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-300">{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default Experience;
