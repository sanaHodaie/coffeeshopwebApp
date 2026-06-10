import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="hero-title-main">درباره</span>
          <span className="hero-title-accent">ما</span>
        </h1>
        <p className="hero-subtitle">
          داستان کافه ما از کجا شروع شد؟
        </p>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>کافه قهوه از سال ۱۳۹۰ فعالیت خود را آغاز کرد. ما با عشق به قهوه و فرهنگ قهوه‌نوشی، تصمیم گرفتیم فضایی ایجاد کنیم که مردم بتوانند از بهترین قهوه‌ها در محیطی دلنشین لذت ببرند.</p>
          <p>دانه‌های قهوه ما مستقیماً از بهترین مزارع قهوه در سراسر جهان تهیه می‌شوند و با تخصص باریستاهای ما تبدیل به نوشیدنی‌های به یادماندنی می‌شوند.</p>
          <p>هدف ما فقط سرو قهوه نیست، بلکه خلق لحظات خوش برای شما عزیزان است.</p>
        </div>
      </div>
    </div>
  );
}