import { useState } from "react";
import "./ProductModal.css";

export default function ProductModal({ product, addToCart, onClose }) {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(product.price);

  // قیمت‌های هر سایز (فقط برای نوشیدنی‌ها)
  const getPriceForSize = (size, basePrice) => {
    if (product.category === "dessert") return basePrice;
    switch(size) {
      case "small": return Math.floor(basePrice * 0.9);
      case "medium": return basePrice;
      case "large": return Math.floor(basePrice * 1.2);
      default: return basePrice;
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setIsCalculating(true);
    
    // محاسبه قیمت جدید بعد از 0.8 ثانیه
    setTimeout(() => {
      const newPrice = getPriceForSize(size, product.price);
      setCurrentPrice(newPrice);
      setIsCalculating(false);
    }, 800);
  };

  const shareOnWhatsApp = () => {
    const message = `☕ ${product.name}\n💰 قیمت: ${currentPrice.toLocaleString()} تومان\n📝 ${product.description}\n\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareOnTelegram = () => {
    const message = `☕ ${product.name}\n💰 قیمت: ${currentPrice.toLocaleString()} تومان\n📝 ${product.description}`;
    const url = window.location.href;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareOnBale = () => {
    const message = `☕ ${product.name}\n💰 قیمت: ${currentPrice.toLocaleString()} تومان\n📝 ${product.description}\n\n${window.location.href}`;
    window.open(`https://bale.ai/share?text=${encodeURIComponent(message)}`, '_blank');
  };

  // آیا محصول نوشیدنی است؟
  const isDrink = product.category === "hot" || product.category === "cold";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-icon">{product.emoji}</div>
        <h2 className="modal-title">{product.name}</h2>
        
        {/* قیمت با انیمیشن */}
        <div className="modal-price-container">
          {isCalculating ? (
            <div className="price-loading">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="price-text">در حال محاسبه قیمت</span>
            </div>
          ) : (
            <div className="modal-price">{currentPrice.toLocaleString()} تومان</div>
          )}
        </div>
        
        {/* انتخاب سایز - فقط برای نوشیدنی‌ها */}
        {isDrink && (
          <div className="size-selector">
            <span className="size-label">📏 انتخاب سایز:</span>
            <div className="size-buttons">
              <button 
                className={`size-btn ${selectedSize === "small" ? "active" : ""}`}
                onClick={() => handleSizeChange("small")}
              >
                کوچک
                <span className="size-price">{(product.price * 0.9).toLocaleString()}ت</span>
              </button>
              <button 
                className={`size-btn ${selectedSize === "medium" ? "active" : ""}`}
                onClick={() => handleSizeChange("medium")}
              >
                متوسط
                <span className="size-price">{product.price.toLocaleString()}ت</span>
              </button>
              <button 
                className={`size-btn ${selectedSize === "large" ? "active" : ""}`}
                onClick={() => handleSizeChange("large")}
              >
                بزرگ
                <span className="size-price">{(product.price * 1.2).toLocaleString()}ت</span>
              </button>
            </div>
          </div>
        )}
        
        <p className="modal-description">{product.description}</p>
        <div className="modal-ingredients">
          <strong>مواد اولیه:</strong>
          <p>{product.ingredients}</p>
        </div>
        
        <button className="modal-add-btn" onClick={() => {
          addToCart({ ...product, price: currentPrice, size: selectedSize });
          onClose();
        }}>
          افزودن به سبد خرید 🛒
        </button>
        
        <div className="share-buttons">
          <button className="share-btn whatsapp" onClick={shareOnWhatsApp}>
            📱 واتساپ
          </button>
          <button className="share-btn telegram" onClick={shareOnTelegram}>
            ✈️ تلگرام
          </button>
          <button className="share-btn bale" onClick={shareOnBale}>
            🟢 بله
          </button>
        </div>
      </div>
    </div>
  );
}