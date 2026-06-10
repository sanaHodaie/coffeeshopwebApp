import { useState, useEffect } from "react";
import "./Timeline.css";

export default function Timeline({ orderStatus, progress, onClose }) {
  const [showRocket, setShowRocket] = useState(false);

  // وقتی progress به 100 رسید، موشک نمایش داده بشه
  useEffect(() => {
    if (progress >= 100) {
      setShowRocket(true);
      // بعد از 3 ثانیه موشک مخفی بشه
      const timer = setTimeout(() => {
        setShowRocket(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowRocket(false);
    }
  }, [progress]);

  return (
    <div className="timeline-wrapper">
      <div className="timeline-container">
        {/* دکمه ضربدر برای بستن */}
        <button className="timeline-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="timeline-header">
          <span className="timeline-title">☕ سفارش شما</span>
          <span className="timeline-status-badge">
            {orderStatus === 'preparing' && 'در حال آماده‌سازی...'}
            {orderStatus === 'ready' && 'آماده تحویل!'}
          </span>
        </div>
        <div className="timeline-bar">
          <div className="timeline-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="timeline-steps">
          <div className={`timeline-step ${progress >= 0 ? 'active' : ''}`}>
            <span className="step-icon">📝</span>
            <span className="step-label">ثبت</span>
          </div>
          <div className={`timeline-step ${progress >= 33 ? 'active' : ''}`}>
            <span className="step-icon">☕</span>
            <span className="step-label">آماده‌سازی</span>
          </div>
          <div className={`timeline-step ${progress >= 66 ? 'active' : ''}`}>
            <span className="step-icon">🎁</span>
            <span className="step-label">بسته‌بندی</span>
          </div>
          <div className={`timeline-step ${progress >= 100 ? 'active' : ''}`}>
            <span className="step-icon">🚀</span>
            <span className="step-label">تحویل</span>
          </div>
        </div>
      </div>

      {/* موشک سه بعدی که از تایم لاین خارج میشه */}
      {showRocket && (
        <div className="rocket-3d">
          <div className="rocket-body">
            <span className="rocket-emoji">🚀</span>
            <div className="rocket-flame"></div>
          </div>
        </div>
      )}
    </div>
  );
}