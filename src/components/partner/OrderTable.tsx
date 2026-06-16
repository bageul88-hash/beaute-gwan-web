import { useState } from 'react'
import { IconTruck } from '@tabler/icons-react'
import type { Order, OrderStatus } from '../../types'

const STATUS_MAP: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  paid: { label: '결제완료', bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  preparing: { label: '배송준비', bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  shipping: { label: '배송중', bg: 'bg-[#EEEDFE]', text: 'text-[#3C3489]' },
  delivered: { label: '배송완료', bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  cancelled: { label: '취소', bg: 'bg-[#FAECE7]', text: 'text-[#712B13]' },
  refunded: { label: '환불', bg: 'bg-[#FAECE7]', text: 'text-[#712B13]' },
}

interface OrderTableProps {
  orders: Order[]
}

export default function OrderTable({ orders }: OrderTableProps) {
  const [trackingModal, setTrackingModal] = useState<string | null>(null)
  const [trackingInput, setTrackingInput] = useState('')

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-[#9a9080] text-[13px]">
        해당 조건의 주문이 없습니다.
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f7f4ef]">
              {['주문번호', '주문일시', '구매자', '상품명', '수량', '결제금액', '상태', '처리'].map((col) => (
                <th key={col} className="text-left text-[11px] text-[#9a9080] uppercase tracking-wider px-4 py-3 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const badge = STATUS_MAP[order.status]
              return (
                <tr key={order.id} className="border-b border-[#eee] hover:bg-[#fdf3e7] transition-colors">
                  <td className="px-4 py-3.5 text-[12px] text-[#555] font-mono">{order.orderNumber}</td>
                  <td className="px-4 py-3.5 text-[12px] text-[#9a9080]">
                    {order.orderedAt.getMonth() + 1}/{order.orderedAt.getDate()}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-[#333]">{order.buyerName}</td>
                  <td className="px-4 py-3.5 text-[13px] text-[#111] max-w-[160px] truncate">{order.productName}</td>
                  <td className="px-4 py-3.5 text-[13px] text-[#333]">{order.quantity}</td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-[#111]">{order.amount.toLocaleString()}원</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {(order.status === 'paid' || order.status === 'preparing') && (
                      <button
                        onClick={() => { setTrackingModal(order.id); setTrackingInput(order.trackingNumber ?? '') }}
                        className="flex items-center gap-1 text-[12px] text-[#b8924a] hover:underline"
                      >
                        <IconTruck size={13} />
                        운송장
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 운송장 입력 모달 */}
      {trackingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] p-8 w-full max-w-[400px] shadow-xl">
            <h3 className="text-[16px] font-bold text-[#111] mb-4">운송장 입력</h3>
            <input
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="운송장 번호 입력"
              className="w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] focus:outline-none focus:border-[#b8924a] mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setTrackingModal(null)}
                className="flex-1 border border-[#e5e0d8] text-[#555] py-2.5 rounded-lg text-[13px] hover:bg-[#f7f4ef] transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => { alert('운송장이 저장되었습니다.'); setTrackingModal(null) }}
                className="flex-1 bg-[#b8924a] text-white font-semibold py-2.5 rounded-lg text-[13px] hover:bg-[#a07c3b] transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
