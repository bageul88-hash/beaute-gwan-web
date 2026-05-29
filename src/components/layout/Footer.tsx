import { IconBrandYoutube, IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react'

const TOP_LINKS = ['회사소개', '입점안내', 'B2B 솔루션', '광고·제휴', '채용(영입)']
const LEGAL1 = ['이용약관', '판매 이용 약관', '유료서비스이용약관', '위치정보 이용 약관', '개인(위치)정보 처리 방침']
const LEGAL2 = ['서비스 운영정책', '청소년보호정책', '사업자정보확인']
const BOLD_LEGAL = new Set(['위치정보 이용 약관', '개인(위치)정보 처리 방침'])

export default function Footer() {
  return (
    <footer className="bg-[#0a0907] px-6 lg:px-24 py-16">
      {/* 상단 메뉴 */}
      <div className="flex flex-wrap gap-6 pb-6 border-b border-[#1a1a1a]">
        {TOP_LINKS.map(l => (
          <a key={l} href="#" className="text-[13px] text-[#555] hover:text-[#888] transition-colors">{l}</a>
        ))}
      </div>

      {/* SNS */}
      <div className="flex gap-2 mt-5 mb-5">
        {[
          { Icon: IconBrandYoutube,   label: 'YouTube' },
          { Icon: IconBrandFacebook,  label: 'Facebook' },
          { Icon: IconBrandInstagram, label: 'Instagram' },
        ].map(({ Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="w-8 h-8 rounded-full bg-[#141414] border border-[#222] flex items-center justify-center hover:border-[#444] transition-colors"
          >
            <Icon size={14} color="#555" aria-hidden="true" />
          </a>
        ))}
      </div>

      {/* 법적 링크 1 */}
      <div className="flex flex-wrap gap-3 mb-2">
        {LEGAL1.map(l => (
          <a
            key={l}
            href="#"
            className={`text-[11px] hover:text-[#555] transition-colors ${BOLD_LEGAL.has(l) ? 'text-[#555] font-medium' : 'text-[#333]'}`}
          >
            {l}
          </a>
        ))}
      </div>

      {/* 법적 링크 2 */}
      <div className="flex flex-wrap gap-3 mb-5">
        {LEGAL2.map(l => (
          <a key={l} href="#" className="text-[11px] text-[#333] hover:text-[#555] transition-colors">{l}</a>
        ))}
      </div>

      {/* 사업자 정보 */}
      <div className="text-[11px] text-[#2a2a2a] leading-[2] mb-4">
        <p>(주)뷰티관 · 대표이사 : OOO · 사업자 등록번호 : 000-00-00000 · 통신판매신고 : 0000-성남분당A-0000</p>
        <p>주소 : 경기도 성남시 분당구 판교역로 152, 00층 · 대표전화 : 1522-0000 · 이메일 : help@beautegwan.co</p>
        <p>호스팅 서비스 제공 : (주)뷰티관</p>
      </div>

      {/* 통신판매중개자 고지 */}
      <div className="pt-3 border-t border-[#111] text-[11px] text-[#2a2a2a] leading-relaxed">
        <p>(주)뷰티관은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품 정보 및 거래에 관한 의무와 책임은 판매자에게 있습니다.</p>
      </div>

      <p className="text-[11px] text-[#1a1a1a] mt-3">© 2025 뷰티관 Corp.</p>
    </footer>
  )
}
