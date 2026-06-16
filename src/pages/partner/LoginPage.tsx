import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(1, '비밀번호를 입력하세요'),
  remember: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

const inputClass = 'w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#b8924a] transition-colors'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loginError, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function onSubmit(data: FormValues) {
    const ok = login(data.email, data.password)
    if (ok) navigate('/partner/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[480px] bg-white rounded-[20px] p-10 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-[#b8924a] font-serif text-[26px] font-bold tracking-wide">뷰티관</p>
          <p className="text-[#9a9080] text-[13px] mt-1">파트너 로그인</p>
        </div>

        {loginError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-lg px-4 py-3">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">이메일</label>
            <input
              {...register('email')}
              type="email"
              placeholder="example@brand.co.kr"
              className={inputClass}
              onChange={() => clearError()}
            />
            {errors.email && <p className="mt-1 text-[12px] text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">비밀번호</label>
            <input
              {...register('password')}
              type="password"
              placeholder="비밀번호 입력"
              className={inputClass}
              onChange={() => clearError()}
            />
            {errors.password && <p className="mt-1 text-[12px] text-red-500">{errors.password.message}</p>}
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input {...register('remember')} type="checkbox" className="w-4 h-4 accent-[#b8924a]" />
            <span className="text-[13px] text-[#555]">로그인 상태 유지</span>
          </label>

          <button
            type="submit"
            className="w-full bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-[13px] text-[#9a9080]">
            <button className="text-[#b8924a] hover:underline">비밀번호 찾기</button>
          </p>
          <p className="text-[13px] text-[#9a9080]">
            아직 계정이 없으신가요?{' '}
            <Link to="/partner/register" className="text-[#b8924a] font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </div>

        {/* 테스트 계정 안내 */}
        <div className="mt-6 bg-[#f7f4ef] rounded-lg px-4 py-3 text-[12px] text-[#9a9080]">
          <p className="font-medium text-[#5a5547] mb-1">테스트 계정</p>
          <p>이메일: test@beautegwan.co</p>
          <p>비밀번호: test1234!</p>
        </div>
      </div>
    </div>
  )
}
