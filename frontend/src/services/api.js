import axios from 'axios'

// Toggle mock mode easily while backend endpoints are incomplete
export const USE_MOCKS = true

export const api = axios.create({
	baseURL: '/api',
	withCredentials: true,
})

api.interceptors.request.use((config) => {
	try {
		const saved = JSON.parse(localStorage.getItem('cm_auth') || '{}')
		const token = saved?.token
		if (token) config.headers.Authorization = `Bearer ${token}`
	} catch {
		// ignore
	}
	return config
})

api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err?.response?.status === 401) {
			// Optionally: emit an event or clear auth
		}
		return Promise.reject(err)
	},
)

export default api

