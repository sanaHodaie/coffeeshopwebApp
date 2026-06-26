/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {  useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import StatsCard from '../components/StatsCard';
import { useNavigate } from 'react-router-dom';
import { 
  Coffee as CoffeeIcon, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ChevronLeft,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import './Dashboard.css';

export default function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const navigate = useNavigate();

  // محاسبات آمار کلیدها
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  
  // سفارشات امروز
  const todayOrders = orders.filter(o => o.status !== 'canceled');
  const todayOrdersCount = todayOrders.length;
  
  // درآمد امروز (جمع مبالغ سفارشات تکمیل شده یا در حال آماده‌سازی)
  const todayRevenue = orders
    .filter(o => o.status === 'completed' || o.status === 'preparing')
    .reduce((sum, o) => sum + o.total, 0);

  // شبیه‌سازی کاربران ثبت شده
  const totalCustomers = 148;

  // اطلاعات نمودار ستونی فروش ماهانه (تومان)
  const monthlySalesData = [
    { name: 'فروردین', sales: 4200000 },
    { name: 'اردیبهشت', sales: 5800000 },
    { name: 'خرداد', sales: 7500000 },
    { name: 'تیر', sales: 9100000 },
    { name: 'مرداد', sales: 8600000 },
    { name: 'شهریور', sales: 11200000 },
  ];

  // اطلاعات نمودار دایره‌ای دسته‌بندی محصولات
  const categoriesCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoriesCount).map(cat => ({
    name: cat,
    value: categoriesCount[cat]
  }));

  const COLORS = ['#c68642', '#8b5a2b', '#5a3a1f', '#d97706', '#fbbf24'];

  // استایل رنگی برای وضعیت سفارش‌ها
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge status-completed">🟢 تکمیل شده</span>;
      case 'preparing':
        return <span className="status-badge status-preparing">🟡 در حال آماده‌سازی</span>;
      case 'pending':
        return <span className="status-badge status-pending">🔵 در انتظار بررسی</span>;
      case 'canceled':
        return <span className="status-badge status-canceled">🔴 لغو شده</span>;
      default:
        return null;
    }
  };

  // محصولات پرفروش (تست فرضی)
  const topSellingProducts = [
    { name: 'شیک لوتوس کاراملی', count: 42, percentage: 85 },
    { name: 'لاته آرت وانیل', count: 35, percentage: 70 },
    { name: 'اسپرسو دو شات تیره', count: 28, percentage: 55 },
    { name: 'کیک هویج و مغز گردو', count: 22, percentage: 44 },
  ];

  return (
    <div className="dashboard-page-container" id="dashboard-page">
      {/* ردیف اول: کارت‌های آمار ۴تایی */}
      <div className="stats-grid">
        <StatsCard 
          title="کل محصولات منو" 
          value={`${totalProducts} محصول`} 
          icon={<CoffeeIcon size={22} />}
          trend={{ value: `${activeProducts} فعال`, isPositive: true }}
          delay={0.1}
        />
        <StatsCard 
          title="سفارشات امروز" 
          value={`${todayOrdersCount} سفارش`} 
          icon={<ShoppingBag size={22} />}
          trend={{ value: '+۱۸٪ رشد', isPositive: true }}
          delay={0.2}
        />
        <StatsCard 
          title="درآمد امروز" 
          value={`${todayRevenue.toLocaleString('fa-IR')} تومان`} 
          icon={<DollarSign size={22} />}
          trend={{ value: '+۱۲.۵٪ نسبت به هفته پیش', isPositive: true }}
          delay={0.3}
        />
        <StatsCard 
          title="مشتریان باشگاه کافه" 
          value={`${totalCustomers} کاربر`} 
          icon={<Users size={22} />}
          trend={{ value: '+۴ کاربر جدید', isPositive: true }}
          delay={0.4}
        />
      </div>

      {/* ردیف دوم: نمودارهای آماری */}
      <div className="charts-grid">
        {/* نمودار ستونی فروش ماهانه */}
        <div className="chart-card glass-effect" id="monthly-sales-chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">📈 گزارش فروش ماهانه (تومان)</h3>
            <span className="chart-card-subtitle font-mono">سال ۱۴۰۵</span>
          </div>
          <div className="chart-container-inner" style={{ height: 260 }}>
            <ResponsiveContainer width="110%" height="100%">
              <BarChart data={monthlySalesData}>
                <XAxis dataKey="name" tick={{ fill: '#8b7364', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8b7364', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip 
                  formatter={(value) => [`${Number(value).toLocaleString('fa-IR')} تومان`, 'مبلغ فروش']}
                  contentStyle={{ background: '#2d1a11', borderRadius: '0.5rem', border: 'none', color: '#fff8ef' }}
                />
                <Bar dataKey="sales" fill="#c68642" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* نمودار دایره‌ای دسته‌بندی محصولات */}
        <div className="chart-card glass-effect" id="categories-chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">🍰 فراوانی دسته‌بندی‌ها</h3>
            <span className="chart-card-subtitle">سهم منو</span>
          </div>
          <div className="chart-container-inner" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} آیتم`, name]}
                  contentStyle={{ background: '#2d1a11', borderRadius: '0.5rem', border: 'none', color: '#fff8ef' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* لژند دستی برای خوانایی بهتر */}
            <div className="custom-pie-legend">
              {categoryChartData.map((entry, index) => (
                <div key={entry.name} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="legend-name text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ردیف سوم: سفارشات اخیر و محصولات برتر */}
      <div className="dashboard-widgets-grid">
        {/* سفارشات اخیر */}
        <div className="widget-card glass-effect" id="recent-orders-widget">
          <div className="widget-header">
            <h3 className="widget-title">📦 آخرین سفارشات دریافتی</h3>
            <button 
              className="view-all-link"
              onClick={() => navigate('/admin/orders')}
              id="view-all-orders-btn"
            >
              <span>مشاهده همه</span>
              <ChevronLeft size={16} />
            </button>
          </div>
          <div className="widget-table-wrapper">
            <table className="widget-table">
              <thead>
                <tr>
                  <th className="text-right">شناسه</th>
                  <th className="text-right">مشتری</th>
                  <th className="text-right">مبلغ کل</th>
                  <th className="text-right">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="widget-table-row">
                    <td className="font-mono font-bold text-coffee-dark dark:text-coffee-cream">#{order.id}</td>
                    <td>{order.customer}</td>
                    <td className="font-semibold">{order.total.toLocaleString('fa-IR')} تومان</td>
                    <td>{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* محصولات پرفروش */}
        <div className="widget-card glass-effect" id="top-products-widget">
          <div className="widget-header">
            <h3 className="widget-title">🔥 محبوب‌ترین آیتم‌های منو</h3>
            <Activity size={18} className="text-coffee-gold" />
          </div>
          <div className="top-products-list">
            {topSellingProducts.map((p, idx) => (
              <div key={idx} className="top-product-item">
                <div className="top-product-info">
                  <span className="product-rank font-bold">{idx + 1}</span>
                  <span className="product-name font-semibold">{p.name}</span>
                  <span className="product-sales-count text-xs">{p.count} سفارش</span>
                </div>
                {/* پروگرس بار کاستوم */}
                <div className="progress-bar-bg">
                  <motion.div 
                    className="progress-bar-fill" 
                    initial={{ width: 0 }}
                    animate={{ width: `${p.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
