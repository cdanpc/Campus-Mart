import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import AppHeader from './AppHeader.jsx'
import '../../styles/pages/app.css'

export default function AppLayout() {
	return (
		<div
			className="layout-app"
			style={{
				display: 'flex',
				minHeight: '100vh',
				width: '100%',
				margin: 0,
				padding: 0,
				overflow: 'hidden'
			}}
		>
			<Sidebar />
			<div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
				<AppHeader />
				<main
					className="app-main"
					style={{
						padding: 16,
						background: 'var(--bg-page)',
						flex: 1,
						overflow: 'auto'
					}}
				>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

