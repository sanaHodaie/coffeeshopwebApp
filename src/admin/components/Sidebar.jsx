/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Coffee, 
  ShoppingBag, 
  Settings as SettingsIcon, 
  LogOut, 
  X
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ isOpen, onToggle, isCollapsed }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', label: 'داشبورد', icon: LayoutDashboard },
    { path: '/admin/products', label: 'مدیریت محصولات', icon: Coffee },
    { path: '/admin/orders', label: 'سفارشات', icon: ShoppingBag },
    { path: '/admin/settings', label: 'تنظیمات کافه', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <>
      {/* اوورلی بک‌دراپ برای موبایل */}
      {isOpen && (
        <div 
          className="sidebar-overlay md:hidden" 
          onClick={onToggle}
          id="sidebar-overlay"
        />
      )}

      {/* سایدبار اصلی */}
      <aside 
        className={`sidebar-container ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        id="sidebar-container"
      >
        <div className="sidebar-header" id="sidebar-header">
          <div className="logo-section">
            <motion.span 
              className="logo-icon text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              ☕
            </motion.span>
            {!isCollapsed && (
              <span className="logo-text font-bold text-lg text-coffee-dark dark:text-coffee-cream">کافه منو</span>
            )}
          </div>

          <button className="close-sidebar-btn md:hidden" onClick={onToggle} id="close-sidebar-btn">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav" id="sidebar-navigation">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 768) {
                    onToggle(); // بستن سایدبار در حالت موبایل بعد از کلیک
                  }
                }}
                className={`sidebar-link-btn ${isActive ? 'active' : ''}`}
                id={`sidebar-link-${item.path.replace('/', '')}`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="link-content">
                  <IconComponent size={20} className="link-icon neon-glow" />
                  {!isCollapsed && <span className="link-label">{item.label}</span>}
                </div>
                {isActive && !isCollapsed && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="sidebar-active"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* بخش انتهایی: پروفایل کاربر و خروج */}
        <div className="sidebar-footer" id="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name ? user.name[0] : '👤'}
            </div>
            {!isCollapsed && (
              <div className="user-details">
                {/* <span className="user-name">{user?.name || 'مدیر کافه'}</span> */}
                <span className="user-role">{user?.role || 'مدیر'}</span>
              </div>
            )}
          </div>

          <button 
            className="logout-btn" 
            onClick={handleLogout}
            title="خروج از سیستم"
            id="sidebar-logout-btn"
          >
            <LogOut size={18} />
            {!isCollapsed && <span className="logout-text">خروج از سیستم</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
