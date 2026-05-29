import { useState } from 'react'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { useScrollY } from '../../hooks/useScrollY'
import Button from '../common/Button'

const NAV_LINKS = [
  { label: '입점안내',   href: '#join' },
  { label: '성공스토리', href: '#success' },
  { label: 'B2B 솔루션', href: '#solution' },
  { label: '광고·제휴',  href: '#contact' },
  { label: '채용(영입)', href: '#career' },
]

export default function GNB() {
  const [open, setOpen] = useState(false)
  const scrollY = useScrollY()
  const scrolled = scrollY > 10

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] h-16 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(184,146,74,0.18)' : 'none',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
        {/* 로고 */}
        <a href="/" className="font-display text-[22px] font-bold text-gold" aria-label="뷰티관 홈">
          뷰티관
        </a>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-10" aria-label="주요 메뉴">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-[13px] transition-colors duration-200 hover:text-[#111] ${scrolled ? 'text-[#5a5547]' : 'text-white/70'}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="gold" size="sm" label="입점하기" onClick={() => {}} className="hidden md:inline-flex" />
          <button
            className="md:hidden p-1"
            onClick={() => setOpen(!open)}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
          >
            {open
              ? <IconX size={22} color={scrolled ? '#111' : '#fff'} aria-hidden="true" />
              : <IconMenu2 size={22} color={scrolled ? '#111' : '#fff'} aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* 모바일 드로어 */}
      {open && (
        <nav
          className="md:hidden bg-white border-t border-cream-3 px-6 py-4"
          aria-label="모바일 메뉴"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="block py-3 text-[15px] text-[#1a1710] border-b border-cream-2 last:border-0"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="pt-4">
            <Button variant="gold" size="md" label="입점하기" fullWidth onClick={() => setOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  )
}
