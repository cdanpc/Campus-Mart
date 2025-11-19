import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import PasswordInput from '../../components/common/PasswordInput.jsx'
import Logo from '../../components/common/Logo.jsx'
import '../../styles/pages/login.css'

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
            nav('/app', { replace: true })
        } catch (err) {
            setError(err.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            {/* Left Section - Auth Card */}
            <div className="login-page__left">
                <div className="login-card">

                    {/* Inline Header */}
                    <div className="login-card__header">
                        <Link to="/" className="system-logo-link">
                            <Logo size={32} />
                            <span className="system-name">
                                <span className="system-name--campus">Campus</span>
                                <span className="system-name--mart"> Mart</span>
                            </span>
                        </Link>
                    </div>

                    <div className="login-card__content">
                        <h1 className="login-title">Sign in</h1>
                        <p className="login-subtitle">Access your Campus Mart account.</p>

                        <form onSubmit={onSubmit} className="login-form">
                            <Input
                                leftIcon={<FiMail />} 
                                type="email"
                                placeholder="johndoe@gmail.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />

                            <PasswordInput
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                forgotLink={
                                    <Link to="/forgot-password" className="password-accessory-link">
                                        Forgot password?
                                    </Link>
                                }
                            />

                            {error && <div className="form-error">{error}</div>}

                            <Button type="submit" loading={loading} fullWidth size="lg">
                                Sign in
                            </Button>

                            <p className="signup-text-link">
                                Don't have an Account? 
                                <Link to="/register" className="signup-link">
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Section - Background Image */}
            <div className="login-page__right" />
        </div>
    )
}