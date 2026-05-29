import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ContactFormData } from '../../types'

const schema = z.object({
  company: z.string().min(1, '회사명을 입력하세요'),
  manager: z.string().min(1, '담당자명을 입력하세요'),
  phone:   z.string().regex(/^[0-9-]+$/, '올바른 연락처를 입력하세요'),
  email:   z.string().email('올바른 이메일을 입력하세요'),
  message: z.string().min(10, '문의 내용을 10자 이상 입력하세요'),
  agree:   z.boolean().refine(v => v === true, '동의가 필요합니다'),
})

const inputCls = 'w-full border border-[0.5px] border-cream-3 rounded-md px-4 py-3 text-[14px] text-[#111] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-gold transition bg-white'
const errorCls = 'text-[11px] text-red-500 mt-1'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { agree: false },
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('문의 접수:', data)
    setSent(true)
    reset()
  }

  if (sent) {
    return (
      <div className="bg-white border border-[0.5px] border-cream-3 rounded-lg p-10 text-center">
        <p className="text-[20px] mb-2">✅</p>
        <p className="text-[16px] font-bold text-[#111] mb-1">문의가 접수되었습니다</p>
        <p className="text-[13px] text-[#5a5547]">담당자가 1~2 영업일 내 연락드립니다.</p>
        <button onClick={() => setSent(false)} className="text-gold text-[13px] mt-4 hover:underline">
          다시 문의하기
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[0.5px] border-cream-3 rounded-lg p-10">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-[13px] font-medium text-[#111] mb-1.5">
              회사/기관명 <span className="text-gold">*</span>
            </label>
            <input id="company" {...register('company')} placeholder="(주)뷰티컴퍼니" className={inputCls} />
            {errors.company && <p className={errorCls}>{errors.company.message}</p>}
          </div>
          <div>
            <label htmlFor="manager" className="block text-[13px] font-medium text-[#111] mb-1.5">
              담당자명 <span className="text-gold">*</span>
            </label>
            <input id="manager" {...register('manager')} placeholder="홍길동" className={inputCls} />
            {errors.manager && <p className={errorCls}>{errors.manager.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-[13px] font-medium text-[#111] mb-1.5">
                연락처 <span className="text-gold">*</span>
              </label>
              <input id="phone" type="tel" {...register('phone')} placeholder="010-0000-0000" className={inputCls} />
              {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-[#111] mb-1.5">
                이메일 <span className="text-gold">*</span>
              </label>
              <input id="email" type="email" {...register('email')} placeholder="beauty@company.com" className={inputCls} />
              {errors.email && <p className={errorCls}>{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-[13px] font-medium text-[#111] mb-1.5">
              문의 내용 <span className="text-gold">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              placeholder={'- 판매 희망 상품:\n- 희망 진행 시기:\n- 가용 예산:\n- 상세 내용:\n- 참고 URL:'}
              className={`${inputCls} resize-none`}
            />
            {errors.message && <p className={errorCls}>{errors.message.message}</p>}
          </div>

          {/* 개인정보 동의 */}
          <div className="bg-cream rounded-md p-4">
            <p className="text-[12px] font-medium text-[#111] mb-1">
              제휴 문의를 위한 정보수집 및 이용동의{' '}
              <span className="text-gold">(필수)</span>
            </p>
            <p className="text-[11px] text-[#9a9080] leading-relaxed mb-3">
              수집 항목: 회사명, 담당자명, 연락처, 이메일, 문의내용 / 목적: 제휴 문의 처리 및 회신 /
              보유기간: 문의 처리 완료 후 3개월
            </p>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" {...register('agree')} className="w-4 h-4 accent-gold" />
              <span className="text-[12px] text-[#5a5547]">개인정보 수집 및 이용에 동의합니다</span>
            </label>
            {errors.agree && <p className={errorCls}>{errors.agree.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 bg-[#f0ede8] text-[#5a5547] text-[13px] font-medium py-3.5 rounded-pill hover:bg-cream-2 transition-colors"
            >
              닫기
            </button>
            <button
              type="submit"
              className="flex-[2] bg-gold text-white text-[13px] font-medium py-3.5 rounded-pill hover:bg-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              보내기
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
