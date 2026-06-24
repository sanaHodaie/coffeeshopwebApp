import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* سایدبار */}
      <aside className="w-full md:w-64 bg-white shadow-lg border-b md:border-l border-stone-200 p-4 md:p-6 flex flex-col">
        <div className="text-2xl font-bold text-amber-800 mb-6 text-center md:text-right">☕ کافه</div>
        
        <nav className="flex-1 space-y-2">
          <Link to="/admin" className="block p-3 rounded-xl hover:bg-amber-50 text-amber-800 font-medium transition">
            📊 داشبورد
          </Link>
          <Link to="/admin/products" className="block p-3 rounded-xl hover:bg-amber-50 text-amber-800 font-medium transition">
            ☕ محصولات
          </Link>
          <Link to="/admin/orders" className="block p-3 rounded-xl hover:bg-amber-50 text-amber-800 font-medium transition">
            📦 سفارشات
          </Link>
          <Link to="/admin/settings" className="block p-3 rounded-xl hover:bg-amber-50 text-amber-800 font-medium transition">
            ⚙️ تنظیمات
          </Link>
        </nav>

        <div className="border-t border-stone-200 pt-4 mt-4">
          <div className="text-sm text-stone-600 mb-2 text-center md:text-right">
            👤 {user?.name || 'مدیر'}
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 border border-red-200 py-2 rounded-xl hover:bg-red-100 transition"
          >
            🚪 خروج
          </button>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}