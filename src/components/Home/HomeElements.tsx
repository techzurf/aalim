import React from 'react';
import { Search, MapPin, ChevronRight, Briefcase, Users, PlusCircle } from 'lucide-react';

export const HomeHeader = ({ onActionClick }: { onActionClick?: () => void }) => {
  const role = localStorage.getItem('noor_user_role');
  const userInfoStr = localStorage.getItem('noor_user_info');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

  const displayName = userInfo?.name || (role === 'masjid' ? 'Triplicane Juma Masjid' : 'Jaffar Sadiq');
  const displayCity = userInfo?.city || 'Chennai';

  return (
    <div className="pt-6 pb-4 space-y-6 px-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#6B7280] font-bold">
            {role === 'masjid' ? 'Masjid Dashboard' : 'Tamil Nadu Staffing'}
          </p>
          <h2 className="text-3xl font-serif italic text-[#1E3A5F] leading-none truncate max-w-[240px]">
            {displayName}
          </h2>
        </div>
        <div className="flex items-center space-x-1 px-3 py-1.5 bg-accent/5 border border-accent/20 rounded-full">
          <MapPin size={10} className="text-accent" />
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{displayCity}</span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-[#6B7280]" size={20} />
        <input 
          type="text" 
          placeholder={role === 'masjid' ? "Search Imams, Qaris, Arabic Teachers..." : "Search Masjid openings..."} 
          className="app-input pl-12 h-14 text-base shadow-sm"
        />
      </div>

      {role === 'masjid' ? (
        <div className="bg-primary p-5 rounded-[24px] text-white flex items-center justify-between relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12" />
          <div className="relative z-10 space-y-1">
             <h3 className="text-lg font-serif italic">Need to recruit?</h3>
             <p className="text-[10px] text-white/60 tracking-wider uppercase font-bold">Post a new masjid opening</p>
          </div>
          <button 
            onClick={onActionClick}
            className="relative z-10 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg active:scale-90 transition-all hover:bg-accent/95"
          >
             <PlusCircle size={22} />
          </button>
        </div>
      ) : (
        <div className="bg-primary p-5 rounded-[24px] text-white flex items-center justify-between relative overflow-hidden shadow-xl shadow-primary/20">
           <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12" />
           <div className="relative z-10 space-y-1">
              <h3 className="text-lg font-serif italic">Complete verification</h3>
              <p className="text-[10px] text-white/60 tracking-wider uppercase font-bold">Get job alerts on WhatsApp</p>
           </div>
           <button 
             onClick={onActionClick}
             className="relative z-10 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:bg-accent/95"
           >
              <ChevronRight size={20} />
           </button>
        </div>
      )}
    </div>
  );
};

export const CategoryPills = () => {
  const role = localStorage.getItem('noor_user_role');
  const categories = [
    { id: 'imam', label: 'Imam', emoji: '🕌', seekerCount: '124 Aalims', masjidCount: '48 Jobs' },
    { id: 'muadhin', label: 'Muadhin', emoji: '📜', seekerCount: '86 Muadhins', masjidCount: '32 Jobs' },
    { id: 'teacher', label: 'Teacher', emoji: '📖', seekerCount: '52 Instructors', masjidCount: '18 Jobs' },
    { id: 'ramadan', label: 'Ramadan', emoji: '🌙', seekerCount: '15 Huffaz', masjidCount: '6 Openings' },
  ];

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[12px] font-bold text-primary uppercase tracking-widest">
          {role === 'masjid' ? 'Find candidates' : 'Browse Categories'}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button 
            key={cat.id}
            className="app-card flex items-center space-x-3 p-3 hover:border-accent group bg-white border border-[#E5E7EB] rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 bg-[#F4EFE6] border border-[#E5E7EB] rounded-xl flex items-center justify-center text-2xl group-hover:bg-accent/10 transition-colors">
              {cat.emoji}
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-bold text-primary uppercase tracking-wider">{cat.label}</span>
              <span className="block text-[9px] text-[#6B7280] font-medium">
                {role === 'masjid' ? cat.seekerCount : cat.masjidCount}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export const JobCard = ({ job, onApplyClick }: { job: any; onApplyClick?: (job: any) => void }) => {
  const role = localStorage.getItem('noor_user_role');
  return (
    <div className="app-card space-y-4 mb-4 bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-secondary-bg rounded-2xl flex items-center justify-center border border-border-custom shadow-sm overflow-hidden text-lg">
             {job.logo ? <img src={job.logo} alt="" className="w-full h-full object-cover" /> : '🕌'}
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary leading-tight">{job.title}</h4>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mt-0.5">{job.masjid}</p>
          </div>
        </div>
        <div className="bg-accent/10 text-accent text-[9px] px-2.5 py-1 rounded-full font-extrabold uppercase tracking-widest border border-accent/10">
          {job.type}
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-border-custom/50 pt-4 mt-1">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 grayscale opacity-75">
             <MapPin size={12} className="text-primary" />
             <span className="text-[10px] font-bold text-primary tracking-tight">{job.location}</span>
          </div>
          <div className="flex items-center space-x-1.5">
             <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/5 px-2 py-0.5 rounded-md border border-accent/20">₹ {job.salary}</span>
          </div>
        </div>

        {role !== 'masjid' && (
          <button 
            onClick={() => onApplyClick?.(job)}
            className="h-8 px-4 bg-[#1E3A5F] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-all"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};
export const CandidateCard = ({ candidate, onContactClick }: { candidate: any; onContactClick?: (c: any) => void }) => {
  return (
    <div className="app-card space-y-4 mb-4 bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#F4EFE6] rounded-2xl flex items-center justify-center border border-[#E5E7EB] shadow-sm text-primary font-serif font-bold text-lg">
             {candidate.avatar || 'A'}
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary leading-tight">{candidate.name}</h4>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider">{candidate.title}</span>
              <span className="text-[10px] text-[#2C7A7B] font-bold">• {candidate.exp} Exp</span>
            </div>
          </div>
        </div>
        <div className="bg-[#2C7A7B]/10 text-[#2C7A7B] text-[9px] px-2.5 py-1 rounded-full font-extrabold uppercase tracking-widest border border-[#2C7A7B]/10">
          Verified
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-[#E5E7EB]/50 pt-4 mt-1">
        <div className="flex items-center space-x-1.5 grayscale opacity-75">
           <MapPin size={12} className="text-primary" strokeWidth={2.5} />
           <span className="text-[10px] font-bold text-primary tracking-tight">{candidate.location}</span>
        </div>
        <button 
          onClick={() => onContactClick?.(candidate)}
          className="h-8 px-4 bg-accent text-white rounded-lg text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md shadow-accent/15"
        >
          Contact Candidate
        </button>
      </div>
    </div>
  );
};
