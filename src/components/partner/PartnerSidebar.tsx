import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  IconLayoutDashboard,
  IconPackage,
  IconVideo,
  IconShoppingCart,
  IconCash,
  IconUser,
  IconLogout,
} from '@tabler/icons-react'
import { useAuthStore } from '../../store/authStore'

const NAV_ITEMS = [
  { label: '대시보드', to: '/partner/dashboard', icon: IconLayoutDashboard },
  { label: '상품 관리', to: '/partner/products', icon: IconPackage },
  { label: '라이브 관리', to: '/partner/live', icon: IconVideo },
  { label: '주문 관리', to: '/partner/orders', icon: IconShoppingCart },
  { label: '정산 관리', to: '/partner/settlement', icon: IconCash },
  { label: '프로필 설정', to: '/partner/profile', icon: IconUser },
]

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  approved: { bg: 'bg-[#E1F5EE]', text: 'text-[#085041]', label: '승인완료' },
  pending: { bg: 'bg-[#FAEEDA]', text: 'text-[#633806]', label: '심사중' },
  rejected: { bg: 'bg-[#FAECE7]', text: 'text-[#712B13]', label: '반려' },
}

export default function PartnerSidebar() {
  const partner = useAuthStore((s) => s.partner)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const badge = STATUS_BADGE[partner?.status ?? 'pending']

  function handleLogout() {
    logout()
    navigate('/partner/login')
  }

  return (
    <aside className="w-[240px] min-h-screen bg-[#0e0c08] flex flex-col fixed left-0 top-0 z-30">
      {/* 로고 */}
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <Link to="/" className="block">
          <p className="text-[#b8924a] font-serif text-[20px] font-bold tracking-wide hover:text-[#d4aa6a] transition-colors">뷰티관</p>
          <p className="text-[#555] text-[11px] mt-0.5 tracking-widest uppercase">Partner Center</p>
        </Link>
      </div>

      {/* 브랜드 정보 */}
      <div className="px-6 py-4 border-b border-white/10">
        <p className="text-white text-[13px] font-semibold">{partner?.brandName ?? '-'}</p>
        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-medium ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 py-4">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-[13px] transition-colors ${
                isActive
                  ? 'text-[#b8924a] bg-[rgba(184,146,74,0.1)] border-l-[3px] border-[#b8924a] pl-[17px]'
                  : 'text-[#888] hover:text-white border-l-[3px] border-transparent pl-[17px]'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* 로그아웃 */}
      <div className="px-6 py-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#555] hover:text-white text-[13px] transition-colors"
        >
          <IconLogout size={16} />
          로그아웃
        </button>
      </div>
    </aside>
  )
}
