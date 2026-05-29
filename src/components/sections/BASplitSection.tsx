import SectionHeader from '../common/SectionHeader'
import CheckItem from '../common/CheckItem'
import PhoneMockup from '../common/PhoneMockup'

export default function BASplitSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
      {/* 좌측 텍스트 */}
      <div className="flex flex-col justify-center px-6 lg:px-24 py-20">
        <SectionHeader
          eyebrow="BA와의 직접 소통"
          title={<>내가 궁금한 제품을<br />전문가에게 바로{' '}<em className="not-italic text-gold">물어보세요</em></>}
        />
        <p className="text-[14px] text-[#5a5547] leading-[1.9] mb-6 max-w-sm">
          백화점 공식 뷰티 어드바이저가 직접 출연해 피부 고민을 상담하고 제품을 시연합니다.
          상품이 탄생하고 판매되는 그 현장에서 시작되는 진짜 뷰티 라이브!
        </p>
        <div className="flex flex-col gap-3">
          <CheckItem label="간편한 실시간 채팅 상담" />
          <CheckItem label="고객 피부 고민 소통 강화" />
          <CheckItem label="강력한 라이브 마케팅 효과" />
        </div>
      </div>

      {/* 우측 */}
      <div className="flex items-center justify-center bg-[#f0ede8] px-10 py-16" aria-hidden="true">
        <PhoneMockup width={200} />
      </div>
    </section>
  )
}
