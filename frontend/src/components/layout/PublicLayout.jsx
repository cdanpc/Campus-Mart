import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader.jsx'
import '../../styles/pages/public.css'

export default function PublicLayout() {
	return (
		<div className="layout-public" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
			<PublicHeader />
			<main style={{ flex: 1, padding: 16, background: 'var(--bg-page)' }}>
				<div className="surface" style={{ padding: 16 }}>
					<Outlet />
				</div>
			</main>
		</div>
	)
}

