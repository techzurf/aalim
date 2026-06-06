import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Lock, User, Phone, 
  MapPin, Check, ChevronLeft, 
  BookOpen, Building, Sparkles, Shield 
} from 'lucide-react';

interface LoginScreenProps {
  role: 'job_seeker' | 'masjid';
  onBack: () => void;
  onLoginComplete: (userData: { name: string; email: string; city: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ role, onBack, onLoginComplete }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Chennai',
    password: '',
    agree: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate realistic loader for full app feel
    setTimeout(() => {
      setLoading(false);
      onLoginComplete({
        name: formData.name || (role === 'job_seeker' ? 'Moulana Jaffar Sadiq' : 'Triplicane Juma Masjid'),
        email: formData.email || (role === 'job_seeker' ? 'jaffar.sadiq@noor.org' : 'office@triplicanejuma.org'),
        city: formData.city || 'Chennai'
      });
    }, 1200);
  };

  return (
    <div className="mobile-container min-h-screen bg-secondary-bg text-text-primary flex flex-col justify-between overflow-y-auto pb-safe">
      
      {/* Dynamic Header */}
      <div className="bg-primary text-white p-6 pt-8 rounded-b-[32px] shadow-lg relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
        
        {/* Back and Identity */}
        <div className="flex items-center justify-between relative z-10">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                if ((window as any).__noor_toggle_admin) {
                  (window as any).__noor_toggle_admin(true);
                }
              }}
              title="Admin Access"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-accent active:scale-95 transition-all"
            >
              <Shield size={14} />
            </button>
            <div className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full flex items-center space-x-1.5">
              {role === 'job_seeker' ? (
                <>
                  <BookOpen size={12} className="text-accent-foreground" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white">Join as Aalim</span>
                </>
              ) : (
                <>
                  <Building size={12} className="text-accent-foreground" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white">Join as Masjid</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Catchy Title */}
        <div className="mt-6 space-y-1 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold">
            {isSignUp ? 'Create your profile' : 'Sign In to continue'}
          </p>
          <h2 className="text-2xl font-serif italic font-bold">
            {isSignUp ? 'Get started on Noor' : 'Welcome Back'}
          </h2>
        </div>
      </div>

      {/* Main Form container */}
      <div className="flex-1 px-5 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Dynamic Role Explanation tag */}
          <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl flex items-start space-x-3">
            <Sparkles size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-[#1E3A5F] font-medium">
              {role === 'job_seeker' ? (
                <span>You are signing up to apply for roles at certified Masjids in Tamil Nadu and verify your Islamic credentials.</span>
              ) : (
                <span>You are signing up as an institution to post job openings, find Qaris/Imams, and review Aalim certifications.</span>
              )}
            </p>
          </div>

          <div className="space-y-3">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#1E3A5F] block px-1">
                  {role === 'job_seeker' ? 'Full Name (with Honorific)' : 'Masjid or Institution Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                  <input
                    type="text"
                    required
                    placeholder={role === 'job_seeker' ? 'e.g. Moulana Hf. Jaffar' : 'e.g. Masjidun-Noor'}
                    className="app-input pl-11"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#1E3A5F] block px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="app-input pl-11"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {isSignUp && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#1E3A5F] block px-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="app-input pl-11"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#1E3A5F] block px-1">City / Region in TN</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                    <select
                      className="app-input pl-11 appearance-none bg-white font-semibold text-text-primary h-12"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Erode">Erode</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                      <option value="Hosur">Hosur</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#1E3A5F] block px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="app-input pl-11"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Aggreement/Remember checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="agreeCheck"
              className="w-4 h-4 text-accent border-[#E5E7EB] rounded focus:ring-accent"
              checked={formData.agree}
              onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
            />
            <label htmlFor="agreeCheck" className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider cursor-pointer">
              {isSignUp ? 'I agree to the guidelines' : 'Remember me on this app'}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#1E3A5F] hover:bg-[#14263E] text-white font-bold rounded-2xl text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all mt-4 shadow-lg shadow-[#1E3A5F]/10 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>{isSignUp ? 'Register & Verify' : 'Sign In Now'}</span>
            )}
          </button>
        </form>

        {/* Toggle between register and login */}
        <div className="text-center mt-6 flex flex-col items-center justify-center space-y-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-bold text-accent uppercase tracking-widest hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create here"}
          </button>

          <button
            type="button"
            onClick={() => {
              if ((window as any).__noor_toggle_admin) {
                (window as any).__noor_toggle_admin(true);
              }
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0F766E]/5 hover:bg-[#0F766E]/10 border border-[#0F766E]/10 text-[10px] text-[#0F766E] font-bold uppercase tracking-widest transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>HQ Administrator Portal</span>
          </button>
        </div>
      </div>

      {/* Aesthetic bottom text */}
      <p className="text-[9px] text-center text-[#6B7280] uppercase tracking-[0.3em] font-bold py-6">
        Noor Islamic Staffing Verification • Tamil Nadu
      </p>
    </div>
  );
};
