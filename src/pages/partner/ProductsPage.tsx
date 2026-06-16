import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconPlus, IconSearch, IconPackage } from '@tabler/icons-react'
import PartnerLayout from '../../components/partner/PartnerLayout'
import ProductCard from '../../components/partner/ProductCard'
import { MOCK_PRODUCTS } from '../../constants/mockData'
import type { Product, ProductStatus } from '../../types'

const STATUS_FILTERS: { value: ProductStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '판매중' },
  { value: 'soldout', label: '품절' },
  { value: 'hidden', label: '숨김' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all')

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  function handleDelete(id: string) {
    if (confirm('상품을 삭제하시겠습니까?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <PartnerLayout title="상품 관리">
      {/* 상단 바 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9080]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="상품명 검색"
            className="w-full pl-9 pr-4 py-2.5 border border-[#e5e0d8] rounded-lg text-[13px] focus:outline-none focus:border-[#b8924a] transition-colors"
          />
        </div>

        <div className="flex gap-2">
          {STATUS_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className={`px-4 py-2.5 rounded-lg text-[13px] border transition-colors ${
                statusFilter === value
                  ? 'bg-[#b8924a] text-white border-[#b8924a]'
                  : 'bg-white text-[#555] border-[#e5e0d8] hover:border-[#b8924a]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Link
          to="/partner/products/new"
          className="flex items-center gap-2 bg-[#b8924a] hover:bg-[#a07c3b] text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors"
        >
          <IconPlus size={16} />
          상품 등록
        </Link>
      </div>

      {/* 상품 목록 */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[14px] border border-[#e5e0d8]">
          <IconPackage size={40} className="text-[#e5e0d8] mx-auto mb-3" />
          <p className="text-[14px] text-[#9a9080] mb-4">등록된 상품이 없습니다</p>
          <Link
            to="/partner/products/new"
            className="inline-flex items-center gap-2 bg-[#b8924a] text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold"
          >
            <IconPlus size={16} />
            상품 등록하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </PartnerLayout>
  )
}
