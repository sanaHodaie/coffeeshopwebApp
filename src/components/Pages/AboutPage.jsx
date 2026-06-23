import { useState, useEffect } from "react";
import "./AboutPage.css";

const COFFEE_SHOP_GROWTH = [
  {
    id: 1,
    icon: "🌱",
    label: "شروع ایده",
    title: "بذر یک رویا",
    desc: "شکل‌گیری کانسپت اصلی کافی‌شاپ و انتخاب باکیفیت‌ترین دانه‌ها برای آغاز یک ماجراجویی طعم‌دار.",
    color: "#00ffcc"
  },
  {
    id: 2,
    icon: "☕",
    label: "افتتاح شعبه",
    title: "خلق اولین فنجان",
    desc: "راه‌اندازی اولین مکان فیزیکی با دکوراسیون گرم و اتمسفری صمیمی برای استقبال از کافه‌دوستان.",
    color: "#ff007f"
  },
  {
    id: 3,
    icon: "✨",
    label: "توسعه منو",
    title: "هنر باریستایی و تنوع",
    desc: "افزودن روش‌های دم‌آوری موج سوم، سیروپ‌های دست‌ساز اختصاصی و لاین‌های منحصر‌به‌فرد قهوه.",
    color: "#39ff14"
  },
  {
    id: 4,
    icon: "🤝",
    label: "جامعه مشتریان",
    title: "خانواده بزرگ ما",
    desc: "برگزاری رویدادهای هنری، مسابقات باریستایی و تبدیل شدن به پاتوق محبوب اهالی شهر.",
    color: "#ffaa00"
  },
  {
    id: 5,
    icon: "🚀",
    label: "شعب جدید",
    title: "پرواز به سوی آینده",
    desc: "هوشمندسازی خدمات، راه‌اندازی باشگاه مشتریان پیشرفته و فرنچایز رسمی برند در سراسر کشور.",
    color: "#9d00ff"
  }
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % COFFEE_SHOP_GROWTH.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page-custom">
      <div className="hero-section-custom">
        <h1>
          <span>مسیر</span>
          <span className="highlight">پیشرفت و توسعه ما</span>
        </h1>
        <p>داستان خلق، رشد و اصالت در هر قدم</p>
      </div>

      <div className="journey-timeline">
        {/* مسیر اصلی */}
        <div className="timeline-path">
          {COFFEE_SHOP_GROWTH.map((step, index) => {
            const isActive = index === activeStep;
            const isDone = index < activeStep;

            return (
              <div key={step.id} className={`journey-node ${isActive ? 'node-active' : ''}`}>
                
                {/* بخش اصلی هسته تایم‌لاین (دایره و خط) */}
                <div className="node-wrapper-core">
                  <div 
                    className={`node-circle ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                    style={{ '--node-color': step.color }}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="node-icon">{step.icon}</span>
                    <span className="node-label">{step.label}</span>
                    {isActive && <div className="node-ripple" style={{ '--node-color': step.color }}></div>}
                  </div>

                  {/* خط اتصال */}
                  {index < COFFEE_SHOP_GROWTH.length - 1 && (
                    <div className="node-connector">
                      <div className={`connector-line ${isDone ? 'filled' : ''}`}>
                        <div className="connector-dot"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* کانتینر نگه‌دارنده اطلاعات اختصاصی هر گام */}
                <div className="journey-display-wrapper">
                  {isActive && (
                    <div className="journey-display">
                      <div className="display-card">
                        <div className="display-icon" style={{ textShadow: `0 0 10px ${step.color}` }}>
                          {step.icon}
                        </div>
                        <div className="display-content">
                          <span className="display-step">مرحله {index + 1}</span>
                          <h2>{step.title}</h2>
                          <p>{step.desc}</p>
                        </div>
                        <div 
                          className="display-accent"
                          style={{ background: step.color, boxShadow: `0 0 15px ${step.color}` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}