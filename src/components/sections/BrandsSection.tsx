import SectionHeader from '../common/SectionHeader'
import Badge from '../common/Badge'
import { BRANDS } from '../../constants/brands'

export default function BrandsSection() {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 lg:px-24 border-t border-[0.5px] border-[#eee]">
      <SectionHeader
        eyebrow="PARTNERS"
        title={<>백화점 <em className="not-italic text-gold">3사 공식</em> 파트너</>}
        align="center"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BRANDS.map(({ deptKey, nameKo, nameEn, brands, badgeBg, badgeText }) => (
          <div key={deptKey} className="rounded-md p-8" style={{ backgroundColor: badgeBg }}>
            <div className="flex items-center justify-between mb-5">
              <Badge label={nameEn} bgColor={badgeBg} textColor={badgeText} size="sm" />
            </div>
            <h3 className="font-display text-[22px] font-bold mb-4" style={{ color: badgeText }}>
              {nameKo}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {brands.map(b => (
                <span
                  key={b}
                  className="text-[12px] px-3 py-1 rounded-pill bg-white/60"
                  style={{ color: badgeText }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
