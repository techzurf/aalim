import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { HomeHeader, CategoryPills, JobCard, CandidateCard } from '../components/Home/HomeElements';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Share2, Plus, Sparkles, Check, X } from 'lucide-react';

const INITIAL_JOBS = [
  {
    id: '1',
    title: 'Chief Imam',
    masjid: 'Juma Masjid, Triplicane',
    location: 'Chennai',
    salary: '25,000 - 35,000',
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'Hifz Teacher',
    masjid: 'Madrasa Noorul Huda',
    location: 'Erode',
    salary: '18,500 - 22,000',
    type: 'Part-time'
  },
  {
    id: '3',
    title: 'Muadhin & Caretaker',
    masjid: 'Masjid-e-Ibrahim',
    location: 'Madurai',
    salary: '15,000 - 20,000',
    type: 'Full-time'
  }
];

const MOCK_AALIMS = [
  { id: '1', name: 'Hafez Muhammad Rizwan', title: 'Qari & Alim', location: 'Chennai', exp: '8 Years', avatar: 'R' },
  { id: '2', name: 'Moulana Abdul Rahman', title: 'Imam & Khateeb', location: 'Salem', exp: '12 Years', avatar: 'A' },
  { id: '3', name: 'Alim Syed Ibrahim', title: 'Arabic Instructor', location: 'Hosur', exp: '5 Years', avatar: 'I' },
];

export const HomeScreen: React.FC = () => {
  const role = localStorage.getItem('noor_user_role');
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    masjid: '',
    location: 'Chennai',
    salary: '',
    type: 'Full-time'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleApply = (job: any) => {
    showToast(`Successfully applied to ${job.masjid} for ${job.title}! Code generated: #N-${Math.floor(Math.random() * 9000 + 1000)}.`);
  };

  const handleContactAalim = (aalim: any) => {
    showToast(`Connecting with ${aalim.name}... A secure interview request has been routed.`);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.masjid) return;

    const added = {
      id: String(jobs.length + 1),
      title: newJob.title,
      masjid: newJob.masjid,
      location: newJob.location,
      salary: newJob.salary || '15,000 - 25,000',
      type: newJob.type
    };

    setJobs([added, ...jobs]);
    setShowPostJobModal(false);
    setNewJob({
      title: '',
      masjid: '',
      location: 'Chennai',
      salary: '',
      type: 'Full-time'
    });
    showToast(`Alhamdulillah! Vacancy for "${added.title}" posted successfully.`);
  };

  const handleActionBanner = () => {
    if (role === 'masjid') {
      setShowPostJobModal(true);
    } else {
      showToast("WhatsApp alerts synchronized! You will receive new opportunities instantly.");
    }
  };

  return (
    <Layout>
      <HomeHeader onActionClick={handleActionBanner} />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <CategoryPills />

        {/* Dynamic Main Listing */}
        <div className="px-4 py-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[12px] font-bold text-primary uppercase tracking-widest">
              {role === 'masjid' ? 'Verified Specialists Available' : 'Featured Vacancies'}
            </h3>
            <button 
              onClick={() => showToast(role === 'masjid' ? "All qualified Aalims are currently listed below" : "Displaying latest curated active job board postings")}
              className="flex items-center space-x-1 text-[11px] font-bold text-accent uppercase tracking-wider hover:underline"
            >
               <span>See All</span>
               <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="space-y-3">
            {role === 'masjid' ? (
              // If user is a Masjid, show candidates first
              MOCK_AALIMS.map((aalim, index) => (
                <motion.div
                  key={aalim.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <CandidateCard candidate={aalim} onContactClick={handleContactAalim} />
                </motion.div>
              ))
            ) : (
              // If user is a standard job seeker
              jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <JobCard job={job} onApplyClick={handleApply} />
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Premium Bottom Feature Block */}
        <div className="px-4 pb-16">
           <div className="p-6 rounded-[24px] bg-accent text-white space-y-4 shadow-xl shadow-accent/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12" />
              <div className="relative z-10 space-y-1">
                <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[#F4EFE6]">Verified Network</span>
                <h4 className="text-xl font-serif italic pt-1">
                  {role === 'masjid' ? 'Premium Recruitment Tools' : 'Verified by Al-Ameen Board'}
                </h4>
              </div>
              <p className="text-[12px] text-white/85 leading-relaxed font-sans relative z-10">
                {role === 'masjid' 
                  ? 'Access strict credentials checking, background references, and seamless contract mediation.' 
                  : 'Get standard certifications verified officially for a much quicker placement inside local Masjids.'}
              </p>
              <button 
                onClick={() => showToast("Features standard verification. Fully optimized for instant WebView deployment.")}
                className="w-full h-12 bg-white text-accent rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-md active:scale-95 transition-all relative z-10 hover:bg-white/95"
              >
                 {role === 'masjid' ? 'Unlock Advanced Portal' : 'Apply For Verification'}
              </button>
           </div>
        </div>
      </motion.div>

      {/* Floating Animated Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-[380px] bg-primary text-white border border-accent/30 p-4 rounded-xl shadow-2xl flex items-start space-x-3"
          >
            <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={12} className="text-white font-bold" />
            </div>
            <p className="text-xs font-semibold leading-relaxed font-sans flex-1">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post a Job simulation Modal */}
      <AnimatePresence>
        {showPostJobModal && (
          <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 pt-10">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white text-text-primary w-full max-w-[430px] rounded-t-[32px] p-6 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto pb-safe"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border-custom">
                <div>
                  <h3 className="text-lg font-serif italic text-primary font-bold">Post a Vacancy</h3>
                  <p className="text-[9px] text-[#6B7280] uppercase tracking-widest font-bold">Instantly find regional Aalims</p>
                </div>
                <button 
                  onClick={() => setShowPostJobModal(false)}
                  className="w-8 h-8 rounded-full bg-secondary-bg flex items-center justify-center text-text-primary hover:bg-neutral-200"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handlePostJob} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A5F]">Job Title / Role</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Chief Imam or Quran Teacher" 
                    className="app-input"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A5F]">Masjid or institution Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Triplicane Juma Masjid" 
                    className="app-input"
                    value={newJob.masjid}
                    onChange={(e) => setNewJob({ ...newJob, masjid: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A5F]">Location (City)</label>
                    <select 
                      className="app-input bg-white appearance-none h-12"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Erode">Erode</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A5F]">Job Type</label>
                    <select 
                      className="app-input bg-white appearance-none h-12"
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A5F]">Salary Range (₹ per Month)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 20,000 - 25,000" 
                    className="app-input"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full h-14 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 active:scale-95 transition-all pt-1"
                >
                   Publish Vacancy
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
