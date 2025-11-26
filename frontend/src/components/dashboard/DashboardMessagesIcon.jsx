import { Link } from 'react-router-dom'
import { MdOutlineChatBubbleOutline } from 'react-icons/md'
import './DashboardMessagesIcon.css'

export default function DashboardMessagesIcon() {
	return (
		<Link
			to="/messages"
			title="Messages"
			className="dashboard-messages-icon"
		>
			<MdOutlineChatBubbleOutline size={20} />
		</Link>
	)
}
