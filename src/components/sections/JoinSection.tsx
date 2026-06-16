import { Link } from 'react-router-dom'
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

const FEE_TABLE = [
  { category: '일반 카테고리', rate: '10%', note: '' },
  { category: '뷰티 / 프리미엄', rate: '12%', note: '' },
  { category: '신규 입점 2개월', rate: '0%', note: '프로모션 혜택' },
]

const SUCCESS_STORIES = [
  { brand: '라네즈', dept: '롯데 · 신세계', monthly: '월 매출 4,200만원', change: '+38%' },
  { brand: '헤라', dept: '현대 · 신세계', monthly: '월 매출 3,800만원', change: '+52%' },
  { brand: '이니스프리', dept: '롯데', monthly: '월 매출 2,900만원', change: '+67%' },
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

      {/* 2단계 카드 */}
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

      {/* CTA 버튼 */}
      <div className="text-center mb-12">
        <Link
          to="/partner/register"
          className="inline-block bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold px-10 py-3.5 rounded-full text-[14px] transition-colors shadow-sm"
        >
          입점 신청하기
        </Link>
      </div>

      {/* 수수료 안내 */}
      <div className="mb-12">
        <h3 className="text-[15px] font-bold text-[#111] mb-4 text-center">수수료 안내</h3>
        <div className="max-w-[520px] mx-auto border border-[#eee] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7f4ef]">
                <th className="text-left text-[11px] text-[#9a9080] uppercase tracking-wider px-5 py-3 font-medium">카테고리</th>
                <th className="text-center text-[11px] text-[#9a9080] uppercase tracking-wider px-5 py-3 font-medium">수수료율</th>
                <th className="text-right text-[11px] text-[#9a9080] uppercase tracking-wider px-5 py-3 font-medium">비고</th>
              </tr>
            </thead>
            <tbody>
              {FEE_TABLE.map(({ category, rate, note }, i) => (
                <tr key={category} className={`border-t border-[#eee] ${i === 2 ? 'bg-[#fdf8f0]' : ''}`}>
                  <td className="px-5 py-3.5 text-[13px] text-[#333]">{category}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`text-[14px] font-bold ${i === 2 ? 'text-[#b8924a]' : 'text-[#111]'}`}>{rate}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-[12px] text-[#9a9080]">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 성공 스토리 */}
      <div className="mb-12">
        <h3 className="text-[15px] font-bold text-[#111] mb-4 text-center">파트너 성공 스토리</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUCCESS_STORIES.map(({ brand, dept, monthly, change }) => (
            <div key={brand} className="bg-[#f7f4ef] rounded-xl p-6">
              <p className="text-[16px] font-bold text-[#111] mb-1">{brand}</p>
              <p className="text-[11px] text-[#9a9080] mb-3">{dept}</p>
              <p className="text-[15px] font-semibold text-[#333]">{monthly}</p>
              <p className="text-[12px] text-[#1D9E75] font-medium mt-1">{change} 성장</p>
            </div>
          ))}
        </div>
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
