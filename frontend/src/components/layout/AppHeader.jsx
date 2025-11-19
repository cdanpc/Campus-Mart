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
		<header className="app-header">
			<Link to="/" className="app-header__brand" aria-label="Go to landing page">
				<Logo size={32} />
				<span className="app-header__brand-name">
					<span className="app-header__brand--campus">Campus</span>
					<span className="app-header__brand--mart"> Mart</span>
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
			<div title={user?.name || ''} className="app-header__avatar">
				{user?.name?.[0]?.toUpperCase() || 'U'}
			</div>
		</header>
	)
}

