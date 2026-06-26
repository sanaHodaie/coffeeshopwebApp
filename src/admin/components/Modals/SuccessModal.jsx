/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import React from 'react';
import './SuccessModal.css';

export default function SuccessModal({ isOpen, onClose, title, message, type = 'success' }) {
  if (!isOpen) return null;

  // تعیین ایموجی بر اساس نوع مودال
  const getIcon = () => {
    switch (type) {
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'success':
      default:
        return '✅';
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} id="success-modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        id="success-modal-content"
      >
        <div className={`modal-icon ${type}`} id="success-modal-icon">
          {getIcon()}
        </div>
        <h3 className="modal-title" id="success-modal-title">{title}</h3>
        <p className="modal-message" id="success-modal-message">{message}</p>
        <button className="modal-btn" onClick={onClose} id="success-modal-btn">
          متوجه شدم
        </button>
      </motion.div>
    </div>
  );
}
