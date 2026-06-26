/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { Sun, Moon, Calendar, Clock, Bell, Menu } from 'lucide-react';
import './AdminLayout.css';

export default function AdminLayout() {
  const { isDarkMode, toggleDarkMode } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case '/admin':
          return 'Admin Panel Cafe - Dashboard';
        case '/admin/products':
          return 'Admin Panel Cafe - Products';
        case '/admin/orders':
          return 'Admin Panel Cafe - Orders';
        case '/admin/settings':
          return 'Admin Panel Cafe - Settings';
        default:
          return 'Admin Panel Cafe';
      }
    };
    document.title = getPageTitle();
  }, [location.pathname]);
  // مانیتور کردن سایز صفحه نمایش جهت ریسپانسیو سایدبار
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const isCollapsed = isTablet;

  // تاگل کردن سایدبار موبایل
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // آپدیت ساعت زنده در هدر پنل
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(now.toLocaleTimeString('fa-IR', options));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // بدست آوردن عنوان صفحه بر اساس مسیر فعلی
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'داشبورد مدیریت';
      case '/admin/products':
        return 'مدیریت محصولات';
      case '/admin/orders':
        return 'مدیریت سفارشات';
      case '/admin/settings':
        return 'تنظیمات کافه';
      default:
        return 'پنل مدیریت کافه';
    }
  };

  // تاریخ امروز به شمسی یا فارسی ساده
  const todayPersianDate = new Date().toLocaleDateString('fa-IR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="admin-layout-container" id="admin-layout">
      <div className={`main-content-wrapper ${isMobile ? '' : (isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded')}`} id="main-content">

      {/* سایدبار ناوبری (محل قرارگیری: فیزیکی چپ) */}
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} isCollapsed={isCollapsed} />

      {/* محتوای اصلی پنل (محل قرارگیری: راست سایدبار) */}
      
        
        {/* هدر بالایی پنل مدیریت (مدیریت فیزیکی چپ به راست) */}
        <header className="admin-header glass-effect" id="admin-header">
          {/* بخش چپ هدر (شامل دکمه همبرگری و عنوان صفحه) */}

          <div className="header-physical-right" id="header-physical-right">
            {isMobile && (
              <button 
                className="hamburger-btn" 
                onClick={handleToggleSidebar}
                id="header-hamburger-btn"
                aria-label="منو"
              >
                <Menu size={24} />
              </button>
            )}
            {/* تقویم و زمان زنده - در حالت موبایل پنهان است */}
            {!isMobile && (
              <div className="header-widget datetime-widget">
                <Clock size={16} className="text-coffee-gold neon-glow" />
                <span className="time-text font-mono">{currentTime}</span>
                <span className="divider">|</span>
                <Calendar size={16} className="text-coffee-gold" />
                <span className="date-text">{todayPersianDate}</span>
              </div>
            )}

            {/* کلید تغییر تم */}
            <button 
              className="header-action-btn" 
              onClick={toggleDarkMode}
              title={isDarkMode ? 'حالت روز' : 'حالت شب'}
              id="header-theme-toggle"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            {/* دکمه نوتیفیکیشن */}
            <button className="header-action-btn relative" title="اعلان‌ها" id="header-notifications">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>
          </div>




          <div className="header-physical-left" id="header-physical-left">
            
            <h2 className="header-page-title text-xl font-bold text-coffee-dark dark:text-coffee-cream ">
              {getPageTitle()}
            </h2>
          </div>

          {/* بخش راست هدر (شامل آیکون‌ها، تغییر تم، نوتیفیکیشن) */}

        </header>

        {/* بخش رندر محتوای صفحات پنل با انیمیشن ورود نرم */}
        <main className="admin-page-content" id="admin-page-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}