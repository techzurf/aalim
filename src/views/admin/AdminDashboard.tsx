import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, Building2, School, Briefcase, 
  CheckCircle, Star, AlertCircle, Sparkles, 
  ShieldAlert, Send, FileBarChart2, CreditCard, 
  ArrowUpRight, Landmark, Radio, Calendar
} from 'lucide-react';
import { Aalim, Masjid, Madrasa, JobPosting, Transaction } from './AdminTypes';

interface AdminDashboardProps {
  aalims: Aalim[];
  masjids: Masjid[];
  madrasas: Madrasa[];
  jobs: JobPosting[];
  transactions?: Transaction[];
  onQuickAction: (actionType: string) => void;
  adminName: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  aalims,
  masjids,
  madrasas,
  jobs,
  transactions = [],
  onQuickAction,
  adminName
}) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Calculate Metrics from state
  const totalAalims = aalims.length;
  const totalMasjids = masjids.length;
  const totalMadrasas = madrasas.length;
  
  const activeJobs = jobs.filter(j => j.status === 'Approved').length;
  
  const pendingVerifications = aalims.filter(a => a.status === 'Pending').length + 
                             masjids.filter(m => m.status === 'Pending').length;

  const pendingJobApprovals = jobs.filter(j => j.status === 'Pending').length;

  const premiumMembers = aalims.filter(a => a.isPremium).length + masjids.filter(m => m.isPremium).length;

  const totalRevenue = transactions
    .filter(t => t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const statCards = [
    { title: 'Total Aalims', value: totalAalims, description: 'Registered scholars', icon: Users, color: '#0F766E', bg: 'bg-[#0F766E]/5 text-[#0F766E]' },
    { title: 'Total Masjids', value: totalMasjids, description: 'Masjid centers', icon: Building2, color: '#D4AF37', bg: 'bg-[#D4AF37]/10 text-amber-600' },
    { title: 'Total Madrasas', value: totalMadrasas, description: 'Islamic academies', icon: School, color: '#2C7A7B', bg: 'bg-[#2C7A7B]/10 text-[#2C7A7B]' },
    { title: 'Active Jobs', value: activeJobs, description: 'Open recruitments', icon: Briefcase, color: '#0F766E', bg: 'bg-emerald-50 text-emerald-600' },
    { title: 'Pending Verifications', value: pendingVerifications, description: 'Aalims & Mosques', icon: CheckerIconHelper(pendingVerifications), color: '#EF4444', bg: 'bg-red-50 text-red-500 font-bold' },
    { title: 'Pending Job Approvals', value: pendingJobApprovals, description: 'Awaiting screening', icon: CheckCircle, color: '#0F766E', bg: 'bg-[#0F766E]/10 text-emerald-800' },
    { title: 'Premium Members', value: premiumMembers, description: 'Subscribed users', icon: Star, color: '#D4AF37', bg: 'bg-amber-50 text-amber-500' },
    { title: 'Revenue Statistics', value: formatRupee(totalRevenue), description: 'Completed earnings', icon: CreditCard, color: '#0F766E', bg: 'bg-teal-50 text-teal-700 font-bold' }
  ];

  function CheckerIconHelper(val: number) {
    return val > 0 ? ShieldAlert : CheckCircle;
  }

  const quickActions = [
    { id: 'verify_aalim', label: 'Verify Aalims', description: 'Review credentials', icon: Users, color: 'from-[#0F766E] to-[#14B8A6]' },
    { id: 'verify_masjid', label: 'Verify Masjids', description: 'Approve mosques', icon: Building2, color: 'from-[#D4AF37] to-yellow-500' },
    { id: 'approve_jobs', label: 'Approve Jobs', description: 'Screen listings', icon: Briefcase, color: 'from-[#1E3A5F] to-indigo-600' },
    { id: 'send_notification', label: 'Broadcast Campaign', description: 'SMS/WhatsApp alert', icon: Send, color: 'from-amber-500 to-[#D4AF37]' },
    { id: 'view_reports', label: 'View Analytics', description: 'Growth charts & KPI', icon: FileBarChart2, color: 'from-[#2C7A7B] to-emerald-500' },
    { id: 'manage_premium', label: 'Premium Subscriptions', description: 'Upgrade plans', icon: CreditCard, color: 'from-slate-700 to-slate-900' }
  ];

  return (
    <div className="space-y-6 pt-4 px-4 pb-12">
      {/* Welcome Bar with Islamic Geometric Card */}
      <div className="p-5 rounded-[28px] bg-gradient-to-br from-[#0F766E] via-[#0D625C] to-[#0B4F4A] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-36 h-36 bg-[#D4AF37]/5 rounded-full -mr-12 -mb-12 pointer-events-none border border-[#D4AF37]/10" />
        <div className="absolute top-0 right-1/4 w-12 h-12 bg-white/5 rounded-full -mt-6 pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full text-[#D4AF37] font-bold uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={8} /> Active Session
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-[#D4AF37]/90 font-bold bg-white/5 px-2.5 py-1 rounded-lg">
              <Calendar size={11} />
              <span>{today}</span>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-serif italic text-white leading-tight">
              Salaam, {adminName}
            </h2>
            <p className="text-xs text-[#D4AF37] font-medium uppercase tracking-wider">
              Takreem Staffing Portal Controller • Chennai HQ
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section Title */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-extrabold text-[#0F766E] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            Dashboard Metrics
          </h3>
          <span className="text-[10px] text-gray-400 font-semibold uppercase">Real-time stats</span>
        </div>

        {/* Bento Stat Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onQuickAction(card.title)}
              className="bg-white border border-[#E5E7EB] rounded-[22px] p-4 flex flex-col justify-between hover:border-[#D4AF37] active:scale-[0.97] transition-all duration-300 shadow-sm cursor-pointer relative overflow-hidden group"
            >
              {/* Subtle hover splash of gold */}
              <div className="absolute right-0 bottom-0 w-12 h-12 bg-gray-50 rounded-full group-hover:bg-[#D4AF37]/5 transition-colors -mr-4 -mb-4 duration-300" />
              
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <card.icon size={16} />
                </div>
                <ArrowUpRight size={14} className="text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
              </div>

              <div className="mt-4">
                <span className="block text-2xl font-bold text-[#1E3A5F] tracking-tight leading-none">
                  {card.value}
                </span>
                <span className="block text-[10px] font-bold text-gray-800 uppercase tracking-wider mt-1.5 leading-none">
                  {card.title}
                </span>
                <span className="block text-[9px] text-[#6B7280] font-medium mt-0.5">
                  {card.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Action Buttons Column */}
      <div className="space-y-3 pt-2">
        <h3 className="text-[11px] font-extrabold text-[#0F766E] uppercase tracking-widest flex items-center gap-1.5 px-0.5">
          <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
          Operations Control Center
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {quickActions.map((act) => (
            <button
              key={act.id}
              onClick={() => onQuickAction(act.id)}
              className="w-full p-3.5 bg-white border border-[#E5E7EB] hover:border-[#D4AF37] hover:shadow-md rounded-2xl flex items-center justify-between group transition-all cursor-pointer text-left active:scale-[0.98]"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${act.color} text-white flex items-center justify-center shadow-sm`}>
                  <act.icon size={20} />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#1E3A5F] uppercase tracking-wider leading-none">
                    {act.label}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-semibold mt-1 leading-none">
                    {act.description}
                  </p>
                </div>
              </div>
              <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-[#D4AF37]/10 flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] transition-all">
                <ArrowUpRight size={15} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
