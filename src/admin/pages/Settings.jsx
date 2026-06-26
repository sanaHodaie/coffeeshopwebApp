/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import SuccessModal from '../components/Modals/SuccessModal';
import { Coffee, MapPin, Phone, MessageSquare, Clock, ShieldCheck, Mail } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  // اطلاعات کافه در تنظیمات
  const [cafeName, setCafeName] = useState('کافه دنج سنا (Sena Cafe)');
  const [address, setAddress] = useState('تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲');
  const [phone, setPhone] = useState('۰۲۱-۸۸۹۹۲۲۱۱');
  const [instagram, setInstagram] = useState('sena_cafe_test');
  const [email, setEmail] = useState('info@senacafe.com');
  const [workingHours, setWorkingHours] = useState('همه‌روزه از ساعت ۸:۰۰ صبح الی ۲۳:۰۰ شب');
  
  // لودینگ تستی ذخیره‌سازی
  const [isSaving, setIsSaving] = useState(false);
  
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // بررسی لود اولیه اطلاعات از localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('coffee_shop_config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setCafeName(parsed.cafeName || '');
      setAddress(parsed.address || '');
      setPhone(parsed.phone || '');
      setInstagram(parsed.instagram || '');
      setEmail(parsed.email || '');
      setWorkingHours(parsed.workingHours || '');
    }
  }, []);

  // هندلر کلیک بر روی ثبت نهایی تنظیمات
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const config = {
      cafeName,
      address,
      phone,
      instagram,
      email,
      workingHours
    };

    setTimeout(() => {
      localStorage.setItem('coffee_shop_config', JSON.stringify(config));
      setIsSaving(false);
      setSuccessModalOpen(true);
    }, 1200);
  };

  return (
    <div className="settings-page-container" id="settings-page">
      {/* هدر صفحه تنظیمات */}
      <div className="settings-page-header">
        <h1 className="text-2xl font-bold text-coffee-dark dark:text-coffee-cream">⚙️ تنظیمات عمومی کافه</h1>
        <p className="text-sm text-gray-500 mt-1">مدیریت اطلاعات ارتباطی، آدرس، تلفن‌ها و ساعات کاری کافه برای نمایش در منوی مشتریان</p>
      </div>

      <div className="settings-grid-layout" id="settings-form-grid">
        {/* سایدبار سمت راست: فرم تنظیمات اطلاعات کافه */}
        <div className="settings-form-panel glass-effect">
          <h3 className="settings-panel-title">📝 ویرایش مشخصات کافه</h3>
          
          <form onSubmit={handleSaveSettings} className="settings-form">
            <div className="settings-form-group">
              <label>
                <Coffee size={16} />
                <span>نام رسمی کافه منو:</span>
              </label>
              <input 
                type="text" 
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                placeholder="نام کافه را به فارسی وارد کنید..."
                required
              />
            </div>

            <div className="settings-form-group">
              <label>
                <MapPin size={16} />
                <span>آدرس فیزیکی کافه:</span>
              </label>
              <textarea 
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="آدرس دقیق شعبه به همراه کد پستی یا کروکی..."
                required
              />
            </div>

            <div className="settings-double-group">
              <div className="settings-form-group">
                <label>
                  <Phone size={16} />
                  <span>شماره تماس ثابت:</span>
                </label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: ۰۲۱۸۸۰۰۹۹"
                  required
                />
              </div>

              <div className="settings-form-group">
                <label>
                  <MessageSquare size={16} />
                  <span>آی‌دی اینستاگرام:</span>
                </label>
                <input 
                  type="text" 
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="بدون کاراکتر @ وارد کنید..."
                />
              </div>
            </div>

            <div className="settings-form-group">
              <label>
                <Mail size={16} />
                <span>پست الکترونیکی (ایمیل):</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@cafe.com"
              />
            </div>

            <div className="settings-form-group">
              <label>
                <Clock size={16} />
                <span>ساعات کاری کافه:</span>
              </label>
              <input 
                type="text" 
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="مثال: همه روزه از ساعت ۸:۰۰ الی ۲۳:۰۰"
                required
              />
            </div>

            <button 
              type="submit" 
              className="settings-save-btn"
              disabled={isSaving}
              id="save-settings-submit-btn"
            >
              {isSaving ? 'در حال ثبت تغییرات...' : '💾 ذخیره و انتشار مشخصات'}
            </button>
          </form>
        </div>

        {/* سایدبار سمت چپ: کارت‌های کمکی پنل کاربری */}
        <div className="settings-sidebar-panel">
          {/* کارت وضعیت سرور */}
          <div className="help-card glass-effect status-info" id="settings-status-card">
            <h4 className="help-card-title">🛡️ وضعیت اتصال سرور</h4>
            <ul className="status-checklist">
              <li className="status-item active">
                <ShieldCheck size={16} className="text-green-500" />
                <span>دیتابیس ابری: متصل و همگام‌سازی شده</span>
              </li>
              <li className="status-item active">
                <ShieldCheck size={16} className="text-green-500" />
                <span>سیستم پیامک اطلاع‌رسانی: فعال</span>
              </li>
              <li className="status-item active">
                <ShieldCheck size={16} className="text-green-500" />
                <span>درگاه پرداخت منوی دیجیتال: متصل</span>
              </li>
            </ul>
          </div>

          {/* کارت راهنما و پشتبانی */}
          <div className="help-card glass-effect" id="settings-help-card">
            <h4 className="help-card-title">💡 راهنمای مدیران سیستم</h4>
            <p className="help-card-desc">
              تغییرات اعمال شده در این بخش فوراً روی نسخه وب‌اپلیکیشن منوی آنلاین مشتریان (منوی دیجیتال روی میزها) ثبت و فعال خواهد شد.
            </p>
            <p className="help-card-desc mt-3">
              جهت تغییر لوگوی بالای منو یا بک‌گراند طرح گرافیکی، با پشتیبانی ستاپ فنی در ارتباط باشید.
            </p>
          </div>
        </div>
      </div>

      {/* مودال پیام موفقیت در ثبت اطلاعات */}
      <SuccessModal 
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="تغییرات ثبت شد"
        message="مشخصات و ساعات کاری کافه با موفقیت روی سرور ثبت و بر روی نسخه منوی مشتریان اعمال گردید."
      />
    </div>
  );
}
