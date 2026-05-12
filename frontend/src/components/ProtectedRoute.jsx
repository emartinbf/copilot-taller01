import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

/**
 * Wraps a route element and redirects to /login
 * if the user does not have a valid session token.
 */
export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}
