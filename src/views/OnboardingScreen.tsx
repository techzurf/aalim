import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, BookOpen, Building } from 'lucide-react';

interface OnboardingScreenProps {
  onSelectRole: (role: 'job_seeker' | 'masjid') => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onSelectRole }) => {
  const [selected, setSelected] = useState<'job_seeker' | 'masjid' | null>(null);

  const handleContinue = () => {
    if (selected) {
      onSelectRole(selected);
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-[#10243C] via-[#1E3A5F] to-[#122338] text-white flex flex-col justify-between overflow-y-auto px-6 py-8">
      {/* Arabic Calligraphy Style Micro Accent */}
      <div className="flex justify-center pt-2 opacity-50">
        <svg className="w-12 h-12 text-accent fill-current" viewBox="0 0 100 100">
          <path d="M50 15 L53 35 L73 38 L56 50 L63 70 L50 58 L37 70 L44 50 L27 38 L47 35 Z" />
        </svg>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-2 mt-2">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif italic font-bold tracking-tight text-white"
        >
          Welcome to Aalim Connect
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs text-accent uppercase tracking-[0.2em] font-bold"
        >
          Choose how you want to continue
        </motion.p>
      </div>

      {/* Cards Space */}
      <div className="space-y-4 my-6 flex-1 flex flex-col justify-center">
        {/* Card 1: Aalim / Muadhin */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setSelected('job_seeker')}
          className={`relative p-5 rounded-[24px] border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden group select-none ${
            selected === 'job_seeker'
              ? 'bg-[#1E3A5F] border-accent shadow-xl ring-2 ring-accent/30'
              : 'bg-[#1A314E]/70 border-white/10 hover:border-white/20'
          }`}
        >
          {/* Subtle Backgound Ornament */}
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-accent/5 rounded-full -mr-8 -mb-8 transition-transform group-hover:scale-110" />

          <div className="flex gap-4 items-start relative z-10">
            {/* Scholar Illustration Box */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2C7A7B]/20 to-[#2C7A7B]/40 flex items-center justify-center flex-shrink-0 border border-[#2C7A7B]/30 relative overflow-hidden">
              <BookOpen size={28} className="text-accent relative z-10" />
              {/* Scholar Vector Drawing - Miniature Dome style */}
              <div className="absolute inset-x-0 bottom-0 h-4 bg-accent/20 rounded-t-full" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-widest uppercase">Aalim / Muadhin</h3>
                {selected === 'job_seeker' && (
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check size={12} className="text-white font-bold" />
                  </div>
                )}
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Find opportunities in Masjids and Islamic institutions
              </p>
            </div>
          </div>

          {/* Features Tag Checklist */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 relative z-10">
            {['Create profile', 'Apply for jobs', 'Get verified', 'Connect with Masjids'].map((feat, i) => (
              <div key={i} className="flex items-center space-x-1.5 opacity-80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider">{feat}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Masjid / Job Provider */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setSelected('masjid')}
          className={`relative p-5 rounded-[24px] border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden group select-none ${
            selected === 'masjid'
              ? 'bg-[#1E3A5F] border-accent shadow-xl ring-2 ring-accent/30'
              : 'bg-[#1A314E]/70 border-white/10 hover:border-white/20'
          }`}
        >
          {/* Subtle Background Ornament */}
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-accent/5 rounded-full -mr-8 -mb-8 transition-transform group-hover:scale-110" />

          <div className="flex gap-4 items-start relative z-10">
            {/* Masjid Illustration Box */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2C7A7B]/20 to-[#2C7A7B]/40 flex items-center justify-center flex-shrink-0 border border-[#2C7A7B]/30 relative overflow-hidden">
              <Building size={28} className="text-accent relative z-10" />
              {/* Dome silhouette inside illustration */}
              <div className="absolute bottom-1 w-10 h-6 bg-accent/20 rounded-t-full" />
              <div className="absolute bottom-1.5 w-1 h-3 bg-accent/40" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-widest uppercase">Masjid / Job Provider</h3>
                {selected === 'masjid' && (
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check size={12} className="text-white font-bold" />
                  </div>
                )}
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Hire qualified Aalims, Imams and Muadhins
              </p>
            </div>
          </div>

          {/* Features Tag Checklist */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 relative z-10">
            {['Post jobs', 'Search candidates', 'Shortlist applicants', 'Contact Aalims'].map((feat, i) => (
              <div key={i} className="flex items-center space-x-1.5 opacity-80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider">{feat}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="space-y-4 pt-4 pb-safe">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full h-14 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all duration-300 ${
            selected 
              ? 'bg-accent text-white shadow-lg shadow-accent/20 active:scale-95' 
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ArrowRight size={16} />
        </button>

        <p className="text-[9px] text-center text-white/40 uppercase tracking-[0.3em] font-bold">
          Noor staff network • Secure and direct
        </p>

        {/* Admin Switcher Entry */}
        <div className="pt-2 border-t border-white/5 flex justify-center">
          <button
            onClick={() => {
              if ((window as any).__noor_toggle_admin) {
                (window as any).__noor_toggle_admin(true);
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all text-[10px] text-accent font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Admin Control Console</span>
          </button>
        </div>
      </div>
    </div>
  );
};
