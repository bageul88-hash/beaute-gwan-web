import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IconCheck } from '@tabler/icons-react'
import PartnerLayout from '../../components/partner/PartnerLayout'
import { MOCK_PRODUCTS } from '../../constants/mockData'

const inputClass = 'w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#b8924a] transition-colors'

export default function LiveNewPage() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  function toggleProduct(id: string) {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  function onSubmit(_data: unknown) {
    alert('라이브가 예약되었습니다.')
    navigate('/partner/live')
  }

  return (
    <PartnerLayout title="라이브 예약">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[720px] space-y-6">
        {/* 방송 기본 정보 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6 space-y-4">
          <h3 className="text-[14px] font-bold text-[#111]">방송 기본 정보</h3>

          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">방송 제목 *</label>
            <input
              {...register('title', { required: true })}
              placeholder='예: "설화수 BA와 함께하는 스킨케어 특집"'
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">방송 예정일 *</label>
              <input {...register('date', { required: true })} type="date" className={inputClass} />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">방송 예정 시간 *</label>
              <input {...register('time', { required: true })} type="time" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">예상 방송 시간</label>
            <select {...register('duration')} className={inputClass}>
              <option value="30">30분</option>
              <option value="60">1시간</option>
              <option value="120">2시간</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">방송 설명</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="방송 내용을 간략히 소개해주세요"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* 판매 상품 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6">
          <h3 className="text-[14px] font-bold text-[#111] mb-4">판매 상품 선택</h3>

          <div className="space-y-2">
            {MOCK_PRODUCTS.map((product) => (
              <div
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                  selectedProducts.includes(product.id)
                    ? 'border-[#b8924a] bg-[#fdf8f0]'
                    : 'border-[#e5e0d8] hover:border-[#b8924a]'
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  selectedProducts.includes(product.id) ? 'bg-[#b8924a] border-[#b8924a]' : 'border-[#e5e0d8]'
                }`}>
                  {selectedProducts.includes(product.id) && <IconCheck size={12} color="white" />}
                </div>
                <div className="w-12 h-12 bg-[#f7f4ef] rounded-lg flex items-center justify-center text-[10px] text-[#bbb] shrink-0">
                  이미지
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#111] truncate">{product.name}</p>
                  <p className="text-[12px] text-[#9a9080]">{product.price.toLocaleString()}원</p>
                </div>
              </div>
            ))}
          </div>

          {selectedProducts.length > 0 && (
            <p className="text-[12px] text-[#b8924a] mt-3">{selectedProducts.length}개 상품 선택됨</p>
          )}
        </div>

        {/* 쿠폰 설정 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6 space-y-4">
          <h3 className="text-[14px] font-bold text-[#111]">라이브 전용 쿠폰 (선택)</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">할인 금액 또는 할인율</label>
              <input {...register('couponValue')} placeholder="예: 5000 또는 10%" className={inputClass} />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">최소 구매 금액 (원)</label>
              <input {...register('couponMinOrder')} type="number" placeholder="0" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">수량 제한</label>
            <input {...register('couponLimit')} type="number" placeholder="0 (무제한)" className={inputClass} />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-12 py-3 bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold rounded-lg text-[14px] transition-colors"
          >
            예약하기
          </button>
        </div>
      </form>
    </PartnerLayout>
  )
}
