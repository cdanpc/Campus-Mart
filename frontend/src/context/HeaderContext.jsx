import { createContext, useContext, useState, useMemo } from 'react'

const HeaderContext = createContext(null)

export function HeaderProvider({ children }) {
	const [extraSlots, setExtraSlots] = useState([])
	const [layoutMode, setLayoutMode] = useState('default') // 'default' | 'dashboard'

	const registerSlot = (slot) => {
		setExtraSlots((prev) => {
			const exists = prev.find((s) => s.id === slot.id)
			if (exists) return prev
			return [...prev, slot]
		})
	}

	const unregisterSlot = (slotId) => {
		setExtraSlots((prev) => prev.filter((s) => s.id !== slotId))
	}

	const value = useMemo(
		() => ({
			extraSlots,
			layoutMode,
			setLayoutMode,
			registerSlot,
			unregisterSlot,
		}),
		[extraSlots, layoutMode]
	)

	return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
}

export function useHeader() {
	const ctx = useContext(HeaderContext)
	if (!ctx) throw new Error('useHeader must be used within HeaderProvider')
	return ctx
}
