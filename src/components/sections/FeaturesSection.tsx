import SectionHeader from '../common/SectionHeader'
import { FEATURES } from '../../constants/features'

export default function FeaturesSection() {
  return (
    <section className="bg-cream py-16 lg:py-24 px-6 lg:px-24">
      <SectionHeader
        eyebrow="WHY 뷰티관"
        title={<>단순 쇼핑이 아닌 <em className="not-italic text-gold">뷰티 컨설팅</em></>}
        subtitle="백화점의 신뢰와 전문성을 그대로, 집에서 편하게 경험하세요."
        align="center"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-[0.5px] border-[#e5e0d8] rounded-md p-8"
          >
            <div className="mb-5" aria-hidden="true">
              <Icon size={32} color="#b8924a" />
            </div>
            <h3 className="text-[16px] font-medium text-[#111] mb-2">{title}</h3>
            <p className="text-[13px] text-[#5a5547] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
