import { IconBrandApple, IconBrandGooglePlay } from '@tabler/icons-react'
import Button from '../common/Button'

export default function CTASection() {
  return (
    <section className="bg-gold py-20 lg:py-[5rem] px-6 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 좌측 */}
        <div>
          <h2 className="font-display text-[36px] font-bold text-white leading-tight mb-3">
            지금 바로<br />시작하세요
          </h2>
          <p className="text-white/75 text-[15px] leading-relaxed">
            앱 설치 후 첫 구매 시 5,000원 즉시 할인 쿠폰을 드립니다.
          </p>
        </div>

        {/* 우측 */}
        <div className="flex flex-col gap-3 items-start">
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-gold px-5 py-3 rounded-pill text-[13px] font-medium hover:bg-white/90 transition-colors"
              aria-label="App Store에서 다운로드"
            >
              <IconBrandApple size={18} aria-hidden="true" />
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-gold px-5 py-3 rounded-pill text-[13px] font-medium hover:bg-white/90 transition-colors"
              aria-label="Google Play에서 다운로드"
            >
              <IconBrandGooglePlay size={18} aria-hidden="true" />
              Google Play
            </a>
          </div>
          <Button variant="outline-white" size="md" label="입점 문의하기" onClick={() => {}} />
        </div>
      </div>
    </section>
  )
}
