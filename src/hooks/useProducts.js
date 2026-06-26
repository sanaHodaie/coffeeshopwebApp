/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState([]);

  // بارگذاری اولیه
  useEffect(() => {
    const stored = localStorage.getItem('coffee_shop_products');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProducts(parsed);
      } catch (e) {
        setProducts(initialProducts);
        localStorage.setItem('coffee_shop_products', JSON.stringify(initialProducts));
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('coffee_shop_products', JSON.stringify(initialProducts));
    }
  }, []);

  const saveProducts = (newProducts) => {
    setProducts([...newProducts]); // ← کپی جدید
    localStorage.setItem('coffee_shop_products', JSON.stringify(newProducts));
    
    // ارسال رویداد برای همون تب
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'coffee_shop_products',
      newValue: JSON.stringify(newProducts)
    }));
  };

  const addProduct = (p) => {
    const newId = products.length > 0 ? Math.max(...products.map(x => x.id)) + 1 : 1;
    const newProduct = { ...p, id: newId };
    const updated = [newProduct, ...products];
    saveProducts(updated);
  };

  const updateProduct = (updatedProd) => {
    const updated = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    saveProducts(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
  };

  const toggleProductStatus = (id) => {
    console.log('🔄 toggleProductStatus called for id:', id); // ← برای دیباگ
    
    const updated = products.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'active' ? 'inactive' : 'active';
        console.log(`🔄 ${p.name}: ${p.status} → ${newStatus}`); // ← برای دیباگ
        return { ...p, status: newStatus };
      }
      return p;
    });
    
    console.log('📦 updated products:', updated); // ← برای دیباگ
    saveProducts(updated);
  };

  return {
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus
  };
}