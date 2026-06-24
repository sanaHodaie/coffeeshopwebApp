
import { useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    cafeName: 'کافه قهوه',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    hours: '۹ صبح تا ۱۲ شب',
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تنظیمات با موفقیت ذخیره شد!');
  };

  return (
    <div>
      <h1 className="settings-title">⚙️ تنظیمات</h1>
      <div className="settings-divider"></div>

      <div className="settings-card">
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label className="form-label">نام کافه</label>
            <input
              type="text"
              name="cafeName"
              value={settings.cafeName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">تلفن</label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">آدرس</label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">ساعات کاری</label>
            <input
              type="text"
              name="hours"
              value={settings.hours}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="save-btn-wrap">
            <button type="submit" className="save-btn">💾 ذخیره تنظیمات</button>
          </div>
        </form>
      </div>
    </div>
  );
}