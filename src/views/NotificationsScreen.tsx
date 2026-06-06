import React from 'react';
import { Layout } from '../components/Layout';
import { MessageSquare, Bell, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const NOTIFICATIONS = [
  { id: '1', title: 'New Message from Juma Masjid', body: 'Assalamu alaikum, we reviewed your profile. Can we talk?', time: '2 mins ago', type: 'message', unread: true },
  { id: '2', title: 'Profile Verified', body: 'Your Alim profile has been successfully verified by our team.', time: '1 hour ago', type: 'system', unread: false },
  { id: '3', title: 'Job Alert: Chief Imam', body: 'A new Chief Imam opening was posted in Chennai.', time: '5 hours ago', type: 'alert', unread: false },
  { id: '4', title: 'Salary Credited', body: 'Your payout for the month of Ramadan was processed.', time: 'Yesterday', type: 'system', unread: false },
];

export const NotificationsScreen: React.FC = () => {
  return (
    <Layout title="Inbox">
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[13px] font-bold text-primary uppercase tracking-widest">Recent Activity</h3>
          <button className="text-[10px] font-bold text-accent uppercase tracking-widest">Mark all as read</button>
        </div>

        <div className="space-y-3">
          {NOTIFICATIONS.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`app-card p-4 flex space-x-4 border-l-2 ${notif.unread ? 'border-l-accent bg-accent/5' : 'border-l-transparent bg-white'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm flex-shrink-0 ${
                notif.type === 'message' ? 'bg-secondary-bg text-primary border-border-custom' :
                notif.type === 'system' ? 'bg-accent/10 text-accent border-accent/10' :
                'bg-blue-50 text-blue-600 border-blue-100'
              }`}>
                {notif.type === 'message' ? <MessageSquare size={20} /> : <Bell size={20} />}
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-[13px] truncate ${notif.unread ? 'font-bold text-primary' : 'font-semibold text-text-primary'}`}>
                    {notif.title}
                  </h4>
                  {notif.unread && <div className="w-2 h-2 bg-accent rounded-full" />}
                </div>
                <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                  {notif.body}
                </p>
                <div className="flex items-center space-x-1.5 opacity-40 pt-1">
                   <Clock size={10} />
                   <span className="text-[9px] font-bold uppercase tracking-wider">{notif.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 text-center">
           <img 
              src="https://illustrations.popsy.co/amber/notifications.svg" 
              alt="Empty" 
              className="w-32 h-32 mx-auto mb-4 opacity-40 grayscale"
           />
           <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-bold">You're all caught up</p>
        </div>
      </div>
    </Layout>
  );
};
