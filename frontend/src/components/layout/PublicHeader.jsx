import { Link, useLocation } from 'react-router-dom'

export default function PublicHeader() {
	const { pathname } = useLocation()
	const hideLogin = pathname === '/login' || pathname === '/register'
	return (
		<header className="header lp-nav">
			<div className="lp-container lp-nav__inner">
				<Link to="/" className="header-brand lp-brand">CampusMart</Link>
				<div className="lp-nav__right">
					<nav className="header-menu lp-menu">
						<Link to="/#features">Features</Link>
						<Link to="/#market">Marketplace</Link>
					</nav>
					{!hideLogin && <Link className="lp-login" to="/login">Log in</Link>}
				</div>
			</div>
		</header>
	)
}

