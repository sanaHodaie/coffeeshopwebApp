/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import React from 'react';
import './ConfirmModal.css';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'بله، حذف شود',
  cancelText = 'انصراف'
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="confirm-modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        id="confirm-modal-content"
      >
        <div className="modal-icon warning" id="confirm-modal-icon">⚠️</div>
        <h3 className="modal-title" id="confirm-modal-title">{title}</h3>
        <p className="modal-message" id="confirm-modal-message">{message}</p>
        
        <div className="confirm-btn-group" id="confirm-modal-btn-group">
          <button 
            className="confirm-btn delete" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            id="confirm-modal-delete-btn"
          >
            {confirmText}
          </button>
          
          <button 
            className="confirm-btn cancel" 
            onClick={onClose}
            id="confirm-modal-cancel-btn"
          >
            {cancelText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
