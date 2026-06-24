import { useState } from 'react';
import { products as initialProducts } from '../../data/products';

export default function Products() {
  const [products, setProducts] = useState(initialProducts);

  const deleteProduct = (id) => {
    if (window.confirm('آیا از حذف این محصول مطمئن هستید؟')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800">☕ مدیریت محصولات</h1>
        <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow transition">
          ➕ افزودن محصول جدید
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-amber-50 border-b border-stone-200">
            <tr>
              <th className="p-4 text-right text-sm font-semibold text-amber-800">نام</th>
              <th className="p-4 text-right text-sm font-semibold text-amber-800">قیمت</th>
              <th className="p-4 text-right text-sm font-semibold text-amber-800">مواد اولیه</th>
              <th className="p-4 text-center text-sm font-semibold text-amber-800">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-stone-100 hover:bg-stone-50 transition">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-amber-700 font-bold">{p.price}</td>
                <td className="p-4 text-sm text-stone-600 max-w-[200px] truncate">{p.ingredients}</td>
                <td className="p-4 text-center space-x-2">
                  <button className="text-amber-600 hover:text-amber-800 px-2 py-1 rounded-lg hover:bg-amber-50 transition">
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600 hover:text-red-800 px-2 py-1 rounded-lg hover:bg-red-50 transition"
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
        <div className="text-center py-12 text-stone-500">
          <div className="text-4xl mb-2">📭</div>
          <p>هیچ محصولی یافت نشد!</p>
        </div>
      )}
    </div>
  );
}