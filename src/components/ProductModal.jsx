import { useState, useEffect } from "react";
import "./ProductModal.css";

export default function ProductModal({ product, addToCart, onClose }) {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(product.price);

  // قفل کردن اسکرول صفحه اصلی هنگام باز بودن مودال
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // لیست افزودنی‌ها
  const addonsList = [
    { id: "espresso", name: "شات اسپرسو اضافه", price: 5000, emoji: "☕" },
    { id: "almond", name: "شیر بادام", price: 4000, emoji: "🥛" },
    { id: "cream", name: "خامه", price: 3000, emoji: "🍦" }
  ];

  // قیمت‌های هر سایز
  const getPriceForSize = (size, basePrice) => {
    if (product.category === "dessert") return basePrice;
    switch(size) {
      case "small": return Math.floor(basePrice * 0.9);
      case "medium": return basePrice;
      case "large": return Math.floor(basePrice * 1.2);
      default: return basePrice;
    }
  };

  // محاسبه قیمت کل با احتساب سایز و افزودنی‌ها
  const calculateTotalPrice = (size, addons) => {
    let total = getPriceForSize(size, product.price);
    addons.forEach(addonId => {
      const addon = addonsList.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setIsCalculating(true);
    
    setTimeout(() => {
      const newPrice = calculateTotalPrice(size, selectedAddons);
      setCurrentPrice(newPrice);
      setIsCalculating(false);
    }, 800);
  };

  const handleAddonToggle = (addonId) => {
    setIsCalculating(true);
    
    let newAddons;
    if (selectedAddons.includes(addonId)) {
      newAddons = selectedAddons.filter(id => id !== addonId);
    } else {
      newAddons = [...selectedAddons, addonId];
    }
    setSelectedAddons(newAddons);
    
    setTimeout(() => {
      const newPrice = calculateTotalPrice(selectedSize, newAddons);
      setCurrentPrice(newPrice);
      setIsCalculating(false);
    }, 800);
  };

  const getAddonsNames = () => {
    return selectedAddons.map(id => {
      const addon = addonsList.find(a => a.id === id);
      return addon ? addon.name : "";
    }).filter(Boolean);
  };

  // تابع اشتراک‌گذاری در واتساپ
  const shareOnWhatsApp = () => {
    const addonsText = getAddonsNames().length > 0 ? `\n➕ افزودنی‌ها: ${getAddonsNames().join(", ")}` : "";
    
    const message = `☕ *${product.name}*\n━━━━━━━━━━━━━━━━━━\n📏 سایز: ${selectedSize === "small" ? "کوچک" : selectedSize === "medium" ? "متوسط" : "بزرگ"}${addonsText}\n💰 قیمت: ${currentPrice.toLocaleString()} تومان\n━━━━━━━━━━━━━━━━━━\n📝 ${product.description}\n🥄 مواد اولیه: ${product.ingredients}\n━━━━━━━━━━━━━━━━━━\n🔗 مشاهده محصول:\n${window.location.href}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  // تابع اشتراک‌گذاری در تلگرام
  const shareOnTelegram = () => {
    const addonsText = getAddonsNames().length > 0 ? `\n➕ افزودنی‌ها: ${getAddonsNames().join(", ")}` : "";
    
    const text = `☕ ${product.name}\n━━━━━━━━━━━━━━━━━━\n📏 سایز: ${selectedSize === "small" ? "کوچک" : selectedSize === "medium" ? "متوسط" : "بزرگ"}${addonsText}\n💰 قیمت: ${currentPrice.toLocaleString()} تومان\n━━━━━━━━━━━━━━━━━━\n📝 ${product.description}\n🥄 مواد اولیه: ${product.ingredients}`;
    
    const url = window.location.href;
    
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  // تابع اشتراک‌گذاری در بله (با کپی خودکار - چون API نداره)
  const shareOnBale = () => {
    const addonsText = getAddonsNames().length > 0 ? `\n➕ افزودنی‌ها: ${getAddonsNames().join(", ")}` : "";
    
    const message = `☕ ${product.name}\n━━━━━━━━━━━━━━━━━━\n📏 سایز: ${selectedSize === "small" ? "کوچک" : selectedSize === "medium" ? "متوسط" : "بزرگ"}${addonsText}\n💰 قیمت: ${currentPrice.toLocaleString()} تومان\n━━━━━━━━━━━━━━━━━━\n📝 ${product.description}\n🥄 مواد اولیه: ${product.ingredients}\n━━━━━━━━━━━━━━━━━━\n🔗 ${window.location.href}`;
    
    // روش 1: تلاش برای باز کردن برنامه بله (فقط موبایل)
    window.location.href = `bale://share?text=${encodeURIComponent(message)}`;
    
    // روش 2: بعد از 500 میلی‌ثانیه اگر برنامه باز نشد، متن رو کپی می‌کنه
    setTimeout(() => {
      navigator.clipboard.writeText(message).then(() => {
        alert("✅ متن سفارش کپی شد!\nحالا می‌توانید آن را در پیام‌رسان بله جایگذاری کنید.");
      }).catch(() => {
        alert("❌ کپی نشد. لطفاً دستی متن را کپی کنید.");
      });
    }, 500);
  };

  const isDrink = product.category === "hot" || product.category === "cold";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-icon">{product.emoji}</div>
        <h2 className="modal-title">{product.name}</h2>
        
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
        
        {/* انتخاب سایز */}
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
        
        {/* انتخاب افزودنی‌ها */}
        {isDrink && (
          <div className="addons-selector">
            <span className="addons-label">🧁 افزودنی‌های ویژه:</span>
            <div className="addons-buttons">
              {addonsList.map(addon => (
                <button 
                  key={addon.id}
                  className={`addon-btn ${selectedAddons.includes(addon.id) ? "active" : ""}`}
                  onClick={() => handleAddonToggle(addon.id)}
                >
                  <span className="addon-emoji">{addon.emoji}</span>
                  <span className="addon-name">{addon.name}</span>
                  <span className="addon-price">+{addon.price.toLocaleString()}ت</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <p className="modal-description">{product.description}</p>
        <div className="modal-ingredients">
          <strong>مواد اولیه:</strong>
          <p>{product.ingredients}</p>
        </div>
        
        <button className="modal-add-btn" onClick={() => {
          addToCart({ 
            ...product, 
            price: currentPrice, 
            size: selectedSize,
            addons: selectedAddons,
            addonsNames: getAddonsNames()
          });
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