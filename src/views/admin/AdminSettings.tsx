import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, HelpCircle, Shield, Globe, Bell, FileText, ChevronRight, Check, Play,
  Headphones, Lock, Eye, Send, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, X, MessageSquare, AlertTriangle, Sparkles
} from 'lucide-react';
import { SupportTicket, AuditLog, HomeBanner } from './AdminTypes';

interface AdminSettingsProps {
  tickets: SupportTicket[];
  auditLogs: AuditLog[];
  banners: HomeBanner[];
  onReplyTicket: (id: string, text: string) => void;
  onCloseTicket: (id: string) => void;
  onUpdateBanners: (banners: HomeBanner[]) => void;
  onResetDatabase: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  tickets,
  auditLogs,
  banners,
  onReplyTicket,
  onCloseTicket,
  onUpdateBanners,
  onResetDatabase
}) => {
  const [settingsView, setSettingsView] = useState<'index' | 'tickets' | 'cms' | 'audit'>('index');
  
  // Settings detail inputs
  const [appLang, setAppLang] = useState<'tamil' | 'english' | 'arabic'>('english');
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [otpSession, setOtpSession] = useState('30 min session');

  // Support detail dialogue modal
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // CMS create banner banner
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerSub, setNewBannerSub] = useState('');

  const handleTicketClick = (ticket: SupportTicket) => {
    setActiveTicket(ticket);
    setAdminReplyText('');
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText || !activeTicket) return;

    onReplyTicket(activeTicket.id, adminReplyText);
    
    // update local reference to display instantly
    const updatedChats = [...activeTicket.chats, { sender: 'admin' as const, text: adminReplyText, time: 'Just Now' }];
    setActiveTicket({ ...activeTicket, chats: updatedChats });
    setAdminReplyText('');
  };

  // Draggable-style reordering simulation for campaigns
  const shiftBannerIndex = (index: number, direction: 'up' | 'down') => {
    const list = [...banners];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    onUpdateBanners(list);
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerTitle) return;

    const added: HomeBanner = {
      id: String(banners.length + 1),
      title: newBannerTitle,
      subtitle: newBannerSub || 'Click to learn more about verification.',
      actionText: 'Explore',
      isActive: true
    };

    onUpdateBanners([...banners, added]);
    setNewBannerTitle('');
    setNewBannerSub('');
    alert('Alhamdulillah! Promotion Banner added to CMS queue.');
  };

  const handleDeleteBanner = (id: string) => {
    const kept = banners.filter(b => b.id !== id);
    onUpdateBanners(kept);
  };

  return (
    <div className="space-y-4 pt-4 px-4 pb-12">
      
      {/* Index Main Panel Section */}
      {settingsView === 'index' && (
        <div className="space-y-4">
          
          {/* Quick Selection Navigation List Cards */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] overflow-hidden shadow-sm">
            {[
              { id: 'tickets', label: 'Support Ticket System', description: 'Address inquiries', icon: Headphones, badge: tickets.filter(t => t.status === 'Open').length },
              { id: 'cms', label: 'App Content Manager (CMS)', description: 'Edit banners & alerts', icon: FileText, badge: null },
              { id: 'audit', label: 'Admin Security Audit Log', description: 'Monitor operational trace', icon: Lock, badge: null }
            ].map((node) => (
              <button
                key={node.id}
                onClick={() => setSettingsView(node.id as any)}
                className="w-full p-4 flex items-center justify-between group active:bg-gray-50 border-b border-gray-100 last:border-b-0 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0F766E]/5 text-[#0F766E] flex items-center justify-center">
                    <node.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#1E3A5F] uppercase tracking-wider">{node.label}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{node.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 text-gray-300">
                  {node.badge !== null && node.badge > 0 && (
                    <span className="bg-red-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">{node.badge} Open</span>
                  )}
                  <ChevronRight size={18} className="group-hover:text-amber-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Config: Language list */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 space-y-3.5 shadow-sm">
            <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest block px-0.5">Language Preferences</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'english', label: 'English' },
                { id: 'tamil', label: 'தமிழ்' },
                { id: 'arabic', label: 'العربية' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setAppLang(lang.id as any)}
                  className={`py-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all ${
                    appLang === lang.id
                      ? 'bg-[#0F766E]/10 border-[#0F766E] text-[#0F766E]'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Config: Notifications */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 space-y-3 shadow-sm">
            <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest block px-0.5">Notification Channels</span>
            
            <div className="space-y-2.5">
              {[
                { label: 'Push Notifications', status: pushNotif, toggle: () => setPushNotif(!pushNotif), desc: 'Urgent mobile notifications' },
                { label: 'Bulk SMS Networks', status: smsNotif, toggle: () => setSmsNotif(!smsNotif), desc: 'Placements WhatsApp & SMS text alert' },
                { label: 'Institutional Email Services', status: emailNotif, toggle: () => setEmailNotif(!emailNotif), desc: 'Daily candidates digest logs' }
              ].map((not) => (
                <div key={not.label} className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-100 rounded-xl">
                  <div>
                    <span className="block text-[11px] font-bold text-[#1E3A5F]">{not.label}</span>
                    <span className="block text-[9.5px] text-gray-400 font-semibold">{not.desc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={not.toggle}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
                      not.status ? 'bg-[#0F766E]' : 'bg-gray-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      not.status ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Parameters */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 space-y-4 shadow-sm">
            <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest block px-0.1">Security & Session Policy</span>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] text-[#0F766E] font-extrabold uppercase">Admin Session Exp</span>
                <select
                  value={otpSession}
                  onChange={(e) => setOtpSession(e.target.value)}
                  className="w-full h-11 bg-white border border-[#E5E7EB] rounded-xl px-2 text-[10px] font-bold outline-none uppercase"
                >
                  <option value="15 min timeout">15 min timeout</option>
                  <option value="30 min session">30 min session</option>
                  <option value="12 hours lock">12 hours lock</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-red-500 font-extrabold uppercase">Reset Sandbox</span>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Verify: Resetting will restore default Takreem placement list values.')) {
                      onResetDatabase();
                      alert('Takreem Seed Data Reset Completed.');
                    }
                  }}
                  className="w-full h-11 bg-red-50 border border-red-100 uppercase hover:bg-red-100 active:scale-95 text-red-600 font-extrabold rounded-xl text-[10px] flex items-center justify-center space-x-1"
                >
                  <RefreshCw size={12} />
                  <span>Restore Defaults</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT TICKETS SYSTEM TAB REVIEW PANEL */}
      {settingsView === 'tickets' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => setSettingsView('index')}
              className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest select-none hover:underline flex items-center"
            >
              ← Back to Settings
            </button>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Assigned to you</span>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div 
                key={t.id}
                className={`bg-white border rounded-[22px] p-4 shadow-sm flex flex-col space-y-3 pointer group transition-all ${
                  t.status === 'Open' ? 'border-[#0F766E] ring-1 ring-[#0F766E]/5' : 'border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border mr-2 ${
                      t.priority === 'High' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}>
                      {t.priority} priority
                    </span>
                    <h4 className="text-xs font-bold text-[#1E3A5F] mt-1.5">{t.userName}</h4>
                    <p className="text-[10px] text-[#0F766E] font-bold uppercase tracking-wider">{t.issueCategory}</p>
                  </div>

                  <span className={`text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    t.status === 'Open'
                      ? 'bg-red-50 border-red-200 text-red-500 animate-pulse'
                      : t.status === 'Pending'
                      ? 'bg-amber-50 border-amber-200 text-amber-600'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-gray-50">
                  <span className="text-[9.5px] text-gray-400 font-semibold">Filed on: {t.date}</span>
                  <div className="flex space-x-1.5">
                    {t.status !== 'Closed' && (
                      <button
                        onClick={() => onCloseTicket(t.id)}
                        className="h-8 px-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[9px] font-bold uppercase tracking-widest"
                      >
                        Close
                      </button>
                    )}
                    <button
                      onClick={() => handleTicketClick(t)}
                      className="h-8 px-3.5 bg-[#0F766E] text-white hover:bg-[#0D625C] rounded-lg text-[9px] font-bold uppercase tracking-widest"
                    >
                      Open Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT MANAGEMENT SCREEN: PROMOTIONAL CMS */}
      {settingsView === 'cms' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => setSettingsView('index')}
              className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest select-none hover:underline"
            >
              ← Back to Settings
            </button>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Home Promotion CMS</span>
          </div>

          {/* Quick Creator card */}
          <form onSubmit={handleAddBanner} className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 space-y-3.5 shadow-sm">
            <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest block border-b border-gray-50 pb-2">Publish Promotion Banner</span>
            <div className="space-y-2">
              <input
                required
                type="text"
                placeholder="Banner Title Heading..."
                className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-3 text-xs font-semibold"
                value={newBannerTitle}
                onChange={(e) => setNewBannerTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subtitle body context..."
                className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-3 text-xs font-semibold"
                value={newBannerSub}
                onChange={(e) => setNewBannerSub(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-[#0F766E] text-white font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-1 hover:bg-[#0D625C]"
            >
              <Plus size={14} />
              <span>Add Banner</span>
            </button>
          </form>

          {/* Interactive reorder index section */}
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest block px-1">Active Queue (Adjust priority order)</span>
            
            <div className="space-y-2.5">
              {banners.map((banner, index) => (
                <div key={banner.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-[#D4AF37] transition-all relative">
                  <div className="flex-1 pr-6">
                    <div className="flex items-center space-x-1.5 mb-1.5">
                      <span className="bg-gray-100 text-gray-500 text-[8.5px] font-mono px-1 rounded">Rank #{index+1}</span>
                      {banner.isActive && <span className="bg-emerald-50 text-emerald-600 text-[8.5px] font-bold px-1.5 rounded uppercase tracking-wider">LIVE</span>}
                    </div>
                    <h4 className="text-xs font-bold text-[#1E3A5F] leading-tight mb-1">{banner.title}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold truncate max-w-[220px]">{banner.subtitle}</p>
                  </div>

                  {/* Priority shift and delete triggers */}
                  <div className="flex flex-col space-y-1.5 justify-center items-center">
                    <button 
                      onClick={() => shiftBannerIndex(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded bg-gray-50 text-[#0F766E] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-100"
                    >
                      <ArrowUp size={11} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => shiftBannerIndex(index, 'down')}
                      disabled={index === banners.length - 1}
                      className="p-1 rounded bg-gray-50 text-[#0F766E] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-100"
                    >
                      <ArrowDown size={11} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-1 rounded bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 mt-1"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECURITY AUDIT FEED LOG TIMELINE */}
      {settingsView === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => setSettingsView('index')}
              className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest select-none hover:underline"
            >
              ← Back to Settings
            </button>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Encrypted Trace logs</span>
          </div>

          <div className="relative border-l-2 border-dashed border-[#E5E7EB] ml-4 pl-6 space-y-5">
            {auditLogs.map((log) => (
              <div key={log.id} className="relative">
                {/* Circle marker element */}
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0F766E] border-2 border-white ring-2 ring-[#0F766E]/20" />
                
                <div className="bg-white border border-gray-150 rounded-xl p-3 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold border-b border-gray-50 pb-1.5">
                    <span>Admin Session ID: {log.id}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E3A5F]">{log.actionPerformed}</p>
                    <span className="inline-block text-[9px] text-[#0F766E] font-bold uppercase mt-1 bg-[#0F766E]/5 px-2 py-0.5 rounded border border-[#0F766E]/10">
                      Module: {log.moduleAccessed}
                    </span>
                  </div>
                  <div className="flex justify-end text-[8px] text-gray-400 font-semibold tracking-wider uppercase">
                     Performed by: {log.adminName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUPPORT DIALOGUE DETAIL CHAT PANEL OVERLAY */}
      <AnimatePresence>
        {activeTicket && (
          <div className="fixed inset-0 z-[150] flex items-end justify-center bg-black/60 pt-10">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white text-gray-901 w-full max-w-[430px] rounded-t-[32px] p-6 space-y-4 shadow-2xl h-[85vh] flex flex-col justify-between"
            >
              {/* Header block */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] shrink-0">
                <div>
                  <span className="text-[8.5px] bg-red-100 text-red-600 border border-red-200 uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
                    {activeTicket.priority} level ticket
                  </span>
                  <h3 className="text-sm font-bold text-primary mt-1">{activeTicket.userName}</h3>
                </div>
                <button 
                  onClick={() => setActiveTicket(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Thread container scroll window */}
              <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
                {activeTicket.chats.map((chat, i) => (
                  <div key={i} className={`flex flex-col ${chat.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3.5 max-w-[85%] rounded-2xl relative ${
                      chat.sender === 'admin' 
                        ? 'bg-[#0F766E] text-white rounded-tr-none' 
                        : 'bg-gray-100 text-[#1E3A5F] rounded-tl-none border border-gray-200'
                    }`}>
                      <p className="text-xs leading-relaxed font-semibold">{chat.text}</p>
                      <span className={`block text-[8px] mt-1.5 font-bold ${
                        chat.sender === 'admin' ? 'text-white/60' : 'text-gray-400'
                      }`}>
                        {chat.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input reply form container footer */}
              <form onSubmit={handleReplySubmit} className="pt-3 border-t border-gray-100 flex items-center space-x-3 shrink-0 pb-safe">
                <input
                  required
                  type="text"
                  placeholder="Type official admin reply..."
                  className="flex-1 h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-semibold outline-none focus:bg-white focus:border-[#0F766E] transition-all"
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-xl bg-[#0F766E] text-white flex items-center justify-center active:scale-95 transition-all"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
