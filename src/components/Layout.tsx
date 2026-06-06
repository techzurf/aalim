import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  hideNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, showBack, hideNav }) => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky-nav justify-between border-b border-white/10">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 rounded-full active:bg-white/10 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {title ? (
            <h1 className="text-sm font-bold tracking-widest uppercase">{title}</h1>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="font-serif italic text-2xl font-bold tracking-tighter">Noor</span>
              <div className="w-1 h-1 rounded-full bg-accent mt-2" />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase pt-0.5">Assalam</div>
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-accent opacity-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${!hideNav ? 'pb-24' : 'pb-8'}`}>
        {children}
      </main>

      {/* Bottom Nav */}
      {!hideNav && <BottomNav />}
    </div>
  );
};
