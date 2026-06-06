import React from 'react';
import { Layout } from '../components/Layout';
import { Search, MapPin, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const AALIMS = [
  { id: '1', name: 'Hafez Muhammad Rizwan', title: 'Qari & Alim', location: 'Chennai', exp: '8 Years', rating: 4.9, avatar: 'M' },
  { id: '2', name: 'Moulana Abdul Rahman', title: 'Imam & Khateeb', location: 'Salem', exp: '12 Years', rating: 5.0, avatar: 'A' },
  { id: '3', name: 'Alim Syed Ibrahim', title: 'Arabic Instructor', location: 'Hosur', exp: '5 Years', rating: 4.8, avatar: 'S' },
  { id: '4', name: 'Hafiz Sahul Hameed', title: 'Muadhin', location: 'Dindigul', exp: '3 Years', rating: 4.7, avatar: 'H' },
];

export const ProfilesScreen: React.FC = () => {
  return (
    <Layout title="Discover Aalims">
      <div className="px-4 py-6 space-y-6">
        <div className="bg-primary p-6 rounded-[24px] text-white space-y-2 relative overflow-hidden shadow-xl shadow-primary/20">
           <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mb-12" />
           <h3 className="text-xl font-serif italic relative z-10">Find Verified Staff</h3>
           <p className="text-[10px] text-white/60 tracking-widest uppercase font-bold relative z-10 leading-relaxed">Directly contact qualified professionals for your Masjid</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or qualification..." 
            className="app-input pl-11 h-12 text-sm"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] px-1">Recommended Profiles</h3>
          <div className="grid gap-4">
            {AALIMS.map((aalim, index) => (
              <motion.div
                key={aalim.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="app-card flex items-center space-x-4 border-l-4 border-l-accent"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary-bg flex items-center justify-center text-primary font-serif italic text-2xl border border-border-custom shadow-sm font-bold">
                   {aalim.avatar}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center space-x-2">
                     <h4 className="text-sm font-bold text-primary truncate">{aalim.name}</h4>
                     <ShieldCheck size={14} className="text-accent flex-shrink-0" />
                   </div>
                   <p className="text-[10px] text-accent font-bold uppercase tracking-wider">{aalim.title}</p>
                   <div className="flex items-center space-x-3 mt-1.5 opacity-60">
                     <div className="flex items-center space-x-1">
                        <MapPin size={10} />
                        <span className="text-[9px] font-bold tracking-tight">{aalim.location}</span>
                     </div>
                     <div className="flex items-center space-x-1">
                        <Star size={10} className="fill-accent text-accent" />
                        <span className="text-[9px] font-bold tracking-tight">{aalim.rating}</span>
                     </div>
                   </div>
                </div>
                <ChevronRight size={18} className="text-border-custom" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
