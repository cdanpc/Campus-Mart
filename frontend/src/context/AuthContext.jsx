import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			try {
				const { user: u, token } = await authService.me()
				if (u) setUser({ ...u, token })
			} catch {
				// ignore
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	const login = async (email, password) => {
		const { user: u, token } = await authService.login({ email, password })
		setUser({ ...u, token }) // ensure name from backend; no email splitting
		localStorage.setItem('cm_auth', JSON.stringify({ user: { ...u }, token }))
		return u
	}

	const register = async (profile) => {
		const { user: u, token } = await authService.register(profile)
		setUser({ ...u, token })
		localStorage.setItem('cm_auth', JSON.stringify({ user: { ...u }, token }))
		return u
	}

	const logout = async () => {
		try {
			await authService.logout()
		} finally {
			setUser(null)
			localStorage.removeItem('cm_auth')
		}
	}

	const value = useMemo(
		() => ({
			user,
			token: user?.token || null,
			loading,
			isAuthenticated: !!user,
			login,
			register,
			logout
		}),
		[user, loading]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}

export default AuthContext

