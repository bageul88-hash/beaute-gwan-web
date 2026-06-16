import { useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import PartnerLayout from '../../components/partner/PartnerLayout'
import OrderTable from '../../components/partner/OrderTable'
import { MOCK_ORDERS } from '../../constants/mockData'
import type { Order, OrderStatus } from '../../types'

const TABS: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'paid', label: '결제완료' },
  { value: 'preparing', label: '배송준비' },
  { value: 'shipping', label: '배송중' },
  { value: 'delivered', label: '배송완료' },
  { value: 'cancelled', label: '취소/환불' },
]

const DATE_FILTERS = ['오늘', '1주일', '1개월', '직접선택']

export default function OrdersPage() {
  const [tab, setTab] = useState<OrderStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('1개월')

  const filtered = MOCK_ORDERS.filter((o: Order) => {
    const matchTab = tab === 'all' || o.status === tab || (tab === 'cancelled' && (o.status === 'cancelled' || o.status === 'refunded'))
    const matchSearch = o.orderNumber.includes(search) || o.productName.includes(search) || o.buyerName.includes(search)
    return matchTab && matchSearch
  })

  return (
    <PartnerLayout title="주문 관리">
      {/* 탭 */}
      <div className="flex gap-1 bg-white border border-[#e5e0d8] rounded-lg p-1 mb-4 w-fit">
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`px-4 py-1.5 rounded text-[13px] transition-colors ${
              tab === value ? 'bg-[#b8924a] text-white font-semibold' : 'text-[#555] hover:text-[#111]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 필터 바 */}
      <div className="flex gap-3 mb-5">
        <div className="flex gap-2">
          {DATE_FILTERS.map((df) => (
            <button
              key={df}
              onClick={() => setDateFilter(df)}
              className={`px-3.5 py-2 rounded-lg text-[12px] border transition-colors ${
                dateFilter === df ? 'border-[#b8924a] text-[#b8924a] bg-[#fdf8f0]' : 'border-[#e5e0d8] text-[#555]'
              }`}
            >
              {df}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-[320px]">
          <IconSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9080]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="주문번호, 상품명, 구매자 검색"
            className="w-full pl-9 pr-4 py-2 border border-[#e5e0d8] rounded-lg text-[13px] focus:outline-none focus:border-[#b8924a] transition-colors"
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-[14px] border border-[#e5e0d8] overflow-hidden">
        <OrderTable orders={filtered} />
      </div>
    </PartnerLayout>
  )
}
