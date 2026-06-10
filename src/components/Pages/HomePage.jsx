import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="hero-title-main">به کافه</span>
          <span className="hero-title-accent">ما خوش آمدید</span>
        </h1>
        <p className="hero-subtitle">
          بهترین قهوه‌ها با بهترین کیفیت
        </p>
      </div>
      <div className="home-content">
        <div className="home-card">
          <div className="home-icon">☕</div>
          <h3>قهوه‌های تازه</h3>
          <p>قهوه‌های ما روزانه از بهترین دانه‌های قهوه تهیه می‌شوند</p>
        </div>
        <div className="home-card">
          <div className="home-icon">👨‍🍳</div>
          <h3>باریستاهای حرفه‌ای</h3>
          <p>باریستاهای مجرب ما بهترین نوشیدنی‌ها را برای شما آماده می‌کنند</p>
        </div>
        <div className="home-card">
          <div className="home-icon">🏠</div>
          <h3>فضای دلنشین</h3>
          <p>فضایی گرم و صمیمی برای لحظات خاص شما</p>
        </div>
      </div>
    </div>
  );
}