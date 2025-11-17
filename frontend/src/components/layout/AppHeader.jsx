import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import Button from '../common/Button.jsx'
import { IconCart, IconBell, IconPlus } from '../common/icons.jsx'

export default function AppHeader() {
	const { user } = useAuth()
	const { totalItems } = useCart()

	return (
		<header
			style={{
				background: 'var(--bg-surface)',
				borderBottom: '1px solid var(--border-color)',
				padding: '10px 16px',
				display: 'flex',
				alignItems: 'center',
				gap: 12,
			}}
		>
			<input
				placeholder="Search for textbooks, electronics…"
				style={{
					flex: 1,
					border: '1px solid var(--border-color)',
					borderRadius: 12,
					padding: '10px 12px',
					background: 'var(--bg-subtle)',
					color: 'var(--text-primary)',
				}}
			/>
			<Button as={Link} to="/app/post" leftIcon={<IconPlus />}>Post an Item</Button>
			<Link to="/app/cart" style={{ position: 'relative', padding: '6px 8px', display: 'inline-flex' }} title="Cart">
				<IconCart />
				{totalItems > 0 && (
					<span
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							transform: 'translate(40%, -40%)',
							background: 'var(--color-danger-500)',
							color: 'white',
							fontSize: 10,
							borderRadius: 999,
							padding: '2px 6px',
						}}
					>
						{totalItems}
					</span>
				)}
			</Link>
			<Link to="/notifications" title="Notifications" style={{ padding: '6px 8px', display: 'inline-flex' }}>
				<IconBell />
			</Link>
			<div title={user?.email} style={{
				width: 32, height: 32, borderRadius: 999,
				background: 'var(--color-primary-600)', color: 'white',
				display: 'grid', placeItems: 'center', fontWeight: 700
			}}>
				{user?.name?.[0]?.toUpperCase() || 'U'}
			</div>
		</header>
	)
}

