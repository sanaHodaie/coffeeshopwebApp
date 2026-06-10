import { useState } from "react";
import "./Header.css";

export default function Header({ 
  totalItems, 
  onCartClick, 
  activePage, 
  onPageChange,
  onFunMenuClick 
}) {
  const [showTooltip, setShowTooltip] = useState(false);  // ← این خط رو اضافه کن

  return (
    <header className="header-vertical">
      <div 
        className="logo-vertical" 
        onClick={onFunMenuClick} 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ cursor: "pointer", position: "relative" }}
      >
        ☕
        {showTooltip && (
          <div className="fun-tooltip">
            🎲✨ سورپرایز ویژه! کلیک کن 🎨🎁
          </div>
        )}
      </div>
      
      {totalItems > 0 && (
        <div className="cart-icon-wrapper" onClick={onCartClick}>
          <div className="cart-icon">
            <svg className="cart-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H4L7 14H21L24 6H6" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
              <circle cx="20" cy="20" r="1.5" fill="currentColor"/>
              <path d="M7 14L5 6H23L21 14H7Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <span className="cart-badge">{totalItems}</span>
          </div>
        </div>
      )}
      
      <nav className="nav-vertical">
        <button 
          className={`nav-btn-vertical ${activePage === 'menu' ? 'active' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault();
            onPageChange('menu');
          }}
        >
          منو
        </button>
        <button 
          className={`nav-btn-vertical ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => onPageChange('home')}
        >
          خانه
        </button>
        <button 
          className={`nav-btn-vertical ${activePage === 'contact' ? 'active' : ''}`}
          onClick={() => onPageChange('contact')}
        >
          تماس
        </button>
        <button 
          className={`nav-btn-vertical ${activePage === 'about' ? 'active' : ''}`}
          onClick={() => onPageChange('about')}
        >
          درباره
        </button>
      </nav>
    </header>
  );
}