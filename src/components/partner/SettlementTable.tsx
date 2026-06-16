import type { Settlement } from '../../types'

const STATUS_MAP = {
  pending: { label: '정산 예정', bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  completed: { label: '정산 완료', bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
}

interface SettlementTableProps {
  settlements: Settlement[]
}

export default function SettlementTable({ settlements }: SettlementTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#f7f4ef]">
            {['정산월', '판매액', '수수료율', '수수료', '정산액', '상태', '입금일'].map((col) => (
              <th key={col} className="text-left text-[11px] text-[#9a9080] uppercase tracking-wider px-5 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {settlements.map((s) => {
            const badge = STATUS_MAP[s.status]
            return (
              <tr key={s.id} className="border-t border-[#eee] hover:bg-[#fdf3e7] transition-colors">
                <td className="px-5 py-4 text-[13px] font-medium text-[#333]">{s.month}</td>
                <td className="px-5 py-4 text-[13px] text-[#111]">{s.salesAmount.toLocaleString()}원</td>
                <td className="px-5 py-4 text-[13px] text-[#555]">
                  {s.commissionRate === 0 ? (
                    <span className="text-[#b8924a] font-medium">0% (프로모션)</span>
                  ) : (
                    `${s.commissionRate}%`
                  )}
                </td>
                <td className="px-5 py-4 text-[13px] text-[#555]">{s.commission.toLocaleString()}원</td>
                <td className="px-5 py-4 text-[14px] font-bold text-[#111]">{s.settlementAmount.toLocaleString()}원</td>
                <td className="px-5 py-4">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                </td>
                <td className="px-5 py-4 text-[12px] text-[#9a9080]">
                  {s.settledAt ? `${s.settledAt.getMonth() + 1}/${s.settledAt.getDate()}` : '-'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
