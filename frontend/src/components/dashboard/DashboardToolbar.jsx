import DashboardTabs from './DashboardTabs.jsx'
import DashboardSortFilterBar from './DashboardSortFilterBar.jsx'
import './DashboardToolbar.css'

export default function DashboardToolbar({ activeTab, onTabChange, sortValue, onSortChange }) {
	return (
		<div className="dashboard-toolbar">
			<DashboardTabs activeTab={activeTab} onTabChange={onTabChange} />
			<DashboardSortFilterBar sortValue={sortValue} onSortChange={onSortChange} />
		</div>
	)
}
