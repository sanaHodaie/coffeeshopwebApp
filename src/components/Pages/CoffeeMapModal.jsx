import { useState } from "react";
import "./CoffeeMapModal.css";

export default function CoffeeMapModal({ onClose }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

 const countries = [
  {
    id: 1,
    name: "کلمبیا",
    nameEn: "Colombia",
    position: { top: "62%", left: "29%" },  // ← اصلاح شده (پایین‌تر و چپ‌تر)
    coffee: {
      name: "قهوه کلمبیا",
      type: "عربیکا سوپremo",
      flavor: "شکلاتی، گردویی، کاراملی",
      acidity: "متوسط",
      body: "سنگین و مخملی",
      description: "یکی از معروف‌ترین قهوه‌های جهان با طعم متعادل و عطر بینظیر",
      bestFor: "اسپرسو و فرنچ پرس"
    }
  },
  {
    id: 2,
    name: "برزیل",
    nameEn: "Brazil",
    position: { top: "72%", left: "50%" },  // ← اصلاح شده (پایین‌تر و راست‌تر)
    coffee: {
      name: "قهوه برزیل",
      type: "عربیکا - بوربون",
      flavor: "فندقی، شکلات شیری، شیرین",
      acidity: "کم",
      body: "نرم و کرمی",
      description: "دانه‌های نرم با طعم شیرین و بادی ملایم",
      bestFor: "اسپرسو و قهوه ترک"
    }
  },
  {
    id: 3,
    name: "اتیوپی",
    nameEn: "Ethiopia",
    position: { top: "30%", left: "55%" },  // ← اصلاح شده
    coffee: {
      name: "قهوه اتیوپی",
      type: "عربیکا - یرگاچفی",
      flavor: "یاسمن، مرکبات، چای سبز",
      acidity: "بالا",
      body: "سبک و ظریف",
      description: "محل تولد قهوه با طعم‌های گلی و میوه‌ای منحصر‌بفرد",
      bestFor: "کمکس و وِرو ۶۰"
    }
  },
  {
    id: 4,
    name: "یمن",
    nameEn: "Yemen",
    position: { top: "48%", left: "60%" },  // ← اصلاح شده
    coffee: {
      name: "قهوه یمن",
      type: "عربیکا - مطری",
      flavor: "ادویه، شکلات تلخ، شرابی",
      acidity: "متوسط",
      body: "سنگین و پیچیده",
      description: "کهن‌ترین قهوه تجاری جهان با طعم شرابی و ادویه‌ای",
      bestFor: "قهوه ترک و دَلّه"
    }
  },
  {
    id: 5,
    name: "هند",
    nameEn: "India",
    position: { top: "39%", left: "72%" },  // ← اصلاح شده
    coffee: {
      name: "قهوه هند",
      type: "رابوستا - مونسونمالابار",
      flavor: "ادویه گرم، چوب صندل، خاک",
      acidity: "کم",
      body: "سنگین",
      description: "قهوه مونسون با طعم خاکی و ادویه‌ای منحصر‌بفرد",
      bestFor: "اسپرسو و ترکیب با شیر"
    }
  },
  {
    id: 6,
    name: "اندونزی",
    nameEn: "Indonesia",
    position: { top: "73%", left: "82%" },  // ← اصلاح شده
    coffee: {
      name: "قهوه سوماترا",
      type: "عربیکا - ماندلینگ",
      flavor: "چوب سدر، گیاهان، شکلات تلخ",
      acidity: "کم",
      body: "بسیار سنگین",
      description: "بدنه سنگین با طعم خاکی و گیاهان جنگلی",
      bestFor: "اسپرسو و فرنچ پرس"
    }
  },
  {
    id: 7,
    name: "کنیا",
    nameEn: "Kenya",
    position: { top: "38%", left: "58%" },  // ← اصلاح شده
    coffee: {
      name: "قهوه کنیا",
      type: "عربیکا - اس ال ۲۸",
      flavor: "تمشک، گریپ‌فروت، توت‌سیاه",
      acidity: "بسیار بالا",
      body: "متوسط و شفاف",
      description: "طعم‌های میوه‌ای و اسیدیته پیچیده و درخشان",
      bestFor: "کمکس و وِرو ۶۰"
    }
  },
  {
    id: 8,
    name: "کاستاریکا",
    nameEn: "Costa Rica",
    position: { top: "32%", left: "27%" },  // ← اصلاح شده (بالاتر و چپ‌تر)
    coffee: {
      name: "قهوه کاستاریکا",
      type: "عربیکا - سحرآمیز",
      flavor: "عسل، میوه زرد، شکلات سفید",
      acidity: "متوسط",
      body: "کرمی و نرم",
      description: "طعم متعادل و شیرین با نت‌های عسلی",
      bestFor: "کمکس و اسپرسو"
    }
  }
];

  const handleMouseEnter = (country, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredCountry(country);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <div className="coffee-map-modal-overlay" onClick={onClose}>
      <div className="coffee-map-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="coffee-map-modal-content">
          <button className="coffee-map-modal-close" onClick={onClose}>✕</button>
          
          <div className="coffee-map-header">
            <span className="coffee-map-icon">🌍</span>
            <h2 className="coffee-map-title">مبدا قهوه‌های جهان</h2>
            <p className="coffee-map-subtitle">از مزارع معروف دنیا تا فنجان شما</p>
          </div>

          <div className="world-map-container">
            {/* تصویر نقشه واقعی - عکسی که از چت جی پی تی گرفتی اینجا قرار میگیره */}
            <img 
              src="/images/Earth.webp" 
              alt="نقشه مبدا قهوه جهان"
              className="world-map-image"
            />
            
            {/* نقاط روی نقشه */}
            <div className="map-pins-overlay">
              {countries.map(country => (
                <div
                  key={country.id}
                  className="map-pin-point"
                  style={{ 
                    position: 'absolute',
                    top: country.position.top,
                    left: country.position.left,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => handleMouseEnter(country, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="pin-dot"></div>
                  <span className="pin-label">{country.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* راهنما */}
          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-dot"></span>
              <span>مناطق تولید قهوه</span>
            </div>
            <div className="legend-item">
              <span className="legend-line"></span>
              <span>مناطق اصلی کشت</span>
            </div>
          </div>

          {/* تول تیپ اطلاعات قهوه */}
          {hoveredCountry && (
            <div 
              className="coffee-tooltip"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y
              }}
            >
              <div className="tooltip-header">
                <span className="tooltip-location">📍 {hoveredCountry.name}</span>
                <span className="tooltip-name">{hoveredCountry.coffee.name}</span>
              </div>
              <div className="tooltip-body">
                <div className="tooltip-row">
                  <span className="tooltip-label">نوع دانه:</span>
                  <span>{hoveredCountry.coffee.type}</span>
                </div>
                <div className="tooltip-row">
                  <span className="tooltip-label">طعم:</span>
                  <span>{hoveredCountry.coffee.flavor}</span>
                </div>
                <div className="tooltip-row">
                  <span className="tooltip-label">اسیدیته:</span>
                  <span>{hoveredCountry.coffee.acidity}</span>
                </div>
                <div className="tooltip-row">
                  <span className="tooltip-label">بدنه:</span>
                  <span>{hoveredCountry.coffee.body}</span>
                </div>
                <div className="tooltip-desc">
                  {hoveredCountry.coffee.description}
                </div>
                <div className="tooltip-best">
                  ✨ بهترین روش دم‌آوری: {hoveredCountry.coffee.bestFor}
                </div>
              </div>
              <div className="tooltip-arrow"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}