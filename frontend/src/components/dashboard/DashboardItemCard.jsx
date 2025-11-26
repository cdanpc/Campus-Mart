import { MdPerson, MdLocalOffer, MdFavorite, MdFavoriteBorder, MdChevronRight } from 'react-icons/md'
import './DashboardItemCard.css'

export default function DashboardItemCard({ item, onToggleFavorite }) {
	return (
		<div className="dashboard-item-card">
			<div className="dashboard-item-card__image">
				{item.img && <img src={item.img} alt={item.title} />}
			</div>

			<div className="dashboard-item-card__info">
				<div className="dashboard-item-card__title">{item.title}</div>
				<div className="dashboard-item-card__seller">
					<MdPerson size={14} />
					<span>Sold by: {item.seller}</span>
				</div>
				<div className="dashboard-item-card__price">
					<MdLocalOffer size={18} />
					<span>₱{item.price.toLocaleString()}</span>
				</div>
			</div>

			<div className="dashboard-item-card__footer">
				<button type="button" className="dashboard-item-card__details-btn">
					<span>View Details</span>
					<MdChevronRight size={18} />
				</button>
				<button
					type="button"
					aria-label="Favorite"
					className="dashboard-item-card__fav-btn"
					onClick={() => onToggleFavorite(item.id)}
				>
					{item.fav ? <MdFavorite size={18} /> : <MdFavoriteBorder size={18} />}
				</button>
			</div>
		</div>
	)
}
