/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

const INITIAL_ORDERS = [
  {
    id: '1025',
    customer: 'سارا احمدی',
    items: [
      { id: 2, name: 'لاته آرت وانیل', price: 78000, quantity: 2 },
      { id: 6, name: 'کیک هویج و مغز گردو', price: 72000, quantity: 1 }
    ],
    total: 228000,
    date: '۱۴۰۵/۰۴/۰۴ - ۱۲:۳۰',
    status: 'completed'
  },
  {
    id: '1024',
    customer: 'علی رضا رضایی',
    items: [
      { id: 5, name: 'شیک لوتوس کاراملی', price: 98000, quantity: 1 },
      { id: 7, name: 'کروسان شکلاتی پاریسی', price: 54000, quantity: 1 }
    ],
    total: 152000,
    date: '۱۴۰۵/۰۴/۰۴ - ۱۱:۱۵',
    status: 'preparing'
  },
  {
    id: '1023',
    customer: 'مریم قاسمی',
    items: [
      { id: 3, name: 'کاپوچینو دارچین', price: 82000, quantity: 1 }
    ],
    total: 82000,
    date: '۱۴۰۵/۰۴/۰۴ - ۱۰:۴۵',
    status: 'pending'
  },
  {
    id: '1022',
    customer: 'پوریا محمدی',
    items: [
      { id: 1, name: 'اسپرسو دو شات تیره', price: 55000, quantity: 2 },
      { id: 7, name: 'کروسان شکلاتی پاریسی', price: 54000, quantity: 2 }
    ],
    total: 218000,
    date: '۱۴۰۵/۰۴/۰۳ - ۱۹:۲۰',
    status: 'completed'
  },
  {
    id: '1021',
    customer: 'یاسمن حسینی',
    items: [
      { id: 4, name: 'آفوگاتو پسته', price: 85000, quantity: 1 }
    ],
    total: 85000,
    date: '۱۴۰۵/۰۴/۰۳ - ۱۷:۰۵',
    status: 'canceled'
  },
  {
    id: '1020',
    customer: 'امیر قاسمی',
    items: [
      { id: 8, name: 'کلاب ساندویچ مرغ و پستو', price: 110000, quantity: 1 },
      { id: 5, name: 'شیک لوتوس کاراملی', price: 98000, quantity: 1 }
    ],
    total: 208000,
    date: '۱۴۰۵/۰۴/۰۲ - ۱۵:۱۰',
    status: 'completed'
  }
];

export function useOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('coffee_shop_orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(INITIAL_ORDERS);
      localStorage.setItem('coffee_shop_orders', JSON.stringify(INITIAL_ORDERS));
    }
  }, []);

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('coffee_shop_orders', JSON.stringify(newOrders));
  };

  const updateOrderStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    saveOrders(updated);
  };

  const addOrder = (customer, items) => {
    const newId = (orders.length > 0 ? Math.max(...orders.map(o => Number(o.id))) + 1 : 1000).toString();
    const total = items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} - ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newOrder = {
      id: newId,
      customer,
      items,
      total,
      date: dateStr,
      status: 'pending'
    };

    const updated = [newOrder, ...orders];
    saveOrders(updated);
  };

  return {
    orders,
    updateOrderStatus,
    addOrder
  };
}
