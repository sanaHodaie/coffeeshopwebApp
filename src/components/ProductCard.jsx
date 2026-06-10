import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="card-image">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x250?text=☕+قهوه";
          }}
        />
        <div className="card-category-badge">
          {product.categoryName}
        </div>
        
        {/* انیمیشن بخار - فقط برای قهوه گرم */}
        {product.category === "hot" && (
          <div className="steam-wrapper">
            <div className="steam-drop steam-drop-1">💨</div>
            <div className="steam-drop steam-drop-2">💨</div>
            <div className="steam-drop steam-drop-3">💨</div>
            <div className="steam-line steam-line-1"></div>
            <div className="steam-line steam-line-2"></div>
            <div className="steam-line steam-line-3"></div>
          </div>
        )}
      </div>
      
      <div className="card-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description.substring(0, 45)}...</p>
        <div className="product-ingredients">
          <span className="ingredients-label">مواد اولیه</span>
          <span>{product.ingredients.substring(0, 35)}...</span>
        </div>
        <div className="product-price">{product.price.toLocaleString()} تومان</div>
        <button className="order-btn" onClick={(e) => {
          e.stopPropagation();
          // به جای addToCart مستقیم، مودال رو باز کن
          onClick(); // این همون handleProductClick هست
        }}>
          سفارش
        </button>
      </div>
    {/* انیمیشن بخار - فقط برای قهوه گرم */}
          {product.category === "hot" && (
            <div className="steam-animation">
              <div className="steam steam-1"></div>
              <div className="steam steam-2"></div>
              <div className="steam steam-3"></div>
            </div>
          )}
    </div>

    
  )
  
}