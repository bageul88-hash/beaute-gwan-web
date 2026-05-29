import SectionHeader from '../common/SectionHeader'

const STEPS = [
  {
    num: '01',
    title: '뷰티관 회원가입',
    desc: '계정을 공유한다면 이메일을 사용하여 가입해주세요.\n기존 백화점 계정으로도 연동 가능합니다.',
  },
  {
    num: '02',
    title: '입점 신청',
    desc: '· 뷰티, 스킨케어, 메이크업 카테고리:\n  입점 심사 진행 (영업일 기준 3~5일 소요)\n· 그 외 카테고리: 자동 승인',
  },
]

export default function JoinSection() {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 lg:px-24" id="join">
      <SectionHeader
        eyebrow="JOIN US"
        title="입점 안내"
        subtitle="간단한 2단계로 뷰티관에 입점하세요."
        align="center"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {STEPS.map(({ num, title, desc }) => (
          <div key={num} className="border border-[0.5px] border-[#eee] rounded-md p-8">
            <div className="w-8 h-8 rounded-full bg-gold text-white text-[13px] font-bold flex items-center justify-center mb-3" aria-hidden="true">
              {num}
            </div>
            <h3 className="text-[18px] font-bold text-[#111] mb-2">{title}</h3>
            <p className="text-[13px] text-[#5a5547] leading-[1.9] whitespace-pre-line">{desc}</p>
          </div>
        ))}
      </div>

      {/* 안내 박스 */}
      <div className="bg-cream border-l-[3px] border-gold pl-6 pr-6 py-6">
        <p className="text-[14px] font-medium text-[#111] mb-2">입점 안내사항</p>
        <div className="text-[13px] text-[#5a5547] leading-[1.9] space-y-1">
          <p>· 택배로 배송하는 상품이나 디지털 상품을 판매하고 있다면 입점할 수 있습니다.</p>
          <p>· 뷰티, 스킨케어 카테고리로 입점 신청할 경우 별도의 입점 심사가 진행됩니다.</p>
          <p>· 백화점 공식 입점 브랜드에 한해 심사 시 우선 검토됩니다.</p>
        </div>
      </div>
    </section>
  )
}
