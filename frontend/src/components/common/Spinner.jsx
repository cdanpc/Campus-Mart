export default function Spinner({ size = 16 }) {
	const s = typeof size === 'number' ? `${size}px` : size
	return (
		<span
			className="cm-spinner"
			aria-hidden
			style={{ width: s, height: s }}
		/>
	)
}

