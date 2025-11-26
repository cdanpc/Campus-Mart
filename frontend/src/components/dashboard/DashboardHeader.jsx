import { MdPerson } from 'react-icons/md'
import './DashboardHeader.css'

export default function DashboardHeader({ userName }) {
	const displayName = userName
		? userName.charAt(0).toUpperCase() + userName.slice(1)
		: ''

	return (
		<h1 className="dashboard-header">
			<MdPerson size={20} className="dashboard-header__icon" />
			<span>Hey{displayName ? `, ${displayName}` : ''}</span>
		</h1>
	)
}
