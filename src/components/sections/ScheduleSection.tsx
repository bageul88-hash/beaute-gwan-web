import SectionHeader from '../common/SectionHeader'
import { SCHEDULE } from '../../constants/schedule'

export default function ScheduleSection() {
  return (
    <section className="bg-cream py-16 lg:py-24 px-6 lg:px-24">
      <SectionHeader
        eyebrow="SCHEDULE"
        title="정기 라이브 편성표"
        subtitle="매주 4회, 세대별 맞춤 라이브 방송을 운영합니다."
        align="center"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCHEDULE.map(({ day, title, desc, time }) => (
          <div
            key={day}
            className="bg-white border border-[0.5px] border-[#e5e0d8] rounded-md p-6 flex items-start gap-4"
          >
            <div
              className="min-w-[48px] h-12 rounded-full bg-[#f0ede8] border border-[#ddd] flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-[15px] font-medium text-gold">{day}</span>
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#111]">{title}</p>
              <p className="text-[13px] text-[#5a5547] leading-[1.6] mt-0.5">{desc}</p>
              <p className="text-[12px] text-gold mt-1.5">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
