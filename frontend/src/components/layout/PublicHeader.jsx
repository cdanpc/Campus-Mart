import { Link, useLocation } from 'react-router-dom'
import Logo from '../common/Logo.jsx'
import '../../styles/layout/header.css'

export default function PublicHeader() {
	const { pathname } = useLocation()
	const hideLogin = pathname === '/login' || pathname === '/register'
	
	const scrollToSection = (e, sectionId) => {
		e.preventDefault()
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}
	
	return (
		<header className="public-header">
			<div className="public-header__container">
				{/* Left: Logo + Brand Name */}
				<Link to="/" className="public-header__brand">
					<Logo size={40} />
					<span className="public-header__name">
						<span className="public-header__name--campus">Campus</span>
						<span className="public-header__name--mart"> Mart</span>
					</span>
				</Link>

				{/* Center: Navigation Links */}
				<nav className="public-header__nav">
					<a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a>
					<a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</a>
					<a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
				</nav>

				{/* Right: Login Button */}
				{!hideLogin && (
					<Link to="/login" className="public-header__login">
						Log in
					</Link>
				)}
			</div>
		</header>
	)
}

