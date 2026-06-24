import { useState } from 'react';
import { products as initialProducts } from '../../data/products';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState(initialProducts);

  const deleteProduct = (id) => {
    if (window.confirm('آیا از حذف این محصول مطمئن هستید؟')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="products-header">
        <h1 className="products-title">☕ مدیریت محصولات</h1>
        <button className="add-product-btn">➕ افزودن محصول جدید</button>
      </div>
      <div className="products-divider"></div>

      <div className="products-table-wrap">
        <table className="products-table">
          <thead>
            <tr>
              <th>نام</th>
              <th>قیمت</th>
              <th>مواد اولیه</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="product-name">{p.name}</td>
                <td className="product-price">{p.price}</td>
                <td className="product-ingredients">{p.ingredients}</td>
                <td className="text-center">
                  <button className="action-btn action-btn-edit">✏️</button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="action-btn action-btn-delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>هیچ محصولی یافت نشد!</p>
        </div>
      )}
    </div>
  );
}