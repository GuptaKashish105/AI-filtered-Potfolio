
import React from 'react';
import { Github, Linkedin, Mail, ArrowRight, Bot, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { scrollToSection } from '../utils/scroll';

const Hero: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>SDE-II @ KaptureCX</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AI-Powered</span> Experiences
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              Hi, I'm <span className="text-white font-semibold">{PERSONAL_INFO.name}</span>, a {PERSONAL_INFO.title} specialized in building scalable SaaS products with React, TypeScript, and Micro-Frontend architecture.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 bg-white text-gray-950 px-8 py-4 rounded-xl font-bold transition-all hover:bg-blue-500 hover:text-white"
              >
                View My Work
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="flex items-center gap-3 px-2">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
                  <Github className="w-6 h-6" />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-800">
              <div>
                <p className="text-3xl font-bold text-white mb-1">3+</p>
                <p className="text-sm text-gray-500">Years Exp.</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">5+</p>
                <p className="text-sm text-gray-500">Key Projects</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">B.Tech</p>
                <p className="text-sm text-gray-500">ABESIT '23</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl -rotate-6"></div>
                <div className="absolute inset-0 bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden group">
                   <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" 
                    alt="Kashish Gupta" 
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                   />
                   <div className="absolute bottom-6 left-6 right-6 p-6 bg-gray-950/60 backdrop-blur-md rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Latest Focus</p>
                          <p className="text-white font-semibold">AI Builder Platforms</p>
                        </div>
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
