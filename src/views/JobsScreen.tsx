import React from 'react';
import { Layout } from '../components/Layout';
import { JobCard } from '../components/Home/HomeElements';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const ALL_JOBS = [
  { id: '1', title: 'Imam-ul-Hayy', masjid: 'Quwwat-ul-Islam', location: 'Chennai', salary: '20k - 25k', type: 'Full-time' },
  { id: '2', title: 'Qari & Tajweed Spec.', masjid: 'Masjidun Noor', location: 'V Vellore', salary: '15k - 18k', type: 'Part-time' },
  { id: '3', title: 'Arabic Teacher', masjid: 'Iqra Academy', location: 'Trichy', salary: '12k - 15k', type: 'Part-time' },
  { id: '4', title: 'Ramadan Taraweeh', masjid: 'Local Committee', location: 'Theni', salary: '30,000 Total', type: 'Contract' },
  { id: '5', title: 'Muadhin', masjid: 'New Juma Masjid', location: 'Nagercoil', salary: '10k - 12k', type: 'Full-time' },
];

export const JobsScreen: React.FC = () => {
  return (
    <Layout title="Job Board">
      <div className="px-4 py-6 space-y-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Filter by role or city..." 
              className="app-input pl-11 h-12 text-sm bg-white border-border-custom"
            />
          </div>
          <button className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {['All Jobs', 'Full-time', 'Part-time', 'Contract', 'Ramadan'].map((filter, i) => (
            <button 
              key={filter}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all ${
                i === 0 ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-text-secondary border-border-custom'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] px-1">Available Vacancies ({ALL_JOBS.length})</h3>
          <div className="space-y-4">
            {ALL_JOBS.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
