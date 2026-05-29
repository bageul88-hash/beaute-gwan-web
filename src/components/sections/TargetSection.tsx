import SectionHeader from '../common/SectionHeader'
import { TARGETS } from '../../constants/targets'

export default function TargetSection() {
  return (
    <section className="bg-dark py-16 lg:py-24 px-6 lg:px-24" id="success">
      <SectionHeader
        eyebrow="TARGET"
        title={<>세대별 <em className="not-italic text-gold">맞춤 경험</em></>}
        subtitle="각 세대의 뷰티 라이프스타일에 최적화된 콘텐츠와 서비스를 제공합니다."
        dark
        align="center"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TARGETS.map(({ age, ageColor, name, nameColor, keywords, kwBg, kwColor, desc }) => (
          <div
            key={age}
            className="rounded-md p-8 border border-[0.5px] border-[#2a2a2a]"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            <p className="font-display text-[32px] font-bold mb-1" style={{ color: ageColor }}>{age}</p>
            <p className="text-[14px] font-medium mb-3" style={{ color: nameColor }}>{name}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {keywords.map(kw => (
                <span
                  key={kw}
                  className="text-[12px] font-medium px-3 py-1 rounded-pill"
                  style={{ backgroundColor: kwBg, color: kwColor }}
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-[13px] text-[#666] leading-relaxed whitespace-pre-line">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
