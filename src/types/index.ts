import type React from 'react'

export type DeptKey = 'lotte' | 'shinsegae' | 'hyundai'

// ─── Partner Types ────────────────────────────────────────────────────────────
export type PartnerStatus = 'pending' | 'approved' | 'rejected'
export type ProductStatus = 'active' | 'soldout' | 'hidden'
export type LiveStatus = 'scheduled' | 'live' | 'ended' | 'cancelled'
export type OrderStatus = 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled' | 'refunded'
export type CategoryKey = 'skincare' | 'makeup' | 'perfume' | 'hair' | 'body'

export interface Partner {
  id: string
  brandName: string
  ownerName: string
  bizNumber: string
  email: string
  phone: string
  status: PartnerStatus
  deptPartner: string[]
  createdAt: Date
}

export interface Product {
  id: string
  partnerId: string
  name: string
  category: CategoryKey
  deptKey: DeptKey
  price: number
  originalPrice?: number
  stock: number
  status: ProductStatus
  images: string[]
  description: string
  ingredients?: string[]
  volume?: string
  createdAt: Date
}

export interface LiveStream {
  id: string
  partnerId: string
  title: string
  description?: string
  scheduledAt: Date
  duration: number
  status: LiveStatus
  products: Product[]
  viewers: number
  totalSales: number
  thumbnailUrl?: string
  createdAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  partnerId: string
  productId: string
  productName: string
  quantity: number
  amount: number
  status: OrderStatus
  buyerName: string
  buyerPhone: string
  deliveryAddress: string
  trackingNumber?: string
  orderedAt: Date
}

export interface Settlement {
  id: string
  partnerId: string
  month: string
  salesAmount: number
  commission: number
  commissionRate: number
  settlementAmount: number
  status: 'pending' | 'completed'
  settledAt?: Date
}
export type AgeGroup = '30s' | '40s' | '50s'

export interface NavLink {
  label: string
  href: string
}

export interface StatItem {
  num: string
  label: string
}

export interface FeatureItem {
  icon: React.ElementType
  title: string
  desc: string
}

// key → deptKey (React 예약어 충돌 방지)
export interface DeptItem {
  deptKey: DeptKey
  nameKo: string
  nameEn: string
  brands: string[]
  badgeBg: string
  badgeText: string
}

export interface TargetItem {
  age: string
  ageColor: string
  group: AgeGroup
  name: string
  nameColor: string
  keywords: string[]
  kwBg: string
  kwColor: string
  desc: string
}

export interface ScheduleItem {
  day: string
  title: string
  desc: string
  time: string
}

export interface CareerValue {
  text: string
}

export interface ContactFormData {
  company: string
  manager: string
  phone: string
  email: string
  message: string
  agree: boolean
}
