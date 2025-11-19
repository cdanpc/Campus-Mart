import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../common/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const sections = [
	{ to: '/app', label: 'All Items' },
	{ to: '/app/cat/textbooks', label: 'Textbooks' },
	{ to: '/app/cat/electronics', label: 'Electronics' },
	{ to: '/app/cat/dorm', label: 'Dorm & Furniture' },
	{ to: '/app/cat/clothing', label: 'Clothing' },
	{ to: '/app/cat/services', label: 'Services' },
	{ to: '/app/cat/commissions', label: 'Commissions' },
	{ to: '/app/cat/food', label: 'Food' },
	{ to: '/app/cat/other', label: 'Other' },
]

export default function Sidebar() {
	const { pathname } = useLocation()
	const { logout } = useAuth()
	const nav = useNavigate()

	return (
		<aside
			style={{
				background: 'var(--sidebar-bg)',
				color: 'var(--sidebar-text)',
				width: 240,
				minWidth:240,
				maxWidth:240,
				padding: 16,
				display: 'flex',
				flexDirection: 'column',
				gap: 8,
				boxSizing: 'border-box',
				margin: 0, // ensure flush
				position: 'sticky',
				top: 0,
				height: '100vh',
				overflowY: 'auto',
				flexShrink: 0,
			}}
		>
			<div style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>CampusMart</div>
			{sections.map((s) => {
				const active = pathname === s.to
				return (
					<Link
						key={s.to}
						to={s.to}
						style={{
							color: 'var(--sidebar-text)',
							background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
							padding: '10px 12px',
							borderRadius: 10,
							fontWeight: active ? 700 : 500,
						}}
					>
						{s.label}
					</Link>
				)
			})}

			<div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
				<div
					className="surface"
					style={{
						background: 'rgba(255,255,255,0.12)',
						border: 'none',
						color: 'var(--sidebar-text)',
						padding: 12,
						borderRadius: 12,
					}}
				>
					<div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Upgrade your Account</div>
					<div style={{ fontSize: 12, opacity: 0.9, marginBottom: 8 }}>Get Free Voucher</div>
					<Button variant="secondary" style={{ background: 'white', color: 'var(--sidebar-bg)' }}>
						Upgrade
					</Button>
				</div>

				{/* Settings + Sign Out */}
				<Link
					to="/app/settings"
					style={{
						color: 'var(--sidebar-text)',
						background: 'transparent',
						padding: '10px 12px',
						borderRadius: 10,
						fontWeight: 600,
						border: '1px dashed rgba(255,255,255,0.25)'
					}}
				>
					Settings
				</Link>
				<button
					onClick={async () => {
						try { await logout() } finally { nav('/login', { replace: true }) }
					}}
					style={{
						background: 'rgba(255,255,255,0.12)',
						color: 'var(--sidebar-text)',
						padding: '10px 12px',
						borderRadius: 10,
						fontWeight: 700,
						border: 'none',
						cursor: 'pointer',
						textAlign: 'left'
					}}
				>
					Sign Out
				</button>
			</div>
		</aside>
	)
}

