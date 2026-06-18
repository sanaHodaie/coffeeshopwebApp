import { useState, useEffect } from "react";
import "./AboutPage.css";

const COFFEE_JOURNEY = [
  {
    id: 1,
    icon: "🌱",
    label: "کاشت",
    title: "دانه‌های انتخاب‌شده",
    desc: "انتخاب بهترین دانه‌های عربیکا از مزارع مرتفع کلمبیا و اتیوپی",
    color: "#4CAF50"
  },
  {
    id: 2,
    icon: "☀️",
    label: "خشک کردن",
    title: "رسیدن به کمال",
    desc: "خشک کردن طبیعی دانه‌ها زیر نور آفتاب برای حفظ عطر و طعم",
    color: "#F9A825"
  },
  {
    id: 3,
    icon: "🔥",
    label: "برشته‌کاری",
    title: "رست حرفه‌ای",
    desc: "برشته‌کاری دقیق در دمای کنترل‌شده برای آزادسازی روغن‌های معطر",
    color: "#E65100"
  },
  {
    id: 4,
    icon: "⚖️",
    label: "دم‌آوری",
    title: "هنر دم‌آوری",
    desc: "دم‌آوری با روش‌های تخصصی برای استخراج بهترین طعم‌ها",
    color: "#6D4C41"
  },
  {
    id: 5,
    icon: "☕",
    label: "نوشیدن",
    title: "لذت نهایی",
    desc: "هر فنجان قهوه، داستانی از عشق و تخصص است",
    color: "#4E342E"
  }
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % COFFEE_JOURNEY.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page-custom">
      <div className="hero-section-custom">
        <h1>
          <span>سفر</span>
          <span className="highlight">دانه تا فنجان</span>
        </h1>
        <p>هر قدم یک داستان، هر فنجان یک تجربه</p>
      </div>

      <div className="journey-timeline">
        {/* مسیر اصلی */}
        <div className="timeline-path">
          {COFFEE_JOURNEY.map((step, index) => {
            const isActive = index === activeStep;
            const isDone = index < activeStep;

            return (
              <div key={step.id} className="journey-node">
                {/* دایره بیرونی با افکت */}
                <div 
                  className={`node-circle ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  style={{ '--node-color': step.color }}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="node-icon">{step.icon}</span>
                  <span className="node-label">{step.label}</span>
                  {isActive && <div className="node-ripple"></div>}
                </div>

                {/* خط اتصال */}
                {index < COFFEE_JOURNEY.length - 1 && (
                  <div className="node-connector">
                    <div className={`connector-line ${isDone ? 'filled' : ''}`}>
                      <div className="connector-dot"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* نمایشگر اطلاعات */}
        <div className="journey-display">
          <div className="display-card" key={activeStep}>
            <div className="display-icon">{COFFEE_JOURNEY[activeStep].icon}</div>
            <div className="display-content">
              <span className="display-step">مرحله {activeStep + 1}</span>
              <h2>{COFFEE_JOURNEY[activeStep].title}</h2>
              <p>{COFFEE_JOURNEY[activeStep].desc}</p>
            </div>
            <div 
              className="display-accent"
              style={{ background: COFFEE_JOURNEY[activeStep].color }}
            ></div>
          </div>
        </div>

        {/* ناوبری */}
        <div className="journey-nav">
          {COFFEE_JOURNEY.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === activeStep ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}