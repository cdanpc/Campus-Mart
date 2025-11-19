import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// FiBookOpen used for both University and Year Level
import { FiUser, FiMail, FiPhone, FiBookOpen } from 'react-icons/fi' 
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/common/Button.jsx'
import Input from '../../components/common/Input.jsx'
import PasswordInput from '../../components/common/PasswordInput.jsx'
import Logo from '../../components/common/Logo.jsx'
import '../../styles/pages/register.css'

export default function RegisterPage() {
    const { register } = useAuth()
    const nav = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [university, setUniversity] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setLoading(true)
        try {
            if (register) {
                await register({ firstName, lastName, email, phoneNumber, university, yearLevel, password, confirmPassword })
            }
            nav('/login', { replace: true })
        } catch (err) {
            setError(err.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-page">
            {/* Left Section - Auth Card */}
            <div className="register-page__left">
                <div className="register-card">

                    {/* Inline Header */}
                    <div className="register-card__header">
                        <Link to="/" className="system-logo-link">
                            <Logo size={32} />
                            <span className="system-name">
                                <span className="system-name--campus">Campus</span>
                                <span className="system-name--mart"> Mart</span>
                            </span>
                        </Link>
                    </div>

                    <h1 className="register-title">Create Account</h1>
                    <p className="register-subtitle">Join Campus Mart today!</p>
                    <form onSubmit={onSubmit} className="register-form">
                        
                        {/* 1st Row: First Name and Last Name */}
                        <div className="register-form__split">
                            <Input
                                leftIcon={<FiUser />}
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                autoComplete="given-name"
                            />
                            <Input
                                leftIcon={<FiUser />}
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                autoComplete="family-name"
                            />
                        </div>
                        
                        {/* 2nd Row: Email */}
                        <Input
                            leftIcon={<FiMail />}
                            type="email"
                            placeholder="student@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        
                        {/* 3rd Row: Phone Number */}
                        <Input
                            leftIcon={<FiPhone />}
                            type="tel"
                            placeholder="e.g., +63 9xx xxxxxxx"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            autoComplete="tel"
                        />
                        
                        {/* 4th Row: University */}
                        <Input
                            leftIcon={<FiBookOpen />}
                            type="text"
                            placeholder="University Name"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            required
                            autoComplete="organization"
                        />
                        
                        {/* 5th Row: Year-Level */}
                        <Input
                            leftIcon={<FiBookOpen />} 
                            type="text"
                            placeholder="e.g., 2nd Year College"
                            value={yearLevel}
                            onChange={(e) => setYearLevel(e.target.value)}
                            required
                            autoComplete="off"
                        />
                        
                        {/* 6th Row: Password */}
                        <PasswordInput
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        
                        {/* 7th Row: Confirm Password */}
                        <PasswordInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        
                        {error && <div className="register-error">{error}</div>}
                        
                        <Button type="submit" loading={loading} fullWidth size="lg">Create Account</Button>
                        
                        <div className="register-bottom-link">
                            Already have an account?
                            <Link to="/login"> Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
            {/* Right Section - Background Image */}
            <div className="register-page__right" />
        </div>
    )
}