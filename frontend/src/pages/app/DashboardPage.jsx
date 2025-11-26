import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import DashboardHeader from '../../components/dashboard/DashboardHeader.jsx'
import DashboardBanner from '../../components/dashboard/DashboardBanner.jsx'
import DashboardToolbar from '../../components/dashboard/DashboardToolbar.jsx'
import DashboardGrid from '../../components/dashboard/DashboardGrid.jsx'
import DashboardHeaderEnhancer from '../../components/dashboard/header/DashboardHeaderEnhancer.jsx'
import './DashboardPage.css'

const MOCK_ITEMS = [
	{
		id: 1,
		title: 'Engineering Calculus Textbook',
		price: 850,
		seller: 'J. Dela Cruz',
		img: '/images/sample-textbook.png',
		fav: false,
		category: 'Textbooks',
	},
	{
		id: 2,
		title: 'Dorm Mini-Fridge',
		price: 2500,
		seller: 'M. Reyes',
		img: '/images/sample-fridge.png',
		fav: true,
		category: 'Dorm & Furniture',
	},
	{
		id: 3,
		title: 'University Hoodie (Medium)',
		price: 400,
		seller: 'L. Garcia',
		img: '/images/sample-hoodie.png',
		fav: false,
		category: 'Clothing',
	},
	{
		id: 4,
		title: 'Party Food Platter (Pre-order)',
		price: 650,
		seller: 'Food Hub',
		img: '/images/sample-platter.png',
		fav: false,
		category: 'Food',
	},
	{
		id: 5,
		title: 'Digital Portrait Commission',
		price: 1200,
		seller: 'ArtWorks',
		img: '/images/sample-art.png',
		fav: true,
		category: 'Commissions',
	},
]

export default function DashboardPage() {
	const { user } = useAuth()
	const [activeTab, setActiveTab] = useState('sellable')
	const [sortValue, setSortValue] = useState('latest')
	const [items, setItems] = useState(MOCK_ITEMS)

	const handleToggleFavorite = (id) => {
		setItems((prev) => prev.map((item) => (item.id === id ? { ...item, fav: !item.fav } : item)))
	}

	return (
		<>
			<DashboardHeaderEnhancer />
			<div className="dashboard-page">
				<DashboardHeader userName={user?.name} />
				<DashboardBanner />
				<DashboardToolbar
					activeTab={activeTab}
					onTabChange={setActiveTab}
					sortValue={sortValue}
					onSortChange={setSortValue}
				/>
				<DashboardGrid items={items} onToggleFavorite={handleToggleFavorite} />
			</div>
		</>
	)
}
