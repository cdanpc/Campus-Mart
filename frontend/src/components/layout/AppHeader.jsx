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
				<input
					placeholder="Search items…"
					style={{
						width: '100%',
						border: '1px solid var(--border-color)',
						borderRadius: 12,
						padding: '10px 12px 10px 36px',
						background: 'var(--bg-subtle)',
						color: 'var(--text-primary)',
						fontSize: 14,
						boxSizing: 'border-box'
					}}
				/>
			</div>
			<Button
				as={Link}
				to="/app/post"
				leftIcon={<IconPlus />}
				style={{ color: '#fff' }} // ensure white text
			>
				Post an Item
			</Button>
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

