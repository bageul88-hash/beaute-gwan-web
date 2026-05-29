interface BadgeProps {
  label: string
  bgColor: string
  textColor: string
  size?: 'sm' | 'md'
}

export default function Badge({ label, bgColor, textColor, size = 'md' }: BadgeProps) {
  const cls = size === 'sm'
    ? 'text-[11px] px-[10px] py-[3px]'
    : 'text-[12px] px-[14px] py-[5px]'
  return (
    <span
      className={`inline-block font-medium rounded-pill ${cls}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </span>
  )
}
