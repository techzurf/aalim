import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Building2, School, Search, ShieldAlert, 
  MapPin, CheckCircle, ChevronRight, X, Play, 
  Pause, GraduationCap, Eye, Trash2, Ban, 
  FileText, Check, Phone, Globe, Volume2, Sparkles
} from 'lucide-react';
import { Aalim, Masjid, Madrasa } from './AdminTypes';

interface AdminUsersProps {
  aalims: Aalim[];
  masjids: Masjid[];
  madrasas: Madrasa[];
  onVerifyAalim: (id: string, approve: boolean) => void;
  onVerifyMasjid: (id: string, approve: boolean) => void;
  onSuspendUser: (id: string, userType: 'aalim' | 'masjid') => void;
  onDeleteUser: (id: string, userType: 'aalim' | 'masjid' | 'madrasa') => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  aalims,
  masjids,
  madrasas,
  onVerifyAalim,
  onVerifyMasjid,
  onSuspendUser,
  onDeleteUser
}) => {
  const [activeTab, setActiveTab] = useState<'aalims' | 'masjids' | 'madrasas' | 'blocked'>('aalims');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Review Modal States
  const [selectedAalim, setSelectedAalim] = useState<Aalim | null>(null);
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter lists based on tab and searching query
  const filteredAalims = aalims.filter(a => {
    if (activeTab === 'aalims') return a.status !== 'Suspended' && a.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'blocked') return a.status === 'Suspended' && a.name.toLowerCase().includes(searchQuery.toLowerCase());
    return false;
  });

  const filteredMasjids = masjids.filter(m => {
    if (activeTab === 'masjids') return m.status !== 'Suspended' && m.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'blocked') return m.status === 'Suspended' && m.name.toLowerCase().includes(searchQuery.toLowerCase());
    return false;
  });

  const filteredMadrasas = activeTab === 'madrasas' 
    ? madrasas.filter(md => md.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleAudioPlayback = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleAalimReview = (aalim: Aalim) => {
    setSelectedAalim(aalim);
    setIsPlayingAudio(false);
  };

  const handleMasjidReview = (masjid: Masjid) => {
    setSelectedMasjid(masjid);
  };

  return (
    <div className="space-y-4 pt-4 px-4 pb-12">
      {/* Search Input bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder={`Find verified ${activeTab}...`}
          className="w-full h-12 bg-white border border-[#E5E7EB] rounded-2xl pl-11 pr-4 text-xs font-semibold text-[#1E3A5F] outline-none focus:border-[#0F766E] shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs list with Emerald and Gold accent state */}
      <div className="flex bg-[#F4EFE6] p-1 rounded-2xl border border-[#E5E7EB]">
        {[
          { id: 'aalims', label: 'Aalims', icon: Users },
          { id: 'masjids', label: 'Masjids', icon: Building2 },
          { id: 'madrasas', label: 'Madrasas', icon: School },
          { id: 'blocked', label: 'Suspended', icon: ShieldAlert }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as any); setSearchQuery(''); }}
            className={`flex-1 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest flex flex-col items-center justify-center space-y-1 transition-all ${
              activeTab === tab.id
                ? 'bg-[#0F766E] text-white shadow-md'
                : 'text-gray-500 hover:text-[#0F766E]'
            }`}
          >
            <tab.icon size={14} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* User lists */}
      <div className="space-y-3">
        {/* Aalim Listing */}
        {activeTab === 'aalims' && (
          filteredAalims.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">No active Aalims registered.</p>
          ) : (
            filteredAalims.map((aalim) => (
              <div key={aalim.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col space-y-3 relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] flex items-center justify-center font-bold text-base select-none">
                      {aalim.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <h4 className="text-xs font-bold text-[#1E3A5F]">{aalim.name}</h4>
                        {aalim.isPremium && (
                          <span className="text-[8px] bg-[#D4AF37]/20 text-amber-800 font-bold border border-[#D4AF37]/30 px-1 rounded">PREMIUM</span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{aalim.title} • {aalim.experience} Exp</p>
                    </div>
                  </div>
                  
                  {/* Status Indicator Badge */}
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    aalim.status === 'Verified'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : 'bg-amber-50 border-amber-200 text-amber-600'
                  }`}>
                    {aalim.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="flex items-center space-x-1.5 grayscale opacity-60">
                    <MapPin size={11} className="text-[#0F766E]" />
                    <span className="text-[10px] font-bold text-gray-600">{aalim.district} Tamil Nadu</span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5">
                    <button 
                      onClick={() => handleAalimReview(aalim)}
                      className="h-8 px-3.5 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-all"
                    >
                      Verify / Inspect
                    </button>
                    <button 
                      onClick={() => onSuspendUser(aalim.id, 'aalim')}
                      className="h-8 w-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-100 active:scale-95"
                      title="Suspend user"
                    >
                      <Ban size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        )}

        {/* Masjids Listing */}
        {activeTab === 'masjids' && (
          filteredMasjids.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">No masjids listed.</p>
          ) : (
            filteredMasjids.map((masjid) => (
              <div key={masjid.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col space-y-3 relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold text-base">
                      🕌
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <h4 className="text-xs font-bold text-[#1E3A5F]">{masjid.name}</h4>
                        {masjid.isPremium && (
                          <span className="text-[8px] bg-emerald-150 text-emerald-800 font-bold border border-[#0F766E]/20 px-1 rounded bg-emerald-50">TRUSTED</span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{masjid.jamathName}</p>
                    </div>
                  </div>

                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    masjid.status === 'Verified'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : 'bg-amber-50 border-amber-200 text-amber-600'
                  }`}>
                    {masjid.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="flex items-center space-x-1.5 grayscale opacity-60">
                    <MapPin size={11} className="text-amber-500" />
                    <span className="text-[10px] font-bold text-gray-600">{masjid.location}, TN</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button 
                      onClick={() => handleMasjidReview(masjid)}
                      className="h-8 px-3.5 bg-gradient-to-r from-amber-500 to-[#D4AF37] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-all"
                    >
                      Verify / Inspect
                    </button>
                    <button 
                      onClick={() => onSuspendUser(masjid.id, 'masjid')}
                      className="h-8 w-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-100 active:scale-95"
                      title="Suspend user"
                    >
                      <Ban size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        )}

        {/* Madrasas Listing */}
        {activeTab === 'madrasas' && (
          filteredMadrasas.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">No Madrasas matching query found.</p>
          ) : (
            filteredMadrasas.map((madr) => (
              <div key={madr.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2C7A7B] flex items-center justify-center font-bold">
                    📖
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1E3A5F]">{madr.name}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">{madr.location} • Reg Date: {madr.regDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteUser(madr.id, 'madrasa')}
                  className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-100 active:scale-95 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )
        )}

        {/* Blocked Users Listing */}
        {activeTab === 'blocked' && (
          [...aalims.filter(a => a.status === 'Suspended'), ...masjids.filter(m => m.status === 'Suspended')].length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">No users suspended.</p>
          ) : (
            [...aalims.filter(a => a.status === 'Suspended'), ...masjids.filter(m => m.status === 'Suspended')].map((user) => (
              <div key={user.id} className="bg-red-50/50 border border-red-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold font-mono">
                    !
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1E3A5F]">{user.name}</h4>
                    <span className="text-[8px] bg-red-100 text-red-600 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {'title' in user ? 'Scholar Profile Banned' : 'Mosque Profile Banned'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => {
                      if ('title' in user) {
                        onVerifyAalim(user.id, true);
                      } else {
                        onVerifyMasjid(user.id, true);
                      }
                    }}
                    className="h-8 px-3.5 bg-green-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id, 'title' in user ? 'aalim' : 'masjid')}
                    className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )
        )}
      </div>

      {/* AALIM VERIFICATION POPUP SCREEN */}
      <AnimatePresence>
        {selectedAalim && (
          <div className="fixed inset-0 z-[140] flex items-end justify-center bg-black/60 pt-10">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white text-gray-901 w-full max-w-[430px] rounded-t-[32px] p-6 space-y-6 shadow-2xl max-h-[88vh] overflow-y-auto pb-safe"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <span className="text-[9px] bg-[#0F766E]/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[#0F766E]">Scholar Evaluation Docs</span>
                  <h3 className="text-lg font-serif italic text-[#1E3A5F] font-bold">Aalim Verification</h3>
                </div>
                <button 
                  onClick={() => setSelectedAalim(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scholar Identity summary */}
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center space-x-4 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center font-bold text-2xl border border-[#0F766E]/20">
                  {selectedAalim.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E3A5F]">{selectedAalim.name}</h4>
                  <p className="text-[10px] text-[#0F766E] font-bold uppercase tracking-wider">{selectedAalim.title}</p>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{selectedAalim.experience} Professional Experience</p>
                </div>
              </div>

              {/* Scholar details list */}
              <div className="space-y-3.5">
                <div className="flex justify-between text-xs px-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">Madrasa Graduated</span>
                  <span className="font-semibold text-[#1E3A5F]">{selectedAalim.madrasa}</span>
                </div>
                <div className="flex justify-between text-xs px-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">District (Takreem Registry)</span>
                  <span className="font-semibold text-[#1E3A5F]">{selectedAalim.district} (TN Council)</span>
                </div>
                <div className="flex justify-between text-xs px-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">Registration Date</span>
                  <span className="font-semibold text-gray-500">{selectedAalim.regDate}</span>
                </div>

                {/* Simulated Qirat Audio Clip Player */}
                <div className="p-4 bg-amber-50/40 border border-[#D4AF37]/20 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-800 font-extrabold uppercase tracking-widest flex items-center gap-1">
                      <Volume2 size={13} className="text-[#D4AF37]" />
                      Voice & Qirat Sample Playback
                    </span>
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 rounded-full uppercase tracking-wider">MPEG-3</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 border border-[#D4AF37]/15 rounded-xl">
                    <button 
                      type="button"
                      onClick={handleAudioPlayback}
                      className="w-10 h-10 rounded-full bg-[#0F766E] text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform relative"
                    >
                      {isPlayingAudio ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" className="ml-0.5" />}
                    </button>
                    <div className="flex-1 space-y-1">
                      <p className="text-[10px] font-bold text-[#1E3A5F] truncate">{selectedAalim.audioSample}</p>
                      
                      {/* Interactive visual equalizer bar */}
                      <div className="flex items-center justify-between gap-0.5 h-3">
                        {[4, 8, 2, 6, 9, 3, 7, 5, 8, 3, 6, 8, 4, 7, 9, 3, 6, 8, 4, 2].map((h, index) => (
                          <div 
                            key={index} 
                            style={{ height: isPlayingAudio ? `${h * 10}%` : '20%' }} 
                            className={`w-[3px] bg-[#0F766E] rounded-full transition-all duration-300 ${isPlayingAudio ? 'animate-pulse' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uploaded Documents List */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E] block px-1">Uploaded Islamic Certificates</label>
                  <div className="space-y-1.5">
                    {selectedAalim.certificates.map((cert) => (
                      <div key={cert} className="p-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between hover:border-[#0F766E] transition-colors relative group">
                        <div className="flex items-center space-x-2">
                          <FileText size={16} className="text-[#0F766E]" />
                          <span className="text-[11px] font-extrabold text-[#1E3A5F] tracking-tight">{cert}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Reviewing documents safe sandbox. Loaded: ${cert}`)}
                          className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1 group-hover:underline"
                        >
                          <Eye size={12} />
                          Review Spec
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Workflow */}
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    onVerifyAalim(selectedAalim.id, false);
                    setSelectedAalim(null);
                  }}
                  className="flex-1 h-12 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
                >
                  Reject & Flag
                </button>
                <button
                  onClick={() => {
                    onVerifyAalim(selectedAalim.id, true);
                    setSelectedAalim(null);
                  }}
                  className="flex-1 h-12 bg-[#0F766E] text-white hover:bg-[#0D625C] rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Check size={14} />
                  <span>Approve & Verify</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MASJID VERIFICATION POPUP SCREEN */}
      <AnimatePresence>
        {selectedMasjid && (
          <div className="fixed inset-0 z-[140] flex items-end justify-center bg-black/60 pt-10">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white text-gray-901 w-full max-w-[430px] rounded-t-[32px] p-6 space-y-6 shadow-2xl max-h-[88vh] overflow-y-auto pb-safe"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <span className="text-[9px] bg-amber-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest text-[#D4AF37] border border-amber-200">Masjid Wakf Verification</span>
                  <h3 className="text-lg font-serif italic text-primary font-bold">Mosque Credentials</h3>
                </div>
                <button 
                  onClick={() => setSelectedMasjid(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mosque title bar */}
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center space-x-4 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-2xl flex items-center justify-center border border-amber-100">
                  🕌
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">{selectedMasjid.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{selectedMasjid.jamathName}</p>
                </div>
              </div>

              {/* Data specifications */}
              <div className="space-y-3.5">
                <div className="flex justify-between text-xs px-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">Location (Takreem Register)</span>
                  <span className="font-semibold text-primary flex items-center"><MapPin size={12} className="text-amber-500 mr-1" />{selectedMasjid.location}, TN</span>
                </div>
                <div className="flex justify-between text-xs px-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">Mosque Helpline Contact</span>
                  <span className="font-semibold text-primary flex items-center"><Phone size={12} className="text-[#0F766E] mr-1" />{selectedMasjid.contact}</span>
                </div>
                <div className="flex justify-between text-xs px-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">Takreem Registration Cert</span>
                  <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{selectedMasjid.regDoc}</span>
                </div>

                {/* Sub-gallery illustration */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E] block px-1">Institutional Photography</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-28 bg-[#F4EFE6] rounded-xl flex items-center justify-center font-serif text-3xl font-bold border border-gray-100 text-[#0F766E]">
                      🕌
                    </div>
                    <div className="h-28 bg-[#F4EFE6] rounded-xl flex items-center justify-center font-serif text-3xl font-bold border border-gray-100 text-[#0F766E]">
                      📖
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Workflow */}
              <div className="flex gap-3 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => {
                    onVerifyMasjid(selectedMasjid.id, false);
                    setSelectedMasjid(null);
                  }}
                  className="flex-1 h-12 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
                >
                  Flag / Reject
                </button>
                <button
                  onClick={() => {
                    onVerifyMasjid(selectedMasjid.id, true);
                    setSelectedMasjid(null);
                  }}
                  className="flex-1 h-12 bg-[#0F766E] text-white hover:bg-[#0D625C] rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Check size={14} />
                  <span>Verify Mosque</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
