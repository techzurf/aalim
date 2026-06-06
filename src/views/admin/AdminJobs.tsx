import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Send, MapPin, Check, X, Star, Calendar, 
  Users, CheckCircle2, ChevronRight, Radio, BellRing, 
  Sparkles, Megaphone, Smartphone, Mail, SmartphoneCharging
} from 'lucide-react';
import { JobPosting, JobApplication } from './AdminTypes';

interface AdminJobsProps {
  jobs: JobPosting[];
  applications: JobApplication[];
  onApproveJob: (id: string, approve: boolean) => void;
  onToggleFeaturedJob: (id: string) => void;
  onSendCampaign: (campaign: { type: string; target: string; msg: string }) => void;
}

export const AdminJobs: React.FC<AdminJobsProps> = ({
  jobs,
  applications,
  onApproveJob,
  onToggleFeaturedJob,
  onSendCampaign
}) => {
  const [internalTab, setInternalTab] = useState<'approvals' | 'applications' | 'campaigns'>('approvals');
  
  // Applications Filters State
  const [appFilter, setAppFilter] = useState<'All' | 'Pending' | 'Selected' | 'Active' | 'Rejected'>('All');
  
  // Campaign Builder state
  const [campaignType, setCampaignType] = useState<'Push' | 'Email' | 'SMS' | 'Ramadan'>('Push');
  const [targetAudience, setTargetAudience] = useState<'All' | 'Aalims' | 'Masjids'>('All');
  const [campaignMsg, setCampaignMsg] = useState('Assalamu Alaikum. Daily Qirat screening placements are now open. Log in to apply.');
  const [scheduleTime, setScheduleTime] = useState('Instant Blast');

  const filteredApps = applications.filter(app => {
    if (appFilter === 'All') return true;
    return app.status === appFilter;
  });

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignMsg) return;

    onSendCampaign({
      type: campaignType,
      target: targetAudience,
      msg: campaignMsg
    });

    setCampaignMsg('');
    alert(`Alhamdulillah! Campaign type "${campaignType}" successfully sent to Target: "${targetAudience}".`);
  };

  return (
    <div className="space-y-4 pt-4 px-4 pb-12">
      
      {/* Tab Control with unified styling */}
      <div className="flex bg-[#F4EFE6] p-1 rounded-2xl border border-[#E5E7EB]">
        {[
          { id: 'approvals', label: 'Job Review', count: jobs.filter(j => j.status === 'Pending').length },
          { id: 'applications', label: 'Applicants', count: applications.filter(a => a.status === 'Pending').length },
          { id: 'campaigns', label: 'News Blast', count: null }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setInternalTab(tab.id as any)}
            className={`flex-1 py-3.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center space-x-1 transition-all ${
              internalTab === tab.id
                ? 'bg-[#0F766E] text-white shadow-md'
                : 'text-gray-500 hover:text-[#0F766E]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && tab.count > 0 && (
              <span className="ml-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* JOBS APPROVAL SYSTEM TAB */}
      {internalTab === 'approvals' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest leading-none"> listings pending screening</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase underline">Employment Standards Applied</span>
          </div>

          {jobs.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">All job openings have been screened!</p>
          ) : (
            jobs.map((job) => (
              <div 
                key={job.id} 
                className={`bg-white border rounded-[22px] p-4 shadow-sm flex flex-col space-y-3 transition-colors ${
                  job.status === 'Pending' ? 'border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/5 bg-amber-50/10' : 'border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-[#1E3A5F]">{job.position}</h4>
                    <span className="block text-[10px] font-extrabold text-[#0F766E] uppercase tracking-wide mt-0.5">{job.masjidName}</span>
                  </div>

                  <span className={`text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    job.status === 'Approved' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : job.status === 'Rejected'
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-amber-50 border-amber-200 text-amber-600'
                  }`}>
                    {job.status}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                  <div className="flex items-center space-x-1 text-gray-400 text-[10px] font-bold">
                    <MapPin size={10} className="text-[#0F766E]" />
                    <span>{job.location}</span>
                    <span className="text-gray-300 mx-1">•</span>
                    <span className="text-emerald-700">{job.salary}</span>
                  </div>

                  <button
                    onClick={() => onToggleFeaturedJob(job.id)}
                    className={`p-1.5 rounded-xl border transition-all ${
                      job.isFeatured 
                        ? 'bg-amber-100 border-[#D4AF37] text-[#D4AF37]' 
                        : 'bg-white border-gray-200 text-gray-300 hover:text-gray-400'
                    }`}
                    title="Promote to Featured section"
                  >
                    <Star size={14} fill={job.isFeatured ? '#D4AF37' : 'none'} />
                  </button>
                </div>

                {job.status === 'Pending' && (
                  <div className="flex gap-2 pt-1.5">
                    <button
                      onClick={() => onApproveJob(job.id, false)}
                      className="flex-1 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl text-[10px] uppercase tracking-widest"
                    >
                      Refuse Post
                    </button>
                    <button
                      onClick={() => onApproveJob(job.id, true)}
                      className="flex-1 h-10 bg-[#0F766E] hover:bg-[#0D625C] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center space-x-1"
                    >
                      <Check size={12} strokeWidth={2.5} />
                      <span>Approve Job</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* APPLICATIONS TRACKER MANAGEMENT TAB */}
      {internalTab === 'applications' && (
        <div className="space-y-3.5">
          {/* Custom Filters pill container */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Pending', 'Active', 'Selected', 'Rejected'].map((filt) => (
              <button
                key={filt}
                onClick={() => setAppFilter(filt as any)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border transition-all ${
                  appFilter === filt
                    ? 'bg-[#0F766E] text-white border-[#0F766E]'
                    : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                }`}
              >
                {filt}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {filteredApps.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No candidates in this segment</p>
            ) : (
              filteredApps.map((app) => (
                <div key={app.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-[#1E3A5F] font-bold text-center flex items-center justify-center text-sm">
                      {app.candidateAvatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1E3A5F]">{app.candidateName}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold leading-tight mt-0.5">Applied to: <strong className="text-[#0F766E] font-extrabold">{app.position}</strong></p>
                      <p className="text-[9px] text-gray-400 font-semibold leading-none">{app.masjidName}</p>
                    </div>
                  </div>

                  <span className={`text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    app.status === 'Selected' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      : app.status === 'Active'
                      ? 'bg-indigo-50 border-indigo-100 text-[#1E3A5F]'
                      : app.status === 'Rejected'
                      ? 'bg-red-50 border-red-100 text-red-500'
                      : 'bg-amber-50 border-amber-100 text-amber-600'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* NOTIFICATION CAMPAIGN BUILDER TAB */}
      {internalTab === 'campaigns' && (
        <form onSubmit={handleCampaignSubmit} className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 space-y-4 shadow-sm">
          <div className="p-3 bg-[#0F766E]/5 rounded-2xl flex items-start space-x-3 border border-[#0F766E]/10">
            <Radio className="text-[#0F766E] animate-pulse flex-shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] text-gray-600 leading-normal font-semibold">
              Broadcast regional campaigns down to certified WhatsApp lists, android notification drawers, and SMS networks instant queue.
            </p>
          </div>

          {/* Type selectors */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Broadcast Medium</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'Push', label: 'Push App', icon: SmartphoneCharging },
                { id: 'Email', label: 'Email', icon: Mail },
                { id: 'SMS', label: 'Bulk SMS', icon: Megaphone },
                { id: 'Ramadan', label: 'Ramadan', icon: Sparkles }
              ].map((medium) => (
                <button
                  key={medium.id}
                  type="button"
                  onClick={() => setCampaignType(medium.id as any)}
                  className={`py-2 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all text-[9.5px] font-extrabold uppercase tracking-wider ${
                    campaignType === medium.id 
                      ? 'bg-[#0F766E]/10 border-[#0F766E] text-[#0F766E]' 
                      : 'border-gray-100 bg-white text-gray-400'
                  }`}
                >
                  <medium.icon size={14} />
                  <span>{medium.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target audiences */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Target Segment</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'All', label: 'Everyone' },
                { id: 'Aalims', label: 'Only Aalims' },
                { id: 'Masjids', label: 'Only Masjids' }
              ].map((aud) => (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => setTargetAudience(aud.id as any)}
                  className={`py-2 rounded-xl text-[9px] font-extrabold border uppercase tracking-widest text-center ${
                    targetAudience === aud.id 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-600' 
                      : 'border-gray-100 bg-white text-gray-400'
                  }`}
                >
                  {aud.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Message box */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Campaign Message Content</label>
            <textarea
              required
              rows={3}
              placeholder="Type urgent notification bulletins here..."
              className="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs font-semibold text-[#1E3A5F] outline-none focus:border-[#0F766E]"
              value={campaignMsg}
              onChange={(e) => setCampaignMsg(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Scheduling</label>
              <select
                className="w-full h-11 bg-white border border-[#E5E7EB] rounded-xl px-2 text-[11px] font-bold outline-none uppercase"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              >
                <option value="Instant Blast">🚀 Instant Launch</option>
                <option value="Tomorrow Fajar">🌅 Tomorrow Fajar</option>
                <option value="Friday Juma">🕌 Friday Juma</option>
              </select>
            </div>

            <button
              type="submit"
              className="h-11 bg-[#0F766E] hover:bg-[#0D625C] text-white rounded-xl text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center space-x-1.5 shadow-lg active:scale-95 transition-all"
            >
              <Send size={12} />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
