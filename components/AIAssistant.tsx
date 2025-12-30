import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Minus, Maximize2, Sparkles, User, BrainCircuit, ExternalLink, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, SKILL_GROUPS, EXPERIENCES, PROJECTS } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
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

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-black text-white">{part.slice(2, -2)}</strong>;
    }
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
      content: `Hi! I'm Kashish's AI assistant. I'm powered by Gemini 3 Pro. I can analyze her architectural choices at KaptureCX or her technical projects in detail. What can I help you with today?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check for the API Key from the environment
  const apiKey = process.env.API_KEY;

  const resumeContext = `
    User Profile: ${JSON.stringify(PERSONAL_INFO)}
    Skills: ${JSON.stringify(SKILL_GROUPS)}
    Experience: ${JSON.stringify(EXPERIENCES)}
    Projects: ${JSON.stringify(PROJECTS)}
    
    Instructions: You are the personal AI agent for Kashish Gupta. Answer questions professionally and concisely. 
    Use female pronouns (she/her) when referring to Kashish.
    
    CRITICAL FORMATTING RULES:
    1. Always use line breaks between different pieces of information.
    2. Use bullet points (starting with '*') for lists.
    3. Use bolding (**text**) for names or roles.
    4. Provide URLs in markdown format: [Text](URL).
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

    if (!apiKey) {
      setMessages(prev => [...prev, 
        { role: 'user', content: textToSend },
        { role: 'assistant', content: "API Key not found. Please ensure API_KEY is set in Vercel environment variables." }
      ]);
      setInput('');
      return;
    }

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })), { role: 'user', parts: [{ text: textToSend }] }],
        config: {
          systemInstruction: resumeContext,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 16000 },
        },
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || "I processed that request but couldn't generate a text response." 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I encountered an error. Please check the console for details." 
      }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const quickActions = [
    "Micro-Frontend strategy",
    "AI in CRM",
    "Contact Details"
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-5 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-500 transition-all"
      >
        <Bot className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-500 ease-in-out ${
      isMinimized ? 'bottom-8 right-8 w-72' : 'bottom-8 right-8 w-full max-w-[450px] h-[600px] max-h-[85vh]'
    }`}>
      <div className="w-full h-full bg-gray-950 border border-gray-800 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
        <div className="p-6 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-white">AI Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            {!apiKey && <AlertCircle className="w-4 h-4 text-amber-500" />}
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 text-gray-500 hover:text-white">
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-300 border border-gray-800'
                  }`}>
                    <FormattedMessage content={msg.content} />
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="p-4 bg-gray-900/50 text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-2xl flex items-center gap-2 border border-purple-500/20">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-6 pb-2 overflow-x-auto flex gap-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action)}
                  className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-[10px] text-gray-400 whitespace-nowrap"
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-gray-800">
              <form 
                className="relative"
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white disabled:opacity-50"
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