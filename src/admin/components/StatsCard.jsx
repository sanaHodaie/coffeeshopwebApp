/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import React from 'react';
import './StatsCard.css';

export default function StatsCard({ title, value, icon, trend, delay = 0 }) {
  return (
    <motion.div 
      className="stats-card-container glass-effect"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      id={`stats-card-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="stats-card-header">
        <span className="stats-card-title">{title}</span>
        <div className="stats-card-icon-wrapper neon-glow">
          {icon}
        </div>
      </div>

      <div className="stats-card-body">
        <h4 className="stats-card-value">{value}</h4>
        
        {trend && (
          <div className={`stats-card-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            <span className="trend-arrow">{trend.isPositive ? '↑' : '↓'}</span>
            <span className="trend-value">{trend.value}</span>
            <span className="trend-text">نسبت به دیروز</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
