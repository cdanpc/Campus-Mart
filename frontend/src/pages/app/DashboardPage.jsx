import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import {
  MdSell,
  MdSwapHoriz,
  MdSort,
  MdFilterList,
  MdLocalOffer,
  MdPerson,
  MdFavoriteBorder,
  MdFavorite,
  MdChevronRight,
  MdOutlineShoppingCart,
  MdOutlineChat,
  MdOutlineNotifications,
  MdOutlineChatBubbleOutline
} from "react-icons/md";



const items = [
	{
		id: 1,
		title: 'Engineering Calculus Textbook',
		price: 850,
		seller: 'J. Dela Cruz',
		img: '/images/sample-textbook.png',
		fav: false,
		category: 'Textbooks'
	},
	{
		id: 2,
		title: 'Dorm Mini-Fridge',
		price: 2500,
		seller: 'M. Reyes',
		img: '/images/sample-fridge.png',
		fav: true,
		category: 'Dorm & Furniture'
	},
	{
		id: 3,
		title: 'University Hoodie (Medium)',
		price: 400,
		seller: 'L. Garcia',
		img: '/images/sample-hoodie.png',
		fav: false,
		category: 'Clothing'
	},
	{
		id: 4,
		title: 'Party Food Platter (Pre-order)',
		price: 650,
		seller: 'Food Hub',
		img: '/images/sample-platter.png',
		fav: false,
		category: 'Food'
	},
	{
		id: 5,
		title: 'Digital Portrait Commission',
		price: 1200,
		seller: 'ArtWorks',
		img: '/images/sample-art.png',
		fav: true,
		category: 'Commissions'
	},
]

export default function DashboardPage() {
	const { user } = useAuth()
	const displayName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''
	const [activeTab, setActiveTab] = useState('sellable')
	const [msgAnchor, setMsgAnchor] = useState(null)

	// Dashboard-only header layout enhancement
	useEffect(() => {
		const header = document.querySelector('header')
		if (!header || header.classList.contains('dash-enhanced')) return

		// Find search wrapper (first div containing the search input)
		const searchWrapper = Array.from(header.children).find(
			(el) => el.querySelector && el.querySelector('input[placeholder="Search items…"]')
		)
		if (!searchWrapper) return

		header.classList.add('dash-enhanced')
		header.style.display = 'flex'
		header.style.justifyContent = 'space-between'
		header.style.alignItems = 'center'

		// Constrain search width, group right-side items
		searchWrapper.style.flex = '0 0 auto'
		searchWrapper.style.maxWidth = '450px'
		searchWrapper.style.width = '100%'

		// Collect remaining nodes for right side
		const rightItems = Array.from(header.children).filter((c) => c !== searchWrapper)
		const rightContainer = document.createElement('div')
		rightContainer.style.display = 'flex'
		rightContainer.style.alignItems = 'center'
		rightContainer.style.gap = '12px'
		rightContainer.className = 'dash-header-right'
		rightContainer.append(...rightItems)
		header.appendChild(rightContainer)

		// Insert messages anchor between Cart and Notifications
		const anchor = document.createElement('span')
		anchor.style.display = 'inline-flex'
		anchor.style.alignItems = 'center'
		anchor.style.padding = '6px 8px'
		try {
			const insertBeforeNode = rightContainer.children[2] // after Post + Cart
			rightContainer.insertBefore(anchor, insertBeforeNode || null)
		} catch {
			rightContainer.appendChild(anchor)
		}
		setMsgAnchor(anchor)

		// Cleanup
		return () => {
			if (!header.classList.contains('dash-enhanced')) return
			if (anchor && anchor.parentNode) anchor.parentNode.removeChild(anchor)
			setMsgAnchor(null)
			const restored = Array.from(rightContainer.children)
			restored.forEach((node) => header.appendChild(node))
			rightContainer.remove()
			searchWrapper.style.maxWidth = ''
			searchWrapper.style.flex = ''
			header.style.display = ''
			header.style.justifyContent = ''
			header.style.alignItems = ''
			header.classList.remove('dash-enhanced')
		}
	}, [])

	// Dashboard-only: unify cart/message/bell icons to outline 20px, #5A4AE3, no fill, same spacing
	useEffect(() => {
		const header = document.querySelector('header')
		const rightContainer = header?.querySelector('.dash-header-right')
		if (!rightContainer) return

		const links = [
			rightContainer.querySelector('a[title="Cart"]'),
			rightContainer.querySelector('a[title="Messages"]'),
			rightContainer.querySelector('a[title="Notifications"]'),
		].filter(Boolean)

		links.forEach((link) => {
			// link styles (color + padding)
			link.style.color = '#5A4AE3'
			link.style.opacity = '1'
			link.style.padding = '6px 8px'
			link.style.display = 'inline-flex'
			link.style.alignItems = 'center'

			// svg outline styling
			const svg = link.querySelector('svg')
			if (svg) {
				svg.setAttribute('width', '20')
				svg.setAttribute('height', '20')
				svg.style.width = '20px'
				svg.style.height = '20px'
				svg.style.stroke = '#5A4AE3'
				svg.style.strokeWidth = '1.75'
				svg.style.fill = 'none'
				svg.style.vectorEffect = 'non-scaling-stroke'
				// enforce stroke-only on child paths
				svg.querySelectorAll('*').forEach((n) => {
					n.setAttribute('fill', 'none')
					n.setAttribute('stroke', '#5A4AE3')
					n.setAttribute('stroke-width', '1.75')
				})
			}

			// optional hover behavior to keep consistent outline color
			link.onmouseenter = () => { link.style.opacity = '0.9' }
			link.onmouseleave = () => { link.style.opacity = '1' }
		})
	}, [msgAnchor])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
			{/* Page heading */}
			<h1
				style={{
					margin: '4px 0 0',
					fontSize: 24,
					fontWeight: 700,
					display: 'inline-flex',
					alignItems: 'center',
					gap: 8
				}}
			>
				<MdPerson size={20} style={{ color: 'var(--text-secondary)' }} />
				<span>Hey{displayName ? `, ${displayName}` : ''}</span>
			</h1>

			{/* Voucher banner */}
			<div
				className="surface"
				style={{
					background: 'linear-gradient(90deg,var(--color-primary-600),var(--color-primary-400))',
					color: 'var(--text-inverse)',
					border: 'none',
					padding: '18px 24px',
					borderRadius: 14,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: 16
				}}
			>
				<div>
					<div style={{ fontWeight: 700, fontSize: 14 }}>Get Discount Voucher</div>
					<div style={{ fontSize: 12, opacity: 0.85 }}>Up to 20%</div>
				</div>
				<img
					src="/images/voucher-icon.png"
					alt="Voucher"
					style={{ width: 44, height: 44, objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}
				/>
			</div>

			{/* Tabs + sort/filter actions */}
			<div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
				<div style={{ display: 'flex', gap: 8 }}>
					<button
						type="button"
						onClick={() => setActiveTab('sellable')}
						style={{
							background: activeTab === 'sellable' ? 'rgba(106, 13, 173, 0.08)' : 'var(--bg-subtle)',
							border: `1px solid ${activeTab === 'sellable' ? '#6A0DAD' : 'var(--border-color)'}`,
							color: activeTab === 'sellable' ? '#6A0DAD' : 'var(--gray-600)',
							padding: '8px 14px',
							borderRadius: 8,
							fontSize: 12,
							fontWeight: 700,
							display: 'flex',
							alignItems: 'center',
							gap: 6
						}}
					>
						<MdSell size={18} />
						Sellable Goods
					</button>
					<button
						type="button"
						onClick={() => setActiveTab('tradable')}
						style={{
							background: activeTab === 'tradable' ? 'rgba(31, 117, 254, 0.08)' : 'var(--bg-subtle)',
							border: `1px solid ${activeTab === 'tradable' ? '#1F75FE' : 'var(--border-color)'}`,
							color: activeTab === 'tradable' ? '#1F75FE' : 'var(--gray-600)',
							padding: '8px 14px',
							borderRadius: 8,
							fontSize: 12,
							fontWeight: 700,
							display: 'flex',
							alignItems: 'center',
							gap: 6
						}}
					>
						<MdSwapHoriz size={18} />
						Tradable Goods
					</button>
				</div>

				<div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
					<div style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
						<MdSort size={18} />
						<span>Sort by:</span>
						<select
							style={{
								fontSize: 12,
								padding: '6px 10px',
								borderRadius: 8,
								border: '1px solid var(--border-color)',
								background: 'var(--bg-surface)',
								color: 'var(--text-primary)'
							}}
							defaultValue="latest"
						>
							<option value="latest">Latest</option>
							<option value="priceAsc">Price ↑</option>
							<option value="priceDesc">Price ↓</option>
						</select>
					</div>
					<button
						type="button"
						style={{
							border: '1px solid var(--border-color)',
							background: 'var(--bg-subtle)',
							padding: '6px 14px',
							borderRadius: 8,
							fontSize: 12,
							fontWeight: 600,
							color: 'var(--text-primary)',
							display: 'inline-flex',
							alignItems: 'center',
							gap: 6
						}}
					>
						<MdFilterList size={18} />
						<span>Filter</span>
					</button>
				</div>
			</div>

			{/* Items grid */}
			<div
				style={{
					display: 'grid',
					gap: 18,
					gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))'
				}}
			>
				{items.map(item => (
					<div
						key={item.id}
						className="surface"
						style={{
							borderRadius: 14,
							padding: 0,
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
							background: 'var(--bg-surface)',
							boxShadow: 'var(--shadow-sm)'
						}}
					>
						{/* Image */}
						<div style={{ position: 'relative', width: '100%', paddingTop: '58%', background: 'var(--gray-100)' }}>
							{item.img && (
								<img
									src={item.img}
									alt={item.title}
									style={{
										position: 'absolute',
										inset: 0,
										width: '100%',
										height: '100%',
										objectFit: 'cover'
									}}
								/>
							)}
						</div>

						{/* Info */}
						<div style={{ padding: '16px 18px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
							<div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{item.title}</div>
							<div style={{ fontSize: 10, color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
								<MdPerson size={14} />
								<span>Sold by: {item.seller}</span>
							</div>
							<div style={{ fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
								<MdLocalOffer size={18} style={{ color: 'var(--color-primary-600)' }} />
								<span>₱{item.price.toLocaleString()}</span>
							</div>
						</div>

						{/* Footer actions */}
						<div
							style={{
								borderTop: '1px solid var(--border-color)',
								padding: '10px 16px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<button
								type="button"
								style={{
									background: 'transparent',
									border: 'none',
									color: 'var(--color-primary-600)',
									fontSize: 12,
									fontWeight: 600,
									cursor: 'pointer',
									display: 'inline-flex',
									alignItems: 'center',
									gap: 6
								}}
							>
								<span>View Details</span>
								<MdChevronRight size={18} />
							</button>
							<button
								type="button"
								aria-label="Favorite"
								style={{
									border: 'none',
									background: 'transparent',
									width: 26,
									height: 26,
									display: 'grid',
									placeItems: 'center',
									borderRadius: 8,
									color: item.fav ? 'var(--color-primary-600)' : 'var(--text-secondary)',
									cursor: 'pointer'
								}}
							>
								{item.fav ? <MdFavorite size={18} /> : <MdFavoriteBorder size={18} />}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Portal: Dashboard-only Messages icon in header (between Cart and Notifications) */}
			{msgAnchor &&
				createPortal(
					<Link
						to="/messages"
						title="Messages"
						className="nav-icon"
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							padding: '6px 8px',
							// color, stroke, fill are unified in the effect above
							transition: 'opacity .2s, color .2s'
						}}
					>
						<MdOutlineChatBubbleOutline size={20} />


					</Link>,
					msgAnchor
				)}
		</div>
	)
}
