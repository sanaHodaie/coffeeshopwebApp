/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import DataTable from '../components/DataTable';
import AddProductModal from '../components/Modals/AddProductModal';
import ConfirmModal from '../components/Modals/ConfirmModal';
import SuccessModal from '../components/Modals/SuccessModal';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import './Products.css';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStatus } = useProducts();

  // تابع کمکی برای تبدیل category به categoryName
  const getCategoryName = (category) => {
    const categoryMap = {
      'hot': 'نوشیدنی گرم',
      'cold': 'نوشیدنی سرد',
      'dessert': 'کیک و دسر',
      'specialty': 'قهوه تخصصی',
      'snack': 'میان وعده'
    };
    return categoryMap[category] || category;
  };

  // وضعیت‌های سرچ و فیلتر
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('همه');

  // وضعیت‌های مربوط به مودال‌ها
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [successModalData, setSuccessModalData] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  // فیلتر کردن و جستجوی محصولات
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'همه' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // هندلر کلیک بر روی دکمه افزودن محصول جدید
  const handleAddNewClick = () => {
    setEditingProduct(null);
    setIsAddOpen(true);
  };

  // هندلر کلیک بر روی دکمه ویرایش محصول
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsAddOpen(true);
  };

  // هندلر کلیک بر روی دکمه حذف
  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setIsDeleteOpen(true);
  };

  // تایید نهایی حذف محصول
  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setSuccessModalData({
        isOpen: true,
        title: 'حذف موفقیت‌آمیز',
        message: 'محصول مورد نظر با موفقیت از سیستم منو حذف گردید.',
        type: 'success'
      });
      setProductToDelete(null);
    }
  };

  // ذخیره اطلاعات (افزودن یا ویرایش)
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // ویرایش محصول - categoryName رو هم به‌روز کن
      const updatedProduct = {
        ...editingProduct,
        ...productData,
        categoryName: getCategoryName(productData.category) || productData.categoryName
      };
      updateProduct(updatedProduct);
      setSuccessModalData({
        isOpen: true,
        title: 'ویرایش موفقیت‌آمیز',
        message: 'تغییرات با موفقیت روی محصول منو اعمال و ثبت گردید.',
        type: 'success'
      });
    } else {
      // افزودن محصول جدید
      const newProduct = {
        ...productData,
        categoryName: getCategoryName(productData.category) || productData.categoryName
      };
      addProduct(newProduct);
      setSuccessModalData({
        isOpen: true,
        title: 'افزودن موفقیت‌آمیز',
        message: 'محصول قهوه جدید با موفقیت به منوی دیجیتال اضافه شد.',
        type: 'success'
      });
    }
  };

  // تعریف ستون‌های جدول مدیریت محصولات کافه
  const columns = [
    {
      key: 'id',
      label: 'کد',
      render: (row) => <span className="font-mono text-xs text-gray-500 font-bold">{row.id}</span>
    },
    {
      key: 'image',
      label: 'تصویر',
      render: (row) => (
        <img 
          src={row.image} 
          alt={row.name} 
          className="product-thumbnail-img shadow-sm hover:scale-105 transition-all duration-300"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      key: 'name',
      label: 'نام محصول',
      render: (row) => (
        <div className="product-info-cell">
          <span className="product-cell-name font-bold">{row.name}</span>
          <span className="product-cell-desc text-xs text-gray-500 block truncate max-w-xs">{row.description}</span>
        </div>
      )
    },
    {
      key: 'category',
      label: 'دسته‌بندی',
      render: (row) => <span className="category-badge-chip">{row.category}</span>
    },
    {
      key: 'price',
      label: 'قیمت',
      render: (row) => <span className="font-semibold font-mono text-coffee-dark dark:text-coffee-cream">{row.price.toLocaleString('fa-IR')} تومان</span>
    },
    {
      key: 'ingredients',
      label: 'ترکیبات اصلی',
      render: (row) => <span className="ingredients-text-span text-xs block max-w-xs truncate" title={row.ingredients}>{row.ingredients}</span>
    },
    {
      key: 'status',
      label: 'وضعیت نمایش',
      render: (row) => (
        <button 
          onClick={() => toggleProductStatus(row.id)}
          className={`status-btn-pill ${row.status === 'active' ? 'active' : 'inactive'}`}
          title={row.status === 'active' ? 'پنهان کردن از منو' : 'فعال کردن در منو'}
          id={`toggle-status-btn-${row.id}`}
        >
          {row.status === 'active' ? (
            <>
              <Eye size={14} />
              <span>نمایش در سایت</span>
            </>
          ) : (
            <>
              <EyeOff size={14} />
              <span>عدم نمایش</span>
            </>
          )}
        </button>
      )
    },
    {
      key: 'actions',
      label: 'عملیات',
      render: (row) => (
        <div className="action-button-group">
          <button 
            className="action-icon-btn edit-btn" 
            onClick={() => handleEditClick(row)}
            title="ویرایش محصول"
            id={`edit-product-btn-${row.id}`}
          >
            <Edit2 size={15} />
          </button>
          <button 
            className="action-icon-btn delete-btn" 
            onClick={() => handleDeleteClick(row.id)}
            title="حذف محصول"
            id={`delete-product-btn-${row.id}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      )
    }
  ];

  // فیلتر بار اختصاصی برای جدول
  const customFilterBar = (
    <div className="product-filter-bar" id="products-filter-bar">
      <select 
        value={categoryFilter} 
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="category-select-dropdown"
      >
        <option value="همه">همه دسته‌بندی‌ها</option>
        <option value="نوشیدنی گرم">قهوه گرم</option>
        <option value="نوشیدنی سرد">قهوه سرد</option>
        <option value="قهوه تخصصی">قهوه تخصصی</option>
        <option value="کیک و دسر">کیک و دسر</option>
        <option value="میان وعده">میان وعده</option>
      </select>
    </div>
  );

  return (
    <div className="products-page-container" id="products-page">
      {/* هدر صفحه به همراه کلید ثبت جدید */}
      <div className="page-header-actions" id="products-page-header">
        <div className="page-title-section">
          <h1 className="text-2xl font-bold text-coffee-dark dark:text-coffee-cream">🍰 محصولات کافه منو</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت قیمت‌ها، تصاویر و ترکیبات نوشیدنی‌ها و کیک‌ها</p>
        </div>

        <button 
          className="add-new-btn" 
          onClick={handleAddNewClick}
          id="add-new-product-btn"
        >
          <Plus size={18} />
          <span>افزودن آیتم جدید</span>
        </button>
      </div>

      {/* جدول داده‌ها */}
      <div className="products-table-container">
        <DataTable 
          columns={columns}
          data={filteredProducts}
          searchPlaceholder="جستجو در نام محصول یا مواد اولیه..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filterComponent={customFilterBar}
          id="products-list-table"
        />
      </div>

      {/* مودال‌های برنامه */}
      <AnimatePresence>
        {isAddOpen && (
          <AddProductModal 
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onSave={handleSaveProduct}
            product={editingProduct}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteOpen && (
          <ConfirmModal 
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleConfirmDelete}
            title="حذف آیتم از منو"
            message="آیا از حذف دائم این محصول مطمئن هستید؟ این عمل غیرقابل بازگشت است."
          />
        )}
      </AnimatePresence>

      {/* مودال موفقیت کاربری */}
      <SuccessModal 
        isOpen={successModalData.isOpen}
        onClose={() => setSuccessModalData(prev => ({ ...prev, isOpen: false }))}
        title={successModalData.title}
        message={successModalData.message}
        type={successModalData.type}
      />
    </div>
  );
}