import { Link } from 'react-router-dom'
import { IconPencil, IconTrash, IconEyeOff } from '@tabler/icons-react'
import type { Product, ProductStatus } from '../../types'

const STATUS_MAP: Record<ProductStatus, { label: string; bg: string; text: string }> = {
  active: { label: '판매중', bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  soldout: { label: '품절', bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  hidden: { label: '숨김', bg: 'bg-[#f0f0f0]', text: 'text-[#666]' },
}

const CATEGORY_LABEL: Record<string, string> = {
  skincare: '스킨케어',
  makeup: '메이크업',
  perfume: '향수',
  hair: '헤어케어',
  body: '바디케어',
}

interface ProductCardProps {
  product: Product
  onDelete?: (id: string) => void
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const badge = STATUS_MAP[product.status]
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="bg-white border border-[#e5e0d8] rounded-xl p-5">
      {/* 썸네일 */}
      <div className="w-full aspect-square bg-[#f7f4ef] rounded-lg mb-4 flex items-center justify-center text-[#bbb] text-[12px]">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          '이미지 없음'
        )}
      </div>

      {/* 정보 */}
      <div className="flex items-start justify-between mb-1">
        <p className="text-[13px] font-semibold text-[#111] leading-tight flex-1 mr-2">{product.name}</p>
        <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      <p className="text-[11px] text-[#9a9080] mb-2">{CATEGORY_LABEL[product.category]}</p>

      <div className="flex items-center gap-2 mb-1">
        <p className="text-[15px] font-bold text-[#111]">{product.price.toLocaleString()}원</p>
        {discount && <span className="text-[11px] text-[#b8924a] font-medium">{discount}%</span>}
      </div>
      {product.originalPrice && (
        <p className="text-[12px] text-[#bbb] line-through mb-2">{product.originalPrice.toLocaleString()}원</p>
      )}

      <div className="flex items-center justify-between text-[12px] text-[#9a9080] mb-4">
        <span>재고 {product.stock.toLocaleString()}개</span>
      </div>

      {/* 액션 */}
      <div className="flex gap-2 border-t border-[#eee] pt-4">
        <Link
          to={`/partner/products/${product.id}/edit`}
          className="flex-1 flex items-center justify-center gap-1.5 text-[12px] text-[#555] border border-[#e5e0d8] rounded-lg py-2 hover:border-[#b8924a] hover:text-[#b8924a] transition-colors"
        >
          <IconPencil size={13} />
          수정
        </Link>
        <button className="flex items-center justify-center gap-1.5 text-[12px] text-[#555] border border-[#e5e0d8] rounded-lg py-2 px-3 hover:border-[#9a9080] transition-colors">
          <IconEyeOff size={13} />
        </button>
        <button
          onClick={() => onDelete?.(product.id)}
          className="flex items-center justify-center gap-1.5 text-[12px] text-red-400 border border-[#e5e0d8] rounded-lg py-2 px-3 hover:border-red-400 transition-colors"
        >
          <IconTrash size={13} />
        </button>
      </div>
    </div>
  )
}
