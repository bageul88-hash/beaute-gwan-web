import PartnerLayout from '../../components/partner/PartnerLayout'
import SettlementTable from '../../components/partner/SettlementTable'
import { MOCK_SETTLEMENTS } from '../../constants/mockData'

const FEE_RULES = [
  { category: '일반 카테고리', rate: '10%' },
  { category: '뷰티 / 스킨케어', rate: '12%' },
  { category: '신규 입점 2개월', rate: '0% (프로모션)' },
]

export default function SettlementPage() {
  const thisMonth = MOCK_SETTLEMENTS.find((s) => s.status === 'pending')
  const lastMonth = MOCK_SETTLEMENTS.find((s) => s.status === 'completed')
  const totalSettled = MOCK_SETTLEMENTS.filter((s) => s.status === 'completed').reduce((sum, s) => sum + s.settlementAmount, 0)

  return (
    <PartnerLayout title="정산 관리">
      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#e5e0d8] rounded-[14px] p-6">
          <p className="text-[12px] text-[#9a9080] mb-2">이번 달 정산 예정액</p>
          <p className="font-serif text-[28px] font-bold text-[#b8924a]">
            {(thisMonth?.settlementAmount ?? 0).toLocaleString()}
            <span className="text-[14px] text-[#9a9080] font-normal ml-1">원</span>
          </p>
          <p className="text-[12px] text-[#9a9080] mt-2">정산 예정일: 매월 15일</p>
        </div>

        <div className="bg-white border border-[#e5e0d8] rounded-[14px] p-6">
          <p className="text-[12px] text-[#9a9080] mb-2">지난 달 정산 완료액</p>
          <p className="font-serif text-[28px] font-bold text-[#111]">
            {(lastMonth?.settlementAmount ?? 0).toLocaleString()}
            <span className="text-[14px] text-[#9a9080] font-normal ml-1">원</span>
          </p>
          <p className="text-[12px] text-[#9a9080] mt-2">
            {lastMonth?.settledAt ? `${lastMonth.settledAt.getMonth() + 1}/${lastMonth.settledAt.getDate()} 입금` : '-'}
          </p>
        </div>

        <div className="bg-white border border-[#e5e0d8] rounded-[14px] p-6">
          <p className="text-[12px] text-[#9a9080] mb-2">누적 정산 총액</p>
          <p className="font-serif text-[28px] font-bold text-[#111]">
            {totalSettled.toLocaleString()}
            <span className="text-[14px] text-[#9a9080] font-normal ml-1">원</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 정산 내역 테이블 */}
        <div className="lg:col-span-2 bg-white rounded-[14px] border border-[#e5e0d8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#eee]">
            <h2 className="text-[14px] font-bold text-[#111]">정산 내역</h2>
          </div>
          <SettlementTable settlements={MOCK_SETTLEMENTS} />
        </div>

        {/* 수수료 구조 + 정산 일정 */}
        <div className="space-y-4">
          <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-5">
            <h3 className="text-[13px] font-bold text-[#111] mb-4">수수료 구조</h3>
            <div className="space-y-3">
              {FEE_RULES.map(({ category, rate }) => (
                <div key={category} className="flex items-center justify-between">
                  <p className="text-[12px] text-[#555]">{category}</p>
                  <p className="text-[13px] font-bold text-[#b8924a]">{rate}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f7f4ef] rounded-[14px] border-l-[3px] border-[#b8924a] p-5">
            <h3 className="text-[13px] font-bold text-[#333] mb-2">정산 일정 안내</h3>
            <p className="text-[12px] text-[#5a5547] leading-[1.8]">
              매월 15일, 전월 1일~말일의 판매 건에 대한 정산이 진행됩니다.
              <br />
              15일이 공휴일인 경우 익 영업일에 입금됩니다.
            </p>
          </div>
        </div>
      </div>
    </PartnerLayout>
  )
}
