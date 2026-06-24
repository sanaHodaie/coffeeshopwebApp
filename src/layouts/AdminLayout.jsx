import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLayout.css';

export default function AdminLayout({ darkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // تشخیص مسیر فعال
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`admin-layout-wrapper ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="sidebar-logo">☕ کافه</div>
          <nav className="sidebar-nav">
            <Link 
              to="/admin" 
              className={isActive('/admin') ? 'active' : ''}
            >
              📊 داشبورد
            </Link>
            <Link 
              to="/admin/products" 
              className={isActive('/admin/products') ? 'active' : ''}
            >
              ☕ محصولات
            </Link>
            <Link 
              to="/admin/orders" 
              className={isActive('/admin/orders') ? 'active' : ''}
            >
              📦 سفارشات
            </Link>
            <Link 
              to="/admin/settings" 
              className={isActive('/admin/settings') ? 'active' : ''}
            >
              ⚙️ تنظیمات
            </Link>
          </nav>
          <div className="sidebar-user">
            <div className="user-name">{user?.name}</div>
            <button onClick={handleLogout} className="logout-btn">خروج</button>
          </div>
        </aside>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}