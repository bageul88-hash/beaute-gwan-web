import { Link } from 'react-router-dom'
import { IconUsers, IconCurrencyWon } from '@tabler/icons-react'
import type { LiveStream, LiveStatus } from '../../types'

const STATUS_MAP: Record<LiveStatus, { label: string; bg: string; text: string; dot?: boolean }> = {
  scheduled: { label: '예정', bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  live: { label: 'LIVE', bg: 'bg-[#FBEAF0]', text: 'text-[#993556]', dot: true },
  ended: { label: '완료', bg: 'bg-[#EEEDFE]', text: 'text-[#3C3489]' },
  cancelled: { label: '취소', bg: 'bg-[#FAECE7]', text: 'text-[#712B13]' },
}

function formatDateTime(d: Date) {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

interface LiveCardProps {
  live: LiveStream
}

export default function LiveCard({ live }: LiveCardProps) {
  const badge = STATUS_MAP[live.status]

  return (
    <div className="bg-white border border-[#e5e0d8] rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 mr-3">
          <p className="text-[14px] font-bold text-[#111] leading-tight mb-1">{live.title}</p>
          <p className="text-[12px] text-[#9a9080]">{formatDateTime(live.scheduledAt)}</p>
        </div>
        <span className={`shrink-0 flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}>
          {badge.dot && <span className="w-1.5 h-1.5 rounded-full bg-[#993556] animate-pulse" />}
          {badge.label}
        </span>
      </div>

      {/* 상품 썸네일 */}
      {live.products.length > 0 && (
        <div className="flex gap-2 mb-3">
          {live.products.slice(0, 3).map((p) => (
            <div key={p.id} className="w-12 h-12 bg-[#f7f4ef] rounded-lg flex items-center justify-center text-[10px] text-[#bbb]">
              이미지
            </div>
          ))}
          {live.products.length > 3 && (
            <div className="w-12 h-12 bg-[#f7f4ef] rounded-lg flex items-center justify-center text-[11px] text-[#9a9080]">
              +{live.products.length - 3}
            </div>
          )}
        </div>
      )}

      {/* 통계 (완료된 방송) */}
      {live.status === 'ended' && (
        <div className="flex gap-4 mb-4 py-3 border-y border-[#eee]">
          <div className="flex items-center gap-1.5 text-[12px] text-[#555]">
            <IconUsers size={14} className="text-[#9a9080]" />
            {live.viewers.toLocaleString()}명
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#555]">
            <IconCurrencyWon size={14} className="text-[#9a9080]" />
            {live.totalSales.toLocaleString()}원
          </div>
        </div>
      )}

      {/* 액션 */}
      <div className="flex gap-2">
        {live.status === 'scheduled' && (
          <>
            <Link
              to={`/partner/live/${live.id}`}
              className="flex-1 text-center bg-[#b8924a] text-white text-[12px] font-semibold py-2 rounded-lg hover:bg-[#a07c3b] transition-colors"
            >
              방송 입장
            </Link>
            <button className="px-4 text-[12px] text-[#555] border border-[#e5e0d8] rounded-lg hover:border-[#9a9080] transition-colors">
              수정
            </button>
            <button className="px-4 text-[12px] text-red-400 border border-[#e5e0d8] rounded-lg hover:border-red-400 transition-colors">
              취소
            </button>
          </>
        )}
        {live.status === 'ended' && (
          <Link
            to={`/partner/live/${live.id}`}
            className="flex-1 text-center border border-[#e5e0d8] text-[#555] text-[12px] py-2 rounded-lg hover:border-[#b8924a] hover:text-[#b8924a] transition-colors"
          >
            결과 보기
          </Link>
        )}
      </div>
    </div>
  )
}
