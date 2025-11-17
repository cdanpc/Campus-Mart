import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
	const [items, setItems] = useState([])

	useEffect(() => {
		try {
			const saved = localStorage.getItem('cm_cart')
			if (saved) setItems(JSON.parse(saved))
		} catch {
			/* ignore */
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cm_cart', JSON.stringify(items))
	}, [items])

	const addToCart = (product, qty = 1) => {
		setItems((prev) => {
			const idx = prev.findIndex((p) => p.id === product.id)
			if (idx >= 0) {
				const next = [...prev]
				next[idx] = { ...next[idx], quantity: next[idx].quantity + qty }
				return next
			}
			return [...prev, { ...product, quantity: qty }]
		})
	}

	const removeFromCart = (id) => setItems((prev) => prev.filter((p) => p.id !== id))
	const clearCart = () => setItems([])
	const updateQuantity = (id, qty) =>
		setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)))

	const totalItems = items.reduce((sum, p) => sum + (p.quantity || 0), 0)
	const totalPrice = items.reduce((sum, p) => sum + (p.quantity || 0) * (p.price || 0), 0)

	const value = useMemo(
		() => ({ items, addToCart, removeFromCart, clearCart, updateQuantity, totalItems, totalPrice }),
		[items, totalItems, totalPrice],
	)

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error('useCart must be used within CartProvider')
	return ctx
}

export default CartContext

