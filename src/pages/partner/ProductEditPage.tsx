import { useParams, useNavigate } from 'react-router-dom'
import PartnerLayout from '../../components/partner/PartnerLayout'
import { MOCK_PRODUCTS } from '../../constants/mockData'

export default function ProductEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = MOCK_PRODUCTS.find((p) => p.id === id)

  const inputClass = 'w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#b8924a] transition-colors'

  if (!product) {
    return (
      <PartnerLayout title="상품 수정">
        <div className="text-center py-24 text-[#9a9080]">상품을 찾을 수 없습니다.</div>
      </PartnerLayout>
    )
  }

  return (
    <PartnerLayout title="상품 수정">
      <div className="max-w-[640px]">
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6 space-y-4">
          <h3 className="text-[14px] font-bold text-[#111] mb-2">상품 정보 수정</h3>

          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">상품명</label>
            <input defaultValue={product.name} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">판매가 (원)</label>
              <input type="number" defaultValue={product.price} className={inputClass} />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">재고 수량</label>
              <input type="number" defaultValue={product.stock} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">상품 설명</label>
            <textarea defaultValue={product.description} rows={5} className={`${inputClass} resize-none`} />
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={() => navigate('/partner/products')}
            className="px-8 py-3 border border-[#e5e0d8] text-[#555] rounded-lg text-[14px] hover:bg-[#f7f4ef] transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => { alert('수정이 완료되었습니다.'); navigate('/partner/products') }}
            className="px-10 py-3 bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold rounded-lg text-[14px] transition-colors"
          >
            저장하기
          </button>
        </div>
      </div>
    </PartnerLayout>
  )
}
