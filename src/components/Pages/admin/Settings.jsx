import { useState } from 'react';

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
      <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-6">⚙️ تنظیمات</h1>

      <div className="bg-white rounded-2xl shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">نام کافه</label>
            <input
              type="text"
              name="cafeName"
              value={settings.cafeName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">تلفن</label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">آدرس</label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">ساعات کاری</label>
            <input
              type="text"
              name="hours"
              value={settings.hours}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2.5 rounded-xl font-bold shadow transition"
          >
            💾 ذخیره تنظیمات
          </button>
        </form>
      </div>
    </div>
  );
}