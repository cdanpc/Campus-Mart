import { Link } from 'react-router-dom'
import Logo from '../common/Logo.jsx'
import '../../styles/components/auth-header.css'

export default function AuthHeader({ variant = 'default', name = 'Campus Mart' }) {
  const classes = ['auth-header']
  if (variant === 'login') classes.push('auth-header--login')
  if (variant === 'register') classes.push('auth-header--register')

  const [first, ...rest] = String(name).trim().split(' ')
  const second = rest.join(' ')

  return (
    <header className={classes.join(' ')}>
      <Link to="/" className="auth-header__brand" aria-label="Go to landing page">
        <Logo size={32} />
        <span className="auth-header__name">
          <span className="auth-header__brand--campus">{first}</span>
          {second && <span className="auth-header__brand--mart"> {second}</span>}
        </span>
      </Link>
    </header>
  )
}
