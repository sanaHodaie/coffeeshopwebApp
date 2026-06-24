import { useState } from 'react';

const initialOrders = [
  { id: 1234, customer: 'احمد رضایی', items: 'اسپرسو, کروسان', total: '۱۲۵,۰۰۰', status: 'تکمیل شده' },
  { id: 1235, customer: 'سارا محمدی', items: 'لاته ماکیاتو', total: '۵۵,۰۰۰', status: 'در حال آماده‌سازی' },
  { id: 1236, customer: 'علی نوری', items: 'موکا, چیزکیک', total: '۱۰۳,۰۰۰', status: 'در انتظار' },
];

const statusColors = {
  'تکمیل شده': 'bg-green-100 text-green-700',
  'در حال آماده‌سازی': 'bg-amber-100 text-amber-700',
  'در انتظار': 'bg-blue-100 text-blue-700',
};

export default function Orders() {
  const [orders] = useState(initialOrders);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800">📦 مدیریت سفارشات</h1>
        <span className="bg-white px-4 py-2 rounded-xl shadow text-sm text-stone-600">
          {orders.length} سفارش
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-amber-50 border-b border-stone-200">
            <tr>
              <th className="p-4 text-right text-sm font-semibold text-amber-800">#</th>
              <th className="p-4 text-right text-sm font-semibold text-amber-800">مشتری</th>
              <th className="p-4 text-right text-sm font-semibold text-amber-800">محصولات</th>
              <th className="p-4 text-right text-sm font-semibold text-amber-800">مجموع</th>
              <th className="p-4 text-center text-sm font-semibold text-amber-800">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-stone-100 hover:bg-stone-50 transition">
                <td className="p-4 font-mono text-sm">#{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 text-sm text-stone-600">{order.items}</td>
                <td className="p-4 text-amber-700 font-bold">{order.total} تومان</td>
                <td className="p-4 text-center">
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-stone-100 text-stone-600'}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}