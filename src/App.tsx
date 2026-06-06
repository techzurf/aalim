import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SplashScreen } from './views/SplashScreen';
import { OnboardingScreen } from './views/OnboardingScreen';
import { LoginScreen } from './views/LoginScreen';
import { HomeScreen } from './views/HomeScreen';
import { JobsScreen } from './views/JobsScreen';
import { ProfilesScreen } from './views/ProfilesScreen';
import { NotificationsScreen } from './views/NotificationsScreen';
import { AccountScreen } from './views/AccountScreen';
import { AdminPortal } from './views/admin/AdminPortal';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // State from localStorage to preserve across page reloads
  const [role, setRole] = useState<'job_seeker' | 'masjid' | null>(() => {
    return localStorage.getItem('noor_user_role') as any;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('noor_is_logged_in') === 'true';
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('noor_admin_active') === 'true';
  });

  // Intercept exact /admin path
  useEffect(() => {
    if (location.pathname === '/admin') {
      setIsAdminMode(true);
      localStorage.setItem('noor_admin_active', 'true');
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  const [userInfo, setUserInfo] = useState<{ name: string; email: string; city: string } | null>(() => {
    const saved = localStorage.getItem('noor_user_info');
    return saved ? JSON.parse(saved) : null;
  });

  const handleSelectRole = (selectedRole: 'job_seeker' | 'masjid') => {
    setRole(selectedRole);
    localStorage.setItem('noor_user_role', selectedRole);
  };

  const handleBackToOnboarding = () => {
    setRole(null);
    localStorage.removeItem('noor_user_role');
  };

  const handleLoginComplete = (userData: { name: string; email: string; city: string }) => {
    setUserInfo(userData);
    setIsLoggedIn(true);
    localStorage.setItem('noor_user_info', JSON.stringify(userData));
    localStorage.setItem('noor_is_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setUserInfo(null);
    localStorage.removeItem('noor_is_logged_in');
    localStorage.removeItem('noor_user_role');
    localStorage.removeItem('noor_user_info');
  };

  // Provide high custom support to all children views by setting global attributes
  useEffect(() => {
    // Expose a quick hook/global context or window variables so children views can consume
    (window as any).__noor_logout = handleLogout;
    (window as any).__noor_role = role;
    (window as any).__noor_user = userInfo;
    
    // Register global controller for toggling into administration platform
    (window as any).__noor_toggle_admin = (val: boolean) => {
      setIsAdminMode(val);
      if (val) {
        localStorage.setItem('noor_admin_active', 'true');
      } else {
        localStorage.removeItem('noor_admin_active');
      }
    };
  }, [role, userInfo]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Active Admin Mode console
  if (isAdminMode) {
    return (
      <AdminPortal 
        onExit={() => {
          setIsAdminMode(false);
          localStorage.removeItem('noor_admin_active');
        }} 
      />
    );
  }

  // Not logged in -> Show onboarding flows
  if (!isLoggedIn) {
    if (!role) {
      return <OnboardingScreen onSelectRole={handleSelectRole} />;
    }
    return (
      <LoginScreen 
        role={role} 
        onBack={handleBackToOnboarding} 
        onLoginComplete={handleLoginComplete} 
      />
    );
  }

  // Logged in -> Standard app routes
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/jobs" element={<JobsScreen />} />
      <Route path="/profiles" element={<ProfilesScreen />} />
      <Route path="/notifications" element={<NotificationsScreen />} />
      <Route path="/account" element={<AccountScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
