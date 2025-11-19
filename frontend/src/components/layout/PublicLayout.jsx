import { Outlet, useLocation } from 'react-router-dom'
import PublicHeader from './PublicHeader.jsx'
import '../../styles/pages/public.css'

export default function PublicLayout() {
	const { pathname } = useLocation()
	const isAuth = pathname === '/login' || pathname === '/register'
	return (
		<div className="layout-public" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
			{!isAuth && <PublicHeader />}
			<main style={{ flex: 1, padding: 16, background: 'var(--bg-page)' }}>
				{/* Auth pages: no outer surface wrapper */}
				{isAuth
					? <Outlet />
					: (
						<div className="surface" style={{ padding: 16 }}>
							<Outlet />
						</div>
					)}
			</main>
		</div>
	)
}

