
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

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
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">☕</div>
            <h1 className="login-title">کافه قهوه</h1>
            <p className="login-subtitle">ورود به پنل مدیریت</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="login-error">{error}</div>}

            <div className="form-group">
              <label className="form-label">📧 ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@cafe.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">🔒 رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? '⏳ در حال ورود...' : '🚪 ورود به پنل ادمین'}
            </button>
          </form>

          <div className="login-footer">
            <p>برای تست: admin@cafe.com | admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}