import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IconCheck } from '@tabler/icons-react'
import { useAuthStore } from '../../store/authStore'

const CATEGORIES = [
  { value: 'skincare', label: '스킨케어' },
  { value: 'makeup', label: '메이크업' },
  { value: 'perfume', label: '향수' },
  { value: 'hair', label: '헤어케어' },
  { value: 'body', label: '바디케어' },
]

const STEP_LABELS = ['브랜드 정보', '상품 카테고리', '서류 업로드']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEP_LABELS.map((label, i) => {
        const step = i + 1
        const done = step < current
        const active = step === current
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
                  done ? 'bg-[#b8924a] text-white' : active ? 'bg-[#b8924a] text-white' : 'bg-[#e5e0d8] text-[#9a9080]'
                }`}
              >
                {done ? <IconCheck size={14} /> : step}
              </div>
              <span className={`text-[11px] mt-1 ${active ? 'text-[#b8924a] font-semibold' : 'text-[#9a9080]'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`w-16 h-px mx-2 mb-5 ${step < current ? 'bg-[#b8924a]' : 'bg-[#e5e0d8]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

const inputClass = 'w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#b8924a] transition-colors'

export default function ApplyPage() {
  const navigate = useNavigate()
  const partner = useAuthStore((s) => s.partner)
  const [step, setStep] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [bizFile, setBizFile] = useState<File | null>(null)

  const { register, handleSubmit } = useForm()

  function toggleCategory(val: string) {
    setSelectedCategories((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    )
  }

  function onSubmit() {
    if (step < 3) { setStep(step + 1); return }
    navigate('/partner/apply/complete')
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[640px] bg-white rounded-[20px] p-10 shadow-sm">
        <div className="text-center mb-6">
          <p className="text-[#b8924a] font-serif text-[22px] font-bold">입점 신청</p>
          <p className="text-[#9a9080] text-[13px] mt-1">단계별로 정보를 입력해주세요</p>
        </div>

        <StepIndicator current={step} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: 브랜드 정보 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">브랜드명</label>
                <input value={partner?.brandName ?? ''} readOnly className={`${inputClass} bg-[#f7f4ef]`} />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">브랜드 소개 (200자 이내)</label>
                <textarea
                  {...register('brandDesc')}
                  maxLength={200}
                  rows={4}
                  placeholder="브랜드의 철학과 특징을 소개해주세요."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">공식 웹사이트</label>
                <input {...register('website')} placeholder="https://www.brand.co.kr" className={inputClass} />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">SNS 채널</label>
                <div className="space-y-2">
                  <input {...register('instagram')} placeholder="Instagram URL" className={inputClass} />
                  <input {...register('youtube')} placeholder="YouTube URL" className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 상품 카테고리 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-2">판매 카테고리 (다중 선택)</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleCategory(value)}
                      className={`px-4 py-2 rounded-full text-[13px] border transition-colors ${
                        selectedCategories.includes(value)
                          ? 'bg-[#b8924a] text-white border-[#b8924a]'
                          : 'bg-white text-[#555] border-[#e5e0d8] hover:border-[#b8924a]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-2">예상 판매 상품 수</label>
                <div className="space-y-2">
                  {['1~10개', '11~50개', '51개 이상'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input {...register('productCount')} type="radio" value={opt} className="accent-[#b8924a]" />
                      <span className="text-[13px] text-[#555]">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-2">판매 희망 가격대</label>
                <div className="space-y-2">
                  {['~5만원', '5~20만원', '20~50만원', '50만원 이상'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input {...register('priceRange')} type="radio" value={opt} className="accent-[#b8924a]" />
                      <span className="text-[13px] text-[#555]">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-2">월 예상 라이브 횟수</label>
                <div className="space-y-2">
                  {['1회', '2~4회', '주 1회 이상'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input {...register('liveFreq')} type="radio" value={opt} className="accent-[#b8924a]" />
                      <span className="text-[13px] text-[#555]">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 서류 업로드 */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  사업자등록증 * <span className="text-[#9a9080] font-normal">(PDF/JPG, 20MB 이내)</span>
                </label>
                <div className="border-2 border-dashed border-[#e5e0d8] rounded-lg p-6 text-center hover:border-[#b8924a] transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setBizFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                    id="bizFile"
                  />
                  <label htmlFor="bizFile" className="cursor-pointer">
                    {bizFile ? (
                      <p className="text-[13px] text-[#b8924a] font-medium">{bizFile.name}</p>
                    ) : (
                      <>
                        <p className="text-[13px] text-[#9a9080]">클릭하여 파일 선택</p>
                        <p className="text-[11px] text-[#bbb] mt-1">또는 파일을 여기로 드래그</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  통신판매업신고증 <span className="text-[#9a9080] font-normal">(선택)</span>
                </label>
                <div className="border-2 border-dashed border-[#e5e0d8] rounded-lg p-6 text-center hover:border-[#b8924a] transition-colors cursor-pointer">
                  <p className="text-[13px] text-[#9a9080]">클릭하여 파일 선택</p>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  브랜드 인증서류 <span className="text-[#9a9080] font-normal">(선택)</span>
                </label>
                <div className="border-2 border-dashed border-[#e5e0d8] rounded-lg p-6 text-center hover:border-[#b8924a] transition-colors cursor-pointer">
                  <p className="text-[13px] text-[#9a9080]">클릭하여 파일 선택</p>
                  <p className="text-[11px] text-[#bbb] mt-1">백화점 입점 확인서 등</p>
                </div>
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 border border-[#e5e0d8] text-[#555] py-3 rounded-lg text-[14px] hover:bg-[#f7f4ef] transition-colors"
              >
                이전
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors"
            >
              {step < 3 ? '다음' : '입점 신청하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
