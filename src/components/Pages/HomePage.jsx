import { useState , useEffect  } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [showBaristas, setShowBaristas] = useState(false);
  
  // هندل کردن کلید Escape برای بستن مودال
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && showBaristas) {
        setShowBaristas(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showBaristas]);



  const baristas = [
    {
      id: 1,
      name: "رضا کریمی",
      role: "باریستای ارشد",
      experience: "۸ سال سابقه",
      specialty: "تخصص: قهوه‌های تخصصی و لاته‌آرت",
      bio: "برنده مسابقات ملی لاته‌آرت ۱۴۰۲",
      emoji: "🏆",
      image: "/images/rezakarimie.webp",  // ← مسیر عکس رو اینجا بزار
      alt: "باریستا رضا کریمی"
    },
    {
      id: 2,
      name: "سارا محمدی",
      role: "باریستای حرفه‌ای",
      experience: "۵ سال سابقه",
      specialty: "تخصص: قهوه‌های سرد و خلاقانه",
      bio: "طراح نوشیدنی‌های مخصوص کافه",
      emoji: "🎨",
      image: "/images/saramohammadie.webp",  // ← مسیر عکس رو اینجا بزار
      alt: "باریستا سارا محمدی"
    },
    {
      id: 3,
      name: "علی نوری",
      role: "باریستای متخصص",
      experience: "۶ سال سابقه",
      specialty: "تخصص: اسپرسو و ترکیب دانه‌ها",
      bio: "دارای مدرک بین‌المللی SCA",
      emoji: "🌟",
      image: "/images/alinouri.webp",  // ← مسیر عکس رو اینجا بزار
      alt: "باریستا علی نوری"
    }
  ];

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
        
        {/* کارت باریستا با قابلیت کلیک */}
        <div 
          className="home-card barista-card-clickable" 
          onClick={() => setShowBaristas(!showBaristas)}
        >
          <div className="home-icon">👨‍🍳</div>
          <h3>باریستاهای حرفه‌ای</h3>
          <p>باریستاهای مجرب ما بهترین نوشیدنی‌ها را برای شما آماده می‌کنند</p>
          <div className="click-hint">✨ برای آشنایی بیشتر کلیک کنید ✨</div>
        </div>

        <div className="home-card">
          <div className="home-icon">🏠</div>
          <h3>فضای دلنشین</h3>
          <p>فضایی گرم و صمیمی برای لحظات خاص شما</p>
        </div>
      </div>

      {/* مودال معرفی باریستاها */}
      {showBaristas && (
        <div className="baristas-modal-overlay" onClick={() => setShowBaristas(false)}>
          <div className="baristas-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="baristas-modal-close" onClick={() => setShowBaristas(false)}>✕</button>
            
            <div className="baristas-modal-header">
              <span className="baristas-modal-icon">👨‍🍳</span>
              <h2 className="baristas-modal-title">تیم حرفه‌ای باریستاهای ما</h2>
              <p className="baristas-modal-subtitle">با عشق و تخصص، بهترین طعم‌ها را برای شما می‌سازند</p>
            </div>

            <div className="baristas-grid">
              {baristas.map(barista => (
                <div key={barista.id} className="barista-card">
                <div className="barista-avatar">
                  <img 
                    src={barista.image} 
                    alt={barista.alt}
                    className="barista-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23c68642'/%3E%3Ctext x='100' y='85' text-anchor='middle' fill='white' font-size='40'%3E👨‍🍳%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                  <h3 className="barista-name">{barista.name}</h3>
                  <div className="barista-role">{barista.role}</div>
                  <div className="barista-info">
                    <p>📅 {barista.experience}</p>
                    <p>🎯 {barista.specialty}</p>
                    <p>📝 {barista.bio}</p>
                  </div>
                  <div className="barista-emoji">{barista.emoji}</div>
                </div>
              ))}
            </div>

            <div className="baristas-footer">
              <p>❤️ ما عاشق کارمون هستیم و بهترین قهوه رو براتون می‌سازیم ❤️</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}