import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { IconUpload, IconX, IconToggleRight, IconToggleLeft } from '@tabler/icons-react'
import PartnerLayout from '../../components/partner/PartnerLayout'

const schema = z.object({
  name: z.string().min(1, '상품명을 입력하세요').max(100),
  category: z.string().min(1, '카테고리를 선택하세요'),
  deptKey: z.string().min(1, '브랜드관을 선택하세요'),
  price: z.coerce.number().min(1, '판매가를 입력하세요'),
  originalPrice: z.coerce.number().optional(),
  stock: z.coerce.number().min(0, '재고를 입력하세요'),
  description: z.string().optional(),
  volume: z.string().optional(),
  livePriceEnabled: z.boolean().optional(),
  livePrice: z.coerce.number().optional(),
  liveStock: z.coerce.number().optional(),
})

type FormValues = z.infer<typeof schema>

const inputClass = 'w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#b8924a] transition-colors'

export default function ProductNewPage() {
  const navigate = useNavigate()
  const [images, setImages] = useState<string[]>([])
  const [liveEnabled, setLiveEnabled] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    files.slice(0, 5 - images.length).forEach((file) => {
      const url = URL.createObjectURL(file)
      setImages((prev) => [...prev, url])
    })
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function onSubmit(_data: FormValues) {
    alert('상품이 등록되었습니다.')
    navigate('/partner/products')
  }

  return (
    <PartnerLayout title="상품 등록">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 이미지 업로드 */}
          <div className="space-y-4">
            <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6">
              <h3 className="text-[14px] font-bold text-[#111] mb-4">상품 이미지</h3>

              {/* 대표 이미지 */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square bg-[#f7f4ef] rounded-xl border-2 border-dashed border-[#e5e0d8] flex flex-col items-center justify-center cursor-pointer hover:border-[#b8924a] transition-colors mb-3"
              >
                {images[0] ? (
                  <img src={images[0]} alt="대표이미지" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <IconUpload size={24} className="text-[#bbb] mb-2" />
                    <p className="text-[13px] text-[#9a9080]">대표 이미지 업로드</p>
                    <p className="text-[11px] text-[#bbb] mt-1">클릭 또는 드래그</p>
                  </>
                )}
              </div>

              {/* 추가 이미지 */}
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1).map((src, i) => (
                  <div key={i} className="relative aspect-square">
                    <img src={src} alt={`추가이미지${i + 2}`} className="w-full h-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(i + 1)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <IconX size={10} />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square bg-[#f7f4ef] border border-dashed border-[#e5e0d8] rounded-lg flex items-center justify-center text-[#bbb] hover:border-[#b8924a] transition-colors text-[20px]"
                  >
                    +
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* 라이브 설정 */}
            <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-bold text-[#111]">라이브 전용 특가</h3>
                <button type="button" onClick={() => setLiveEnabled(!liveEnabled)} className="text-[#b8924a]">
                  {liveEnabled ? <IconToggleRight size={28} /> : <IconToggleLeft size={28} className="text-[#bbb]" />}
                </button>
              </div>

              {liveEnabled && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[12px] text-[#555] mb-1">라이브 특가 금액 (원)</label>
                    <input {...register('livePrice')} type="number" placeholder="0" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#555] mb-1">라이브 한정 수량</label>
                    <input {...register('liveStock')} type="number" placeholder="0" className={inputClass} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6 space-y-4">
            <h3 className="text-[14px] font-bold text-[#111] mb-2">상품 정보</h3>

            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">상품명 *</label>
              <input {...register('name')} placeholder="상품명 (최대 100자)" className={inputClass} />
              {errors.name && <p className="mt-1 text-[12px] text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">카테고리 *</label>
              <select {...register('category')} className={inputClass}>
                <option value="">선택</option>
                <option value="skincare">스킨케어</option>
                <option value="makeup">메이크업</option>
                <option value="perfume">향수</option>
                <option value="hair">헤어케어</option>
                <option value="body">바디케어</option>
              </select>
              {errors.category && <p className="mt-1 text-[12px] text-red-500">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">브랜드관 *</label>
              <select {...register('deptKey')} className={inputClass}>
                <option value="">선택</option>
                <option value="lotte">롯데관</option>
                <option value="shinsegae">신세계관</option>
                <option value="hyundai">현대관</option>
              </select>
              {errors.deptKey && <p className="mt-1 text-[12px] text-red-500">{errors.deptKey.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">판매가 (원) *</label>
                <input {...register('price')} type="number" placeholder="0" className={inputClass} />
                {errors.price && <p className="mt-1 text-[12px] text-red-500">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">정가 (원)</label>
                <input {...register('originalPrice')} type="number" placeholder="0 (선택)" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">재고 수량 *</label>
              <input {...register('stock')} type="number" placeholder="0" className={inputClass} />
              {errors.stock && <p className="mt-1 text-[12px] text-red-500">{errors.stock.message}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">용량 / 사이즈</label>
              <input {...register('volume')} placeholder="예: 60ml" className={inputClass} />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">상품 설명</label>
              <textarea
                {...register('description')}
                rows={5}
                placeholder="상품 설명을 입력하세요"
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 mt-6 justify-end">
          <button
            type="button"
            onClick={() => alert('임시저장 완료')}
            className="px-8 py-3 border border-[#e5e0d8] text-[#555] rounded-lg text-[14px] hover:bg-[#f7f4ef] transition-colors"
          >
            임시저장
          </button>
          <button
            type="submit"
            className="px-10 py-3 bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold rounded-lg text-[14px] transition-colors"
          >
            등록하기
          </button>
        </div>
      </form>
    </PartnerLayout>
  )
}
