/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '../../hooks/useOrders';
import DataTable from '../components/DataTable';
import SuccessModal from '../components/Modals/SuccessModal';
import { Calendar, Eye, Clock } from 'lucide-react';
import './Orders.css';

export default function Orders() {
  const { orders, updateOrderStatus } = useOrders();

  // فیلترها و مقادیر جستجو
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // کنترل مودال جزییات سفارش
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // مودال پیام موفقیت آمیز تغییر وضعیت
  const [successMsg, setSuccessMsg] = useState({
    isOpen: false,
    title: '',
    msg: ''
  });

  // فیلتر داده‌ها بر اساس تب فعال و عبارت جستجو
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.id.includes(searchTerm);
    const matchesTab = activeTab === 'all' || o.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // باز کردن جزئیات سفارش
  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
  };

  // بستن جزئیات سفارش
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  // ذخیره وضعیت تغییر یافته سفارش
  const handleStatusChange = (newStatus) => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, newStatus);
      
      // به روزرسانی لوکال اوردرِ منتخب برای همگام‌سازی لحظه‌ای در مودال باز
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });

      // نمایش موفقیت
      setSuccessMsg({
        isOpen: true,
        title: 'بروزرسانی موفقیت‌آمیز',
        msg: `وضعیت سفارش #${selectedOrder.id} با موفقیت به "${getStatusLabel(newStatus)}" تغییر یافت.`
      });
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'تکمیل شده';
      case 'preparing': return 'در حال آماده‌سازی';
      case 'pending': return 'در انتظار بررسی';
      case 'canceled': return 'لغو شده';
      default: return '';
    }
  };

  // استایل رنگی برای وضعیت سفارش‌ها در جدول
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge status-completed">🟢 تکمیل شده</span>;
      case 'preparing':
        return <span className="badge status-preparing">🟡 در حال آماده‌سازی</span>;
      case 'pending':
        return <span className="badge status-pending">🔵 در انتظار بررسی</span>;
      case 'canceled':
        return <span className="badge status-canceled">🔴 لغو شده</span>;
      default:
        return null;
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'شناسه سفارش',
      render: (row) => <span className="font-mono font-bold text-coffee-dark dark:text-coffee-cream">#{row.id}</span>
    },
    {
      key: 'customer',
      label: 'نام مشتری',
      render: (row) => <span className="font-semibold">{row.customer}</span>
    },
    {
      key: 'items',
      label: 'اقلام سفارش',
      render: (row) => (
        <span className="text-xs text-gray-500 block max-w-xs truncate">
          {row.items.map(item => `${item.name} (${item.quantity}x)`).join('، ')}
        </span>
      )
    },
    {
      key: 'total',
      label: 'مبلغ کل',
      render: (row) => <span className="font-bold text-coffee-dark dark:text-coffee-cream">{row.total.toLocaleString('fa-IR')} تومان</span>
    },
    {
      key: 'date',
      label: 'تاریخ و زمان',
      render: (row) => <span className="text-xs font-mono text-gray-500">{row.date}</span>
    },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => getStatusBadge(row.status)
    },
    {
      key: 'actions',
      label: 'عملیات',
      render: (row) => (
        <button 
          onClick={() => handleOpenDetails(row)}
          className="view-details-btn"
          title="مشاهده جزئیات سفارش"
          id={`view-order-btn-${row.id}`}
        >
          <Eye size={14} />
          <span>بررسی سفارش</span>
        </button>
      )
    }
  ];

  const tabButtons = [
    { id: 'all', label: '🗂️ همه سفارشات' },
    { id: 'pending', label: '🔵 در انتظار بررسی' },
    { id: 'preparing', label: '🟡 در حال آماده‌سازی' },
    { id: 'completed', label: '🟢 تکمیل شده' },
    { id: 'canceled', label: '🔴 لغو شده' },
  ];

  return (
    <div className="orders-page-container" id="orders-page">
      <div className="orders-page-header">
        <h1 className="text-2xl font-bold text-coffee-dark dark:text-coffee-cream">📦 مدیریت سفارشات</h1>
        <p className="text-sm text-gray-500 mt-1">تغییر وضعیت سفارشات ارسالی، بررسی اقلام و ثبت مغایرت‌ها</p>
      </div>

      {/* تب‌های جابجایی وضعیت‌ها */}
      <div className="orders-tabs" id="orders-tabs-nav">
        {tabButtons.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            id={`tab-btn-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* جدول فیلتر شده سفارشات */}
      <div className="orders-table-wrapper">
        <DataTable 
          columns={columns}
          data={filteredOrders}
          searchPlaceholder="جستجوی سفارش با شناسه یا نام مشتری..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          id="orders-list-table"
        />
      </div>

      {/* مودال فاکتور جزئیات سفارش */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="invoice-modal-overlay" onClick={handleCloseDetails} id="invoice-modal-overlay">
            <motion.div 
              className="invoice-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              id="invoice-modal-content"
            >
              <div className="invoice-header" id="invoice-header">
                <div>
                  <h3 className="text-lg font-bold text-coffee-dark dark:text-coffee-cream">🧾 فاکتور سفارش #{selectedOrder.id}</h3>
                  <p className="text-xs text-gray-500 mt-1">نام مشتری: {selectedOrder.customer}</p>
                </div>
                <button className="close-invoice-btn" onClick={handleCloseDetails} id="close-invoice-btn">✕</button>
              </div>

              <div className="invoice-body" id="invoice-body">
                {/* بخش زمان‌بندی و وضعیت فعلی */}
                <div className="invoice-meta-grid">
                  <div className="meta-item">
                    <Calendar size={15} />
                    <span>تاریخ: {selectedOrder.date}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={15} />
                    <span>وضعیت فعلی:</span>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>

                {/* لیست اقلام فاکتور */}
                <div className="invoice-items-section">
                  <h4 className="section-subtitle">🛒 اقلام سفارش داده شده:</h4>
                  <div className="invoice-items-table">
                    <div className="invoice-table-header">
                      <span>نام آیتم</span>
                      <span className="text-center">تعداد</span>
                      <span className="text-left">قیمت واحد</span>
                      <span className="text-left">جمع کل</span>
                    </div>
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="invoice-table-row">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-center font-mono">{item.quantity}x</span>
                        <span className="text-left font-mono">{item.price.toLocaleString('fa-IR')}</span>
                        <span className="text-left font-mono font-bold">{(item.price * item.quantity).toLocaleString('fa-IR')} تومان</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* جمع کل نهایی */}
                <div className="invoice-total-summary">
                  <span>مبلغ قابل پرداخت فاکتور:</span>
                  <span className="total-amount font-bold text-coffee-dark dark:text-coffee-cream">{selectedOrder.total.toLocaleString('fa-IR')} تومان</span>
                </div>

                {/* تغییر وضعیت سفارش */}
                <div className="invoice-status-control">
                  <h4 className="section-subtitle">⚙️ تغییر فاز سفارش به:</h4>
                  <div className="status-selector-grid">
                    <button 
                      onClick={() => handleStatusChange('preparing')}
                      className={`status-select-btn preparing ${selectedOrder.status === 'preparing' ? 'active' : ''}`}
                      id="status-select-preparing-btn"
                    >
                      🟡 در حال آماده‌سازی
                    </button>
                    <button 
                      onClick={() => handleStatusChange('completed')}
                      className={`status-select-btn completed ${selectedOrder.status === 'completed' ? 'active' : ''}`}
                      id="status-select-completed-btn"
                    >
                      🟢 آماده و تحویل شده
                    </button>
                    <button 
                      onClick={() => handleStatusChange('canceled')}
                      className={`status-select-btn canceled ${selectedOrder.status === 'canceled' ? 'active' : ''}`}
                      id="status-select-canceled-btn"
                    >
                      🔴 لغو سفارش
                    </button>
                  </div>
                </div>
              </div>

              <div className="invoice-footer">
                <button className="got-it-btn" onClick={handleCloseDetails}>بستن فاکتور</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* مودال موفقیت کاربری */}
      <SuccessModal 
        isOpen={successMsg.isOpen}
        onClose={() => setSuccessMsg(prev => ({ ...prev, isOpen: false }))}
        title={successMsg.title}
        message={successMsg.msg}
      />
    </div>
  );
}
