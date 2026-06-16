import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconPlus, IconVideo } from '@tabler/icons-react'
import PartnerLayout from '../../components/partner/PartnerLayout'
import LiveCard from '../../components/partner/LiveCard'
import { MOCK_LIVES } from '../../constants/mockData'
import type { LiveStatus } from '../../types'

const TABS: { value: LiveStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'scheduled', label: '예정' },
  { value: 'live', label: '진행중' },
  { value: 'ended', label: '완료' },
  { value: 'cancelled', label: '취소' },
]

export default function LivePage() {
  const [tab, setTab] = useState<LiveStatus | 'all'>('all')

  const filtered = tab === 'all' ? MOCK_LIVES : MOCK_LIVES.filter((l) => l.status === tab)

  return (
    <PartnerLayout title="라이브 관리">
      <div className="flex items-center justify-between mb-6">
        {/* 탭 */}
        <div className="flex gap-1 bg-white border border-[#e5e0d8] rounded-lg p-1">
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

        <Link
          to="/partner/live/new"
          className="flex items-center gap-2 bg-[#b8924a] hover:bg-[#a07c3b] text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors"
        >
          <IconPlus size={16} />
          라이브 예약
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[14px] border border-[#e5e0d8]">
          <IconVideo size={40} className="text-[#e5e0d8] mx-auto mb-3" />
          <p className="text-[14px] text-[#9a9080] mb-4">라이브 방송이 없습니다</p>
          <Link
            to="/partner/live/new"
            className="inline-flex items-center gap-2 bg-[#b8924a] text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold"
          >
            <IconPlus size={16} />
            라이브 예약하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((live) => (
            <LiveCard key={live.id} live={live} />
          ))}
        </div>
      )}
    </PartnerLayout>
  )
}
