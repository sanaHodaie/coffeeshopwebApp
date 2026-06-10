import { useState, useEffect } from "react";
import { products } from "./data/products";
import Header from "./components/Header";
import MenuPage from "./components/Pages/MenuPage";
import HomePage from "./components/Pages/HomePage";
import ContactPage from "./components/Pages/ContactPage";
import AboutPage from "./components/Pages/AboutPage";
import CartModal from "./components/CartModal";
import ProductModal from "./components/ProductModal";
import Timeline from "./components/Timeline";
import FloatingCoffeeBeans from "./components/FloatingCoffeeBeans";
import FunMenuModal from "./components/FunMenuModal";
import LuckyCoffeeModal from "./components/LuckyCoffeeModal";
import BuildCoffeeModal from "./components/BuildCoffeeModal";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });
  const [activePage, setActivePage] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user] = useState({ name: "مهمان" });
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const [orderStatus, setOrderStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // State های جدید برای منوی سرگرمی
  const [showFunMenu, setShowFunMenu] = useState(false);
  const [showLuckyModal, setShowLuckyModal] = useState(false);
  const [showBuildModal, setShowBuildModal] = useState(false);

  // اسکرول به بالا
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 1500);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      showNotification(`${product.name} تعداد افزایش یافت +1`, "success");
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showNotification(`${product.name} به سبد خرید افزوده شد`, "success");
    }
  };

  const removeFromCart = (productId, productName) => {
    setCart(cart.filter(item => item.id !== productId));
    showNotification(`${productName} از سبد خرید حذف شد`, "remove");
  };

  const updateQuantity = (productId, newQuantity, productName, action) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, productName);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
      if (action === 'increase') {
        showNotification(`${productName} تعداد افزایش یافت +1`, "success");
      } else if (action === 'decrease') {
        showNotification(`${productName} تعداد کاهش یافت -1`, "remove");
      }
    }
  };

  const finalizeOrder = () => {
    if (cart.length === 0) {
      showNotification("سبد خرید شما خالی است!", "error");
      return;
    }
    
    setShowCart(false);
    showNotification("سفارش شما با موفقیت ثبت شد!", "order");
    
    setTimeout(() => {
      setProgress(0);
      setOrderStatus('preparing');
      setShowTimeline(true);
      setCart([]);
      localStorage.removeItem("cart");
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setOrderStatus('ready');
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }, 1500);
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = cart.reduce((sum, item) => {
    return sum + ((item.price || 0) * (item.quantity || 0));
  }, 0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showNotification(darkMode ? "حالت روشن فعال شد" : "حالت تیره فعال شد", "success");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // توابع منوی سرگرمی
  const handleFunMenuClick = () => {
    setShowFunMenu(true);
  };

  const handleSelectLucky = () => {
    setShowFunMenu(false);
    setShowLuckyModal(true);
  };

  const handleSelectBuild = () => {
    setShowFunMenu(false);
    setShowBuildModal(true);
  };

// تابع دانلود PDF
const downloadPDF = async () => {
  if (cart.length === 0) {
    showNotification("سبد خرید خالی است!", "error");
    return;
  }

  // فقط همین خط اضافه شد (قبل از هر چیزی)
  showNotification("در حال آماده‌سازی فاکتور... ☕", "info");

  const now = new Date();
  const timeString = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

  const getSizeName = (size) => {
    if (!size) return "";
    switch(size) {
      case "small": return "کوچک";
      case "medium": return "متوسط";
      case "large": return "بزرگ";
      default: return "";
    }
  };

  const getAddonsText = (addonsNames) => {
    if (!addonsNames || addonsNames.length === 0) return "-";
    return addonsNames.join(" + ");
  };

  const element = document.createElement('div');
  element.style.width = '800px';
  element.style.padding = '30px';
  element.style.backgroundColor = 'white';
  element.style.direction = 'rtl';
  element.style.fontFamily = 'Vazirmatn, Vazir, system-ui, sans-serif';
  element.style.position = 'absolute';
  element.style.left = '-9999px';  // فقط این خط اضافه شد (مخفی کردن)
  element.style.top = '-9999px';   // فقط این خط اضافه شد (مخفی کردن)
  
  element.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid #c68642; padding-bottom: 15px; margin-bottom: 25px;">
      <img src="/images/logo.webp" style="width: 180px; margin-bottom: 10px;" />
      <p style="color: #666; margin: 0; font-size: 16px;">فاکتور خرید</p>
    </div>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin-bottom: 25px;">
      <p style="margin: 8px 0; font-size: 14px;">📅 تاریخ: ${new Date().toLocaleDateString('fa-IR')}</p>
      <p style="margin: 8px 0; font-size: 14px;">⏰ زمان ثبت: ${timeString}</p>
      <p style="margin: 8px 0; font-size: 14px;">🧾 شماره سفارش: #${Math.floor(Math.random() * 100000)}</p>
      <p style="margin: 8px 0; font-size: 14px;">👤 مشتری: ${user?.name || "مهمان عزیز"}</p>
      <p style="margin: 8px 0; font-size: 14px;">📊 وضعیت سفارش: تکمیل شده ✅</p>
      <p style="margin: 8px 0; font-size: 14px;">💳 روش پرداخت: نقدی</p>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      <thead>
        <tr style="background: #c68642; color: white;">
          <th style="padding: 10px; text-align: center; font-size: 14px;">نام محصول</th>
          <th style="padding: 10px; text-align: center; font-size: 14px;">سایز</th>
          <th style="padding: 10px; text-align: center; font-size: 14px;">تعداد</th>
          <th style="padding: 10px; text-align: center; font-size: 14px;">قیمت واحد</th>
          <th style="padding: 10px; text-align: center; font-size: 14px;">مجموع</th>
          <th style="padding: 10px; text-align: center; font-size: 14px;">افزودنی‌ها</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; text-align: center; font-size: 13px;">${item.name}${item.size ? ` (${getSizeName(item.size)})` : ''}${item.isLucky ? ' 🎲' : ''}${item.isCustom ? ' 🎨' : ''}</td>
            <td style="padding: 8px; text-align: center; font-size: 13px;">${item.size ? getSizeName(item.size) : '-'}</td>
            <td style="padding: 8px; text-align: center; font-size: 13px;">${item.quantity}</td>
            <td style="padding: 8px; text-align: center; font-size: 13px;">${item.price.toLocaleString()} تومان</td>
            <td style="padding: 8px; text-align: center; font-size: 13px;">${(item.price * item.quantity).toLocaleString()} تومان</td>
            <td style="padding: 8px; text-align: center; font-size: 13px;">${getAddonsText(item.addonsNames)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div style="display: flex; justify-content: space-between; border-top: 2px solid #c68642; padding-top: 12px; margin-bottom: 25px;">
      <span style="font-weight: bold; color: #c68642; font-size: 16px;">مجموع کل:</span>
      <span style="font-weight: bold; color: #c68642; font-size: 16px;">${totalPrice.toLocaleString()} تومان</span>
    </div>
    
    <div style="text-align: center; background: #fef3c7; padding: 12px; border-radius: 10px; margin-bottom: 20px;">
      <p style="color: #c68642; font-weight: bold; margin: 5px 0; font-size: 14px;">❤️ از خرید شما متشکریم ❤️</p>
      <p style="color: #666; font-size: 12px; margin: 5px 0;">امیدواریم دوباره شما را در کافه قهوه ببینیم</p>
    </div>

    <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 10px;">کافه قهوه - بهترین طعم‌ها در کنار شما</p>
    </div>
  `;

  document.body.appendChild(element);
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`فاکتور-${Date.now()}.pdf`);
    
    showNotification("فاکتور با موفقیت دانلود شد", "success");
  } catch (error) {
    console.error("PDF Error:", error);
    showNotification("خطا در ایجاد فاکتور: " + error.message, "error");
  } finally {
    document.body.removeChild(element);
  }
};
  const renderPage = () => {
    switch(activePage) {
      case "menu": 
        return <MenuPage 
          products={products}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={addToCart}
          handleProductClick={handleProductClick}
        />;
      case "home": return <HomePage />;
      case "contact": return <ContactPage />;
      case "about": return <AboutPage />;
      default: return <MenuPage />;
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <FloatingCoffeeBeans />
      
      <div className="dark-mode-toggle">
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {showScrollTop && (
        <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      )}

      {notification.show && (
        <div className="notification-overlay">
          <div className={`notification-card ${notification.type === 'error' ? 'error-card' : ''}`}>
            <div className="checkmark-wrapper">
              {notification.type === 'success' && (
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              )}
              {notification.type === 'order' && (
                <svg className="checkmark order-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              )}
              {notification.type === 'remove' && (
                <svg className="checkmark remove-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="remove-x" fill="none" d="M18 18 L34 34 M34 18 L18 34" />
                </svg>
              )}
              {notification.type === 'error' && (
                <svg className="checkmark error-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="error-x" fill="none" d="M18 18 L34 34 M34 18 L18 34" />
                </svg>
              )}
            </div>
            <p className="notification-message">{notification.message}</p>
          </div>
        </div>
      )}

      <Header 
        totalItems={totalItems}
        onCartClick={() => setShowCart(true)}
        activePage={activePage}
        onPageChange={setActivePage}
        onFunMenuClick={handleFunMenuClick}
      />

      <main className="main-content">
        {renderPage()}
        <footer className="footer">
          <p>© 2025 کافه قهوه - تمام حقوق محفوظ است</p>
        </footer>
      </main>

      {showCart && (
        <CartModal 
          cart={cart}
          totalItems={totalItems}
          totalPrice={totalPrice}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          finalizeOrder={finalizeOrder}
          onClose={() => setShowCart(false)}
          onDownloadPDF={downloadPDF}
        />
      )}

      {showModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          addToCart={addToCart}
          onClose={() => setShowModal(false)}
        />
      )}

      {showTimeline && orderStatus && (
        <Timeline 
          orderStatus={orderStatus}
          progress={progress}
          onClose={() => setShowTimeline(false)}  // این خط رو اضافه کن
        />
      )}

      {/* مودال منوی سرگرمی */}
      {showFunMenu && (
        <FunMenuModal 
          onClose={() => setShowFunMenu(false)}
          onSelectLucky={handleSelectLucky}
          onSelectBuild={handleSelectBuild}
        />
      )}

      {/* مودال قهوه شانس */}
      {showLuckyModal && (
        <LuckyCoffeeModal 
          onClose={() => setShowLuckyModal(false)}
          addToCart={addToCart}
        />
      )}

      {/* مودال قهوه‌ات رو بساز */}
          
    {showBuildModal && (
  <BuildCoffeeModal 
    onClose={() => setShowBuildModal(false)}
    addToCart={addToCart}
  />
)}
    </div>
  );
}

export default App;