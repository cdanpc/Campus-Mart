import '../../styles/components/input.css'

export default function Input({ 
  leftIcon, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  autoComplete,
  className = '',
  ...props 
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {leftIcon && <span className="input-icon">{leftIcon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className={`input-field ${leftIcon ? 'input-field--with-icon' : ''}`}
        {...props}
      />
    </div>
  )
}
