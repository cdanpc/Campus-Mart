import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import Button from '../common/Button.jsx'
import { IconCart, IconBell, IconPlus } from '../common/icons.jsx'
import '../../styles/components/app-header.css'
import Logo from '../common/Logo.jsx'

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
				position: 'relative',
				zIndex: 0,
			}}
		>
			{/* Compact search input with icon */}
			<div style={{ position: 'relative', flex: 1, maxWidth: 480, minWidth: 260 }}>
				<span
					style={{
						position: 'absolute',
						left: 14,
						top: '50%',
						transform: 'translateY(-50%)',
						fontSize: 14,
						opacity: 0.6,
						pointerEvents: 'none'
					}}
					aria-hidden="true"
				>
					🔍
				</span>
			</Link>
			{/* Compact search input with icon */}
			<div className="app-header__search">
				<span className="app-header__search-icon" aria-hidden="true">🔍</span>
				<input className="app-header__search-input" placeholder="Search items…" />
			</div>
			<Button as={Link} to="/app/post" leftIcon={<IconPlus />} className="app-header__post-btn">
				Post an Item
			</Button>
			<Link to="/app/cart" className="app-header__icon-link" title="Cart">
				<IconCart />
				{totalItems > 0 && (
					<span className="app-header__cart-badge">{totalItems}</span>
				)}
			</Link>
			<Link to="/notifications" title="Notifications" className="app-header__icon-link">
				<IconBell />
			</Link>
			<Link to="/app/profile" title={user?.name || 'Profile'}>
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        background: 'var(--color-primary-600)',
                        color: 'white',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        cursor: 'pointer' 
                    }}
                >
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
            </Link>
		</header>
	)
}

