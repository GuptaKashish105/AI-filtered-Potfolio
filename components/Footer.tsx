
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 py-12 bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm mb-4">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript & Tailwind CSS.
        </p>
        <div className="flex justify-center gap-6 text-gray-400 text-sm font-medium">
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-500 transition-colors"
          >
            GitHub
          </a>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-500 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`} 
            className="hover:text-blue-500 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;