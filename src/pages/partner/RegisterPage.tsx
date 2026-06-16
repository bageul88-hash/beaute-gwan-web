import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'

const schema = z.object({
  brandName: z.string().min(2, '브랜드명을 2자 이상 입력하세요'),
  ownerName: z.string().min(2, '대표자명을 2자 이상 입력하세요'),
  bizNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}$/, '000-00-00000 형식으로 입력하세요'),
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, '영문, 숫자, 특수문자를 포함해야 합니다'),
  passwordConfirm: z.string(),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력하세요'),
  deptPartner: z.array(z.string()),
  agreeTerms: z.boolean().refine((v) => v, '이용약관에 동의해주세요'),
  agreePrivacy: z.boolean().refine((v) => v, '개인정보처리방침에 동의해주세요'),
}).refine((d) => d.password === d.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
})

type FormValues = z.infer<typeof schema>

const DEPT_OPTIONS = [
  { value: 'lotte', label: '롯데백화점' },
  { value: 'shinsegae', label: '신세계백화점' },
  { value: 'hyundai', label: '현대백화점' },
]

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#333] mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}
    </div>
  )
}

const inputClass = 'w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#b8924a] transition-colors'

export default function RegisterPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { deptPartner: [] },
  })

  function onSubmit(_data: FormValues) {
    navigate('/partner/apply')
  }

  const deptValues = watch('deptPartner') ?? []

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[480px] bg-white rounded-[20px] p-10 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-[#b8924a] font-serif text-[26px] font-bold tracking-wide">뷰티관</p>
          <p className="text-[#9a9080] text-[13px] mt-1">파트너 회원가입</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="브랜드/회사명 *" error={errors.brandName?.message}>
            <input {...register('brandName')} placeholder="예: 설화수" className={inputClass} />
          </FormField>

          <FormField label="대표자명 *" error={errors.ownerName?.message}>
            <input {...register('ownerName')} placeholder="홍길동" className={inputClass} />
          </FormField>

          <FormField label="사업자등록번호 *" error={errors.bizNumber?.message}>
            <input {...register('bizNumber')} placeholder="000-00-00000" className={inputClass} />
          </FormField>

          <FormField label="이메일 *" error={errors.email?.message}>
            <input {...register('email')} type="email" placeholder="example@brand.co.kr" className={inputClass} />
          </FormField>

          <FormField label="비밀번호 *" error={errors.password?.message}>
            <input {...register('password')} type="password" placeholder="8자 이상, 영문+숫자+특수문자" className={inputClass} />
          </FormField>

          <FormField label="비밀번호 확인 *" error={errors.passwordConfirm?.message}>
            <input {...register('passwordConfirm')} type="password" placeholder="비밀번호 재입력" className={inputClass} />
          </FormField>

          <FormField label="연락처 *" error={errors.phone?.message}>
            <input {...register('phone')} placeholder="010-0000-0000" className={inputClass} />
          </FormField>

          {/* 백화점 파트너 */}
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-2">백화점 파트너 여부</label>
            <div className="flex gap-4">
              {DEPT_OPTIONS.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    value={value}
                    checked={deptValues.includes(value)}
                    {...register('deptPartner')}
                    className="w-4 h-4 accent-[#b8924a]"
                  />
                  <span className="text-[13px] text-[#555]">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 동의 */}
          <div className="space-y-2 pt-2 border-t border-[#f0ece6]">
            <label className="flex items-start gap-2 cursor-pointer">
              <input {...register('agreeTerms')} type="checkbox" className="mt-0.5 w-4 h-4 accent-[#b8924a]" />
              <span className="text-[13px] text-[#555]">
                <span className="text-[#b8924a] font-medium">[필수]</span> 이용약관에 동의합니다
              </span>
            </label>
            {errors.agreeTerms && <p className="text-[12px] text-red-500 pl-6">{errors.agreeTerms.message}</p>}

            <label className="flex items-start gap-2 cursor-pointer">
              <input {...register('agreePrivacy')} type="checkbox" className="mt-0.5 w-4 h-4 accent-[#b8924a]" />
              <span className="text-[13px] text-[#555]">
                <span className="text-[#b8924a] font-medium">[필수]</span> 개인정보처리방침에 동의합니다
              </span>
            </label>
            {errors.agreePrivacy && <p className="text-[12px] text-red-500 pl-6">{errors.agreePrivacy.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors mt-2"
          >
            회원가입
          </button>
        </form>

        <p className="text-center text-[13px] text-[#9a9080] mt-6">
          이미 계정이 있으신가요?{' '}
          <Link to="/partner/login" className="text-[#b8924a] font-medium hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
