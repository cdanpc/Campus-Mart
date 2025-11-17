import { useCart } from '../../context/CartContext.jsx'
import '../../styles/pages/landing.css'
import Button from '../../components/common/Button.jsx'

const sampleItems = [
	{ id: 'i1', name: 'Textbook: Calculus I', price: 25.0 },
	{ id: 'i2', name: 'Scientific Calculator', price: 15.5 },
	{ id: 'i3', name: 'Dorm Desk Lamp', price: 12.75 },
]

export default function LandingPage() {
	const { addToCart } = useCart()
	return (
		<div className="page-landing">
			<h2 style={{ margin: '0 0 12px' }}>Marketplace</h2>
			<div className="item-grid">
				{sampleItems.map((it) => (
					<div key={it.id} className="item-card">
						<div className="item-card__banner">{it.name.split(' ')[0]}</div>
						<div className="item-card__body">
							<div style={{ fontWeight: 600 }}>{it.name}</div>
							<div className="item-card__price">${it.price.toFixed(2)}</div>
						</div>
						<div className="item-card__actions">
							<Button onClick={() => addToCart(it)}>Add to Cart</Button>
							<Button variant="ghost">View Details</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

