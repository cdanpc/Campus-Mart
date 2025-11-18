import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { CartProvider } from '../context/CartContext.jsx'

import LandingPage from '../pages/public/LandingPage.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

import CartPage from '../pages/app/CartPage.jsx'
import DashboardPage from '../pages/app/DashboardPage.jsx'
import AppLayout from '../components/layout/AppLayout.jsx'
import PublicLayout from '../components/layout/PublicLayout.jsx'

export default function AppRoutes() {
	return (
		<AuthProvider>
			<CartProvider>
				<BrowserRouter>
					<Routes>

						{/* Landing page */}
						<Route index element={<LandingPage />} />

						{/* Public pages (login, register) */}
						<Route element={<PublicLayout />}>
							<Route path="login" element={<LoginPage />} />
							<Route path="register" element={<RegisterPage />} />
						</Route>

						{/* Protected pages (require login) */}
						<Route element={<ProtectedRoute />}>
							<Route path="/app" element={<AppLayout />}>
								
								{/* Default dashboard on /app */}
								<Route index element={<DashboardPage />} />
								<Route path="cart" element={<CartPage />} />
							</Route>
						</Route>

						{/* Catch-all 404 */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</AuthProvider>
	)
}
