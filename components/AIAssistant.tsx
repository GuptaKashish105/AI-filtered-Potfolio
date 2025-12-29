
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare, Loader2, Minus, Maximize2, Sparkles, User, BrainCircuit, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, SKILL_GROUPS, EXPERIENCES, PROJECTS } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  // Simple markdown-style parser for bold, links, and lists
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        // Handle Bullet Points
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
          const text = line.trim().substring(2);
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>{renderInline(text)}</span>
            </div>
          );
        }
        
        return <p key={i} className="min-h-[1.25rem]">{renderInline(line)}</p>;
      })}
    </div>
  );
};

// Helper for bold and links
function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-black text-white">{part.slice(2, -2)}</strong>;
    }
    // Link: [text](url)
    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a 
            key={i} 
            href={match[2]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-0.5 font-bold"
          >
            {match[1]}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        );
      }
    }
    return part;
  });
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Hi! I'm Kashish's AI assistant. I'm powered by Gemini 3 Pro with deep reasoning capabilities. I can analyze her complex architectural choices, her work at KaptureCX, or her technical projects in detail. What complex query can I help you with today?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const resumeContext = `
    User Profile: ${JSON.stringify(PERSONAL_INFO)}
    Skills: ${JSON.stringify(SKILL_GROUPS)}
    Experience: ${JSON.stringify(EXPERIENCES)}
    Projects: ${JSON.stringify(PROJECTS)}
    
    Instructions: You are the personal AI agent for Kashish Gupta. Answer questions professionally and concisely. 
    You have a high thinking budget to solve complex technical reasoning or explain Kashish's architectural decisions.
    Use female pronouns (she/her) when referring to Kashish.
    
    CRITICAL FORMATTING RULES:
    1. Always use line breaks between different pieces of information.
    2. Use bullet points (starting with '*') for lists like contact details or skills.
    3. Use bolding (**text**) for names, roles, or key technologies.
    4. Provide URLs in markdown format: [Text](URL).
    5. Ensure contact info is easy to read, with each item on its own line.
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isThinking]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })), { role: 'user', parts: [{ text: textToSend }] }],
        config: {
          systemInstruction: resumeContext,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 32768 },
        },
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || "I processed that request but couldn't generate a text response. How else can I assist?" 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I encountered an error while thinking deeply about that. Please try again or reach out to Kashish directly!" 
      }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const quickActions = [
    "Explain her Micro-Frontend strategy",
    "How does she use AI in CRM?",
    "Analyze her impact at KaptureCX",
    "Contact Details"
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-5 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="relative">
          <Bot className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-100"></span>
          </span>
        </div>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-gray-800">
          Chat with Deep Thinking AI
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-500 ease-in-out ${
      isMinimized ? 'bottom-8 right-8 w-72' : 'bottom-8 right-8 w-full max-w-[450px] h-[650px] max-h-[85vh]'
    }`}>
      <div className="w-full h-full bg-gray-950 border border-gray-800 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl">
        <div className="p-6 bg-gray-900/50 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl relative">
              <Bot className="w-5 h-5 text-white" />
              {isThinking && <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>}
            </div>
            <div>
              <h3 className="text-sm font-black text-white leading-tight">Pro Reasoning Agent</h3>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-purple-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  {isThinking ? 'Thinking Deeply...' : 'Ready'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-gray-500 hover:text-white transition-colors">
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-gray-800' : 'bg-blue-600'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-gray-400" /> : <Sparkles className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-gray-900 text-gray-300 rounded-tl-none border border-gray-800'
                    }`}>
                      <FormattedMessage content={msg.content} />
                    </div>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div className="p-4 bg-gray-900/50 text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-2xl rounded-tl-none border border-purple-500/20 flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Engaging high-budget reasoning...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-6 pb-2 overflow-x-auto">
              <div className="flex gap-2 whitespace-nowrap">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(action)}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-[10px] font-bold text-gray-400 hover:border-blue-500/50 hover:text-white transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-950/50 border-t border-gray-800">
              <form 
                className="relative"
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a complex technical question..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700 pr-14"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:bg-gray-800 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
