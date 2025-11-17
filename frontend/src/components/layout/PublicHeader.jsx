import { Link } from 'react-router-dom'

export default function PublicHeader() {
	return (
		<header
			style={{
				background: 'var(--bg-surface)',
				borderBottom: '1px solid var(--border-color)',
				padding: '12px 16px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<div style={{ fontWeight: 800, fontSize: 20 }}>CampusMart</div>
			<nav style={{ display: 'flex', gap: 12 }}>
				<Link to="/login">Login</Link>
				<Link className="btn-primary" to="/app" style={{ padding: '8px 12px' }}>
					Explore
				</Link>
			</nav>
		</header>
	)
}

