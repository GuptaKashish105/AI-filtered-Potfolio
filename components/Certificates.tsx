
import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../constants';

const Certificates: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Certifications & Awards</h2>
          <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert, idx) => (
            <div key={idx} className="flex items-center justify-between p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{cert.name}</h3>
                  <p className="text-sm text-gray-500">{cert.issuer}</p>
                </div>
              </div>
              <a 
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
