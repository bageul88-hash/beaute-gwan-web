interface ButtonProps {
  variant: 'gold' | 'ghost' | 'outline-gold' | 'outline-white' | 'cancel'
  size: 'sm' | 'md' | 'lg'
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  fullWidth?: boolean
  className?: string
}

const VARIANT: Record<ButtonProps['variant'], string> = {
  'gold':          'bg-gold text-white hover:bg-gold-light',
  'ghost':         'bg-transparent border border-[#333] text-[#bbb] hover:border-[#555]',
  'outline-gold':  'bg-transparent border border-gold text-gold hover:bg-gold/10',
  'outline-white': 'bg-transparent border border-white/50 text-white hover:bg-white/10',
  'cancel':        'bg-[#f0ede8] text-[#5a5547] hover:bg-cream-2',
}

const SIZE: Record<ButtonProps['size'], string> = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-6 py-3 text-[13px]',
  lg: 'px-8 py-4 text-[14px]',
}

export default function Button({
  variant, size, label, icon, onClick, type = 'button', fullWidth = false, className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-pill font-body font-medium',
        'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
        VARIANT[variant],
        SIZE[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </button>
  )
}
