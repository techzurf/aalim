import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Users, Building2, School, Radio, Send, Bell, 
  Settings as SettingsIcon, FileBarChart2, ShieldCheck, ChevronRight, X, LogOut, 
  Sparkles, PlusCircle, ArrowUpRight, Search, ShieldAlert, CheckCircle, Star, 
  AlertCircle, CreditCard, Landmark, Calendar, Trash2, Ban, Eye, FileText, Check, 
  Phone, Globe, Volume2, Play, Pause, ArrowUp, ArrowDown, RefreshCw, MessageSquare, 
  Plus, CheckCircle2, Shield, Circle, FileSpreadsheet, FileDown
} from 'lucide-react';

import { 
  Aalim, Masjid, Madrasa, JobPosting, JobApplication, SupportTicket, Transaction, AuditLog, HomeBanner,
  INITIAL_AALIMS, INITIAL_MASJIDS, INITIAL_MADRASAS, INITIAL_JOBS, INITIAL_APPLICATIONS, INITIAL_TICKETS, INITIAL_TRANSACTIONS, INITIAL_AUDIT_LOGS, INITIAL_BANNERS
} from './AdminTypes';

import { AdminLogin } from './AdminLogin';

interface AdminPortalProps {
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  // Authentication State
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(() => {
    return localStorage.getItem('noor_admin_logged_in') === 'true';
  });
  const [adminName, setAdminName] = useState<string>(() => {
    return localStorage.getItem('noor_admin_name') || 'Admin Zubair';
  });

  // Core Data States
  const [aalims, setAalims] = useState<Aalim[]>(() => {
    const saved = localStorage.getItem('noor_admin_aalims');
    return saved ? JSON.parse(saved) : INITIAL_AALIMS;
  });
  const [masjids, setMasjids] = useState<Masjid[]>(() => {
    const saved = localStorage.getItem('noor_admin_masjids');
    return saved ? JSON.parse(saved) : INITIAL_MASJIDS;
  });
  const [madrasas, setMadrasas] = useState<Madrasa[]>(() => {
    const saved = localStorage.getItem('noor_admin_madrasas');
    return saved ? JSON.parse(saved) : INITIAL_MADRASAS;
  });
  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    const saved = localStorage.getItem('noor_admin_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('noor_admin_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('noor_admin_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('noor_admin_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('noor_admin_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });
  const [banners, setBanners] = useState<HomeBanner[]>(() => {
    const saved = localStorage.getItem('noor_admin_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  // Sidebar navigation active view
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'aalims' | 'masjids' | 'madrasas' | 'jobs' | 
    'verifications' | 'notifications' | 'reports' | 'subscriptions' | 'tickets' | 'settings'
  >('dashboard');

  // Search, Filters & Selection states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Pending' | 'Suspended'>('All');
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [selectedAalim, setSelectedAalim] = useState<Aalim | null>(null);
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid | null>(null);
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(INITIAL_TICKETS[0] || null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // Create / add states
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerSub, setNewBannerSub] = useState('');
  const [campaignType, setCampaignType] = useState<'Push' | 'Email' | 'SMS' | 'Ramadan'>('Push');
  const [targetAudience, setTargetAudience] = useState<'All' | 'Aalims' | 'Masjids'>('All');
  const [campaignMsg, setCampaignMsg] = useState('Assalamu Alaikum. Placements are now open in Madrasas. Apply via portal.');

  // Notification popup trigger state
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('noor_admin_aalims', JSON.stringify(aalims)); }, [aalims]);
  useEffect(() => { localStorage.setItem('noor_admin_masjids', JSON.stringify(masjids)); }, [masjids]);
  useEffect(() => { localStorage.setItem('noor_admin_madrasas', JSON.stringify(madrasas)); }, [madrasas]);
  useEffect(() => { localStorage.setItem('noor_admin_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('noor_admin_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('noor_admin_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('noor_admin_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('noor_admin_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('noor_admin_banners', JSON.stringify(banners)); }, [banners]);

  const handleLoginSuccess = (name: string) => {
    setIsAdminAuth(true);
    setAdminName(name);
    localStorage.setItem('noor_admin_logged_in', 'true');
    localStorage.setItem('noor_admin_name', name);
    addAuditLog('Logged into Administration Desk', 'Auth');
  };

  const handleLogout = () => {
    setIsAdminAuth(false);
    localStorage.removeItem('noor_admin_logged_in');
  };

  const addAuditLog = (action: string, module: string) => {
    const entry: AuditLog = {
      id: `L${Date.now()}`,
      adminName: adminName,
      actionPerformed: action,
      timestamp: new Date().toLocaleString(),
      moduleAccessed: module
    };
    setAuditLogs(prev => [entry, ...prev]);
  };

  // Operations and Verifications
  const handleVerifyAalim = (id: string, approve: boolean) => {
    setAalims(prev => prev.map(a => a.id === id ? { ...a, status: approve ? 'Verified' : 'Pending' } : a));
    const target = aalims.find(a => a.id === id)?.name || id;
    addAuditLog(`${approve ? 'Verified' : 'Flagged pending review'} Aalim: ${target}`, 'Verifications');
  };

  const handleVerifyMasjid = (id: string, approve: boolean) => {
    setMasjids(prev => prev.map(m => m.id === id ? { ...m, status: approve ? 'Verified' : 'Pending' } : m));
    const target = masjids.find(m => m.id === id)?.name || id;
    addAuditLog(`${approve ? 'Verified' : 'Flagged pending review'} Mosque: ${target}`, 'Verifications');
  };

  const handleSuspendUser = (id: string, userType: 'aalim' | 'masjid') => {
    if (userType === 'aalim') {
      setAalims(prev => prev.map(a => a.id === id ? { ...a, status: 'Suspended' } : a));
    } else {
      setMasjids(prev => prev.map(m => m.id === id ? { ...m, status: 'Suspended' } : m));
    }
    addAuditLog(`Suspended ${userType} ID: ${id}`, 'Security Control');
  };

  const handleDeleteUser = (id: string, userType: 'aalim' | 'masjid' | 'madrasa') => {
    if (userType === 'aalim') {
      setAalims(prev => prev.filter(a => a.id !== id));
    } else if (userType === 'masjid') {
      setMasjids(prev => prev.filter(m => m.id !== id));
    } else {
      setMadrasas(prev => prev.filter(md => md.id !== id));
    }
    addAuditLog(`Permanently deleted ${userType} account: ${id}`, 'System Purge');
  };

  const handleApproveJob = (id: string, approve: boolean) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: approve ? 'Approved' : 'Rejected' } : j));
    const target = jobs.find(j => j.id === id)?.position || id;
    addAuditLog(`${approve ? 'Approved' : 'Rejected'} Job Listing: "${target}"`, 'Workforce');
  };

  const handleToggleFeaturedJob = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, isFeatured: !j.isFeatured } : j));
    const target = jobs.find(j => j.id === id)?.position || id;
    addAuditLog(`Toggled showcase recommendation for: "${target}"`, 'Workforce');
  };

  const handleConfirmPayout = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
    const txn = transactions.find(t => t.id === id);
    if (txn) {
      setMasjids(prev => prev.map(m => m.name === txn.user ? { ...m, isPremium: true, status: 'Verified' } : m));
      setAalims(prev => prev.map(a => a.name === txn.user ? { ...a, isPremium: true, status: 'Verified' } : a));
      addAuditLog(`Confirmed fees clearance and premium upgrade for: ${txn.user}`, 'Ledger Inflow');
    }
  };

  const handleRefundPayout = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'Failed' } : t));
    const txn = transactions.find(t => t.id === id);
    if (txn) {
      addAuditLog(`Flagged/rejected payment receipt: ID ${id} associated to ${txn.user}`, 'Ledger Audit');
    }
  };

  const handleReplyTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText || !activeTicket) return;
    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg = adminReplyText;
    
    setTickets(prev => prev.map(t => {
      if (t.id === activeTicket.id) {
        return {
          ...t,
          status: 'Pending',
          chats: [...t.chats, { sender: 'admin', text: replyMsg, time: timeStamp }]
        };
      }
      return t;
    }));

    setActiveTicket(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'Pending',
        chats: [...prev.chats, { sender: 'admin', text: replyMsg, time: timeStamp }]
      };
    });

    setAdminReplyText('');
    addAuditLog(`Responded to support ticket ID: ${activeTicket.id}`, 'Helpdesk');
  };

  const handleCloseTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
    if (activeTicket && activeTicket.id === id) {
      setActiveTicket(prev => prev ? { ...prev, status: 'Closed' } : null);
    }
    addAuditLog(`Closed support ticket case ID: ${id}`, 'Helpdesk');
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignMsg) return;
    addAuditLog(`Launched Broadcast Campaign Type "${campaignType}" to Audience: "${targetAudience}"`, 'Broadcast Desk');
    setCampaignMsg('');
    alert(`Alhamdulillah! Takreem alert "${campaignType}" successfully sent to scheduled target lists.`);
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerTitle) return;
    const added: HomeBanner = {
      id: String(banners.length + 1),
      title: newBannerTitle,
      subtitle: newBannerSub || 'Explore our mosque listing certification guides.',
      actionText: 'Details',
      isActive: true
    };
    setBanners([...banners, added]);
    setNewBannerTitle('');
    setNewBannerSub('');
    addAuditLog(`Created promotional home slider banner: "${newBannerTitle}"`, 'CMS Config');
    alert('Alhamdulillah! Promotion Banner added to active CMS slider queue.');
  };

  const handleResetDatabase = () => {
    if (confirm('Re-seed the Takreem database to vanilla default logs?')) {
      setAalims(INITIAL_AALIMS);
      setMasjids(INITIAL_MASJIDS);
      setMadrasas(INITIAL_MADRASAS);
      setJobs(INITIAL_JOBS);
      setApplications(INITIAL_APPLICATIONS);
      setTickets(INITIAL_TICKETS);
      setTransactions(INITIAL_TRANSACTIONS);
      setAuditLogs(INITIAL_AUDIT_LOGS);
      setBanners(INITIAL_BANNERS);
      addAuditLog('Re-seeded platform to factory defaults', 'Platform Recovery');
      alert('Sandbox databases reset success.');
    }
  };

  const handleExportData = (type: string) => {
    alert(`Lighthouse engine generates Excel / PDF report ledger for module: "${type}". Downloaded to workspace.`);
    addAuditLog(`Exported administrative spreadsheets logs and reports for target: ${type}`, 'Ledger Audit');
  };

  // Filter calculations
  const filteredAalims = aalims.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' ? true : a.status === statusFilter;
    const matchDistrict = districtFilter === 'All' ? true : a.district === districtFilter;
    return matchSearch && matchStatus && matchDistrict;
  });

  const filteredMasjids = masjids.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.jamathName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' ? true : m.status === statusFilter;
    const matchDistrict = districtFilter === 'All' ? true : m.location === districtFilter;
    return matchSearch && matchStatus && matchDistrict;
  });

  const filteredJobs = jobs.filter(j => {
    return j.position.toLowerCase().includes(searchQuery.toLowerCase()) || j.masjidName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const rupeeFormat = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  // Metrics calculators
  const totalRevenue = transactions.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
  const pendingRevenue = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);
  const totalImams = aalims.filter(a => a.status === 'Verified').length;
  const pendingVerifsCount = aalims.filter(a => a.status === 'Pending').length + masjids.filter(m => m.status === 'Pending').length;
  const unresolvedTickets = tickets.filter(t => t.status === 'Open').length;

  if (!isAdminAuth) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onExit={onExit} />;
  }

  // Sidebar list items configurations
  const sidebarItems = [
    { id: 'dashboard', label: 'Monitor Dashboard', icon: FileBarChart2 },
    { id: 'aalims', label: 'Aalim Directory', icon: Users, badge: aalims.filter(a => a.status === 'Pending').length },
    { id: 'masjids', label: 'Masjid Directory', icon: Building2, badge: masjids.filter(m => m.status === 'Pending').length },
    { id: 'madrasas', label: 'Madrasas Index', icon: School },
    { id: 'jobs', label: 'Recruitment Hub', icon: Briefcase, badge: jobs.filter(j => j.status === 'Pending').length },
    { id: 'verifications', label: 'Verification Center', icon: ShieldCheck, badge: pendingVerifsCount },
    { id: 'notifications', label: 'Notifications Center', icon: Radio },
    { id: 'reports', label: 'Analytics Reports', icon: Landmark },
    { id: 'subscriptions', label: 'Subscription Management', icon: CreditCard, badge: transactions.filter(t => t.status === 'Pending').length },
    { id: 'tickets', label: 'Support Helpdesk', icon: MessageSquare, badge: unresolvedTickets },
    { id: 'settings', label: 'Settings & Audit', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F4] font-sans text-gray-800 flex overflow-hidden w-full antialiased">
      
      {/* PROFESSIONAL Left Sidebar Widget Navigation */}
      <aside className="w-[280px] bg-[#1E3A5F] text-white shrink-0 flex flex-col justify-between border-r border-[#0F766E]/20 shadow-2xl relative z-40">
        <div>
          {/* Logo Brand Header section */}
          <div className="p-6 border-b border-[#0F766E]/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F766E] to-[#14B8A6] flex items-center justify-center shadow-lg border border-[#D4AF37]/30">
              <ShieldCheck className="text-[#D4AF37]" size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white leading-none">Takreem Aalim Admin</h2>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#D4AF37] mt-1 block">Recruitment HQ</span>
            </div>
          </div>

          {/* Sidebar Menu Item list */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setSearchQuery(''); }}
                  className={`w-full px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-between transition-all group ${
                    isActive
                      ? 'bg-[#0F766E] text-white shadow-md border-l-4 border-[#D4AF37]'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-[#D4AF37] transition-colors'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] font-bold px-2 py-0.5 rounded-full select-none">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#0F766E]/20 space-y-2 shrink-0 bg-[#162C4A]">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-serif text-sm font-bold">
              Z
            </div>
            <div>
              <p className="text-xs font-bold leading-none text-white">{adminName}</p>
              <span className="text-[9px] text-[#D4AF37] uppercase tracking-wider font-semibold">Senior Controller</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full h-10 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-xs font-extrabold text-gray-300 hover:text-red-400 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
          >
            <LogOut size={13} />
            <span>End Session</span>
          </button>
        </div>
      </aside>

      {/* Main SaaS Right Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Desk Global Appbar Header */}
        <header className="h-16 bg-white border-b border-gray-200/80 px-8 flex items-center justify-between shrink-0 select-none relative z-30">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder={`Search current workspace (${activeTab})...`}
                className="w-full h-10 bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 text-xs font-medium text-gray-800 outline-none focus:bg-white focus:border-[#0F766E] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Quick launcher action popup controller */}
            <div className="relative">
              <button
                onClick={() => setIsQuickOpen(!isQuickOpen)}
                className="h-10 px-4 rounded-xl bg-[#0F766E]/5 hover:bg-[#0F766E]/10 text-xs font-extrabold uppercase tracking-widest text-[#0F766E] border border-[#0F766E]/10 flex items-center gap-1.5 transition-all outline-none"
              >
                <PlusCircle size={14} />
                <span>Quick Operations</span>
              </button>
              
              {isQuickOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsQuickOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-200 p-2.5 shadow-xl z-50">
                    <span className="text-[9px] uppercase tracking-widest text-[#0F766E] font-extrabold px-3 py-1.5 block">Quick Actions</span>
                    <button onClick={() => { setActiveTab('verifications'); setIsQuickOpen(false); }} className="w-full text-left font-semibold text-xs tracking-wide p-2.5 hover:bg-gray-50 text-gray-700 rounded-lg">Evaluate Degrees</button>
                    <button onClick={() => { setActiveTab('jobs'); setIsQuickOpen(false); }} className="w-full text-left font-semibold text-xs tracking-wide p-2.5 hover:bg-gray-50 text-gray-700 rounded-lg">Post Placement</button>
                    <button onClick={() => { setActiveTab('notifications'); setIsQuickOpen(false); }} className="w-full text-left font-semibold text-xs tracking-wide p-2.5 hover:bg-gray-50 text-gray-700 rounded-lg">Broadcast Campaign</button>
                    <div className="border-t border-gray-100 my-1 pointer-events-none" />
                    <button onClick={onExit} className="w-full text-left text-xs font-bold p-2.5 text-amber-600 hover:bg-amber-50 rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                      <Star size={12} fill="#D4AF37" className="text-[#D4AF37]" /> Log In User App
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Simulated System Alerts and Message system logs */}
            <div className="relative">
              <button
                onClick={() => setIsAlertsOpen(!isAlertsOpen)}
                className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 relative transition-all"
              >
                <Bell size={16} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
              </button>

              {isAlertsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsAlertsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-[340px] bg-white rounded-2xl border border-gray-200 p-4 shadow-xl z-50 space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E]">Active System Logs</span>
                      <span className="text-[9px] text-[#D4AF37] font-bold uppercase">Realtime queue</span>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {auditLogs.slice(0, 3).map(log => (
                        <div key={log.id} className="p-2.5 bg-gray-50 rounded-xl space-y-1">
                          <p className="text-[11px] font-semibold text-gray-700">{log.actionPerformed}</p>
                          <span className="text-[8.5px] text-gray-400 font-bold uppercase">{log.timestamp} • {log.moduleAccessed}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onExit}
              className="h-10 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D625C] text-white text-xs font-bold tracking-widest uppercase shadow-md active:scale-95 transition-all"
            >
              Open User App
            </button>
          </div>
        </header>

        {/* Primary Scroll View Grid */}
        <main className="flex-1 overflow-y-auto p-8 max-w-[1440px] w-full mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.12 }}
              className="space-y-6 h-full"
            >
              
              {/* VIEW 1: MONITOR DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Islamic Inspired Welcome Header Banner */}
                  <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#1E3A5F] via-[#102A45] to-[#0A1B2D] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full -mr-16 -mb-16 pointer-events-none border border-[#D4AF37]/10" />
                    <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-[#0F766E]/10 rounded-full pointer-events-none" />
                    <div className="relative z-10 space-y-4 max-w-2xl">
                      <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3.5 py-1 rounded-full text-[#D4AF37] font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
                        <Sparkles size={11} /> Takreem Aalim Recruitment Portal Active
                      </span>
                      <h2 className="text-3xl font-serif italic text-white md:leading-tight">
                        Assalamu Alaikum, Administrator
                      </h2>
                      <p className="text-gray-300 text-xs leading-relaxed font-sans ml-0.5">
                        Welcome back to the centralized Noor Staffing & Placement Console. Connect Masjids, Aalims, Huffaz, Muazzins, Arabic Teachers, and Madrasas through our dedicated Islamic scholar recruitment and placement platform. Screen authenticated Aalims, manage Masjid listings, approve active job postings, evaluate degree certificates, and manage subscription details.
                      </p>
                    </div>
                  </div>

                  {/* High contrast Metrics Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { title: 'Gross Revenue Collection', value: rupeeFormat(totalRevenue), desc: 'Upgrade commissions earnings', icon: CreditCard, trend: '+18.4% growth', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', color: '#0F766E' },
                      { title: 'Verified Imams & Aalims', value: totalImams, desc: 'Scholars in active pools', icon: Users, trend: 'Background cleared', bg: 'bg-[#0F766E]/5 text-[#0F766E] border-[#0F766E]/10', color: '#0F766E' },
                      { title: 'Pending Verifications', value: pendingVerifsCount, desc: 'Scholars & Mosques awaiting screening', icon: ShieldAlert, trend: 'Urgent evaluation doc desk', bg: 'bg-red-50 text-red-500 border-red-100', color: '#EF4444' },
                      { title: 'Open Workforce Placements', value: jobs.length, desc: 'Active vacancies count', icon: Briefcase, trend: `${jobs.filter(j => j.status === 'Pending').length} pending screening`, bg: 'bg-[#D4AF37]/10 text-amber-600 border-amber-200/50', color: '#D4AF37' }
                    ].map((metric) => (
                      <div key={metric.title} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <div className={`w-12 h-12 rounded-xl ${metric.bg} border flex items-center justify-center shrink-0`}>
                            <metric.icon size={20} />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg uppercase">{metric.trend}</span>
                        </div>
                        <div className="mt-6">
                          <span className="block text-2xl font-bold tracking-tight text-gray-800 leading-none">{metric.value}</span>
                          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-3">{metric.title}</h4>
                          <p className="text-[10px] text-gray-400 font-semibold mt-1 leading-normal">{metric.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Multi-column layout grids (district trends and helpdesk logs) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E]">Territory Performance and Share</h4>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">TN Council District Stats</span>
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: 'Chennai District share', value: '48%', jobs: '64 active candidates', color: 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6]' },
                          { label: 'Madurai District share', value: '22%', jobs: '30 active candidates', color: 'bg-[#D4AF37]' },
                          { label: 'Erode District share', value: '15%', jobs: '22 active candidates', color: 'bg-teal-600' },
                          { label: 'Trichy District share', value: '10%', jobs: '15 active candidates', color: 'bg-indigo-600' }
                        ].map((item) => (
                          <div key={item.label} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-gray-700">{item.label}</span>
                              <span className="text-[#0F766E]">{item.jobs} ({item.value})</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                              <div style={{ width: item.value }} className={`h-full rounded-full ${item.color}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E]">Fast Control Drawer</h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">System status</span>
                      </div>
                      <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-2xl flex items-start gap-3">
                        <Shield className="text-[#0F766E] shrink-0 mt-0.5" size={16} />
                        <div>
                          <p className="text-[11px] font-bold text-[#0F766E] leading-normal uppercase">Authorized Access Only</p>
                          <p className="text-[10px] text-gray-500 font-semibold mt-1 leading-normal">Your actions will be logged with secure trace timestamps for verification audit trail.</p>
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <button onClick={() => setActiveTab('verifications')} className="w-full h-11 bg-gray-50 border border-gray-200 hover:border-[#D4AF37] hover:bg-white rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-gray-700 hover:text-amber-600 flex items-center justify-between px-4 transition-all">
                          <span>Review Pending Credentials</span>
                          <ChevronRight size={14} />
                        </button>
                        <button onClick={() => setActiveTab('notifications')} className="w-full h-11 bg-gray-50 border border-gray-200 hover:border-[#0F766E] hover:bg-white rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-gray-700 hover:text-[#0F766E] flex items-center justify-between px-4 transition-all">
                          <span>Dispatch Campaign alert</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: AALIMS DIRECTORY */}
              {activeTab === 'aalims' && (
                <div className="space-y-6">
                  {/* View toolbar header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif italic text-gray-800 font-bold">Aalims Scholar Directory</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Manage, verify and suspend certified scholars profiles</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleExportData('Aalims Excel')} className="h-10 px-4 bg-white border border-gray-200 text-gray-600 hover:border-[#0F766E] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all">
                        <FileSpreadsheet size={14} />
                        <span>Export Excel</span>
                      </button>
                      <button onClick={() => handleExportData('Aalims PDF')} className="h-10 px-4 bg-white border border-gray-200 text-gray-600 hover:border-[#0F766E] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all">
                        <FileDown size={14} />
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Table Filter selectors row */}
                  <div className="p-4 bg-white border border-gray-200/80 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Status filter:</span>
                      <div className="flex bg-gray-100 p-1 rounded-xl">
                        {['All', 'Verified', 'Pending', 'Suspended'].map((filt) => (
                          <button
                            key={filt}
                            onClick={() => setStatusFilter(filt as any)}
                            className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                              statusFilter === filt
                                ? 'bg-white text-[#0F766E] shadow-sm'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {filt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold text-gray-400">District:</span>
                      <select
                        className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-xl text-[10px] font-bold uppercase cursor-pointer"
                        value={districtFilter}
                        onChange={(e) => setDistrictFilter(e.target.value)}
                      >
                        <option value="All">All Locations</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Erode">Erode</option>
                        <option value="Trichy">Trichy</option>
                      </select>
                    </div>
                  </div>

                  {/* Widescreen Data Table */}
                  <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse table-auto">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200/50">
                            <th className="p-4 pl-6">Scholar Name</th>
                            <th className="p-4">Madrasa Graduation</th>
                            <th className="p-4">District</th>
                            <th className="p-4">Verification State</th>
                            <th className="p-4">Membership Plan</th>
                            <th className="p-4 pr-6 text-right">Operational Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs text-gray-700 font-medium">
                          {filteredAalims.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-gray-400 italic">No scholars profiles matching queries.</td>
                            </tr>
                          ) : (
                            filteredAalims.map((aalim) => (
                              <tr key={aalim.id} className="hover:bg-gray-50/50 group transition-colors">
                                <td className="p-4 pl-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] rounded-xl flex items-center justify-center font-bold font-serif text-sm">
                                      {aalim.avatar}
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-gray-800">{aalim.name}</h5>
                                      <span className="text-[10px] text-[#0F766E] font-bold uppercase tracking-wide">{aalim.title}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div>
                                    <p className="font-semibold text-gray-800">{aalim.madrasa}</p>
                                    <span className="text-[10px] text-gray-400 uppercase font-semibold">{aalim.experience} Exp</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className="bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600 border border-gray-150 font-bold uppercase tracking-wider text-[9.5px]">
                                    {aalim.district}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                                    aalim.status === 'Verified'
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                      : aalim.status === 'Pending'
                                      ? 'bg-amber-50 border-amber-200 text-amber-600'
                                      : 'bg-red-50 border-red-200 text-red-500'
                                  }`}>
                                    {aalim.status}
                                  </span>
                                </td>
                                <td className="p-4">
                                  {aalim.isPremium ? (
                                    <span className="bg-amber-50 text-amber-700 border border-amber-250 font-bold px-2.5 py-1 text-[9px] rounded-lg tracking-widest uppercase">PREMIUM</span>
                                  ) : (
                                    <span className="text-gray-400 font-semibold px-2 py-1 text-[9px] uppercase tracking-widest">Free tier</span>
                                  )}
                                </td>
                                <td className="p-4 pr-6 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => { setSelectedAalim(aalim); setIsPlayingAudio(false); }}
                                      className="h-8 px-3 bg-gray-50 hover:bg-[#0F766E]/10 border border-gray-200 text-[#0F766E] hover:text-[#0F766E] rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                                    >
                                      Inspect Docs
                                    </button>
                                    {aalim.status !== 'Suspended' ? (
                                      <button
                                        onClick={() => handleSuspendUser(aalim.id, 'aalim')}
                                        className="w-8 h-8 rounded-lg border border-red-100 hover:border-red-200 text-red-500 bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all"
                                        title="Suspend Profile"
                                      >
                                        <Ban size={12} />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleVerifyAalim(aalim.id, true)}
                                        className="h-8 px-3 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-lg text-[10px] font-extrabold uppercase"
                                      >
                                        Restore
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteUser(aalim.id, 'aalim')}
                                      className="w-8 h-8 rounded-lg border border-gray-150 text-red-600 hover:bg-red-50 flex items-center justify-center transition-all"
                                      title="Delete"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 3: MASJIDS DIRECTORY */}
              {activeTab === 'masjids' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif italic text-gray-800 font-bold">Masjid Directory</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Audit registered Masjid centers and associations on the Takreem Aalim platform</p>
                    </div>
                    <button onClick={() => handleExportData('Masjids Excel')} className="h-10 px-4 bg-white border border-gray-200 text-gray-600 hover:border-[#0F766E] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all">
                      <FileSpreadsheet size={14} />
                      <span>Export Registry</span>
                    </button>
                  </div>

                  {/* Table filters */}
                  <div className="p-4 bg-white border border-gray-200/80 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Verifications Desk:</span>
                      <div className="flex bg-gray-100 p-1 rounded-xl">
                        {['All', 'Verified', 'Pending', 'Suspended'].map((filt) => (
                          <button
                            key={filt}
                            onClick={() => setStatusFilter(filt as any)}
                            className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                              statusFilter === filt
                                ? 'bg-white text-[#0F766E] shadow-sm'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {filt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse table-auto">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200/50">
                            <th className="p-4 pl-6">Mosque & Jamath Name</th>
                            <th className="p-4">Territory</th>
                            <th className="p-4">Wakf Registration Document</th>
                            <th className="p-4">Auth State</th>
                            <th className="p-4">Tier Status</th>
                            <th className="p-4 pr-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs font-medium">
                          {filteredMasjids.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-gray-400 italic">No masjid items.</td>
                            </tr>
                          ) : (
                            filteredMasjids.map((masjid) => (
                              <tr key={masjid.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-lg">
                                      🕌
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-gray-800">{masjid.name}</h5>
                                      <span className="text-[10px] text-gray-400 font-semibold">{masjid.jamathName}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className="font-bold text-gray-700 uppercase">{masjid.location}</span>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded max-w-max">
                                    <FileText size={12} className="text-[#0F766E]" />
                                    <span>{masjid.regDoc}</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                                    masjid.status === 'Verified'
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                      : masjid.status === 'Pending'
                                      ? 'bg-amber-50 border-amber-200 text-amber-600'
                                      : 'bg-red-50 border-red-200 text-red-500'
                                  }`}>
                                    {masjid.status}
                                  </span>
                                </td>
                                <td className="p-4">
                                  {masjid.isPremium ? (
                                    <span className="bg-emerald-50 text-[#0F766E] border border-[#0F766E]/20 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">TRUSTED BADGE</span>
                                  ) : (
                                    <span className="text-gray-400 uppercase tracking-wider text-[9px]">Basic Profile</span>
                                  )}
                                </td>
                                <td className="p-4 pr-6 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => setSelectedMasjid(masjid)} className="h-8 px-3.5 bg-gray-50 border border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-amber-600 text-[10px] font-bold uppercase rounded-lg transition-all">Evaluate Documents</button>
                                    <button onClick={() => handleSuspendUser(masjid.id, 'masjid')} className="w-8 h-8 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-all"><Ban size={12} /></button>
                                    <button onClick={() => handleDeleteUser(masjid.id, 'masjid')} className="w-8 h-8 rounded-lg border border-gray-150 text-red-600 hover:bg-red-50 flex items-center justify-center transition-all"><Trash2 size={12} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 4: MADRASAS INDEX */}
              {activeTab === 'madrasas' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif italic text-gray-800 font-bold">Madrasas Index Hub</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Audit active registration files for affiliated Islamic seminaries</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {madrasas.map(madr => (
                      <div key={madr.id} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all relative overflow-hidden group">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-serif text-2xl border border-teal-150">
                            📖
                          </div>
                          <span className="text-[10px] font-bold bg-gray-105 uppercase text-[#0F766E]">Reg File #{madr.id}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">{madr.name}</h4>
                          <div className="space-y-1.5 mt-2.5">
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1">🗺️ {madr.location}, TN</p>
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1">📞 {madr.contact}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase text-[9.5px] mt-1.5">Registered since: {madr.regDate}</p>
                          </div>
                        </div>
                        <div className="border-t border-gray-50 pt-3.5 flex justify-end">
                          <button onClick={() => handleDeleteUser(madr.id, 'madrasa')} className="h-9 px-3.5 bg-red-50 border border-red-100 text-red-650 hover:bg-red-100 rounded-xl text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 transition-all">
                            <Trash2 size={12} />
                            <span>Delete file</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW 5: WORKFORCE HUB (JOB APPROVALS & APPLICANTS) */}
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white border border-gray-200 p-6 rounded-3xl shrink-0 shadow-sm">
                    <div>
                      <h4 className="text-lg font-serif italic text-gray-800 font-bold">Takreem Placements Screening Desk</h4>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Moderate job openings posted by Jamath recruitment committees</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Listings Panel */}
                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E] border-b border-gray-100 pb-3">Available Postings Awaiting screening</h4>
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {jobs.map(job => (
                          <div key={job.id} className="border border-gray-200/80 rounded-2xl p-4 space-y-3.5 hover:border-amber-500/50 transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-bold text-gray-800">{job.position}</h5>
                                <span className="text-[10px] text-[#0F766E] font-bold uppercase">{job.masjidName}</span>
                              </div>
                              <span className={`text-[8.5px] font-bold uppercase px-2 py-0.5 rounded border ${
                                job.status === 'Approved' ? 'bg-emerald-50 border-emerald-150 text-emerald-600' : 'bg-amber-50 border-amber-200 text-amber-600'
                              }`}>{job.status}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold border-t border-gray-50 pt-2.5 shrink-0">
                              <span className="flex items-center gap-1">📍 {job.location} • 💰 {job.salary}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleToggleFeaturedJob(job.id)}
                                  className={`p-1.5 rounded-lg border ${job.isFeatured ? 'bg-amber-50 border-amber-350 text-amber-500' : 'bg-white text-gray-300'}`}
                                  title="Feature list Recommendation"
                                >
                                  <Star size={13} fill={job.isFeatured ? '#D4AF37' : 'none'} />
                                </button>
                                {job.status === 'Pending' && (
                                  <>
                                    <button onClick={() => handleApproveJob(job.id, false)} className="px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 font-extrabold uppercase tracking-wider rounded-lg text-[9.5px]">Decline</button>
                                    <button onClick={() => handleApproveJob(job.id, true)} className="px-3 py-1.5 bg-[#0F766E] hover:bg-[#0D625C] text-white font-extrabold uppercase tracking-wider rounded-lg text-[9.5px]">Pass Screen</button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications tracking */}
                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E] border-b border-gray-100 pb-3">Active Applicants Tracking</h4>
                      <div className="space-y-3.5">
                        {applications.map(app => (
                          <div key={app.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#1E3A5F] text-white rounded-xl flex items-center justify-center font-bold font-serif text-sm shrink-0">
                                {app.candidateAvatar}
                              </div>
                              <div>
                                <h5 className="font-bold text-gray-800 text-xs">{app.candidateName}</h5>
                                <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-none">Placed for: <strong className="text-gray-600 font-extrabold">{app.position}</strong></p>
                                <span className="text-[9px] text-[#0F766E] font-bold uppercase mt-1 block tracking-wider">{app.masjidName}</span>
                              </div>
                            </div>
                            <span className={`text-[8.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white border ${
                              app.status === 'Selected' ? 'bg-emerald-50 border-emerald-150 text-emerald-600' : 'text-gray-500'
                            }`}>{app.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 6: VERIFICATIONS DESK */}
              {activeTab === 'verifications' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#0F766E] text-white p-8 rounded-[32px] flex items-center justify-between border border-[#0F766E]/10">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif italic text-white md:leading-tight">Aalim & Masjid Authenticator Registry</h3>
                      <p className="text-xs text-white/80 max-w-xl font-sans leading-relaxed">Dedicated workspace evaluating degrees and mosque registration documents. Screen voice and tajweed audio samples to award trust badges profiles instantly.</p>
                    </div>
                    <span className="text-3xl">🛡️</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pending Aalims verifs */}
                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E] border-b border-gray-100 pb-3">Pending Scholar Profiles ({aalims.filter(a => a.status === 'Pending').length})</h4>
                      <div className="space-y-3.5">
                        {aalims.filter(a => a.status === 'Pending').map(aalim => (
                          <div key={aalim.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                            <div>
                              <h5 className="font-bold text-gray-800 text-xs">{aalim.name}</h5>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{aalim.title} • {aalim.district}</p>
                            </div>
                            <button onClick={() => { setSelectedAalim(aalim); setIsPlayingAudio(false); }} className="px-4 h-9 bg-white border border-gray-200 rounded-xl text-[10px] font-extrabold uppercase text-[#0F766E] hover:border-[#0F766E] transition-all shadow-sm">Evaluate Specs</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pending mosques registered */}
                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-600 border-b border-gray-100 pb-3">Pending Masjid Postings ({masjids.filter(m => m.status === 'Pending').length})</h4>
                      <div className="space-y-3.5">
                        {masjids.filter(m => m.status === 'Pending').map(masj => (
                          <div key={masj.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                            <div>
                              <h5 className="font-bold text-gray-800 text-xs">{masj.name}</h5>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{masj.jamathName} • {masj.location}</p>
                            </div>
                            <button onClick={() => { setSelectedMasjid(masj); }} className="px-4 h-9 bg-white border border-amber-200 rounded-xl text-[10px] font-extrabold uppercase text-amber-700 hover:border-amber-500 transition-all shadow-sm">Screen Registration</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 7: BROADCASTER CAMPAIGNS CENTER */}
              {activeTab === 'notifications' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <h3 className="text-lg font-serif italic text-gray-800 font-bold">Takreem Notifications Center Console</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Broadcast notifications to the entire candidate recruitment network</p>
                  </div>

                  <form onSubmit={handleSendCampaign} className="bg-white border border-gray-200 rounded-[32px] p-6 space-y-4 shadow-sm">
                    <div className="p-4 bg-teal-50/50 border border-teal-150 rounded-2xl flex gap-3">
                      <Radio className="text-[#0F766E] shrink-0 mt-0.5 animate-pulse" size={16} />
                      <p className="text-[10px] text-gray-500 font-semibold leading-normal">Operational push lets you queue announcements directed to target phone arrays and Android drawer payloads.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Alert medium:</label>
                      <div className="grid grid-cols-4 gap-2.5">
                        {['Push Alert', 'Direct Email', 'Bulk SMS text', 'Special Ramadan'].map((med) => (
                          <button
                            key={med}
                            type="button"
                            onClick={() => setCampaignType(med.replace(' Alert', '').replace(' text', '') as any)}
                            className={`py-3.5 font-extrabold text-[9px] uppercase tracking-widest rounded-xl border transition-all text-center ${
                              campaignType === med.replace(' Alert', '').replace(' text', '')
                                ? 'bg-[#0F766E]/15 border-[#0F766E] text-[#0F766E] shadow-sm'
                                : 'bg-white border-gray-150 text-gray-400 hover:border-gray-200'
                            }`}
                          >
                            {med}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Target audience:</label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { id: 'All', label: 'Everyone registered' },
                          { id: 'Aalims', label: 'Imams and Scholars only' },
                          { id: 'Masjids', label: 'Jamath committees only' }
                        ].map((aud) => (
                          <button
                            key={aud.id}
                            type="button"
                            onClick={() => setTargetAudience(aud.id as any)}
                            className={`py-3.5 font-extrabold text-[9px] uppercase tracking-widest rounded-xl border transition-all text-center ${
                              targetAudience === aud.id
                                ? 'bg-amber-500/10 border-amber-500 text-amber-600 shadow-sm'
                                : 'bg-white border-gray-150 text-gray-400 hover:border-gray-200'
                            }`}
                          >
                            {aud.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Message alert body context:</label>
                      <textarea
                        required
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-[#0F766E]"
                        value={campaignMsg}
                        onChange={(e) => setCampaignMsg(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-12 bg-[#0F766E] hover:bg-[#0D625C] text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <Send size={14} />
                      <span>Transmit Dispatch List</span>
                    </button>
                  </form>
                </div>
              )}

              {/* VIEW 8: ANALYTICS REPORTS */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif italic text-gray-800 font-bold">Takreem Financial and Growth Analytics</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Audit active registration files and regional scholar growth metrics</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white border border-gray-200 p-6 rounded-[28px] shadow-sm space-y-1">
                      <span className="text-[9.5px] uppercase font-bold text-gray-450">Gross collection</span>
                      <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{rupeeFormat(totalRevenue)}</h3>
                      <p className="text-[10px] text-[#0F766E] font-bold uppercase mt-2.5">Clearance validated via Takreem bank gateway</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 rounded-[28px] shadow-sm space-y-1">
                      <span className="text-[9.5px] uppercase font-bold text-gray-450">Awaiting settlement</span>
                      <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{rupeeFormat(pendingRevenue)}</h3>
                      <p className="text-[10px] text-amber-600 font-semibold mt-2.5">Associated to {transactions.filter(t => t.status === 'Pending').length} pending receipt files</p>
                    </div>
                    <div className="bg-white border border-[#0F766E]/20 bg-[#0F766E]/5 p-6 rounded-[28px] shadow-sm flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[9.5px] uppercase font-bold text-teal-700">Audit Status</span>
                        <h4 className="text-sm font-extrabold text-[#111827] uppercase leading-none mt-1">Platform Verified OK</h4>
                      </div>
                      <span className="text-[10px] text-gray-500 font-semibold mt-2">Logs validated today by Chennai regional controller</span>
                    </div>
                  </div>

                  {/* SVG interactive graphical trends representation */}
                  <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <span className="text-[9.5px] text-[#0F766E] uppercase font-bold tracking-widest">Monthly Growth Trend</span>
                        <h4 className="text-sm font-bold text-gray-800 mt-1">Scholar Onboarding Timeline Registry</h4>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold text-[10px] px-3 py-1 rounded-xl uppercase">+620 verified user accounts</span>
                    </div>

                    <div className="pt-4 relative">
                      <svg className="w-full h-36 overflow-visible" viewBox="0 0 500 100">
                        <line x1="0" y1="20" x2="500" y2="20" stroke="#F3F4F6" strokeWidth="1" />
                        <line x1="0" y1="50" x2="500" y2="50" stroke="#F3F4F6" strokeWidth="1" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="#F3F4F6" strokeWidth="1" />
                        <path
                          d="M 10,95 Q 100,70 190,65 T 370,30 T 490,10"
                          fill="none"
                          stroke="#0F766E"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <circle cx="190" cy="65" r="5" className="fill-[#D4AF37] stroke-white stroke-2" />
                        <circle cx="490" cy="10" r="5" className="fill-[#0F766E] stroke-white stroke-2" />
                      </svg>
                      <div className="flex justify-between text-[9px] text-[#A0AEC0] font-extrabold uppercase mt-2 px-1">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun timeline</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 9: SUBSCRIPTIONS & PLANS LEDGER */}
              {activeTab === 'subscriptions' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
                    <div className="bg-white border border-gray-200/85 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[10px] bg-gray-100 text-gray-600 font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">Free basic verification</span>
                      <div>
                        <h4 className="text-xl font-bold tracking-tight text-gray-800">₹ 0 / Forever</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1.5 leading-normal">Standard scholar screening with credential indexing. Includes digital certification.</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-tr from-[#0F766E]/5 to-teal-50 border border-[#0F766E]/20 rounded-3xl p-6 shadow-sm space-y-4 relative overflow-hidden">
                      <span className="text-[10px] bg-[#0F766E] text-white font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">Scholar Quarterly Premium</span>
                      <div>
                        <h4 className="text-xl font-bold tracking-tight text-[#0F766E]">₹ 1,599 / Qtr</h4>
                        <p className="text-[10px] text-teal-800/80 font-bold mt-1.5 leading-normal">Premium Placement recommendations, active qirat snippet visualizers, and direct chat links.</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-tr from-[#D4AF37]/5 to-amber-50/20 border border-[#D4AF37]/35 rounded-3xl p-6 shadow-sm space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/10 rounded-full -mr-6 -mb-6" />
                      <span className="text-[10px] bg-amber-600 text-white font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">Masjid annual premium</span>
                      <div>
                        <h4 className="text-xl font-bold tracking-tight text-amber-700">₹ 8,499 / Year</h4>
                        <p className="text-[10px] text-amber-800 font-semibold mt-1.5 leading-normal">Takreem certified premium badge. Unlimited placement postings, candidate match highlights.</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment history transactions table */}
                  <div className="space-y-4 pt-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E]">Recent Premium Payment Ledger ({transactions.length})</h4>
                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                      <table className="w-full text-left font-medium border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase border-b border-gray-100">
                            <th className="p-4 pl-6">Receipt ID</th>
                            <th className="p-4">Remitter User</th>
                            <th className="p-4">Earmarked Tier</th>
                            <th className="p-4">Paid Date</th>
                            <th className="p-4">Settlement Inflow</th>
                            <th className="p-4 pr-6 text-right">Verification action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                          {transactions.map(txn => (
                            <tr key={txn.id} className="hover:bg-gray-50">
                              <td className="p-4 pl-6 font-mono text-[11px] font-bold text-gray-500">{txn.id}</td>
                              <td className="p-4 font-bold text-gray-800">{txn.user}</td>
                              <td className="p-4">
                                <span className="bg-gray-50 text-gray-650 border border-gray-100 font-semibold uppercase px-2 py-0.5 rounded text-[9.5px]">
                                  {txn.plan}
                                </span>
                              </td>
                              <td className="p-4 text-gray-400 font-bold">{txn.date}</td>
                              <td className="p-4"><strong className="text-emerald-700 font-extrabold">{rupeeFormat(txn.amount)}</strong></td>
                              <td className="p-4 pr-6 text-right">
                                {txn.status === 'Pending' ? (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button onClick={() => handleRefundPayout(txn.id)} className="px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 font-extrabold uppercase rounded-lg text-[9.5px]">Reject</button>
                                    <button onClick={() => handleConfirmPayout(txn.id)} className="px-3 py-1.5 bg-[#0F766E] text-white hover:bg-[#0D625C] font-extrabold uppercase rounded-lg text-[9.5px]">Clear Funds</button>
                                  </div>
                                ) : (
                                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                                    txn.status === 'Completed' ? 'bg-emerald-50 border-emerald-250 text-emerald-600' : 'bg-red-50 border-red-200 text-red-500'
                                  }`}>{txn.status}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 10: SUPPORT TICKETS HELPDESK */}
              {activeTab === 'tickets' && (
                <div className="flex-1 flex gap-6 min-h-0 relative select-none">
                  {/* Left Ticket selections column */}
                  <div className="w-[380px] bg-white border border-gray-200 rounded-[32px] p-5 shrink-0 flex flex-col justify-between max-h-[660px] shadow-sm">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E]">Inbound Support tickets</h4>
                        <span className="text-[10px] text-[#D4AF37] font-bold uppercase">{tickets.length} cases</span>
                      </div>
                      <div className="space-y-3 overflow-y-auto max-h-[500px]">
                        {tickets.map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => { setActiveTicket(t); setAdminReplyText(''); }}
                            className={`w-full p-4 rounded-2xl border text-left flex flex-col space-y-2 transition-all ${
                              activeTicket?.id === t.id
                                ? 'bg-[#0F766E]/5 border-[#0F766E] shadow-sm'
                                : 'bg-gray-50/50 border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded border uppercase text-white ${
                                t.priority === 'High' ? 'bg-red-500 border-red-500' : 'bg-[#1E3A5F] border-[#1E3A5F]'
                              }`}>{t.priority} priority</span>
                              <span className={`bg-white border rounded px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wide ${
                                t.status === 'Open' ? 'text-red-500 animate-pulse' : 'text-gray-400'
                              }`}>{t.status}</span>
                            </div>
                            <div>
                              <h5 className="font-bold text-gray-800 text-xs leading-none">{t.userName}</h5>
                              <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mt-1.5 leading-none">{t.issueCategory}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right chat panel conversation logger */}
                  {activeTicket ? (
                    <div className="flex-1 bg-white border border-gray-200 rounded-[32px] p-6 flex flex-col justify-between max-h-[660px] shadow-sm relative">
                      <div className="flex items-center justify-between border-b border-gray-150 pb-4 shrink-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#0F766E]">CASE ID {activeTicket.id}</span>
                            <span className={`text-[8px] font-extrabold uppercase ${activeTicket.status === 'Open' ? 'text-red-500' : 'text-emerald-600'}`}>{activeTicket.status}</span>
                          </div>
                          <h4 className="font-serif italic font-bold text-slate-800 text-base leading-none mt-1.5">{activeTicket.userName}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          {activeTicket.status !== 'Closed' && (
                            <button
                              onClick={() => handleCloseTicket(activeTicket.id)}
                              className="h-9 px-4 bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all"
                            >
                              Archive resolved
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Conversations bubbles body */}
                      <div className="flex-1 overflow-y-auto space-y-4 py-6 pr-2">
                        {activeTicket.chats.map((chat, i) => (
                          <div key={i} className={`flex flex-col ${chat.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-4 max-w-[80%] rounded-2xl ${
                              chat.sender === 'admin'
                                ? 'bg-[#0F766E] text-white rounded-tr-none'
                                : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                            }`}>
                              <p className="text-xs font-semibold leading-relaxed">{chat.text}</p>
                              <span className="text-[8.5px] opacity-60 mt-1.5 block font-bold text-right">{chat.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reply form */}
                      {activeTicket.status !== 'Closed' ? (
                        <form onSubmit={handleReplyTicket} className="pt-4 border-t border-gray-150 flex items-center gap-3 shrink-0">
                          <input
                            required
                            type="text"
                            placeholder="Type official support reply dispatch envelope..."
                            className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-xs font-semibold outline-none focus:bg-white focus:border-[#0F766E] transition-all"
                            value={adminReplyText}
                            onChange={(e) => setAdminReplyText(e.target.value)}
                          />
                          <button type="submit" className="w-12 h-12 bg-[#0F766E] hover:bg-[#0D625C] text-white flex items-center justify-center rounded-xl shadow-lg transition-transform active:scale-95 shrink-0">
                            <Send size={15} />
                          </button>
                        </form>
                      ) : (
                        <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl text-center font-bold text-gray-400 text-xs shrink-0 select-none">
                          Archived ticket resolved. Reopen to reply.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 bg-white border border-gray-150 rounded-[32px] flex items-center justify-center font-serif italic text-gray-400 text-lg shadow-sm">
                      Select an active support log to response
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 11: SETTINGS & SECURE AUDIT */}
              {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* Sandbox configuration properties */}
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E] border-b border-gray-100 pb-3">Operational Properties Settings</h4>
                      
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E] block">App Language preference:</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Tamil (தமிழ்)', 'English (UK)', 'Arabic (العربية)'].map(l => (
                              <button key={l} className="py-2.5 bg-gray-50 border border-gray-150 rounded-xl text-center text-xs font-bold font-sans text-gray-700 hover:border-[#D4AF37] transition-colors">{l}</button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E] block mb-2">Notification dispatch switches:</span>
                          {[
                            { label: 'Push Alert services', desc: 'Active mobile push notifications' },
                            { label: 'Bulk SMS and WhatsApp network', desc: 'Direct regional phone alert payload' },
                            { label: 'Email transactional dispatcher', desc: 'Invoice clear pdf receipts' }
                          ].map(t => (
                            <div key={t.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div>
                                <span className="block text-xs font-bold text-gray-700">{t.label}</span>
                                <span className="block text-[10px] text-gray-400 font-semibold leading-none mt-1">{t.desc}</span>
                              </div>
                              <div className="w-9 h-5 rounded-full bg-[#0F766E] p-0.5 flex items-center justify-end"><div className="w-4 h-4 rounded-full bg-white shadow-sm" /></div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center gap-4">
                          <div>
                            <span className="block text-xs font-bold text-red-500 uppercase tracking-widest">Takreem databases factory reseed</span>
                            <span className="block text-[10px] text-gray-400 font-semibold leading-normal mt-1">Re-populates vanilla registered Aalims, Masjids datasets.</span>
                          </div>
                          <button onClick={handleResetDatabase} className="h-10 px-4 bg-red-50 hover:bg-red-100 border border-red-150 text-red-650 font-bold text-xs uppercase rounded-xl transition-all">Reseed Sandbox</button>
                        </div>
                      </div>
                    </div>

                    {/* CMS Home Slide controls panel */}
                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E] border-b border-gray-100 pb-3">Home Promotion Banner CMS</h4>
                      
                      <form onSubmit={handleAddBanner} className="p-4 bg-gray-50 rounded-2xl space-y-3.5 border border-gray-100/80">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#0F766E] block mb-1">Queue Custom Banner carousel</span>
                        <input
                          required
                          type="text"
                          placeholder="Banner Heading Slide Title..."
                          className="w-full h-10 bg-white border border-gray-150 rounded-xl px-3 text-xs font-semibold outline-none"
                          value={newBannerTitle}
                          onChange={(e) => setNewBannerTitle(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Short subtitle summary..."
                          className="w-full h-10 bg-white border border-gray-150 rounded-xl px-3 text-xs font-semibold outline-none"
                          value={newBannerSub}
                          onChange={(e) => setNewBannerSub(e.target.value)}
                        />
                        <button type="submit" className="w-full h-10 bg-[#0F766E] text-white hover:bg-[#0D625C] font-extrabold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-1">
                          <Plus size={14} />
                          <span>Publish Promo</span>
                        </button>
                      </form>

                      {/* Slide indexes representation */}
                      <div className="space-y-2 max-h-[220px] overflow-y-auto">
                        {banners.map((b, i) => (
                          <div key={b.id} className="p-3 bg-white border border-gray-150 rounded-xl flex items-center justify-between text-xs font-semibold">
                            <div>
                              <h5 className="font-bold text-gray-800 leading-none">{b.title}</h5>
                              <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1.5">Rank #{i+1} slider</span>
                            </div>
                            <span className="text-[10px] text-teal-850 font-extrabold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">LIVE</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Operational secure logs */}
                  <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0F766E] border-b border-gray-100 pb-3">Encrypted Administration trace Logs</h4>
                    <div className="border-l-2 border-dashed border-gray-250 ml-4 pl-6 space-y-4 overflow-y-auto max-h-[660px]">
                      {auditLogs.map((log) => (
                        <div key={log.id} className="relative">
                          <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0F766E] border-2 border-white ring-2 ring-[#0F766E]/20" />
                          <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-3.5 space-y-2">
                            <div className="flex justify-between text-[9px] text-gray-400 font-bold border-b border-gray-100 pb-1.5">
                              <span>Trace log ID {log.id}</span>
                              <span>{log.timestamp}</span>
                            </div>
                            <p className="text-xs font-bold text-gray-800">{log.actionPerformed}</p>
                            <span className="inline-block text-[8.5px] font-bold text-[#0F766E] bg-[#0F766E]/5 px-2 py-0.5 rounded uppercase tracking-wider">Module: {log.moduleAccessed}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* DETAIL SCHOLAR REVIEW INSPEC DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedAalim && (
          <div className="fixed inset-0 z-[150] flex items-center justify-end bg-black/50 select-none">
            <div className="absolute inset-0 z-10" onClick={() => setSelectedAalim(null)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-[450px] bg-white h-screen shrink-0 relative z-20 shadow-2xl p-6 flex flex-col justify-between max-h-screen overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-150 pb-4 shrink-0">
                  <div>
                    <span className="text-[9px] bg-emerald-50 text-[#0F766E] border border-[#0F766E]/15 font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Background evaluator</span>
                    <h4 className="text-lg font-serif italic text-slate-800 font-bold mt-1.5">Scholar Credentials</h4>
                  </div>
                  <button onClick={() => setSelectedAalim(null)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><X size={15} /></button>
                </div>

                <div className="p-4 bg-[#0F766E]/5 rounded-2xl flex items-center gap-4 border border-[#0F766E]/10 shrink-0">
                  <div className="w-12 h-12 bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] font-bold font-serif text-xl rounded-xl flex items-center justify-center">
                    {selectedAalim.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 leading-none">{selectedAalim.name}</h5>
                    <p className="text-[10px] text-[#0F766E] font-bold uppercase mt-1 leading-none">{selectedAalim.title}</p>
                    <span className="text-[9.5px] text-gray-450 uppercase block mt-1">{selectedAalim.experience} Exp</span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-gray-600 font-semibold bg-gray-50 p-4 rounded-2xl border border-gray-100 shrink-0">
                  <div className="flex justify-between"><span className="text-gray-400">Graduation seminary:</span><span className="text-gray-800 font-bold">{selectedAalim.madrasa}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Assigned district:</span><span className="text-gray-800 font-bold">{selectedAalim.district}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Registered date:</span><span className="text-gray-400">{selectedAalim.regDate}</span></div>
                </div>

                {/* Audio voice reciter mock player */}
                <div className="p-4 bg-amber-50/40 border border-[#D4AF37]/20 rounded-2xl space-y-3 shrink-0">
                  <span className="text-[9.5px] text-amber-800 font-bold uppercase tracking-widest flex items-center gap-1 leading-none"><Volume2 size={13} className="text-[#D4AF37]" /> Reciter voice & Tajweed sample</span>
                  <div className="p-3 bg-white border border-amber-500/10 rounded-xl flex items-center gap-3">
                    <button onClick={() => setIsPlayingAudio(!isPlayingAudio)} className="w-10 h-10 bg-[#0F766E] text-white flex items-center justify-center rounded-full shrink-0 shadow-md">
                      {isPlayingAudio ? <Pause size={14} fill="white" /> : <Play size={14} className="ml-0.5" fill="white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10.5px] font-bold text-gray-850 truncate">{selectedAalim.audioSample}</p>
                      <div className="flex gap-0.5 h-3 items-center mt-1">
                        {[4, 9, 2, 7, 5, 8, 3, 6, 9, 2, 8, 4, 7, 3, 9].map((h, i) => (
                          <div key={i} style={{ height: isPlayingAudio ? `${h * 10}%` : '20%' }} className="w-[3px] bg-[#0F766E] rounded-full transition-all duration-300" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uploaded certificates log list */}
                <div className="space-y-2.5 shrink-0">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Islamic degree Certificates ({selectedAalim.certificates.length}):</span>
                  {selectedAalim.certificates.map(cert => (
                    <div key={cert} className="p-3.5 bg-gray-50 border border-gray-150 rounded-xl flex items-center justify-between text-xs font-semibold hover:border-[#0F766E] transition-all">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-[#0F766E]" />
                        <span className="text-gray-700 font-bold">{cert}</span>
                      </div>
                      <button onClick={() => alert(`Reviewing document: ${cert}`)} className="text-[10px] text-amber-600 hover:underline uppercase font-extrabold tracking-wider">Screen pdf</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-150 shrink-0">
                <button
                  onClick={() => { handleVerifyAalim(selectedAalim.id, false); setSelectedAalim(null); }}
                  className="flex-1 h-11 bg-gray-105 border border-gray-200 text-gray-700 font-extrabold text-[11px] uppercase rounded-xl tracking-wider active:scale-95 transition-all"
                >
                  Reject & Flag
                </button>
                <button
                  onClick={() => { handleVerifyAalim(selectedAalim.id, true); setSelectedAalim(null); }}
                  className="flex-1 h-11 bg-[#0F766E] text-white hover:bg-[#0D625C] font-extrabold text-[11px] uppercase rounded-xl tracking-wider active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Verify Scholar</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAIL MOSQUE REVIEWS DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedMasjid && (
          <div className="fixed inset-0 z-[150] flex items-center justify-end bg-black/50 select-none">
            <div className="absolute inset-0 z-10" onClick={() => setSelectedMasjid(null)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-[450px] bg-white h-screen shrink-0 relative z-20 shadow-2xl p-6 flex flex-col justify-between max-h-screen overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-150 pb-4 shrink-0">
                  <div>
                    <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200/50 font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Takreem register credentials</span>
                    <h4 className="text-lg font-serif italic text-slate-800 font-bold mt-1.5">Mosque registered file</h4>
                  </div>
                  <button onClick={() => setSelectedMasjid(null)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><X size={15} /></button>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-150 shrink-0">
                  <div className="w-12 h-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl">
                    🕌
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 leading-none">{selectedMasjid.name}</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 block leading-none">{selectedMasjid.jamathName}</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-gray-650 font-semibold bg-gray-50 p-4 rounded-2xl border border-gray-100 shrink-0">
                  <div className="flex justify-between"><span className="text-gray-400">Registered City:</span><span className="text-gray-800 font-bold">{selectedMasjid.location}, TN</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Contact helpline:</span><span className="text-[#0F766E] font-bold">{selectedMasjid.contact}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Wakf Ledger file:</span><span className="font-mono text-gray-800 font-extrabold">{selectedMasjid.regDoc}</span></div>
                </div>

                <div className="space-y-2 shrink-0">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Authenticated documents:</span>
                  <div className="p-3 bg-white border border-gray-150 rounded-xl flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-[#0F766E]" />
                      <span className="text-gray-700 font-bold">{selectedMasjid.regDoc}</span>
                    </div>
                    <button onClick={() => alert(`Reviewing pdf registered license: ${selectedMasjid.regDoc}`)} className="text-[10px] text-amber-650 font-extrabold uppercase tracking-wider">Screen file</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-150 shrink-0">
                <button
                  onClick={() => { handleVerifyMasjid(selectedMasjid.id, false); setSelectedMasjid(null); }}
                  className="flex-1 h-11 bg-gray-105 border border-gray-200 text-gray-700 font-extrabold text-[11px] uppercase rounded-xl tracking-wider active:scale-95 transition-all"
                >
                  Decline & Flag
                </button>
                <button
                  onClick={() => { handleVerifyMasjid(selectedMasjid.id, true); setSelectedMasjid(null); }}
                  className="flex-1 h-11 bg-[#0F766E] text-white hover:bg-[#0D625C] font-extrabold text-[11px] uppercase rounded-xl tracking-wider active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Verify Mosque center</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
