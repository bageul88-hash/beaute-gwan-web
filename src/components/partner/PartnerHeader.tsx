import { IconBell } from '@tabler/icons-react'
import { useAuthStore } from '../../store/authStore'

interface PartnerHeaderProps {
  title: string
}

export default function PartnerHeader({ title }: PartnerHeaderProps) {
  const partner = useAuthStore((s) => s.partner)
  const initials = partner?.brandName?.slice(0, 2) ?? 'PA'

  return (
    <header className="h-[60px] bg-white border-b border-[#eee] flex items-center justify-between px-8 sticky top-0 z-20">
      <h1 className="text-[16px] font-semibold text-[#111]">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-[#9a9080] hover:text-[#111] transition-colors">
          <IconBell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b8924a] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-[#b8924a] text-white text-[12px] font-bold flex items-center justify-center">
          {initials}
        </div>
      </div>
    </header>
  )
}
