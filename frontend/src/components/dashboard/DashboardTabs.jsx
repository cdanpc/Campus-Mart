import { MdSell, MdSwapHoriz } from 'react-icons/md'
import './DashboardTabs.css'

export default function DashboardTabs({ activeTab, onTabChange }) {
	return (
		<div className="dashboard-tabs">
			<button
				type="button"
				onClick={() => onTabChange('sellable')}
				className={`dashboard-tab ${activeTab === 'sellable' ? 'dashboard-tab--active' : ''}`}
				data-color="purple"
			>
				<MdSell size={18} />
				Sellable Goods
			</button>
			<button
				type="button"
				onClick={() => onTabChange('tradable')}
				className={`dashboard-tab ${activeTab === 'tradable' ? 'dashboard-tab--active' : ''}`}
				data-color="blue"
			>
				<MdSwapHoriz size={18} />
				Tradable Goods
			</button>
		</div>
	)
}
