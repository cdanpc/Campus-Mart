import DashboardItemCard from './DashboardItemCard.jsx'
import './DashboardGrid.css'

export default function DashboardGrid({ items, onToggleFavorite }) {
	return (
		<div className="dashboard-grid">
			{items.map((item) => (
				<DashboardItemCard key={item.id} item={item} onToggleFavorite={onToggleFavorite} />
			))}
		</div>
	)
}
