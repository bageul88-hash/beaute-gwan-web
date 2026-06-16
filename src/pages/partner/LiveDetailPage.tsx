import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { IconUsers, IconSend, IconPin, IconShoppingBag } from '@tabler/icons-react'
import PartnerLayout from '../../components/partner/PartnerLayout'
import { MOCK_LIVES } from '../../constants/mockData'

interface ChatMsg {
  id: number
  user: string
  text: string
  pinned?: boolean
}

const MOCK_CHAT_POOL: ChatMsg[] = [
  { id: 1, user: '박민지', text: '안녕하세요! 설화수 팬입니다 🌸' },
  { id: 2, user: '이수연', text: '자음생 크림 정말 효과 있나요?' },
  { id: 3, user: '김지영', text: '윤조에센스도 판매하나요?' },
  { id: 4, user: '최다희', text: '백화점 가격보다 싸게 살 수 있어서 좋아요!' },
  { id: 5, user: '정혜원', text: '지금 특가 적용되나요?' },
  { id: 6, user: '강소연', text: '재구매 의사 100%입니다' },
  { id: 7, user: '윤미래', text: '피부가 촉촉해지는 느낌이에요' },
  { id: 8, user: '한가인', text: '쿠폰 어떻게 받나요?' },
]

export default function LiveDetailPage() {
  const { id } = useParams()
  const live = MOCK_LIVES.find((l) => l.id === id) ?? MOCK_LIVES[0]

  const [isLive, setIsLive] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState('')
  const [pinnedMsg, setPinnedMsg] = useState('')
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatPoolIndex = useRef(0)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!isLive) return

    const chatInterval = setInterval(() => {
      const msg = MOCK_CHAT_POOL[chatPoolIndex.current % MOCK_CHAT_POOL.length]
      chatPoolIndex.current++
      setMessages((prev) => [...prev.slice(-50), { ...msg, id: Date.now() }])
    }, 2500)

    const viewerInterval = setInterval(() => {
      setViewers((prev) => Math.min(prev + Math.floor(Math.random() * 30), 5000))
    }, 3000)

    return () => {
      clearInterval(chatInterval)
      clearInterval(viewerInterval)
    }
  }, [isLive])

  function sendMessage() {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { id: Date.now(), user: '나 (파트너)', text: input }])
    setInput('')
  }

  return (
    <PartnerLayout title={`라이브 진행 — ${live.title}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-140px)]">
        {/* 좌측: 방송 프리뷰 */}
        <div className="bg-[#0e0c08] rounded-[14px] p-5 flex flex-col">
          <div className="flex-1 bg-[#1a1814] rounded-xl flex flex-col items-center justify-center mb-4 relative">
            <div className="text-[#555] text-center">
              <IconUsers size={40} className="mx-auto mb-2 text-[#333]" />
              <p className="text-[12px]">카메라 프리뷰</p>
            </div>

            {isLive && (
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
                <span className="flex items-center gap-1 bg-black/50 text-white text-[11px] px-2 py-1 rounded">
                  <IconUsers size={11} />
                  {viewers.toLocaleString()}
                </span>
              </div>
            )}

            {!isLive && (
              <div className="absolute top-3 left-3 bg-[#333] text-[#888] text-[11px] font-bold px-2.5 py-1 rounded">
                대기중
              </div>
            )}
          </div>

          <button
            onClick={() => { setIsLive(!isLive); if (isLive) setViewers(0) }}
            className={`w-full py-3 rounded-xl text-[14px] font-bold transition-colors ${
              isLive
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-[#b8924a] hover:bg-[#a07c3b] text-white'
            }`}
          >
            {isLive ? '방송 종료' : '방송 시작'}
          </button>
        </div>

        {/* 중앙: 채팅 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] flex flex-col">
          <div className="px-5 py-4 border-b border-[#eee]">
            <h3 className="text-[13px] font-bold text-[#111]">실시간 채팅</h3>
            {pinnedMsg && (
              <div className="mt-2 flex items-center gap-2 bg-[#fdf8f0] rounded-lg px-3 py-2">
                <IconPin size={12} className="text-[#b8924a] shrink-0" />
                <p className="text-[12px] text-[#555]">{pinnedMsg}</p>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#f7f4ef] flex items-center justify-center text-[10px] text-[#9a9080] shrink-0 mt-0.5">
                  {msg.user[0]}
                </div>
                <div>
                  <span className="text-[11px] text-[#9a9080] font-medium">{msg.user} </span>
                  <span className="text-[13px] text-[#333]">{msg.text}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-[#eee] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="공지 메시지 입력..."
              className="flex-1 border border-[#e5e0d8] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#b8924a]"
            />
            <button
              onClick={() => { if (input.trim()) { setPinnedMsg(input); setInput('') } }}
              className="w-9 h-9 flex items-center justify-center bg-[#f7f4ef] text-[#b8924a] rounded-lg hover:bg-[#eee] transition-colors"
              title="공지 고정"
            >
              <IconPin size={16} />
            </button>
            <button
              onClick={sendMessage}
              className="w-9 h-9 flex items-center justify-center bg-[#b8924a] text-white rounded-lg hover:bg-[#a07c3b] transition-colors"
            >
              <IconSend size={16} />
            </button>
          </div>
        </div>

        {/* 우측: 상품 패널 */}
        <div className="bg-white rounded-[14px] border border-[#e5e0d8] flex flex-col">
          <div className="px-5 py-4 border-b border-[#eee]">
            <h3 className="text-[13px] font-bold text-[#111]">상품 패널</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {live.products.map((product) => {
              const isActive = activeProduct === product.id
              return (
                <div
                  key={product.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive ? 'border-[#b8924a] bg-[#fdf8f0]' : 'border-[#e5e0d8]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#f7f4ef] rounded-lg flex items-center justify-center text-[10px] text-[#bbb] shrink-0">
                      이미지
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#111] truncate">{product.name}</p>
                      <p className="text-[12px] text-[#b8924a] font-bold">{product.price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveProduct(isActive ? null : product.id)}
                    className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#b8924a] text-white'
                        : 'border border-[#b8924a] text-[#b8924a] hover:bg-[#fdf8f0]'
                    }`}
                  >
                    <IconShoppingBag size={14} />
                    {isActive ? '판매 중 (클릭하여 종료)' : '지금 판매'}
                  </button>
                  {isActive && (
                    <p className="text-[11px] text-center text-[#9a9080] mt-2">시청자 화면에 상품이 표시됩니다</p>
                  )}
                </div>
              )
            })}

            {live.products.length === 0 && (
              <div className="text-center py-8 text-[#9a9080] text-[13px]">
                등록된 상품이 없습니다
              </div>
            )}
          </div>

          {live.status === 'ended' && (
            <div className="p-5 border-t border-[#eee] bg-[#f7f4ef] rounded-b-[14px]">
              <h4 className="text-[12px] font-bold text-[#333] mb-3">방송 결과</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-[11px] text-[#9a9080]">총 시청자</p>
                  <p className="text-[16px] font-bold text-[#111]">{live.viewers.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-[11px] text-[#9a9080]">총 판매액</p>
                  <p className="text-[14px] font-bold text-[#b8924a]">{live.totalSales.toLocaleString()}원</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PartnerLayout>
  )
}
