import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/common/Button.jsx'

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
		<div style={{ maxWidth: 360, margin: '40px auto' }}>
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<div style={{ marginBottom: 12 }}>
					<label>Email</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: '100%' }} />
				</div>
				<div style={{ marginBottom: 12 }}>
					<label>Password</label>
					<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={{ width: '100%' }} />
				</div>
				{error && <div style={{ color: 'var(--color-danger-500)', marginBottom: 8 }}>{error}</div>}
				<Button type="submit" loading={loading} fullWidth>
					Login
				</Button>
			</form>
			<div style={{ marginTop: 8 }}>
				<Link to="/">Back to marketplace</Link>
			</div>
		</div>
	)
}

