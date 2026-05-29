interface SectionHeaderProps {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  dark?: boolean
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  eyebrow, title, subtitle, dark = false, align = 'left', className = '',
}: SectionHeaderProps) {
  const alignCls = align === 'center' ? 'text-center' : ''
  return (
    <div className={`${alignCls} ${className}`}>
      <p className="text-[11px] text-gold tracking-[3px] uppercase mb-4">{eyebrow}</p>
      <h2 className={`font-display text-[36px] font-bold leading-tight mb-4 ${dark ? 'text-white' : 'text-[#111]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[14px] leading-[1.8] mb-12 ${dark ? 'text-[#666]' : 'text-[#5a5547]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
