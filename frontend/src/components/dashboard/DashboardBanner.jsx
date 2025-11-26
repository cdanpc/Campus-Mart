import './DashboardBanner.css'

export default function DashboardBanner() {
	return (
		<div className="dashboard-banner">
			<div>
				<div className="dashboard-banner__title">Get Discount Voucher</div>
				<div className="dashboard-banner__subtitle">Up to 20%</div>
			</div>
			<img
				src="/images/voucher-icon.png"
				alt="Voucher"
				className="dashboard-banner__icon"
			/>
		</div>
	)
}
