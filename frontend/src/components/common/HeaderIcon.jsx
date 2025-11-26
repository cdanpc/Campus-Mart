import { Link } from 'react-router-dom'
import './HeaderIcon.css'

export default function HeaderIcon({
	to,
	icon: Icon,
	title,
	badge,
	onClick,
	className = '',
}) {
	const content = (
		<>
			<Icon />
			{badge && <span className="header-icon__badge">{badge}</span>}
		</>
	)

	const classes = `header-icon ${className}`.trim()

	if (to) {
		return (
			<Link to={to} className={classes} title={title} onClick={onClick}>
				{content}
			</Link>
		)
	}

	return (
		<button type="button" className={classes} title={title} onClick={onClick}>
			{content}
		</button>
	)
}
