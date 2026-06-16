import { Link } from 'react-router-dom'
import { IconCircleCheck } from '@tabler/icons-react'

export default function ApplyCompletePage() {
  return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center px-4">
      <div className="w-full max-w-[480px] bg-white rounded-[20px] p-10 shadow-sm text-center">
        <div className="w-20 h-20 rounded-full bg-[#b8924a] flex items-center justify-center mx-auto mb-6">
          <IconCircleCheck size={44} color="white" stroke={1.5} />
        </div>

        <h2 className="text-[22px] font-bold text-[#111] mb-3">입점 신청이 완료되었습니다!</h2>
        <p className="text-[13px] text-[#5a5547] leading-[1.9] mb-6">
          소중한 신청 감사합니다.
          <br />
          아래 일정에 따라 심사가 진행됩니다.
        </p>

        <div className="bg-[#f7f4ef] rounded-xl p-5 text-left mb-6 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#FAEEDA] flex items-center justify-center mt-0.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#b8924a]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#333]">뷰티 / 메이크업 / 스킨케어</p>
              <p className="text-[12px] text-[#9a9080] mt-0.5">입점 심사 진행 — 영업일 기준 3~5일 소요</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#E1F5EE] flex items-center justify-center mt-0.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#333]">일반 카테고리</p>
              <p className="text-[12px] text-[#9a9080] mt-0.5">자동 승인 — 24시간 이내</p>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#9a9080] mb-8">
          심사 결과는 가입하신 이메일로 발송됩니다.
        </p>

        <div className="flex gap-3">
          <Link
            to="/"
            className="flex-1 border border-[#e5e0d8] text-[#555] py-3 rounded-lg text-[14px] hover:bg-[#f7f4ef] transition-colors"
          >
            홈으로 돌아가기
          </Link>
          <Link
            to="/partner/login"
            className="flex-1 bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  )
}
