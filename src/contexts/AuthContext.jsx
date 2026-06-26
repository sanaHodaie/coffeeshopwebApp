/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const activityTimeoutRef = useRef(null);

  // بررسی وضعیت احراز هویت اولیه و حالت تاریک از localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('coffee_admin_user');
    const storedAuth = localStorage.getItem('coffee_admin_auth');
    const storedTheme = localStorage.getItem('coffee_admin_theme');

    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark-mode');
    }
  }, []);

  // مدیریت خروج خودکار پس از ۳۰ دقیقه غیرفعال بودن
  const resetActivityTimer = () => {
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }

    if (isAuthenticated) {
      // ۳۰ دقیقه = ۱۸۰۰۰۰۰ میلی‌ثانیه
      activityTimeoutRef.current = setTimeout(() => {
        logout();
        setErrorMsg('شما به دلیل عدم فعالیت به مدت ۳۰ دقیقه، به صورت خودکار خارج شدید.');
      }, 30 * 60 * 1000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // ثبت رویدادهای کاربر برای تشخیص فعالیت
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      const handleActivity = () => resetActivityTimer();

      events.forEach(event => {
        window.addEventListener(event, handleActivity);
      });

      resetActivityTimer(); // شروع تایمر اول

      return () => {
        if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
        events.forEach(event => {
          window.removeEventListener(event, handleActivity);
        });
      };
    } else {
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    }
  }, [isAuthenticated]);

  // متد ورود کاربر به سیستم
  const login = async (email, password) => {
    // شبیه‌سازی کوتاه برای زیبایی لودینگ در پنل مدیریت
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.trim().toLowerCase() === 'admin@cafe.com' && password === 'admin123') {
          const mockUser = {
            email: 'admin@cafe.com',
            name: 'مدیریت کافه (سنا)',
            role: 'مدیر کل'
          };
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('coffee_admin_user', JSON.stringify(mockUser));
          localStorage.setItem('coffee_admin_auth', 'true');
          setErrorMsg(null);
          resolve(true);
        } else {
          setErrorMsg('ایمیل یا رمز عبور وارد شده اشتباه است.');
          resolve(false);
        }
      }, 1000);
    });
  };

  // متد خروج کاربر از سیستم
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('coffee_admin_user');
    localStorage.removeItem('coffee_admin_auth');
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
  };

  // تغییر حالت تاریک و روشن به صورت سراسری
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const nextMode = !prev;
      if (nextMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('coffee_admin_theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('coffee_admin_theme', 'light');
      }
      return nextMode;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isDarkMode,
      login,
      logout,
      toggleDarkMode,
      errorMsg,
      setErrorMsg
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
