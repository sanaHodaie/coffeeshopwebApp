import { useState, useEffect } from "react";
import "./BuildCoffeeModal.css";

export default function BuildCoffeeModal({ onClose, addToCart }) {
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  // قفل کردن اسکرول صفحه اصلی هنگام باز بودن مودال
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const bases = [
    { id: "espresso", name: "اسپرسو", price: 35000, emoji: "☕", desc: "غلیظ و پرطرفدار" },
    { id: "latte", name: "لاته", price: 45000, emoji: "🥛", desc: "نرم و کرمی" },
    { id: "cappuccino", name: "کاپوچینو", price: 48000, emoji: "🍫", desc: "کف شیر غلیظ" },
    { id: "mocha", name: "موکا", price: 52000, emoji: "🍫", desc: "ترکیب شکلات و قهوه" }
  ];

  const addons = [
    { id: "extra-shot", name: "شات اسپرسو اضافه", price: 5000, emoji: "☕" },
    { id: "almond-milk", name: "شیر بادام", price: 4000, emoji: "🥛" },
    { id: "cream", name: "خامه", price: 3000, emoji: "🍦" }
  ];

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const getTotalPrice = () => {
    if (!selectedBase) return 0;
    let total = selectedBase.price;
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  const getAddonsNames = () => {
    return selectedAddons.map(id => {
      const addon = addons.find(a => a.id === id);
      return addon ? addon.name : "";
    }).filter(Boolean);
  };

  const handleAddToCart = () => {
    if (!selectedBase) return;
    addToCart({
      id: Date.now(),
      name: selectedBase.name,
      price: getTotalPrice(),
      ingredients: `${selectedBase.name} با ${getAddonsNames().join(", ") || "بدون افزودنی"}`,
      description: `قهوه سفارشی با پایه ${selectedBase.name}`,
      image: selectedBase.emoji,
      emoji: selectedBase.emoji,
      category: "hot",
      categoryName: "قهوه گرم",
      size: "custom",
      addonsNames: getAddonsNames(),
      isCustom: true
    });
    onClose();
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedBase) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="build-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="build-icon">🎨</div>
        <h2 className="build-title">قهوه‌ات رو بساز</h2>
        
        {/* مراحل */}
        <div className="build-steps">
          <div className={`step ${currentStep === 1 ? 'active' : ''} ${selectedBase ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">انتخاب پایه</span>
          </div>
          <div className={`step-line ${currentStep === 2 ? 'active' : ''}`}></div>
          <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">افزودنی‌ها</span>
          </div>
        </div>

        {/* محتوای اسکرول‌دار */}
        <div className="build-scroll-content">
          {/* مرحله 1: انتخاب پایه قهوه */}
          {currentStep === 1 && (
            <div className="build-section">
              <label>پایه قهوه خود را انتخاب کن:</label>
              <div className="base-buttons">
                {bases.map(base => (
                  <button
                    key={base.id}
                    className={`base-btn ${selectedBase?.id === base.id ? 'active' : ''}`}
                    onClick={() => setSelectedBase(base)}
                  >
                    <span className="base-emoji">{base.emoji}</span>
                    <div className="base-info">
                      <span className="base-name">{base.name}</span>
                      <span className="base-desc">{base.desc}</span>
                    </div>
                    <span className="base-price">{base.price.toLocaleString()}ت</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* مرحله 2: انتخاب افزودنی‌ها */}
          {currentStep === 2 && selectedBase && (
            <div className="build-section">
              <label>افزودنی‌های دلخواه (اختیاری):</label>
              <div className="addons-buttons">
                {addons.map(addon => (
                  <button
                    key={addon.id}
                    className={`addon-btn ${selectedAddons.includes(addon.id) ? 'active' : ''}`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <span className="addon-emoji">{addon.emoji}</span>
                    <span className="addon-name">{addon.name}</span>
                    <span className="addon-price">+{addon.price.toLocaleString()}ت</span>
                  </button>
                ))}
              </div>
              
              <div className="order-summary">
                <div className="summary-title">خلاصه سفارش</div>
                <div className="summary-row">
                  <span>{selectedBase.name}</span>
                  <span>{selectedBase.price.toLocaleString()} تومان</span>
                </div>
                {selectedAddons.map(id => {
                  const addon = addons.find(a => a.id === id);
                  return addon ? (
                    <div key={id} className="summary-row">
                      <span>+ {addon.name}</span>
                      <span>{addon.price.toLocaleString()} تومان</span>
                    </div>
                  ) : null;
                })}
                <div className="summary-total">
                  <span>مجموع:</span>
                  <span>{getTotalPrice().toLocaleString()} تومان</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* دکمه‌های پایین */}
        <div className="build-footer">
          {currentStep === 1 && (
            <button 
              className="next-btn" 
              onClick={handleNext}
              disabled={!selectedBase}
            >
              ادامه
            </button>
          )}
          {currentStep === 2 && selectedBase && (
            <div className="action-buttons">
              <button className="back-btn" onClick={handleBack}>
                ← برگشت
              </button>
              <button className="build-add-btn" onClick={handleAddToCart}>
                🛒 افزودن به سبد خرید
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}