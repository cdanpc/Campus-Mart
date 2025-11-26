import HeaderIcon from '../../common/HeaderIcon.jsx'

function MessageIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
	)
}

export default function DashboardMessagesIcon() {
	return (
		<HeaderIcon
			to="/messages"
			icon={MessageIcon}
			title="Messages"
			className="header-icon--dashboard"
		/>
	)
}
