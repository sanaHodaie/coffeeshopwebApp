import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // شبیه‌سازی درخواست به سرور
    setTimeout(() => {
      if (email === 'admin@cafe.com' && password === 'admin123') {
        login({ email, name: 'مدیر کافه', role: 'admin' });
        navigate('/admin');
      } else {
        setError('❌ ایمیل یا رمز عبور اشتباه است!');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200/50">
          <div className="text-center mb-8">
            <div className="text-5xl mb-2">☕</div>
            <h1 className="text-3xl font-bold text-amber-800">کافه قهوه</h1>
            <p className="text-stone-500 mt-1">ورود به پنل مدیریت</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">📧 ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                placeholder="admin@cafe.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">🔒 رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-700/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ در حال ورود...' : '🚪 ورود به پنل ادمین'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-stone-400">
            <p>برای تست: admin@cafe.com | admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}