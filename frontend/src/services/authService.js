import api, { USE_MOCKS } from './api.js'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export async function login({ email, password }) {
	if (USE_MOCKS) {
		await delay(300)
		if (!email || !password) throw new Error('Email and password are required')
		const user = { id: 'u1', email, name: email.split('@')[0] }
		const token = 'mock-token'
		return { user, token }
	}
	const { data } = await api.post('/auth/login', { email, password })
	return data
}

export async function register({ name, email, password }) {
	if (USE_MOCKS) {
		await delay(300)
		const user = { id: 'u1', email, name: name || email.split('@')[0] }
		const token = 'mock-token'
		return { user, token }
	}
	const { data } = await api.post('/auth/register', { name, email, password })
	return data
}

export async function me() {
	if (USE_MOCKS) {
		await delay(100)
		try {
			const saved = JSON.parse(localStorage.getItem('cm_auth') || '{}')
			if (saved?.user) return saved
		} catch {
			// ignore
		}
		return { user: null, token: null }
	}
	const { data } = await api.get('/auth/me')
	return data
}

export async function logout() {
	if (USE_MOCKS) {
		await delay(100)
		return { success: true }
	}
	const { data } = await api.post('/auth/logout')
	return data
}

