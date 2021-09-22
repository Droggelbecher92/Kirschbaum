import { Redirect, Route } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute({ adminOnly, ...props }) {
  const { user } = useAuth()
  if (!user) {
    return <Redirect to="/login" />
  }

  if (adminOnly && user.role !== 'admin') {
    return <Redirect to="/" />
  }

  return <Route {...props} />
}
