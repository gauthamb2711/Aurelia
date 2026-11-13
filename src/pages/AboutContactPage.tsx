import React, { useState } from 'react';
import { Compass, Shield, Heart, Globe, Send, CheckCircle2, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

interface AboutContactPageProps {
  isDark: boolean;
}

export const AboutContactPage: React.FC<AboutContactPageProps> = ({ isDark }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [regionInterest, setRegionInterest] = useState('Europe');
  const [travelers, setTravelers] = useState('2');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  const fieldCls = `w-full px-4 py-2.5 rounded-xl border focus:outline-none ${
    isDark
      ? 'border-white/15 bg-white/5 text-white placeholder-gray-500 focus:border-[#D4AF37]'
      : 'border-black/15 bg-black/5 text-gray-900 placeholder-gray-500 focus:border-[#9A7B38]'
  }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-14 sm:space-y-20">
      
      {/* Manifesto Section */}
      <section className="text-center max-w-3xl mx-auto space-y-5 sm:space-y-6">
        <span className={`text-xs uppercase tracking-[0.3em] font-semibold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
          The Aurelia Manifesto
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          "Don't Just Visit Places. <br />
          <span className={`italic ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>Experience Stories."</span>
        </h1>
        <p className={`text-sm sm:text-base font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          AURELIA was born out of frustration with cookie-cutter tourism portals and algorithmic homogenization. In a world flooded with superficial check-ins, we build technology that celebrates the contemplative craft of slow travel: ancient stone temples, secret coves, and quiet dialogues with local artisans.
        </p>
      </section>

      {/* The 4 Curatorial Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <div className={`p-6 rounded-2xl border ${
          isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-xl font-normal mb-2">
            Curated Authenticity
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Every sanctuary, timing, and local dish is verified against human fieldwork rather than automated scrape aggregates.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border ${
          isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-xl font-normal mb-2">
            Indigenous Reverence
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We champion responsible community travel that channels economic empowerment directly to heritage custodians and families.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border ${
          isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-xl font-normal mb-2">
            Zero Tracking & Privacy
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            No mandatory signups, passwords, or tracking cookies. All your itineraries and bookmarks live securely in your browser.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border ${
          isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-xl font-normal mb-2">
            Slow Travel Cadence
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We believe five days in one tranquil valley yields deeper wisdom than checking off seven cities in a rushed week.
          </p>
        </div>
      </section>

      {/* Contact Concierge Form */}
      <section className={`p-6 sm:p-12 rounded-3xl border ${
        isDark ? 'bg-[#0B132B] border-[#D4AF37]/30 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-xl'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className={`text-xs uppercase tracking-widest font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Voyager Concierge
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal leading-tight">
              Connect with our Travel Architects
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Have questions regarding complex multi-region journeys, seasonal logistics, or bespoke recommendations? Send us a dispatch.
            </p>

            <div className={`pt-4 space-y-3 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Aurelia Travel Studios, Geneva & New Delhi</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>concierge@aureliaodyssey.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>+41 (0) 22 710 4400 / +91 (0) 11 4980 2000</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className={`font-editorial text-2xl font-normal ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Dispatch Received, {fullName}
                </h3>
                <p className={`text-xs max-w-md mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Thank you for reaching out to the Aurelia Concierge. Your enquiry has been recorded locally in this session.
                </p>
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#080E1E] text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name..."
                      className={fieldCls}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className={fieldCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                      Region of Interest
                    </label>
                    <select
                      value={regionInterest}
                      onChange={(e) => setRegionInterest(e.target.value)}
                      className={fieldCls}
                    >
                      <option value="India" className="bg-slate-900 text-white">India (Rajasthan, Himalayas)</option>
                      <option value="Southeast Asia" className="bg-slate-900 text-white">Southeast & East Asia (Japan, Indonesia)</option>
                      <option value="Europe" className="bg-slate-900 text-white">Europe (Italy, Switzerland, Norway)</option>
                      <option value="Middle East" className="bg-slate-900 text-white">Middle East (Jordan, Oman, Turkey)</option>
                      <option value="Africa" className="bg-slate-900 text-white">Africa (Tanzania, Morocco)</option>
                      <option value="Americas" className="bg-slate-900 text-white">The Americas & Patagonia</option>
                      <option value="Oceania" className="bg-slate-900 text-white">Oceania (New Zealand, Australia)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                      Party Size
                    </label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className={fieldCls}
                    >
                      <option value="1" className="bg-slate-900 text-white">1 Solo Explorer</option>
                      <option value="2" className="bg-slate-900 text-white">2 Couple / Companions</option>
                      <option value="4" className="bg-slate-900 text-white">4 Family</option>
                      <option value="6+" className="bg-slate-900 text-white">6+ Private Group</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                    Your Travel Narrative or Question
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the atmosphere, seasons, or special moments you envision..."
                    className={fieldCls}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Confidential Enquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
