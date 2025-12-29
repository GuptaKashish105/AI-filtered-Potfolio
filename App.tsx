
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Decorative Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="space-y-0">
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
        </div>
      </main>
      <Footer />
      
      {/* AI Assistant Chatbot */}
      <AIAssistant />
    </div>
  );
};

export default App;
