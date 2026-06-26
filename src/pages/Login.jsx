/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Sun, Moon, Coffee } from 'lucide-react';
import SuccessModal from '../admin/components/Modals/SuccessModal';
import "./Login.css";

export default function Login() {
  const { login, isDarkMode, toggleDarkMode, errorMsg, setErrorMsg } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('لطفاً تمامی فیلدها را پر کنید.');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      navigate('/admin');
    }
  };
  

  // دانه‌های متحرک قهوه برای شبیه‌سازی سه بعدی و پارالاکس
  const floatingBeans = [
    { id: 1, text: '☕', size: '2.5rem', x: '10%', y: '15%', duration: 12, delay: 0 },
    { id: 2, text: '🍂', size: '1.8rem', x: '85%', y: '20%', duration: 15, delay: 1 },
    { id: 3, text: '☕', size: '2rem', x: '75%', y: '75%', duration: 14, delay: 2 },
    { id: 4, text: '🍂', size: '1.5rem', x: '15%', y: '80%', duration: 18, delay: 0.5 },
    { id: 5, text: '☕', size: '1.7rem', x: '45%', y: '85%', duration: 16, delay: 3 },
  ];

      useEffect(() => {
      document.title = 'Admin Panel Cafe - Login';
    }, []);

  return (
    <div className="login-page-container" id="login-page">
      {/* سوییچر تم در بالای صفحه */}
      <button 
        className="theme-toggle-btn glass-effect" 
        onClick={toggleDarkMode}
        title="تغییر تم صفحه"
        id="login-theme-toggle"
      >
        {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-coffee-dark" />}
      </button>

      {/* دانه‌های شناور پس‌زمینه */}
      <div className="floating-elements-container">
        {floatingBeans.map((bean) => (
          <motion.div
            key={bean.id}
            className="floating-bean"
            style={{ 
               left: bean.x, 
               top: bean.y, 
               fontSize: bean.size,
               position: 'absolute',
               userSelect: 'none',
               pointerEvents: 'none'
            }}
            animate={{
              y: [0, -25, 25, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: bean.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bean.delay
            }}
          >
            {bean.text}
          </motion.div>
        ))}
      </div>

      {/* کارت شیشه‌ای لاگین */}
      <motion.div 
        className="login-card glass-effect"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        id="login-card-wrapper"
      >
        <div className="login-card-header">
          <div className="logo-badge neon-glow">
            <Coffee size={36} />
          </div>
          <h1 className="login-title">پنل مدیریت کافه</h1>
          <p className="login-subtitle">خوش آمدید! برای ورود اطلاعات خود را وارد کنید.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">آدرس ایمیل</label>
            <div className="input-field-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cafe.com"
                className="login-input"
                id="login-email-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">رمز عبور</label>
            <div className="input-field-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="login-input"
                id="login-password-input"
              />
              <button 
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                id="login-password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={isLoading}
            id="login-submit-btn"
          >
            {isLoading ? (
              <span className="loading-spinner" />
            ) : (
              'ورود به پنل مدیریت'
            )}
          </button>
        </form>

        <div className="login-card-footer">
          <p className="credentials-hint">💡 ایمیل تستی: <code className="select-all">admin@cafe.com</code> | رمز: <code className="select-all">admin123</code></p>
        </div>
      </motion.div>

      {/* نمایش خطاها به صورت مودال شیک و زیبا (به جای آلرت استاندارد) */}
      <SuccessModal 
        isOpen={errorMsg !== null}
        onClose={() => setErrorMsg(null)}
        title="خطا در ورود به پنل"
        message={errorMsg || ''}
        type="error"
      />
    </div>
  );
}
