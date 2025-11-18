import { Outlet } from 'react-router-dom'
import '../../styles/pages/auth.css'

export default function AuthLayout() {
	return (
		<div className="layout-auth" style={{ minHeight: '100%', display: 'grid', placeItems: 'center', background: 'var(--bg-page)' }}>
			<div className="surface auth-card" style={{ width: 420, maxWidth: '92vw', padding: '32px 30px' }}>
				<Outlet />
			</div>
		</div>
	)
}

