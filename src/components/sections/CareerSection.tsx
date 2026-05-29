import SectionHeader from '../common/SectionHeader'
import { CAREER_VALUES } from '../../constants/career'

export default function CareerSection() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-24 bg-[#1a1208]" id="career">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 좌측 */}
        <div>
          <SectionHeader
            eyebrow="CAREER"
            title={
              <>
                언제 어디서나, 누구나 쉽게<br />
                사고파는 세상을 함께 꿈꿉니다<br />
                <em className="not-italic text-gold">뷰티관의 여정에 함께해요</em>
              </>
            }
            dark
          />
          <p className="text-[14px] text-[#777] leading-relaxed -mt-8">
            새로운 뷰티 커머스를 만들어갈 뷰티관의 여정에 함께해요.
          </p>
        </div>

        {/* 우측 */}
        <div>
          <div className="flex flex-col gap-3 mb-6">
            {CAREER_VALUES.map(({ text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                <span className="text-[14px] text-[#bbb]">{text}</span>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center bg-gold text-white font-medium text-[14px] px-8 py-3.5 rounded-pill hover:bg-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            채용 공고 바로가기 →
          </a>
        </div>
      </div>
    </section>
  )
}
