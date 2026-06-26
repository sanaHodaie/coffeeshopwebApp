import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { useProducts } from '../../hooks/useProducts';
import "./MenuPage.css";

export default function MenuPage({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  addToCart,
  handleProductClick 
}) {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = [
    { id: "all", name: "همه", icon: "📋" },
    { id: "hot", name: "قهوه گرم", icon: "☕" },
    { id: "cold", name: "قهوه سرد", icon: "🧊" },
    { id: "dessert", name: "شیرینی", icon: "🍰" }
  ];

  useEffect(() => {
    const filtered = products.filter(product => {
      const isActive = product.status === undefined || product.status === 'active';
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name.includes(searchTerm) || 
                            (product.description && product.description.includes(searchTerm));
      return isActive && matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="hero-title-main">قهوه‌های</span>
          <span className="hero-title-accent">خاص</span>
        </h1>
        <p className="hero-subtitle">
          تجربه‌ای متفاوت از طعم و عطر قهوه
        </p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 جستجوی محصول..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          autoFocus
        />
      </div>

      <div className="category-buttons">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setSelectedCategory(cat.id);
            }}
          >
            <span className="category-icon">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <span>🔍</span>
          <p>محصولی یافت نشد!</p>
        </div>
      )}
    </>
  );
}