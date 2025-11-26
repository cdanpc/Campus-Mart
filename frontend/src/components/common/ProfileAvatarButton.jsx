import { useNavigate } from 'react-router-dom'
import './ProfileAvatarButton.css'

export default function ProfileAvatarButton({ user, className = '' }) {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/app/profile')
	}

	const displayInitial = user?.name?.[0]?.toUpperCase() || 'U'

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`profile-avatar-button ${className}`.trim()}
			title={user?.name || 'Profile'}
			aria-label="Go to profile"
		>
			<div className="profile-avatar-button__avatar">{displayInitial}</div>
		</button>
	)
}
