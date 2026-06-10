import { useState } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalEmoji, setModalEmoji] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const showCustomModal = (title, message, emoji) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalEmoji(emoji);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 4000);
  };

  // باز کردن نقشه (آدرس)
  const handleAddressClick = () => {
    const address = "تهران، خیابان ولیعصر، پلاک ۱۲۳";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    showCustomModal(
      "🗺️ نقشه",
      "آدرس در گوگل مپ باز شد.\nما منتظر شما هستیم! ☕",
      "🗺️"
    );
  };

  // باز کردن شماره تلفن
  const handlePhoneClick = () => {
    window.location.href = "tel:02112345678";
    showCustomModal(
      "📞 تماس تلفنی",
      "شماره گیری انجام شد.\nمشتاق شنیدن صدای گرم شما هستیم! ❤️",
      "📞"
    );
  };

  // باز کردن ایمیل
  const handleEmailClick = () => {
    const email = "info@cafe.com";
    const subject = "سوال در مورد کافه قهوه";
    const body = "سلام،\n\nمن در مورد...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showCustomModal(
      "✉️ ایمیل",
      "برنامه ایمیل باز شد.\nدر اسرع وقت به شما پاسخ خواهیم داد! 📧",
      "✉️"
    );
  };

  // نمایش پیام ساعات کاری
  const handleHoursClick = () => {
    showCustomModal(
      "⏰ ساعات کاری",
      "☕ هنوز هم منتظر قدم‌های گرم شما هستیم! ☕\n\nهر روز از صبح تا شب، با عشق قهوه می‌سازیم تا لحظات خوشی رو براتون رقم بزنیم.\n\n🕐 شنبه تا چهارشنبه: ۹ صبح تا ۱۰ شب\n🕐 پنجشنبه و جمعه: ۹ صبح تا ۱۲ شب\n\nدوستتون داریم و منتظرتون هستیم ❤️",
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
              <p>تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
              <span className="contact-hint">👆 کلیک کنید تا در نقشه باز شود</span>
            </div>
          </div>

          {/* تلفن - شماره گیری مستقیم */}
          <div className="contact-item" onClick={handlePhoneClick} style={{ cursor: "pointer" }}>
            <span className="contact-icon">📞</span>
            <div>
              <h4>تلفن</h4>
              <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
              <span className="contact-hint">📱 کلیک کنید تا شماره گیری شود</span>
            </div>
          </div>

          {/* ایمیل - باز شدن در جیمیل */}
          <div className="contact-item" onClick={handleEmailClick} style={{ cursor: "pointer" }}>
            <span className="contact-icon">✉️</span>
            <div>
              <h4>ایمیل</h4>
              <p>info@cafe.com</p>
              <span className="contact-hint">📧 کلیک کنید تا ایمیل ارسال شود</span>
            </div>
          </div>

          {/* ساعات کاری - نمایش مودال */}
          <div className="contact-item" onClick={handleHoursClick} style={{ cursor: "pointer" }}>
            <span className="contact-icon">⏰</span>
            <div>
              <h4>ساعات کاری</h4>
              <p>شنبه تا چهارشنبه: ۹ صبح تا ۱۰ شب</p>
              <p>پنجشنبه و جمعه: ۹ صبح تا ۱۲ شب</p>
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