const STATS = [
  { num: '3사',      label: '백화점 파트너' },
  { num: '50+',     label: '입점 브랜드' },
  { num: '주 4회',  label: '정기 라이브 편성' },
  { num: '3040·50', label: '타겟 고객층' },
]

export default function StatsBar() {
  return (
    <section className="bg-white border-b border-[0.5px] border-[#eee]" aria-label="서비스 현황">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ num, label }, i) => (
          <div
            key={label}
            className={`py-7 px-4 text-center ${i < STATS.length - 1 ? 'border-r border-[0.5px] border-[#eee]' : ''}`}
          >
            <p className="font-display text-[28px] font-bold text-[#111] leading-none">{num}</p>
            <p className="text-[12px] text-[#9a9080] mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
