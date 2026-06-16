import { Link } from 'react-router-dom'
import { IconPlus, IconChevronRight, IconVideo, IconPackage, IconCash } from '@tabler/icons-react'
import PartnerLayout from '../../components/partner/PartnerLayout'
import StatsCard from '../../components/partner/StatsCard'
import { MOCK_STATS, MOCK_LIVES, MOCK_ORDERS } from '../../constants/mockData'
import type { LiveStatus, OrderStatus } from '../../types'

const LIVE_STATUS_MAP: Record<LiveStatus, { label: string; bg: string; text: string }> = {
  scheduled: { label: '예정', bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  live: { label: '진행중', bg: 'bg-[#FBEAF0]', text: 'text-[#993556]' },
  ended: { label: '완료', bg: 'bg-[#EEEDFE]', text: 'text-[#3C3489]' },
  cancelled: { label: '취소', bg: 'bg-[#FAECE7]', text: 'text-[#712B13]' },
}

const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  paid: { label: '결제완료', bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  preparing: { label: '배송준비', bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  shipping: { label: '배송중', bg: 'bg-[#EEEDFE]', text: 'text-[#3C3489]' },
  delivered: { label: '배송완료', bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  cancelled: { label: '취소', bg: 'bg-[#FAECE7]', text: 'text-[#712B13]' },
  refunded: { label: '환불', bg: 'bg-[#FAECE7]', text: 'text-[#712B13]' },
}

function formatDate(d: Date) {
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function DashboardPage() {
  const scheduledLives = MOCK_LIVES.filter((l) => l.status === 'scheduled')
  const recentOrders = MOCK_ORDERS.slice(0, 5)

  return (
    <PartnerLayout title="대시보드">
      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="이번 달 매출" value={MOCK_STATS.monthSales} unit="원" change={MOCK_STATS.monthSalesChange} color="#b8924a" />
        <StatsCard label="총 주문 수" value={MOCK_STATS.totalOrders} unit="건" change={MOCK_STATS.totalOrdersChange} />
        <StatsCard label="등록 상품 수" value={MOCK_STATS.productCount} unit="개" />
        <StatsCard label="예정된 라이브" value={MOCK_STATS.scheduledLives} unit="건" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 예정된 라이브 */}
        <div className="lg:col-span-1 bg-white rounded-[14px] border border-[#e5e0d8] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[14px] font-bold text-[#111]">예정된 라이브</h2>
            <Link to="/partner/live/new" className="flex items-center gap-1 text-[12px] text-[#b8924a] hover:underline">
              <IconPlus size={13} />
              라이브 예약
            </Link>
          </div>

          {scheduledLives.length === 0 ? (
            <div className="text-center py-8">
              <IconVideo size={32} className="text-[#e5e0d8] mx-auto mb-2" />
              <p className="text-[13px] text-[#9a9080]">예정된 라이브가 없습니다.</p>
              <Link to="/partner/live/new" className="text-[12px] text-[#b8924a] hover:underline mt-1 inline-block">
                라이브 예약하기
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {scheduledLives.map((live) => {
                const badge = LIVE_STATUS_MAP[live.status]
                return (
                  <Link
                    key={live.id}
                    to={`/partner/live/${live.id}`}
                    className="block p-4 bg-[#f7f4ef] rounded-xl hover:bg-[#f0ece6] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-[13px] font-semibold text-[#111] leading-tight">{live.title}</p>
                      <span className={`ml-2 shrink-0 text-[11px] font-medium px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#9a9080]">{formatDate(live.scheduledAt)}</p>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* 최근 주문 */}
        <div className="lg:col-span-2 bg-white rounded-[14px] border border-[#e5e0d8] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[14px] font-bold text-[#111]">최근 주문</h2>
            <Link to="/partner/orders" className="flex items-center gap-1 text-[12px] text-[#b8924a] hover:underline">
              전체 보기 <IconChevronRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eee]">
                  {['주문번호', '상품명', '금액', '상태', '주문일'].map((col) => (
                    <th key={col} className="text-left text-[11px] text-[#9a9080] uppercase tracking-wider pb-3 font-medium pr-4">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const badge = ORDER_STATUS_MAP[order.status]
                  return (
                    <tr key={order.id} className="border-b border-[#eee] hover:bg-[#fdf3e7] transition-colors">
                      <td className="py-3.5 pr-4 text-[12px] text-[#555] font-mono">{order.orderNumber}</td>
                      <td className="py-3.5 pr-4 text-[13px] text-[#111] max-w-[140px] truncate">{order.productName}</td>
                      <td className="py-3.5 pr-4 text-[13px] text-[#111] font-medium">{order.amount.toLocaleString()}원</td>
                      <td className="py-3.5 pr-4">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 text-[12px] text-[#9a9080]">
                        {order.orderedAt.getMonth() + 1}/{order.orderedAt.getDate()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 빠른 실행 */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '상품 등록하기', to: '/partner/products/new', icon: IconPackage },
          { label: '라이브 예약하기', to: '/partner/live/new', icon: IconVideo },
          { label: '정산 내역 확인', to: '/partner/settlement', icon: IconCash },
        ].map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center justify-center gap-2 bg-white border border-[#e5e0d8] rounded-xl py-4 text-[13px] font-medium text-[#555] hover:border-[#b8924a] hover:text-[#b8924a] transition-colors"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>
    </PartnerLayout>
  )
}
