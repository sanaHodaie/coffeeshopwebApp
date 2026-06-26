/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import './AddProductModal.css';

export default function AddProductModal({ isOpen, onClose, onSave, product }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('نوشیدنی گرم');
  const [image, setImage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // لود داده‌های محصول در صورت ویرایش
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setIngredients(product.ingredients);
      setDescription(product.description || '');
      setCategory(product.category);
      setImage(product.image);
    } else {
      setName('');
      setPrice('');
      setIngredients('');
      setDescription('');
      setCategory('نوشیدنی گرم');
      setImage('');
    }
    setErrorMsg('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  // هندل کردن درگ و دراپ تصویر
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ثبت فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !ingredients) {
      setErrorMsg('لطفاً تمامی فیلدهای ستاره‌دار (*) را پر کنید.');
      return;
    }

    onSave({
      id: product?.id,
      name,
      price: Number(price),
      ingredients,
      description,
      category,
      image: image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500', // بک‌آپ تصویر پیش‌فرض
      status: product?.status || 'active'
    });
    onClose();
  };

  return (
    <div className="product-modal-overlay" onClick={onClose} id="add-product-overlay">
      <motion.div 
        className="product-modal-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        id="add-product-content"
      >
        <div className="product-modal-header" id="add-product-header">
          <h3 className="text-xl font-bold text-coffee-dark dark:text-coffee-cream">
            {product ? '✏️ ویرایش محصول کافه' : '☕ افزودن محصول جدید به منو'}
          </h3>
          <button className="close-btn" onClick={onClose} id="close-modal-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-modal-form" id="add-product-form">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm text-center font-bold">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label>نام محصول *</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMsg('');
                }} 
                placeholder="مانند: لاته لوتوس"
                required
              />
            </div>

            <div className="form-group">
              <label>قیمت (تومان) *</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => {
                  setPrice(e.target.value ? Number(e.target.value) : '');
                  setErrorMsg('');
                }} 
                placeholder="مانند: 85000"
                required
              />
            </div>

            <div className="form-group">
              <label>دسته‌بندی</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="نوشیدنی گرم">قهوه گرم</option>
                <option value="نوشیدنی سرد">قهوه سرد</option>
                <option value="قهوه تخصصی">قهوه تخصصی</option>
                <option value="کیک و دسر">کیک و دسر</option>
                <option value="میان وعده">میان وعده</option>
              </select>
            </div>

            <div className="form-group">
              <label>مواد تشکیل‌دهنده *</label>
              <input 
                type="text" 
                value={ingredients} 
                onChange={(e) => {
                  setIngredients(e.target.value);
                  setErrorMsg('');
                }} 
                placeholder="مانند: اسپرسو، شیر، سیروپ فندق"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>توضیحات کوتاه محصول</label>
            <textarea 
              rows={2} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="توضیحات کوتاه در مورد طعم یا شیوه دم‌آوری..."
            />
          </div>

          {/* آپلود درگ و دراپ تصویر */}
          <div className="form-group">
            <label>تصویر محصول</label>
            <div 
              className={`dropzone ${isDragOver ? 'dragover' : ''} ${image ? 'has-image' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                id="fileInput" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden-file-input"
              />
              
              {image ? (
                <div className="image-preview-container">
                  <img src={image} alt="پیش نمایش" className="preview-img" />
                  <button 
                    type="button" 
                    className="remove-img-btn" 
                    onClick={() => setImage('')}
                  >
                    تغییر عکس
                  </button>
                </div>
              ) : (
                <label htmlFor="fileInput" className="dropzone-label">
                  <div className="upload-icon-container">
                    <Upload size={32} className="text-coffee-gold animate-bounce" />
                  </div>
                  <p className="upload-text">فایل تصویر را به اینجا بکشید یا برای انتخاب کلیک کنید</p>
                  <span className="upload-subtext">فرمت‌های مجاز: PNG, JPG, WEBP</span>
                </label>
              )}
            </div>
          </div>

          <div className="form-actions" id="add-product-actions">
            <button 
              type="submit" 
              className="save-btn"
            >
              {product ? 'اعمال تغییرات' : 'ذخیره محصول جدید'}
            </button>
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
            >
              انصراف
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
