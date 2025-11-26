import { useEffect, useRef } from 'react'

/**
 * AppHeaderExtension - Enables dashboard-specific header layout
 * without DOM manipulation. Uses CSS classes for styling control.
 */
export default function AppHeaderExtension({ enabled = false, children }) {
	const headerRef = useRef(null)

	useEffect(() => {
		const header = document.querySelector('header')
		if (!header) return

		if (enabled) {
			header.classList.add('header--dashboard-layout')
		}

		return () => {
			if (header) {
				header.classList.remove('header--dashboard-layout')
			}
		}
	}, [enabled])

	return children || null
}
