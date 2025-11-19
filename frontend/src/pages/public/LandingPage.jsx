import { useState } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../../styles/pages/landing.css'
import Button from '../../components/common/Button.jsx'
import { Link } from 'react-router-dom'
import PublicHeader from '../../components/layout/PublicHeader.jsx'

const sampleItems = [
    { id: 'i1', name: 'Textbook: Calculus I', price: 25.0, category: 'Textbook' },
    { id: 'i2', name: 'Scientific Calculator', price: 15.5, category: 'Scientific' },
    { id: 'i3', name: 'Dorm Desk Lamp', price: 12.75, category: 'Dorm' },
    { id: 'i4', name: 'Organic Granola Bars', price: 5.0, category: 'Food' },
    { id: 'i5', name: 'Organic Granola Bars', price: 5.0, category: 'Food' },
    { id: 'i6', name: 'Organic Granola Bars', price: 5.0, category: 'Food' },
]

const features = [
    { id: 'f1', icon: '🛒', title: 'Peer Marketplace', desc: 'Buy and sell books, tech, and essentials with fellow students.' },
    { id: 'f2', icon: '⚡', title: 'Fast & Simple', desc: 'Clean flows with quick actions and smooth interactions.' },
    { id: 'f3', icon: '🔒', title: 'Secure', desc: 'Trusted experience built on modern patterns and tokens.' },
    { id: 'f4', icon: '📱', title: 'Mobile Friendly', desc: 'Access the marketplace anytime, anywhere on any device.' },
    { id: 'f5', icon: '🤝', title: 'Community Support', desc: 'Connect with other students and get help when you need it.' },
    { id: 'f6', icon: '🔒', title: 'Secure', desc: 'Trusted experience built on modern patterns and tokens.' },
]

export default function LandingPage() {
    const { addToCart } = useCart()

    return (
        <div className="page-landing">
            <PublicHeader />
            {/* Hero */}
            <section className="lp-hero">
                <div className="lp-container lp-hero__inner">
                    {/* Added lp-hero__content wrapper for visual depth */}
                    <div className="lp-hero__content"> 
                        <h1 className="lp-hero__title">
                            Buy, Sell, & Trade <span className="lp-hero__highlight">On Campus</span>
                        </h1>
                        <p className="lp-hero__sub">
                            Ditch the hassle. Trade your textbooks, sell that mini-fridge, and find awesome deals from other students right at your university.
                        </p>
                        <button
                            className="lp-cta"
                            onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Marketplace
                        </button>
                        <Link to="/register" className="lp-cta lp-cta--secondary">
                            Start Selling
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features (Placeholder boxes) */}
            <section id="features" className="lp-section">
                <div className="lp-container">
                    <header className="lp-section__head">
                        <h2 className="lp-heading">Core Features</h2>
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

            {/* About Us Section */}
            <section id="about" className="lp-section">
                <div className="lp-container">
                    <header className="lp-section__head">
                        <h2 className="lp-heading">About Us</h2>
                        <p className="lp-subheading">Empowering students to buy, sell, and trade on campus</p>
                    </header>
                    
                    <div className="lp-about">
                        <div className="lp-about__content">
                            <h3 className="lp-about__subtitle">
                                <span className="lp-about__icon">🎯</span>
                                Our Vision: Connecting Campus
                            </h3>
                            <p className="lp-about__text">
                                CampusMart was created to make student life easier by connecting campus communities through 
                                a <strong>trusted marketplace</strong>. We believe students deserve a <strong>simple, secure way</strong> to exchange 
                                textbooks, electronics, dorm essentials, and more—all without leaving campus.
                            </p>
                            
                            <h3 className="lp-about__subtitle">
                                <span className="lp-about__icon">✨</span>
                                The CampusMart Advantage
                            </h3>
                            <div className="lp-about__cards">
                                <div className="lp-about__card">
                                    <div className="lp-about__card-icon">💡</div>
                                    <h4 className="lp-about__card-title">Lighten the Load</h4>
                                    <p className="lp-about__card-text">
                                        Get rid of heavy textbooks and unused dorm essentials easily.
                                    </p>
                                </div>
                                <div className="lp-about__card">
                                    <div className="lp-about__card-icon">💰</div>
                                    <h4 className="lp-about__card-title">Budget Smarter</h4>
                                    <p className="lp-about__card-text">
                                        <strong>Save money</strong> by buying gently used items directly from peers.
                                    </p>
                                </div>
                                <div className="lp-about__card">
                                    <div className="lp-about__card-icon">🛡️</div>
                                    <h4 className="lp-about__card-title">Campus-Only Trust</h4>
                                    <p className="lp-about__card-text">
                                        Exchange items within a <strong>secure network</strong> built exclusively for your university.
                                    </p>
                                </div>
                            </div>
                            
                            <h3 className="lp-about__subtitle">
                                <span className="lp-about__icon">🤝</span>
                                Join Our Community
                            </h3>
                            <p className="lp-about__text">
                                Whether you're looking to <strong>save money on textbooks</strong>, sell your old laptop, or find unique 
                                items from fellow students, CampusMart is here for you. Join thousands of students who 
                                are already trading smarter on campus.
                            </p>
                            
                            <div className="lp-about__cta">
                                <Link to="/register" className="lp-cta">
                                    Start Trading Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marketplace Preview */}
            <section id="market" className="lp-section lp-section--alt"> {/* Added lp-section--alt for background contrast */}
                <div className="lp-container">
                    <header className="lp-section__head">
                        <h2 className="lp-heading">Marketplace Preview</h2>
                        <p className="lp-subheading">Clean, minimal cards with clear actions.</p>
                    </header>

                    <div className="lp-grid lp-grid--market">
                        {sampleItems.map((it) => (
                            <article key={it.id} className="item-card">
                                <div className="item-card__banner">
                                    {/* Placeholder for an actual image or graphic */}
                                    <div className="item-card__placeholder"></div> 
                                </div>
                                <div className="item-card__body">
                                    {/* Using a category badge for visual interest */}
                                    <div className="item-card__badge">{it.category}</div> 
                                    <div className="item-card__name">{it.name}</div>
                                    <div className="item-card__price">${it.price.toFixed(2)}</div>
                                </div>
                                <div className="item-card__actions">
                                    <Button onClick={() => addToCart(it)}>Add to Cart</Button>
                                    <Button variant="secondary" className="btn-view">View</Button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="lp-footer">
                <div className="lp-container">
                    <div className="lp-footer__brand">CampusMart</div>
                    <div className="lp-footer__contact">
                        <h3 className="lp-footer__title">Contact Us</h3>
                        <div className="lp-footer__contact-info">
                            <p className="lp-footer__email">Email: support@campusmart.com</p>
                            <p className="lp-footer__phone">Phone: (555) 123-4567</p>
                        </div>
                    </div>
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