import { NavLink } from 'react-router-dom'
import {
  IconHome,
  IconVideo,
  IconLayoutGrid,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react'

const TABS = [
  { to: '/app/home',     icon: IconHome,         label: '홈' },
  { to: '/app/live',     icon: IconVideo,        label: '라이브' },
  { to: '/app/category', icon: IconLayoutGrid,   label: '카테고리' },
  { to: '/app/cart',     icon: IconShoppingCart, label: '장바구니' },
  { to: '/app/mypage',   icon: IconUser,         label: '마이' },
]

export default function AppTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-[#eee] flex z-50 safe-area-inset-bottom">
      {TABS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive ? 'text-[#b8924a]' : 'text-[#999]'
            }`
          }
        >
          <Icon size={22} />
          <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
