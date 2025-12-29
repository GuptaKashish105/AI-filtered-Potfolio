
import React from 'react';
import { Github, Linkedin, Mail, ArrowRight, Bot, Zap, ChevronRight, Code2, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { scrollToSection } from '../utils/scroll';

const Hero: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-left duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Software Development Engineer II
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight">
              Crafting <br />
              <span className="text-shimmer">Future-Ready</span> <br />
              Interfaces.
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              I'm <span className="text-white font-bold">{PERSONAL_INFO.name}</span>. I build high-performance, <span className="text-blue-400">AI-powered SaaS</span> platforms with a focus on scalability and pixel-perfect user experiences.
            </p>

            <div className="flex flex-wrap gap-5 mb-14">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/25"
              >
                View Portfolio
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className="flex items-center gap-3">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all hover:bg-gray-800 active:scale-90">
                  <Github className="w-6 h-6" />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all hover:bg-gray-800 active:scale-90">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-800/50">
              <div>
                <p className="text-4xl font-black text-white mb-1">3+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-1">5+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Core SaaS Apps</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-1">20+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Tech Stack</p>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000">
            <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto animate-float">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-[3rem] blur-3xl group-hover:blur-[100px] transition-all duration-700"></div>
                
                <div className="absolute inset-0 bg-gray-900 border border-gray-800/50 rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-3xl transform group-hover:rotate-1 transition-transform duration-700">
                   <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                    alt="Kashish Gupta" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                   />
                   
                   {/* Floating Tech Badge */}
                   <div className="absolute bottom-8 left-8 right-8 p-6 bg-gray-950/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/40">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-black mb-0.5">Primary Focus</p>
                          <p className="text-white font-bold text-lg">AI & Micro Frontends</p>
                        </div>
                      </div>
                   </div>
                </div>
            </div>

            {/* Background Floating Icons */}
            <div className="absolute -top-10 -right-5 p-5 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl animate-float delay-700">
              <Code2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="absolute top-1/2 -left-12 p-5 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl animate-float delay-1000">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
