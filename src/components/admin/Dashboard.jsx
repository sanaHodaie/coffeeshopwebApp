import './Dashboard.css';

export default function Dashboard() {
  return (
    <div>
      <h1 className="dashboard-title">📊 داشبورد</h1>
      <div className="dashboard-divider"></div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">۱۲</div>
          <div className="stat-label">محصولات فعال</div>
          <div className="stat-footer">آخرین آپدیت: امروز</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">۳۴</div>
          <div className="stat-label">سفارشات امروز</div>
          <div className="stat-footer">۳ سفارش جدید</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">۱۴</div>
          <div className="stat-label">کاربران</div>
          <div className="stat-footer">۲ کاربر آنلاین</div>
        </div>
      </div>
    </div>
  );
}