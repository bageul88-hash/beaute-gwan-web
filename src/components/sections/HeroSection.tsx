import { IconBrandApple, IconBrandGooglePlay } from '@tabler/icons-react'
import PhoneMockup from '../common/PhoneMockup'

export default function HeroSection() {
  return (
    <section className="relative bg-dark min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
      {/* 장식 원 */}
      <div className="absolute top-[-100px] right-[-50px] w-[500px] h-[500px] rounded-full border border-gold/10 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[50px] right-[80px] w-[300px] h-[300px] rounded-full bg-gold/6 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[80px] right-[200px] w-[160px] h-[160px] rounded-full border border-gold/15 pointer-events-none" aria-hidden="true" />

      {/* 좌측 텍스트 */}
      <div className="px-6 lg:px-24 py-32 lg:py-24">
        <p className="text-[11px] text-gold tracking-[3px] uppercase mb-6">
          DEPARTMENT BEAUTY LIVE
        </p>
        <h1 className="font-display text-[40px] lg:text-[48px] font-bold leading-tight text-white mb-6">
          백화점 뷰티를<br />
          <em className="not-italic text-gold">집에서, 전문가와</em><br />
          함께 경험하세요
        </h1>
        <p className="text-[15px] text-[#888] leading-[1.9] mb-10 max-w-md">
          롯데 · 신세계 · 현대 3사 공식 BA가 직접 출연하는 프리미엄 라이브커머스 플랫폼
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2.5 bg-gold text-white px-6 py-3 rounded-pill text-[13px] font-medium hover:bg-gold-light transition-colors"
            aria-label="App Store에서 다운로드"
          >
            <IconBrandApple size={18} aria-hidden="true" />
            App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 bg-transparent border border-[#333] text-[#bbb] px-6 py-3 rounded-pill text-[13px] font-medium hover:border-[#555] transition-colors"
            aria-label="Google Play에서 다운로드"
          >
            <IconBrandGooglePlay size={18} aria-hidden="true" />
            Google Play
          </a>
        </div>
      </div>

      {/* 우측 폰 목업 */}
      <div
        className="hidden lg:flex items-center justify-center h-screen border-l border-white/[0.04]"
        aria-hidden="true"
      >
        <PhoneMockup width={220} />
      </div>
    </section>
  )
}
