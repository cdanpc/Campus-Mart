import { MdSort, MdFilterList } from 'react-icons/md'
import './DashboardSortFilterBar.css'

export default function DashboardSortFilterBar({ sortValue, onSortChange }) {
	return (
		<div className="dashboard-sort-filter">
			<div className="dashboard-sort">
				<MdSort size={18} />
				<span>Sort by:</span>
				<select
					className="dashboard-sort__select"
					value={sortValue}
					onChange={(e) => onSortChange(e.target.value)}
				>
					<option value="latest">Latest</option>
					<option value="priceAsc">Price ↑</option>
					<option value="priceDesc">Price ↓</option>
				</select>
			</div>
			<button type="button" className="dashboard-filter-btn">
				<MdFilterList size={18} />
				<span>Filter</span>
			</button>
		</div>
	)
}
