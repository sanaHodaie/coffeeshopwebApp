import { useState, useEffect } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalEmoji, setModalEmoji] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  
  // ===== اضافه کردن state برای تنظیمات =====
  const [settings, setSettings] = useState({
    cafeName: 'کافه دنج سنا (Sena Cafe)',
    address: 'تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲',
    phone: '۰۲۱-۸۸۹۹۲۲۱۱',
    email: 'info@senacafe.com',
    workingHours: 'همه‌روزه از ساعت ۸:۰۰ صبح الی ۲۳:۰۰ شب',
    instagram: 'sena_cafe_test'
  });

  // ===== لود تنظیمات از localStorage =====
  useEffect(() => {
    const savedConfig = localStorage.getItem('coffee_shop_config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setSettings(prev => ({
        ...prev,
        ...parsed
      }));
    }

    // گوش دادن به تغییرات تنظیمات
    const handleStorageChange = (e) => {
      if (e.key === 'coffee_shop_config') {
        const stored = localStorage.getItem('coffee_shop_config');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings(prev => ({
            ...prev,
            ...parsed
          }));
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const showCustomModal = (title, message, emoji) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalEmoji(emoji);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 4000);
  };

  // باز کردن نقشه (آدرس - از settings استفاده کن)
  const handleAddressClick = () => {
    const address = settings.address;
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    showCustomModal(
      "🗺️ نقشه",
      "آدرس در گوگل مپ باز شد.\nما منتظر شما هستیم! ☕",
      "🗺️"
    );
  };

  // باز کردن شماره تلفن (از settings استفاده کن)
  const handlePhoneClick = () => {
    window.location.href = `tel:${settings.phone}`;
    showCustomModal(
      "📞 تماس تلفنی",
      "شماره گیری انجام شد.\nمشتاق شنیدن صدای گرم شما هستیم! ❤️",
      "📞"
    );
  };

  // باز کردن ایمیل (از settings استفاده کن)
  const handleEmailClick = () => {
    const email = settings.email;
    const subject = "سوال در مورد کافه قهوه";
    const body = "سلام،\n\nمن در مورد...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showCustomModal(
      "✉️ ایمیل",
      "برنامه ایمیل باز شد.\nدر اسرع وقت به شما پاسخ خواهیم داد! 📧",
      "✉️"
    );
  };

  // نمایش پیام ساعات کاری (از settings استفاده کن)
  const handleHoursClick = () => {
    showCustomModal(
      "⏰ ساعات کاری",
      `☕ ${settings.cafeName} ☕\n\n${settings.workingHours}\n\nدوستتون داریم و منتظرتون هستیم ❤️`,
      "☕"
    );
  };

  return (
    <div className="contact-page">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="hero-title-main">تماس با</span>
          <span className="hero-title-accent">ما</span>
        </h1>
        <p className="hero-subtitle">
          ما همیشه منتظر شنیدن صدای گرم شما هستیم
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          {/* آدرس - باز کردن نقشه */}
          <div className="contact-item" onClick={handleAddressClick} style={{ cursor: "pointer" }}>
            <span className="contact-icon">📍</span>
            <div>
              <h4>آدرس</h4>
              <p>{settings.address}</p>
              <span className="contact-hint">👆 کلیک کنید تا در نقشه باز شود</span>
            </div>
          </div>

          {/* تلفن - شماره گیری مستقیم */}
          <div className="contact-item" onClick={handlePhoneClick} style={{ cursor: "pointer" }}>
            <span className="contact-icon">📞</span>
            <div>
              <h4>تلفن</h4>
              <p>{settings.phone}</p>
              <span className="contact-hint">📱 کلیک کنید تا شماره گیری شود</span>
            </div>
          </div>

          {/* ایمیل - باز شدن در جیمیل */}
          <div className="contact-item" onClick={handleEmailClick} style={{ cursor: "pointer" }}>
            <span className="contact-icon">✉️</span>
            <div>
              <h4>ایمیل</h4>
              <p>{settings.email}</p>
              <span className="contact-hint">📧 کلیک کنید تا ایمیل ارسال شود</span>
            </div>
          </div>

          {/* ساعات کاری - نمایش مودال */}
          <div className="contact-item" onClick={handleHoursClick} style={{ cursor: "pointer" }}>
            <span className="contact-icon">⏰</span>
            <div>
              <h4>ساعات کاری</h4>
              <p>{settings.workingHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* مودال سفارشی (جایگزین alert) */}
      {showModal && (
        <div className="contact-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-emoji">{modalEmoji}</div>
            <h3 className="contact-modal-title">{modalTitle}</h3>
            <p className="contact-modal-message">{modalMessage}</p>
            <button 
              className="contact-modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              باشه ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}