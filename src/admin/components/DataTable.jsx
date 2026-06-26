/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import './DataTable.css';

export default function DataTable({
  columns,
  data,
  searchPlaceholder = 'جستجو در لیست...',
  onSearchChange,
  searchValue,
  filterComponent,
  id = 'custom-data-table'
}) {
  return (
    <div className="table-wrapper glass-effect" id={id}>
      {/* هدر بالای جدول: حاوی فیلتر و سرچبار */}
      <div className="table-header-controls" id={`${id}-controls`}>
        {onSearchChange !== undefined && (
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="table-search-input"
              id={`${id}-search`}
            />
          </div>
        )}

        {filterComponent && (
          <div className="table-filter-wrapper">
            {filterComponent}
          </div>
        )}
      </div>

      {/* خود ساختار جدول */}
      <div className="table-scroller">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-right">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={row.id || index} className="table-row">
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data-cell text-center py-8">
                  <div className="no-data-content">
                    <p className="text-lg font-medium text-coffee-dark dark:text-coffee-cream">آیتمی یافت نشد</p>
                    <p className="text-sm text-gray-500 mt-1">تغییری در فیلتر یا جستجو اعمال کنید.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
