import "./FunMenuModal.css";

export default function FunMenuModal({ onClose, onSelectLucky, onSelectBuild }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="fun-menu-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="fun-menu-icon">☕</div>
        <h2 className="fun-menu-title">یک تجربه جدید رو شروع کن!</h2>
        
        <button className="fun-menu-option lucky" onClick={onSelectLucky}>
          <div className="option-emoji">🎲</div>
          <div className="option-text">
            <span className="option-title">قهوه شانس</span>
            <span className="option-desc">یک قهوه تصادفی با ۵۰٪ تخفیف</span>
          </div>
        </button>
        
        <button className="fun-menu-option build" onClick={onSelectBuild}>
          <div className="option-emoji">🎨</div>
          <div className="option-text">
            <span className="option-title">قهوه‌ات رو بساز</span>
            <span className="option-desc">قهوه دلخواه خودت رو بساز</span>
          </div>
        </button>
      </div>
    </div>
  );
}