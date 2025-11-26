import { useEffect } from 'react'
import { useHeader } from '../../../context/HeaderContext.jsx'
import DashboardMessagesIcon from './DashboardMessagesIcon.jsx'

/**
 * DashboardHeaderEnhancer
 * Injects dashboard-specific header elements (Messages icon)
 * and switches header to dashboard layout mode.
 */
export default function DashboardHeaderEnhancer() {
	const { registerSlot, unregisterSlot, setLayoutMode } = useHeader()

	useEffect(() => {
		// Switch to dashboard layout
		setLayoutMode('dashboard')

		// Register messages slot
		const messagesSlot = {
			id: 'dashboard-messages',
			position: 2, // After Cart (0=Post, 1=Cart, 2=Messages, 3=Notifications, 4=Profile)
			component: <DashboardMessagesIcon />,
		}

		registerSlot(messagesSlot)

		// Cleanup
		return () => {
			setLayoutMode('default')
			unregisterSlot('dashboard-messages')
		}
	}, [registerSlot, unregisterSlot, setLayoutMode])

	return null // This component doesn't render anything
}
