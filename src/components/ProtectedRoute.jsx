/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}