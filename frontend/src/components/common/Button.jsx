import Spinner from './Spinner.jsx'
import '../../styles/components/button.css'

const cx = (...parts) => parts.filter(Boolean).join(' ')

export default function Button({
	children,
	variant = 'primary', // primary | secondary | outline | ghost | danger
	size = 'md', // sm | md | lg
	fullWidth = false,
	loading = false,
	disabled = false,
	leftIcon,
	rightIcon,
	className,
	type = 'button',
	as: Component = 'button',
	href,
	to,
	onClick,
	...rest
}) {
	const classes = cx(
		'cm-btn',
		`cm-btn--${variant}`,
		`cm-btn--${size}`,
		fullWidth && 'cm-btn--block',
		loading && 'is-loading',
		className,
	)

	const content = (
		<>
			{loading && <Spinner size={16} />}
			{!loading && leftIcon}
			<span>{children}</span>
			{!loading && rightIcon}
		</>
	)

	// Render anchor element
	if (Component === 'a' || href) {
		return (
			<a className={classes} href={href} onClick={onClick} aria-disabled={disabled || loading} {...rest}>
				{content}
			</a>
		)
	}

	// Support polymorphic component (e.g., react-router-dom Link)
	if (Component !== 'button') {
		// Pass `to` for Link-type components
		return (
			<Component
				className={classes}
				to={to}
				onClick={onClick}
				aria-disabled={disabled || loading}
				{...rest}
			>
				{content}
			</Component>
		)
	}

	// Default native button
	return (
		<button type={type} className={classes} disabled={disabled || loading} onClick={onClick} {...rest}>
			{content}
		</button>
	)
}

