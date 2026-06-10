import "./CartModal.css";

export default function CartModal({ 
  cart, 
  totalItems, 
  totalPrice, 
  updateQuantity, 
  removeFromCart, 
  finalizeOrder, 
  onClose,
  onDownloadPDF
}) {
  const handleDownload = () => {
    if (onDownloadPDF) {
      onDownloadPDF();
    } else {
      console.log("تابع دانلود تعریف نشده است");
    }
  };

  // تابع تبدیل سایز به فارسی
  const getSizeName = (size) => {
    if (!size) return "";
    switch(size) {
      case "small": return "کوچک";
      case "medium": return "متوسط";
      case "large": return "بزرگ";
      default: return "";
    }
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>🛒 سبد خرید ({totalItems})</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <span className="cart-item-name">
                {item.name}
                {item.size && (
                  <span className="item-size">
                    ({item.size === "small" ? "کوچک" : item.size === "medium" ? "متوسط" : "بزرگ"})
                  </span>
                )}
              </span>
              {item.addonsNames && item.addonsNames.length > 0 && (
                <span className="item-addons">
                   {item.addonsNames.join("+")}
                </span>
              )}
              <span className="cart-item-price">{item.price.toLocaleString()} تومان</span>
            </div>
              <div className="cart-item-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.name, 'decrease')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.name, 'increase')}>+</button>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id, item.name)}>🗑️</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <span>مجموع:</span>
            <span>{totalPrice.toLocaleString()} تومان</span>
          </div>
      <button className="cart-checkout" onClick={finalizeOrder}>نهایی کردن سفارش</button>
      <button 
        className="pdf-btn"
        onClick={() => {
          onDownloadPDF();
        }}
      >
        📄 دانلود فاکتور PDF
      </button>
        </div>
      </div>
    </div>
  );
}