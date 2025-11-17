import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			try {
				const { user } = await authService.me()
				if (user) setUser(user)
			} catch {
				// ignore
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	const login = async (email, password) => {
		const { user, token } = await authService.login({ email, password })
		setUser(user)
		localStorage.setItem('cm_auth', JSON.stringify({ user, token }))
		return user
	}

	const register = async (profile) => {
		const { user, token } = await authService.register(profile)
		setUser(user)
		localStorage.setItem('cm_auth', JSON.stringify({ user, token }))
		return user
	}

	const logout = async () => {
		try {
			await authService.logout()
		} finally {
			setUser(null)
			localStorage.removeItem('cm_auth')
		}
	}

	const value = useMemo(() => ({ user, loading, isAuthenticated: !!user, login, register, logout }), [user, loading])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}

export default AuthContext

