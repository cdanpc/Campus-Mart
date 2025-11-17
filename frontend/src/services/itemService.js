import api, { USE_MOCKS } from './api.js'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const MOCK_ITEMS = [
	{ id: 'i1', name: 'Textbook: Calculus I', price: 25.0, description: 'Gently used, highlights on a few pages.' },
	{ id: 'i2', name: 'Scientific Calculator', price: 15.5, description: 'Works perfectly, includes cover.' },
	{ id: 'i3', name: 'Dorm Desk Lamp', price: 12.75, description: 'LED lamp with adjustable neck.' },
]

export async function listItems({ search = '', page = 1, pageSize = 12 } = {}) {
	if (USE_MOCKS) {
		await delay(200)
		const filtered = search
			? MOCK_ITEMS.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
			: MOCK_ITEMS
		return { items: filtered, total: filtered.length, page, pageSize }
	}
	const { data } = await api.get('/items', { params: { search, page, pageSize } })
	return data
}

export async function getItem(id) {
	if (USE_MOCKS) {
		await delay(150)
		return { item: MOCK_ITEMS.find((i) => i.id === id) || null }
	}
	const { data } = await api.get(`/items/${id}`)
	return data
}

export async function createItem(payload) {
	if (USE_MOCKS) {
		await delay(250)
		const newItem = { id: `i${Date.now()}`, ...payload }
		return { item: newItem }
	}
	const { data } = await api.post('/items', payload)
	return data
}

