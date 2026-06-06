import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Users, Bell, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: Users, label: 'Aalims', path: '/profiles' },
  { icon: Bell, label: 'Inbox', path: '/notifications' },
  { icon: User, label: 'Menu', path: '/account' },
];

export const BottomNav = () => {
  return (
    <nav className="bottom-tab-nav !h-20 lg:!h-16">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `flex flex-col items-center justify-center space-y-1 relative group w-14 ${
              isActive ? 'text-accent' : 'text-text-secondary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`transition-all duration-300 ${isActive ? 'scale-110 mb-0.5' : 'scale-100 opacity-60 group-active:scale-90'}`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] font-extrabold uppercase tracking-[0.1em] transition-all ${
                isActive ? 'opacity-100' : 'opacity-40'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-3 w-1 h-1 bg-accent rounded-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
