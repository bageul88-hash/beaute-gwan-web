import type React from 'react'

export type DeptKey = 'lotte' | 'shinsegae' | 'hyundai'
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
