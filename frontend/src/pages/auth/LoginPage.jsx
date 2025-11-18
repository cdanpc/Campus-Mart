import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/common/Button.jsx'
import '../../styles/pages/auth.css'

export default function LoginPage() {
	const { login } = useAuth()
	const nav = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			await login(email, password)
			nav('/app/cart', { replace: true })
		} catch (err) {
			setError(err.message || 'Login failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-card auth-card--compact">
				<h1 className="auth-header__title">Login</h1>
				<p className="auth-header__sub">Access your CampusMart account.</p>
				<form onSubmit={onSubmit} className="auth-form">
					<div className="auth-group">
						<label className="auth-label">Email</label>
						<input
							className="auth-input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							required
							autoComplete="email"
						/>
					</div>
					<div className="auth-group">
						<label className="auth-label">Password</label>
						<input
							className="auth-input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							required
							autoComplete="current-password"
						/>
					</div>
					{error && <div className="auth-error">{error}</div>}
					<div className="auth-actions">
						<Button type="submit" loading={loading} fullWidth>Login</Button>
						<div className="auth-links">
							<Link to="/register">Create account</Link>
							<Link to="#">Forgot password?</Link>
						</div>
						<div className="auth-alt">
							Need to browse? <Link to="/">Go to landing</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

