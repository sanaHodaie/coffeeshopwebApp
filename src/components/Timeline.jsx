import "./Timeline.css";

export default function Timeline({ orderStatus, progress }) {
  return (
    <div className="timeline-wrapper">
      <div className="timeline-container">
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
    </div>
  );
}