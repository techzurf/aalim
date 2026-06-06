import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Mail, Lock, Phone, KeyRound, Sparkles, ChevronLeft, Headphones } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (adminName: string) => void;
  onExit: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onExit }) => {
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [emailOrPhone, setEmailOrPhone] = useState('admin@noorstaffing.com');
  const [password, setPassword] = useState('Admin123');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (loginMethod === 'password') {
        if (emailOrPhone === 'admin@noorstaffing.com' && password === 'Admin123') {
          onLoginSuccess('Admin Zubair');
        } else {
          setErrorMsg('Invalid admin credentials. Please use email "admin@noorstaffing.com" and password "Admin123"');
        }
      } else {
        if (!isOtpSent) {
          setIsOtpSent(true);
          setErrorMsg(null);
        } else {
          if (otpCode === '12 34' || otpCode.replace(/\s+/g, '') === '1234' || otpCode.length >= 4) {
            onLoginSuccess('Admin Zubair');
          } else {
            setErrorMsg('Invalid security OTP. Enter "1234" to simulate.');
          }
        }
      }
    }, 1000);
  };

  return (
    <div className="mobile-container min-h-screen bg-[#0F1C25] text-white flex flex-col justify-between overflow-y-auto px-6 py-8 relative">
      {/* Dynamic Gold Geometric Stars in background */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#0F766E]/15 blur-3xl -mr-12 -mt-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-3xl -ml-24 -mb-24 pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={onExit}
          className="flex items-center space-x-1.5 text-xs text-white/50 hover:text-white font-bold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-full border border-white/5 active:scale-95 transition-all"
        >
          <ChevronLeft size={14} />
          <span>User App</span>
        </button>
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
          <ShieldCheck size={12} className="text-[#D4AF37]" />
          <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">HQ Console</span>
        </div>
      </div>

      {/* Hero Brand Identity */}
      <div className="text-center space-y-3 my-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-[22px] bg-gradient-to-tr from-[#0F766E] to-[#14B8A6] flex items-center justify-center shadow-lg border border-[#D4AF37]/40 relative overflow-hidden">
            {/* Islamic Dome Grid representation */}
            <svg className="w-10 h-10 text-white fill-current opacity-90 relative z-10" viewBox="0 0 100 100">
              <path d="M50 15 C50 15, 65 35, 65 52 C65 65, 50 78, 50 78 C50 78, 35 65, 35 52 C35 35, 50 15, 50 15" />
              <circle cx="50" cy="52" r="5" className="text-[#D4AF37] fill-current" />
            </svg>
            <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full filter blur-sm animate-pulse" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-serif italic font-bold tracking-tight text-white">
            Aalim Connect
          </h1>
          <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] font-extrabold flex items-center justify-center gap-1">
            <Sparkles size={10} />
            <span>HQ Administrator Portal</span>
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-[#112330]/90 border border-white/10 rounded-[32px] p-6 space-y-5 relative z-10 shadow-2xl backdrop-blur-md">
        <div className="flex border-b border-white/5 pb-1">
          <button
            type="button"
            onClick={() => { setLoginMethod('password'); setErrorMsg(null); }}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              loginMethod === 'password' ? 'border-[#0F766E] text-white' : 'border-transparent text-white/40'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod('otp'); setErrorMsg(null); }}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              loginMethod === 'otp' ? 'border-[#0F766E] text-white' : 'border-transparent text-white/40'
            }`}
          >
            Security OTP
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-[11px] font-semibold text-red-400">
            {errorMsg}
          </div>
        )}

        {loginMethod === 'otp' && isOtpSent && (
          <div className="p-3.5 bg-[#0F766E]/10 border border-[#0F766E]/30 rounded-xl text-[11px] font-semibold text-[#14B8A6]">
            Simulated OTP code sent! Type <strong className="text-white underline">1234</strong> to bypass login.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]/90 px-1">
              {loginMethod === 'password' ? 'HQ Admin Email' : 'Registered Mobile Number'}
            </label>
            <div className="relative">
              {loginMethod === 'password' ? (
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              ) : (
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              )}
              <input
                type={loginMethod === 'password' ? 'email' : 'tel'}
                required
                placeholder={loginMethod === 'password' ? 'admin@noorstaffing.com' : '+91 9840XXXXXX'}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-xs font-medium text-white outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/30"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loginMethod === 'password' ? (
              <motion.div
                key="pass-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1.5"
              >
                <div className="flex justify-between px-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]/90">
                    Secret Key Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Takreem support recovery: demo credentials are: admin@noorstaffing.com / Admin123')}
                    className="text-[9px] font-extrabold text-white/40 uppercase tracking-wider hover:text-white"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-xs font-medium text-white outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/30"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </motion.div>
            ) : (
              isOtpSent && (
                <motion.div
                  key="otp-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between px-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]/90">
                      OTP Code
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Simulated code: 1234')}
                      className="text-[9px] font-extrabold text-white/40 uppercase tracking-wider hover:text-[#D4AF37]"
                    >
                      Resend
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1234"
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-xs font-bold tracking-[1em] text-center text-[#D4AF37] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                      value={otpCode}
                      maxLength={6}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 mt-3 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] hover:from-[#115E59] hover:to-[#0F766E] text-white font-bold rounded-xl text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>
                  {loginMethod === 'otp' && !isOtpSent ? 'Send Verification OTP' : 'Verify & Boot Console'}
                </span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Support & Contact footer */}
      <div className="pt-6 text-center space-y-3">
        <button
          onClick={() => alert('HQ Technical Hotline: hq.support@noorinfra.org | +91 44 2844 9900 (Takreem Admin)')}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#112330] border border-white/5 hover:border-[#D4AF37]/30 text-white/70 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest active:scale-95 mx-auto"
        >
          <Headphones size={14} className="text-[#D4AF37]" />
          <span>Internal Support Desk</span>
        </button>

        <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.35em]">
          NOOR PLATFORM CORP • TAMIL NADU ISLAMIC BOARD
        </p>
      </div>
    </div>
  );
};
