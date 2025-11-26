import { Outlet } from 'react-router-dom'
import { HeaderProvider } from '../../context/HeaderContext.jsx'
import Sidebar from './Sidebar.jsx'
import AppHeader from './AppHeader.jsx'
import '../../styles/pages/app.css'

export default function AppLayout() {
	return (
		<HeaderProvider>
			<div className="layout-app">
				<Sidebar />
				<div className="layout-app__content">
					<AppHeader />
					<main className="app-main">
						<Outlet />
					</main>
				</div>
			</div>
		</HeaderProvider>
	)
}

