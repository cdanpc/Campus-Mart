import logoImage from '../../assets/Final logo_imgupscaler.ai_V1(Fast)_2K.png'

export default function Logo({ className = '', size = 80 }) {
  return (
    <img
      src={logoImage}
      alt="CampusMart"
      style={{ height: size, width: 'auto', display: 'block' }}
      className={className}
    />
  )
}
