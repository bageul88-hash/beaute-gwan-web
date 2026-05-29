import {
  IconCrown,
  IconMessage,
  IconGift,
  IconTruckDelivery,
} from '@tabler/icons-react'
import type { FeatureItem } from '../types'

export const FEATURES: FeatureItem[] = [
  { icon: IconCrown,         title: '공식 BA 출연',      desc: '3사 백화점 공식 뷰티 어드바이저가 직접 시연하고 상담합니다.' },
  { icon: IconMessage,       title: '피부 고민 Q&A',     desc: '실시간 채팅으로 내 피부 타입에 맞는 제품을 추천받으세요.' },
  { icon: IconGift,          title: '멤버십 포인트 연동', desc: '롯데·신세계·현대 포인트를 그대로 사용하고 적립하세요.' },
  { icon: IconTruckDelivery, title: '당일 배송·반품',    desc: '당일·익일 배송, 백화점 매장 교환·반품까지 연동됩니다.' },
]
