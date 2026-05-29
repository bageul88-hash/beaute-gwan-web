export default function PhoneVideoArea() {
  return (
    <div className="relative bg-[#1c1c1c] h-[150px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-gold/60 bg-gold/20 flex items-center justify-center" aria-hidden="true">
        <span className="text-gold text-lg">▶</span>
      </div>
      <p className="absolute bottom-3 left-0 right-0 text-center text-[9px] text-[#888]">
        라이브 진행 중
      </p>
    </div>
  )
}
