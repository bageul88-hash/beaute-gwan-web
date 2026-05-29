import SectionHeader from '../common/SectionHeader'
import CheckItem from '../common/CheckItem'
import ContactForm from '../common/ContactForm'

const PROCESS = [
  '1. 문의 접수 및 처리결과 회신',
  '2. 담당자 연락 및 미팅 일정 조율',
  '3. 계약 및 온보딩 진행',
]

export default function ContactSection() {
  return (
    <section className="bg-cream py-16 lg:py-24 px-6 lg:px-24" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* 좌측 */}
        <div>
          <SectionHeader
            eyebrow="PARTNERSHIP"
            title={<>광고·<em className="not-italic text-gold">제휴</em> 문의</>}
            subtitle="브랜드와 함께 새로운 뷰티 라이브커머스를 만들어갑니다."
          />
          <div className="flex flex-col gap-3 mb-8">
            <CheckItem label="간편한 연동" />
            <CheckItem label="고객 소통 강화" />
            <CheckItem label="강력한 마케팅 효과" />
          </div>
          <div className="bg-white border border-[0.5px] border-[#e5e0d8] rounded-md p-8">
            <p className="text-[13px] text-[#9a9080] mb-3">진행 과정</p>
            <div className="space-y-2">
              {PROCESS.map(p => (
                <p key={p} className="text-[13px] text-[#5a5547] leading-[2.2]">{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 우측 폼 */}
        <ContactForm />
      </div>
    </section>
  )
}
