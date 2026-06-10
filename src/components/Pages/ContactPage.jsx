import "./ContactPage.css";

export default function ContactPage() {
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
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <h4>آدرس</h4>
              <p>تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <h4>تلفن</h4>
              <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <div>
              <h4>ایمیل</h4>
              <p>info@cafe.com</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">⏰</span>
            <div>
              <h4>ساعات کاری</h4>
              <p>شنبه تا چهارشنبه: ۹ صبح تا ۱۰ شب</p>
              <p>پنجشنبه و جمعه: ۹ صبح تا ۱۲ شب</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}