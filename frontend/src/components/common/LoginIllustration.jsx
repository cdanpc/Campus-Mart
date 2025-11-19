import backgroundImage from '../../assets/background.png'

export default function LoginIllustration({ className = '' }) {
  return (
    <div className={`login-illustration ${className}`}>
      <img
        src={backgroundImage}
        alt="Campus Mart Illustration"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}
