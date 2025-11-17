import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { CartProvider } from '../context/CartContext.jsx'
import LandingPage from '../pages/public/LandingPage.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import CartPage from '../pages/app/CartPage.jsx'
import AppLayout from '../components/layout/AppLayout.jsx'
import PublicLayout from '../components/layout/PublicLayout.jsx'

export default function AppRoutes() {
	return (
		<AuthProvider>
			<CartProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<PublicLayout />}>
							<Route index element={<LandingPage />} />
							<Route path="login" element={<LoginPage />} />
						</Route>

						<Route element={<ProtectedRoute />}>
							<Route path="/app" element={<AppLayout />}>
								<Route path="cart" element={<CartPage />} />
							</Route>
						</Route>

						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</AuthProvider>
	)
}

