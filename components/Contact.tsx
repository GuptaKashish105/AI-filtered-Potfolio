
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    
    // Simulate processing delay for UI impact
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Construct mailto link to actually "send" the mail using user's mail app
    const subject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    
    // Trigger mail client
    window.location.href = mailtoUrl;

    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <section id="contact" className="py-32 relative bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">Let's Build <br /> <span className="text-blue-500">The Future.</span></h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-lg">
              Open for collaboration on AI platforms, enterprise React architectures, or high-performance frontend engineering roles.
            </p>

            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="p-5 rounded-3xl bg-gray-900 border border-gray-800 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Send an Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl text-white font-bold hover:text-blue-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="p-5 rounded-3xl bg-gray-900 border border-gray-800 text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Phone Call</p>
                  <p className="text-xl text-white font-bold">
                    +91 {PERSONAL_INFO.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="p-5 rounded-3xl bg-gray-900 border border-gray-800 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Current Base</p>
                  <p className="text-xl text-white font-bold">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-10 md:p-14 rounded-[3rem] border border-gray-800 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
            {status === 'success' && (
              <div className="absolute inset-0 z-30 bg-gray-950/98 flex flex-col items-center justify-center text-center p-10 animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Draft Created!</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xs">Your mail client should have opened. If not, click below to try again or reach out manually.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-10 px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl transition-all"
                >
                  Send Another
                </button>
              </div>
            )}

            <div className="flex items-center gap-5 mb-10">
              <div className="p-3 bg-blue-600/10 rounded-2xl">
                <MessageSquare className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Direct Message</h3>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    disabled={status === 'sending'}
                    className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    disabled={status === 'sending'}
                    className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about SDE Role"
                  disabled={status === 'sending'}
                  className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you today?"
                  disabled={status === 'sending'}
                  className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder:text-gray-700"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-6 relative flex items-center justify-center gap-3 rounded-[1.5rem] font-black transition-all shadow-2xl ${
                  status === 'sending' 
                    ? 'bg-blue-600/40 cursor-wait text-blue-200' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 active:scale-[0.98]'
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-lg">Preparing Transmission...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Send Transmission</span>
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;