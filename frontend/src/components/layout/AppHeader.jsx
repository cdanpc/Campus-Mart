import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useHeader } from '../../context/HeaderContext.jsx'
import Button from '../common/Button.jsx'
import HeaderIcon from '../common/HeaderIcon.jsx'
import ProfileAvatarButton from '../common/ProfileAvatarButton.jsx'
import { IconCart, IconBell, IconPlus } from '../common/icons.jsx'
import '../../styles/components/app-header.css'

export default function AppHeader() {
	const { user } = useAuth()
	const { totalItems } = useCart()
	const { extraSlots, layoutMode } = useHeader()

	// Sort slots by position
	const sortedSlots = [...extraSlots].sort((a, b) => a.position - b.position)

	// Base icon class with dashboard modifier
	const iconClass = layoutMode === 'dashboard' ? 'header-icon--dashboard' : ''

	return (
		<header className={`app-header ${layoutMode === 'dashboard' ? 'app-header--dashboard' : ''}`}>
			{/* Search Bar */}
			<div className="app-header__search">
				<span className="app-header__search-icon" aria-hidden="true">
					🔍
				</span>
				<input className="app-header__search-input" placeholder="Search items…" />
			</div>

			{/* Right Actions Group */}
			<div className="app-header__actions">
				{/* Post Button */}
				<Button as={Link} to="/app/post" leftIcon={<IconPlus />} className="app-header__post-btn">
					Post an Item
				</Button>

				{/* Cart Icon */}
				<HeaderIcon
					to="/app/cart"
					icon={IconCart}
					title="Cart"
					badge={totalItems > 0 ? totalItems : null}
					className={iconClass}
				/>

				{/* Dynamic Slots (e.g., Messages from Dashboard) */}
				{sortedSlots.map((slot) => (
					<div key={slot.id} className="app-header__slot">
						{slot.component}
					</div>
				))}

				{/* Notifications Icon */}
				<HeaderIcon
					to="/notifications"
					icon={IconBell}
					title="Notifications"
					className={iconClass}
				/>

				{/* Profile Avatar - Now clickable and navigates to profile */}
				<ProfileAvatarButton user={user} />
			</div>
		</header>
	)
}
