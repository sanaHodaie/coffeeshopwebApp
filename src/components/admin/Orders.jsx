
import { useState } from 'react';
import './Orders.css';

const initialOrders = [
  { id: 1234, customer: 'احمد رضایی', items: 'اسپرسو, کروسان', total: '۱۲۵,۰۰۰', status: 'تکمیل شده' },
  { id: 1235, customer: 'سارا محمدی', items: 'لاته ماکیاتو', total: '۵۵,۰۰۰', status: 'در حال آماده‌سازی' },
  { id: 1236, customer: 'علی نوری', items: 'موکا, چیزکیک', total: '۱۰۳,۰۰۰', status: 'در انتظار' },
];

export default function Orders() {
  const [orders] = useState(initialOrders);

  return (
    <div>
      <div className="orders-header">
        <h1 className="orders-title">📦 مدیریت سفارشات</h1>
        <span className="orders-badge">{orders.length} سفارش</span>
      </div>
      <div className="orders-divider"></div>

      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>مشتری</th>
              <th>محصولات</th>
              <th>مجموع</th>
              <th className="text-center">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">#{order.id}</td>
                <td className="order-customer">{order.customer}</td>
                <td className="order-items">{order.items}</td>
                <td className="order-total">{order.total} تومان</td>
                <td className="text-center">
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
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

function getStatusClass(status) {
  const map = {
    'تکمیل شده': 'status-completed',
    'در حال آماده‌سازی': 'status-preparing',
    'در انتظار': 'status-pending',
  };
  return map[status] || 'status-default';
}