import { useState } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import '../../styles/components/password-input.css'

export default function PasswordInput({ 
  placeholder = 'Password', 
  value, 
  onChange, 
  required = false,
  autoComplete = 'current-password',
  className = '',
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={`password-input-wrapper ${className}`}>
      <span className="password-icon-left">
        <FiLock />
      </span>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="password-field"
        {...props}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  )
}
