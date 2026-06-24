import { useState, useEffect } from 'react';
import { products } from '../../data/products';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // شبیه‌سازی دریافت آمار
    setStats({
      totalProducts: products.length,
      totalOrders: 34,
      totalUsers: 12,
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800">📊 داشبورد</h1>
        <span className="text-sm text-stone-500 bg-white px-4 py-2 rounded-xl shadow">
          امروز {new Date().toLocaleDateString('fa-IR')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow border border-stone-100 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-amber-700">{stats.totalProducts}</div>
            <div className="text-3xl">☕</div>
          </div>
          <div className="text-stone-600 mt-1">محصولات فعال</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-stone-100 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-amber-700">{stats.totalOrders}</div>
            <div className="text-3xl">📦</div>
          </div>
          <div className="text-stone-600 mt-1">سفارشات امروز</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-stone-100 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-amber-700">{stats.totalUsers}</div>
            <div className="text-3xl">👥</div>
          </div>
          <div className="text-stone-600 mt-1">کاربران</div>
        </div>
      </div>

      {/* فعالیت‌های اخیر */}
      <div className="mt-8 bg-white rounded-2xl shadow border border-stone-100 p-6">
        <h2 className="text-lg font-bold text-amber-800 mb-4">🕐 فعالیت‌های اخیر</h2>
        <div className="space-y-3 text-stone-600">
          <div className="flex justify-between items-center border-b border-stone-50 pb-2">
            <span>سفارش جدید #۱۲۳۴</span>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">تکمیل شد</span>
          </div>
          <div className="flex justify-between items-center border-b border-stone-50 pb-2">
            <span>محصول جدید: لاته وانیلی</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">اضافه شد</span>
          </div>
          <div className="flex justify-between items-center">
            <span>کاربر جدید: احمد رضایی</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">ثبت‌نام</span>
          </div>
        </div>
      </div>
    </div>
  );
}