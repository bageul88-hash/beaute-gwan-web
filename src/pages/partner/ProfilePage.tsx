import { useAuthStore } from '../../store/authStore'
import PartnerLayout from '../../components/partner/PartnerLayout'

const inputClass = 'w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] text-[#111] bg-[#f7f4ef] focus:outline-none'

const DEPT_LABEL: Record<string, string> = {
  lotte: '롯데백화점',
  shinsegae: '신세계백화점',
  hyundai: '현대백화점',
}

export default function ProfilePage() {
  const partner = useAuthStore((s) => s.partner)

  if (!partner) return null

  return (
    <PartnerLayout title="프로필 설정">
      <div className="max-w-[640px] space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6 space-y-4">
          <h3 className="text-[14px] font-bold text-[#111]">기본 정보</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#9a9080] mb-1.5">브랜드명</label>
              <input readOnly value={partner.brandName} className={inputClass} />
            </div>
            <div>
              <label className="block text-[12px] text-[#9a9080] mb-1.5">대표자명</label>
              <input readOnly value={partner.ownerName} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-[12px] text-[#9a9080] mb-1.5">이메일</label>
            <input readOnly value={partner.email} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#9a9080] mb-1.5">사업자등록번호</label>
              <input readOnly value={partner.bizNumber} className={inputClass} />
            </div>
            <div>
              <label className="block text-[12px] text-[#9a9080] mb-1.5">연락처</label>
              <input readOnly value={partner.phone} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-[12px] text-[#9a9080] mb-1.5">백화점 파트너</label>
            <div className="flex gap-2 flex-wrap">
              {partner.deptPartner.length > 0 ? partner.deptPartner.map((d) => (
                <span key={d} className="bg-[#f7f4ef] border border-[#e5e0d8] text-[#555] text-[12px] px-3 py-1 rounded-full">
                  {DEPT_LABEL[d] ?? d}
                </span>
              )) : (
                <span className="text-[13px] text-[#9a9080]">해당 없음</span>
              )}
            </div>
          </div>
        </div>

        {/* 심사 상태 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6">
          <h3 className="text-[14px] font-bold text-[#111] mb-4">입점 상태</h3>
          {partner.status === 'approved' ? (
            <div className="flex items-center gap-3 bg-[#E1F5EE] rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-[#1D9E75] flex items-center justify-center text-white text-[16px]">✓</div>
              <div>
                <p className="text-[13px] font-bold text-[#085041]">입점 승인 완료</p>
                <p className="text-[12px] text-[#085041]/70 mt-0.5">모든 파트너 기능을 이용하실 수 있습니다.</p>
              </div>
            </div>
          ) : partner.status === 'pending' ? (
            <div className="flex items-center gap-3 bg-[#FAEEDA] rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-[#b8924a] flex items-center justify-center text-white text-[14px]">⏳</div>
              <div>
                <p className="text-[13px] font-bold text-[#633806]">심사 진행 중</p>
                <p className="text-[12px] text-[#633806]/70 mt-0.5">영업일 기준 3~5일 이내 결과를 알려드립니다.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-[#FAECE7] rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-[#D85A30] flex items-center justify-center text-white text-[16px]">✕</div>
              <div>
                <p className="text-[13px] font-bold text-[#712B13]">심사 반려</p>
                <p className="text-[12px] text-[#712B13]/70 mt-0.5">고객센터로 문의해주세요.</p>
              </div>
            </div>
          )}
        </div>

        {/* 비밀번호 변경 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] p-6 space-y-4">
          <h3 className="text-[14px] font-bold text-[#111]">비밀번호 변경</h3>

          {['현재 비밀번호', '새 비밀번호', '새 비밀번호 확인'].map((label) => (
            <div key={label}>
              <label className="block text-[12px] text-[#9a9080] mb-1.5">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-[#e5e0d8] rounded-lg px-3.5 py-2.5 text-[13px] focus:outline-none focus:border-[#b8924a] transition-colors"
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={() => alert('비밀번호가 변경되었습니다.')}
              className="px-8 py-2.5 bg-[#b8924a] hover:bg-[#a07c3b] text-white font-semibold rounded-lg text-[13px] transition-colors"
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </PartnerLayout>
  )
}
