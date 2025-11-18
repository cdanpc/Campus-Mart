import { useCart } from '../../context/CartContext.jsx'
import '../../styles/pages/landing.css'
import Button from '../../components/common/Button.jsx'
import { Link } from 'react-router-dom'
import PublicHeader from '../../components/layout/PublicHeader.jsx'

const sampleItems = [
	{ id: 'i1', name: 'Textbook: Calculus I', price: 25.0, category: 'Textbook' },
	{ id: 'i2', name: 'Scientific Calculator', price: 15.5, category: 'Scientific' },
	{ id: 'i3', name: 'Dorm Desk Lamp', price: 12.75, category: 'Dorm' },
]

const features = [
	{ id: 'f1', icon: '🛒', title: 'Peer Marketplace', desc: 'Buy and sell books, tech, and essentials with fellow students.' },
	{ id: 'f2', icon: '⚡', title: 'Fast & Simple', desc: 'Clean flows with quick actions and smooth interactions.' },
	{ id: 'f3', icon: '🔒', title: 'Secure', desc: 'Trusted experience built on modern patterns and tokens.' },
]

export default function LandingPage() {
	const { addToCart } = useCart()

	return (
		<div className="page-landing">
			<PublicHeader />
			{/* Hero */}
			<section className="lp-hero">
				<div className="lp-container lp-hero__inner">
					<h1 className="lp-hero__title lp-hero__title--brand">Campus Trading Made Easy</h1>
					<p className="lp-hero__sub">
						Discover, list, and exchange what students need — modern, fast, and reliable.
					</p>
					<button
						className="lp-cta"
						onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })}
					>
						Explore
					</button>
				</div>
			</section>

			{/* Features (Placeholder boxes) */}
			<section id="features" className="lp-section">
				<div className="lp-container">
					<header className="lp-section__head">
						<h2 className="lp-heading">Features</h2>
						<p className="lp-subheading">Minimal, clean, and responsive — designed for campus communities.</p>
					</header>

					<div className="lp-grid lp-grid--features">
						{features.map((f) => (
							<article key={f.id} className="lp-card lp-card--feature">
								<div className="lp-feature__icon">{f.icon}</div>
								<h3 className="lp-feature__title">{f.title}</h3>
								<p className="lp-feature__desc">{f.desc}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Marketplace Preview */}
			<section id="market" className="lp-section">
				<div className="lp-container">
					<header className="lp-section__head">
						<h2 className="lp-heading">Marketplace Preview</h2>
						<p className="lp-subheading">Clean, minimal cards with clear actions.</p>
					</header>

					<div className="lp-grid lp-grid--market">
						{sampleItems.map((it) => (
							<article key={it.id} className="item-card">
								<div className="item-card__banner">
									<span>{it.category}</span>
								</div>
								<div className="item-card__body">
									<div className="item-card__name">{it.name}</div>
									<div className="item-card__price">${it.price.toFixed(2)}</div>
								</div>
								<div className="item-card__actions">
									<Button onClick={() => addToCart(it)}>Add to Cart</Button>
									<Button variant="ghost" className="btn-view">View</Button>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="lp-footer">
				<div className="lp-container">
					<div className="lp-footer__brand">CampusMart</div>
					<nav className="lp-footer__links">
						<a href="#">Privacy</a>
						<a href="#">Terms</a>
						<a href="#">Support</a>
					</nav>
					<p className="lp-footer__copy">© {new Date().getFullYear()} CampusMart. All rights reserved.</p>
				</div>
			</footer>
		</div>
	)
}
