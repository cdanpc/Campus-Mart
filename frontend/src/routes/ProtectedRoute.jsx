import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute() {
	const { isAuthenticated, loading } = useAuth()
	if (loading) return <div style={{ padding: 24 }}>Loading…</div>
	if (!isAuthenticated) return <Navigate to="/login" replace />
	return <Outlet />
}

