import React from 'react';
import { Layout } from '../components/Layout';
import { 
  User, Settings, FileText, HelpCircle, 
  Shield, LogOut, ChevronRight, Share2, 
  MapPin, Headphones, Globe, Landmark, 
  Image, Award, Plus
} from 'lucide-react';
import { motion } from 'motion/react';

export const AccountScreen: React.FC = () => {
  const role = localStorage.getItem('noor_user_role');
  const userInfoStr = localStorage.getItem('noor_user_info');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

  const displayName = userInfo?.name || (role === 'masjid' ? 'Triplicane Juma Masjid' : 'Moulana Jaffar Sadiq');
  const displayEmail = userInfo?.email || (role === 'masjid' ? 'office@triplicanejuma.org' : 'jaffar.sadiq@noor.org');
  const displayCity = userInfo?.city || 'Chennai';

  const handleAdminToggle = () => {
    if ((window as any).__noor_toggle_admin) {
      (window as any).__noor_toggle_admin(true);
    }
  };

  const menuItems = role === 'masjid' ? [
    { icon: Landmark, label: 'Masjid Verification Details', color: 'text-[#1E3A5F]' },
    { icon: FileText, label: 'Institutional Registration Lic.', color: 'text-[#1E3A5F]' },
    { icon: MapPin, label: 'Mosque Location & Address', color: 'text-[#1E3A5F]' },
    { icon: Globe, label: 'Language Preferences', color: 'text-[#1E3A5F]' },
    { icon: Shield, label: 'Admin Access', color: 'text-[#0F766E]', customAction: handleAdminToggle }
  ] : [
    { icon: User, label: 'Personal Information', color: 'text-[#1E3A5F]' },
    { icon: FileText, label: 'Resume & Certificates', color: 'text-[#1E3A5F]' },
    { icon: MapPin, label: 'Saved Locations', color: 'text-[#1E3A5F]' },
    { icon: Globe, label: 'Language Settings', color: 'text-[#1E3A5F]' },
    { icon: Shield, label: 'Admin Access', color: 'text-[#0F766E]', customAction: handleAdminToggle }
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Help Center' },
    { icon: Shield, label: 'Privacy Policy' },
    { icon: Share2, label: 'Share with a Friend' },
    { icon: Headphones, label: 'Contact Support Services' },
    { icon: Settings, label: 'Management Portal', customAction: handleAdminToggle }
  ];

  const handleLogoutClick = () => {
    if ((window as any).__noor_logout) {
      (window as any).__noor_logout();
    } else {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Layout title={role === 'masjid' ? "Masjid Portal" : "Menu"}>
      <div className="px-4 py-8 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-[32px] bg-[#1E3A5F] flex items-center justify-center border-4 border-white shadow-2xl relative">
             <div className="w-full h-full bg-[#2C7A7B]/20 absolute inset-0" />
             <span className="text-white text-4xl font-serif italic relative z-10 font-bold">
               {displayName.charAt(0)}
             </span>
             <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-xl border-4 border-[#F4EFE6] flex items-center justify-center">
                <Shield size={12} className="text-white" />
             </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary font-serif italic">{displayName}</h2>
            <p className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-[0.3em] mt-1">
              {role === 'masjid' ? 'Verified Mosque Profile' : 'Verified Aalim Profile'}
            </p>
            <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">{displayEmail}</p>
          </div>
          <button 
            onClick={() => alert("Verification details are managed through local council representatives.")}
            className="app-button-primary scale-90"
          >
             Manage Details
          </button>
        </div>

        {/* Roles Segment (Premium Card - Adapt to role) */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.2em] px-1">
            {role === 'masjid' ? 'Institutional Credentials' : 'Credentials & Specializations'}
          </h3>
          <div className="p-5 rounded-[24px] bg-[#2C7A7B]/5 border border-[#2C7A7B]/10 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                 <h4 className="text-[13px] font-bold text-primary">
                   {role === 'masjid' ? 'Masjid Photo & Gallery' : 'Audio Recitation'}
                 </h4>
                 <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">
                   {role === 'masjid' ? 'Showcase your center to applicants' : 'Showcase your Qirat Skills'}
                 </p>
              </div>
              <button 
                onClick={() => alert("File uploads enabled in verified local region only.")}
                className="px-4 h-9 rounded-xl bg-accent text-white text-[10px] font-bold shadow-md active:scale-95 transition-all hover:bg-accent/95"
              >
                 Upload New
              </button>
            </div>

            {role === 'masjid' ? (
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-white border border-border-custom rounded-xl flex items-center justify-center text-accent/40 shadow-sm">
                  <Image size={24} />
                </div>
                <div className="aspect-square bg-white border border-border-custom rounded-xl flex items-center justify-center text-accent/40 shadow-sm">
                  <Plus size={24} />
                </div>
                <div className="aspect-square bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center text-neutral-300">
                  <Landmark size={24} />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-white rounded-2xl flex items-center justify-between border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-bg flex items-center justify-center text-accent">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#1E3A5F] tracking-tight">Surah Ar-Rahman.mp3</span>
                    <span className="block text-[9px] text-[#6B7280] uppercase tracking-widest font-bold">2.4 MB • 4:20</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.2em] px-1">Account Management</h3>
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] overflow-hidden shadow-sm">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.customAction ? item.customAction : () => alert(`${item.label} simulator open.`)}
                className={`w-full p-5 flex items-center justify-between group active:bg-secondary-bg transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-[#E5E7EB]/50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary-bg flex items-center justify-center">
                    <item.icon size={20} className={item.color} />
                  </div>
                  <span className="text-[13px] font-bold text-[#1E3A5F] tracking-tight">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-[#E5E7EB]" />
              </button>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.2em] px-1">Support & Safety</h3>
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] overflow-hidden shadow-sm">
            {supportItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.customAction ? item.customAction : () => alert(`Redirecting to ${item.label} support services.`)}
                className={`w-full p-5 flex items-center justify-between group active:bg-[#F4EFE6] transition-colors ${
                  index !== supportItems.length - 1 ? 'border-b border-[#E5E7EB]/50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary-bg flex items-center justify-center text-[#6B7280]">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[13px] font-bold text-[#1E3A5F] tracking-tight">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-[#E5E7EB]" />
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Log Out Action */}
        <button 
          onClick={handleLogoutClick}
          className="w-full h-14 rounded-[24px] bg-red-50 text-red-600 font-bold flex items-center justify-center space-x-3 border border-red-100 active:scale-95 transition-all mb-8 shadow-sm"
        >
          <LogOut size={20} />
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold">Sign Out / Reset Onboarding</span>
        </button>
        
        <div className="text-center pb-12 space-y-1">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-[0.4em] font-extrabold">Noor Staffing Platform</p>
          <p className="text-[9px] text-[#6B7280]/40 font-bold uppercase tracking-widest">Version 2.1.0-Premium</p>
        </div>
      </div>
    </Layout>
  );
};
