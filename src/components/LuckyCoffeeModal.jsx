import { useState, useEffect } from "react";
import { products } from "../data/products";
import "./LuckyCoffeeModal.css";

export default function LuckyCoffeeModal({ onClose, addToCart }) {
  const [luckyCoffee, setLuckyCoffee] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [diceRotation, setDiceRotation] = useState(0);

  const drinkProducts = products.filter(p => p.category === "hot" || p.category === "cold");

  const spinLucky = () => {
    setIsSpinning(true);
    setShowConfetti(false);
    
    // انیمیشن تاس
    let rotations = 0;
    const interval = setInterval(() => {
      rotations += 90;
      setDiceRotation(rotations);
    }, 100);
    
    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * drinkProducts.length);
      const selected = drinkProducts[randomIndex];
      setLuckyCoffee(selected);
      setDiscountPrice(Math.floor(selected.price * 0.5));
      setIsSpinning(false);
      setShowConfetti(true);
      setDiceRotation(0);
      
      // حذف بادکنک‌ها بعد از 3 ثانیه
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    spinLucky();
  }, []);

  const handleAddToCart = () => {
    if (luckyCoffee) {
      addToCart({
        ...luckyCoffee,
        price: discountPrice,
        isLucky: true,
        originalPrice: luckyCoffee.price
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="lucky-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        {/* بادکنک‌ها و بادبادک‌ها */}
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="confetti"
                style={{
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 0.5 + "s",
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  width: Math.random() * 10 + 5 + "px",
                  height: Math.random() * 10 + 5 + "px"
                }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div 
                key={`balloon-${i}`}
                className="balloon"
                style={{
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 1 + "s",
                  animationDuration: 2 + Math.random() * 2 + "s"
                }}
              >
                🎈
              </div>
            ))}
            {[...Array(5)].map((_, i) => (
              <div 
                key={`kite-${i}`}
                className="kite"
                style={{
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 1.5 + "s",
                  animationDuration: 3 + Math.random() * 2 + "s"
                }}
              >
                🪁
              </div>
            ))}
            <div className="sparkle">✨</div>
            <div className="sparkle2">🎉</div>
          </div>
        )}
        
        <div className="lucky-icon">
          {isSpinning ? (
            <div 
              className="dice-3d" 
              style={{ transform: `rotateX(${diceRotation}deg) rotateY(${diceRotation * 1.5}deg)` }}
            >
              🎲
            </div>
          ) : (
            <div className="winner-icon">🏆</div>
          )}
        </div>
        
        <h2 className="lucky-title">
          {isSpinning ? "در حال تاس انداختن..." : "تبریک! برنده شدی! 🎉"}
        </h2>
        
        {isSpinning ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>در حال انتخاب قهوه شانس...</p>
          </div>
        ) : (
          <div className="lucky-result">
            <div className="result-emoji">{luckyCoffee?.emoji}</div>
            <div className="result-name">{luckyCoffee?.name}</div>
            <div className="result-price">
              <span className="old-price">{luckyCoffee?.price.toLocaleString()} تومان</span>
              <span className="new-price">{discountPrice.toLocaleString()} تومان</span>
              <span className="discount-badge">۵۰٪ تخفیف</span>
            </div>
            <div className="result-description">{luckyCoffee?.description}</div>
            <div className="result-buttons">
              <button className="spin-again" onClick={spinLucky}>🎲 دوباره امتحان کن</button>
              <button className="add-to-cart" onClick={handleAddToCart}>🛒 افزودن به سبد</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}