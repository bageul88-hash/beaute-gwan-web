const SERVICES = [
  { title: '뷰티관',       desc: '셀러와 유저를 잇는 커머스크리에이터 플랫폼' },
  { title: '뷰티관 Cloud', desc: '미디어 커머스 SaaS 솔루션' },
  { title: '뷰티관 ONE',   desc: '브랜드와 커머스 크리에이터를 연결하는 플랫폼' },
]

export default function IntroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]" id="solution">
      {/* 좌측 */}
      <div className="flex flex-col justify-center px-6 lg:px-24 py-20 bg-white">
        <h2 className="font-display text-[32px] lg:text-[38px] font-bold text-[#111] leading-tight">
          <em className="not-italic text-gold">뷰티관</em>과 함께라면<br />
          누구나 쉽게<br />
          라이브를 할 수 있습니다
        </h2>
        <p className="text-[15px] text-[#5a5547] leading-[1.9] mt-4 max-w-sm">
          스마트폰 하나로 백화점 뷰티를 판매하고 무엇이든 쉽게 사고파는 세상을 꿈꿉니다.
        </p>
      </div>

      {/* 우측 */}
      <div className="flex flex-col justify-center gap-4 px-6 lg:px-24 py-20 bg-cream border-l border-[0.5px] border-[#eee]">
        {SERVICES.map(({ title, desc }) => (
          <div key={title} className="flex gap-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" aria-hidden="true" />
            <div>
              <p className="text-[16px] font-medium text-[#111]">{title}</p>
              <p className="text-[13px] text-[#5a5547] leading-[1.7] mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
