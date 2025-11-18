import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/common/Button.jsx'
import '../../styles/pages/auth.css'

export default function RegisterPage() {
	const { register } = useAuth?.() || {}
	const nav = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e) => {
		e.preventDefault()
		setError('')
		if (password !== confirm) {
			setError('Passwords do not match')
			return
		}
		setLoading(true)
		try {
			if (register) {
    	await register({ name, email, password })
	}

			nav('/login', { replace: true })
		} catch (err) {
			setError(err.message || 'Registration failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-card">
				<h2 className="auth-title">Create Account</h2>
				<p className="auth-desc">Join CampusMart and start trading.</p>
				<form onSubmit={onSubmit} className="auth-form">
					<div className="auth-group">
						<label className="auth-label">Name</label>
						<input
							className="auth-input"
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							required
							autoComplete="name"
						/>
					</div>
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
							autoComplete="new-password"
						/>
					</div>
					<div className="auth-group">
						<label className="auth-label">Confirm Password</label>
						<input
							className="auth-input"
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
							type="password"
							required
							autoComplete="new-password"
						/>
					</div>
					{error && <div className="auth-error">{error}</div>}
					<div className="auth-actions">
						<Button type="submit" loading={loading} fullWidth>
							Register
						</Button>
						<div className="auth-links">
							<Link to="/login">Already have an account?</Link>
							<Link to="/">Back to landing</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
