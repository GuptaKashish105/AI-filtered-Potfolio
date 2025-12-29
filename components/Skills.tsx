import React from 'react';
import { SKILL_GROUPS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 relative bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Technical <br /> <span className="text-blue-500">Arsenal.</span></h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full mb-8"></div>
          </div>
          <p className="text-gray-400 max-w-md text-lg leading-relaxed">
            A comprehensive stack built for the modern web—balancing robust engineering with intelligent AI integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, idx) => (
            <div 
              key={idx} 
              className="group p-10 rounded-[2.5rem] bg-gray-900/40 border border-gray-800/50 hover:border-blue-500/30 hover:bg-gray-900/60 transition-all duration-500 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
              
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 group-hover:border-blue-500/50 transition-colors">
                  {group.icon}
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{group.category}</h3>
              </div>
              <ul className="space-y-4">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 group-hover:text-gray-200 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;