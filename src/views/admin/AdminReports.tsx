import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileBarChart2, CreditCard, TrendingUp, DollarSign, Users, Briefcase, 
  MapPin, Sparkles, AlertCircle, ArrowUpRight, ArrowDownLeft, Ban 
} from 'lucide-react';
import { Transaction } from './AdminTypes';

interface AdminReportsProps {
  transactions: Transaction[];
  onConfirmPayout: (id: string) => void;
  onRefundPayout: (id: string) => void;
}

export const AdminReports: React.FC<AdminReportsProps> = ({
  transactions,
  onConfirmPayout,
  onRefundPayout
}) => {
  const [activeReportTab, setActiveReportTab] = useState<'finance' | 'charts'>('finance');

  // KPI calculations
  const totalRevenue = transactions
    .filter(t => t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingRevenue = transactions
    .filter(t => t.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // SVG chart configurations
  const growthPoints = [
    { label: 'Jan', val: 50 },
    { label: 'Feb', val: 120 },
    { label: 'Mar', val: 210 },
    { label: 'Apr', val: 340 },
    { label: 'May', val: 490 },
    { label: 'Jun', val: 620 }
  ];

  const districtJobs = [
    { label: 'Chennai', val: '48%', jobs: '64' },
    { label: 'Madurai', val: '22%', jobs: '29' },
    { label: 'Erode', val: '15%', jobs: '20' },
    { label: 'Trichy', val: '10%', jobs: '15' },
    { label: 'Salem', val: '5%', jobs: '8' }
  ];

  return (
    <div className="space-y-4 pt-4 px-4 pb-12">
      
      {/* Subtab selection */}
      <div className="flex bg-[#F4EFE6] p-1 rounded-2xl border border-[#E5E7EB]">
        <button
          onClick={() => setActiveReportTab('finance')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-all ${
            activeReportTab === 'finance'
              ? 'bg-[#0F766E] text-white shadow-md'
              : 'text-gray-500 hover:text-[#0F766E]'
          }`}
        >
          <CreditCard size={14} />
          <span>Payment Ledger</span>
        </button>
        <button
          onClick={() => setActiveReportTab('charts')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-all ${
            activeReportTab === 'charts'
              ? 'bg-[#0F766E] text-white shadow-md'
              : 'text-gray-500 hover:text-[#0F766E]'
          }`}
        >
          <FileBarChart2 size={14} />
          <span>Analytics Reports</span>
        </button>
      </div>

      {/* KPI summaries */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#0F766E]/5 flex items-center justify-center">
            <DollarSign size={14} className="text-[#0F766E]" />
          </div>
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Gross Collection</span>
          <span className="text-xl font-bold text-[#1E3A5F] tracking-tight mt-1 leading-none">{formatRupee(totalRevenue)}</span>
          <span className="text-[9px] text-[#0F766E] font-bold mt-2 flex items-center gap-0.5">
            <TrendingUp size={10} /> +18.4% this month
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-amber-500/5 flex items-center justify-center">
            <AlertCircle size={14} className="text-amber-500" />
          </div>
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Awaiting Settlement</span>
          <span className="text-xl font-bold text-[#1E3A5F] tracking-tight mt-1 leading-none">{formatRupee(pendingRevenue)}</span>
          <span className="text-[9px] text-amber-600 font-medium mt-2 flex items-center gap-0.5">
             Pending verification logs
          </span>
        </div>
      </div>

      {/* FINANCE TAB: SUBSCRIPTIONS & TRANSACTIONS */}
      {activeReportTab === 'finance' && (
        <div className="space-y-4">
          
          {/* Subscription Plans status layout */}
          <div className="bg-gradient-to-br from-[#0F766E]/5 to-[#D4AF37]/5 border border-[#0F766E]/15 rounded-[22px] p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest flex items-center gap-1.5 leading-none">
                <Sparkles size={11} className="text-[#D4AF37]" strokeWidth={2.5} /> Active Subscriptions Segment
              </span>
              <span className="text-[9px] text-gray-400 font-bold uppercase">Upgrade Desk</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Basic Free', count: '142', color: 'bg-white text-gray-400 border-gray-100' },
                { label: 'Aalim Quarterly', count: '48', color: 'bg-white text-[#0F766E] border-[#0F766E]/20' },
                { label: 'Masjid Annual', count: '15', color: 'bg-yellow-50 text-amber-700 border-amber-200' }
              ].map((pPlan) => (
                <div key={pPlan.label} className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center shadow-sm ${pPlan.color}`}>
                  <span className="text-[11px] font-bold leading-none truncate w-full">{pPlan.label}</span>
                  <span className="text-base font-extrabold tracking-tight mt-1 leading-none">{pPlan.count}</span>
                  <span className="text-[8px] text-gray-400 font-semibold mt-1">Users active</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions Log Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest leading-none">Recent Inflow Ledger</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Latest 5 events</span>
            </div>

            <div className="space-y-2.5">
              {transactions.map((txn, index) => (
                <div key={txn.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col space-y-3 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#1E3A5F]">{txn.user}</h4>
                      <p className="text-[9px] text-[#6B7280] font-bold uppercase tracking-wider">{txn.plan} • {txn.date}</p>
                    </div>
                    <span className="text-xs font-extrabold text-teal-800 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-lg">
                      {formatRupee(txn.amount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className={`text-[8.5px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      txn.status === 'Completed'
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                        : txn.status === 'Pending'
                        ? 'bg-amber-50 border-amber-100 text-amber-600'
                        : 'bg-red-50 border-red-100 text-red-500'
                    }`}>
                      {txn.status}
                    </span>

                    {/* Operational settlement actions */}
                    {txn.status === 'Pending' && (
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => onRefundPayout(txn.id)}
                          className="h-7 px-2.5 rounded bg-red-50 hover:bg-red-100 text-[9px] font-extrabold text-red-600 uppercase tracking-widest"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => onConfirmPayout(txn.id)}
                          className="h-7 px-2.5 rounded bg-[#0F766E] text-white text-[9px] font-extrabold uppercase tracking-widest"
                        >
                          Verify Payment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHARTS & ANALYTICS REPORTS TAB */}
      {activeReportTab === 'charts' && (
        <div className="space-y-4">
          
          {/* Growth Curve Chart representation using custom SVG wrapper */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <div>
                <span className="text-[10px] text-[#0F766E] uppercase font-bold tracking-widest">Monthly Growth Trend</span>
                <h4 className="text-[13px] font-bold text-[#1E3A5F]">Total Active Registrations</h4>
              </div>
              <span className="text-[11px] font-bold text-teal-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">+620 users</span>
            </div>

            {/* Custom SVG Line Chart representation */}
            <div className="relative pt-4 pb-2">
              <svg className="w-full h-28 overflow-visible" viewBox="0 0 400 100">
                {/* Gridlines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                
                {/* SVG Polyline with Gold gradients */}
                <path
                  d="M 10,90 Q 80,60 150,55 T 290,30 T 390,10"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Shading fill below line */}
                <path
                  d="M 10,90 Q 80,60 150,55 T 290,30 T 390,10 L 390,100 L 10,100 Z"
                  fill="url(#goldGradient)"
                  opacity="0.12"
                />

                {/* Interactive Points circles */}
                <circle cx="150" cy="55" r="4.5" className="fill-[#D4AF37] stroke-white stroke-2" />
                <circle cx="390" cy="10" r="4.5" className="fill-[#0F766E] stroke-white stroke-2" />

                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F766E" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Chart labels bottom Row */}
              <div className="flex justify-between text-[9px] text-gray-400 font-extrabold uppercase tracking-widest pt-1 px-1">
                {growthPoints.map(p => (
                  <span key={p.label}>{p.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* District Wise bar charts representations */}
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <div>
                <span className="text-[10px] text-[#0F766E] uppercase font-bold tracking-widest">Recruitment Territory Share</span>
                <h4 className="text-[13px] font-bold text-[#1E3A5F]">Tamil Nadu District Listings</h4>
              </div>
              <span className="text-[9px] text-[#D4AF37] font-extrabold uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Total 5 Cities</span>
            </div>

            {/* Custom styled progress bars mapping list */}
            <div className="space-y-4">
              {districtJobs.map((dist) => (
                <div key={dist.label} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[#1E3A5F]">{dist.label}</span>
                    <span className="text-[#0F766E]">{dist.jobs} Active Jobs ({dist.val})</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                    <div 
                      style={{ width: dist.val }}
                      className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-full transition-all duration-1000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
