import type { Partner, Product, LiveStream, Order, Settlement } from '../types'

export const MOCK_PARTNER: Partner = {
  id: 'partner-001',
  brandName: '설화수',
  ownerName: '김지현',
  bizNumber: '123-45-67890',
  email: 'test@beautegwan.co',
  phone: '010-1234-5678',
  status: 'approved',
  deptPartner: ['hyundai', 'lotte'],
  createdAt: new Date('2024-01-15'),
}

export const MOCK_TOKEN = 'mock-token-abc123'

export const MOCK_CREDENTIALS = {
  email: 'test@beautegwan.co',
  password: 'test1234!',
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    partnerId: 'partner-001',
    name: '자음생 에센스 크림 60ml',
    category: 'skincare',
    deptKey: 'hyundai',
    price: 320000,
    originalPrice: 380000,
    stock: 48,
    status: 'active',
    images: [],
    description: '한방 성분으로 완성한 프리미엄 크림. 피부 속 깊이 영양을 채워줍니다.',
    ingredients: ['인삼', '백련꽃', '고려홍삼'],
    volume: '60ml',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'prod-002',
    partnerId: 'partner-001',
    name: '윤조에센스 180ml',
    category: 'skincare',
    deptKey: 'lotte',
    price: 185000,
    stock: 120,
    status: 'active',
    images: [],
    description: '설화수 대표 에센스. 피부 결을 가다듬어 주는 첫 단계 스킨케어.',
    ingredients: ['발효성분', '자음단'],
    volume: '180ml',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: 'prod-003',
    partnerId: 'partner-001',
    name: '퍼펙팅 쿠션',
    category: 'makeup',
    deptKey: 'hyundai',
    price: 68000,
    originalPrice: 75000,
    stock: 0,
    status: 'soldout',
    images: [],
    description: '자연스럽고 생기 있는 피부 표현을 완성하는 쿠션 파운데이션.',
    createdAt: new Date('2024-02-10'),
  },
]

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(15, 0, 0, 0)

const lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - 7)
lastWeek.setHours(19, 0, 0, 0)

export const MOCK_LIVES: LiveStream[] = [
  {
    id: 'live-001',
    partnerId: 'partner-001',
    title: '설화수 BA와 함께하는 봄 스킨케어',
    description: '봄맞이 피부 관리법과 함께 설화수 신제품을 만나보세요.',
    scheduledAt: tomorrow,
    duration: 60,
    status: 'scheduled',
    products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
    viewers: 0,
    totalSales: 0,
    createdAt: new Date(),
  },
  {
    id: 'live-002',
    partnerId: 'partner-001',
    title: '자음생 크림 특집 라이브',
    description: '자음생 크림의 모든 것을 알아보는 특집 방송.',
    scheduledAt: lastWeek,
    duration: 90,
    status: 'ended',
    products: [MOCK_PRODUCTS[0]],
    viewers: 3243,
    totalSales: 4850000,
    createdAt: new Date(lastWeek.getTime() - 86400000),
  },
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'BG20240301001',
    partnerId: 'partner-001',
    productId: 'prod-001',
    productName: '자음생 에센스 크림 60ml',
    quantity: 1,
    amount: 320000,
    status: 'delivered',
    buyerName: '박민지',
    buyerPhone: '010-9876-5432',
    deliveryAddress: '서울시 강남구 청담동 123-4',
    trackingNumber: '1234567890',
    orderedAt: new Date('2024-03-01'),
  },
  {
    id: 'ord-002',
    orderNumber: 'BG20240302001',
    partnerId: 'partner-001',
    productId: 'prod-002',
    productName: '윤조에센스 180ml',
    quantity: 2,
    amount: 370000,
    status: 'shipping',
    buyerName: '이수연',
    buyerPhone: '010-1111-2222',
    deliveryAddress: '서울시 서초구 반포동 456',
    trackingNumber: '0987654321',
    orderedAt: new Date('2024-03-02'),
  },
  {
    id: 'ord-003',
    orderNumber: 'BG20240303001',
    partnerId: 'partner-001',
    productId: 'prod-001',
    productName: '자음생 에센스 크림 60ml',
    quantity: 1,
    amount: 320000,
    status: 'paid',
    buyerName: '최지영',
    buyerPhone: '010-3333-4444',
    deliveryAddress: '경기도 성남시 분당구 789',
    orderedAt: new Date('2024-03-03'),
  },
  {
    id: 'ord-004',
    orderNumber: 'BG20240304001',
    partnerId: 'partner-001',
    productId: 'prod-003',
    productName: '퍼펙팅 쿠션',
    quantity: 1,
    amount: 68000,
    status: 'cancelled',
    buyerName: '정다은',
    buyerPhone: '010-5555-6666',
    deliveryAddress: '서울시 마포구 합정동 101',
    orderedAt: new Date('2024-03-04'),
  },
  {
    id: 'ord-005',
    orderNumber: 'BG20240305001',
    partnerId: 'partner-001',
    productId: 'prod-002',
    productName: '윤조에센스 180ml',
    quantity: 3,
    amount: 555000,
    status: 'preparing',
    buyerName: '강혜리',
    buyerPhone: '010-7777-8888',
    deliveryAddress: '부산시 해운대구 우동 202',
    orderedAt: new Date('2024-03-05'),
  },
]

export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: 'set-001',
    partnerId: 'partner-001',
    month: '2024-03',
    salesAmount: 2600000,
    commission: 260000,
    commissionRate: 10,
    settlementAmount: 2340000,
    status: 'pending',
  },
  {
    id: 'set-002',
    partnerId: 'partner-001',
    month: '2024-02',
    salesAmount: 3466666,
    commission: 346666,
    commissionRate: 10,
    settlementAmount: 3120000,
    status: 'completed',
    settledAt: new Date('2024-03-15'),
  },
  {
    id: 'set-003',
    partnerId: 'partner-001',
    month: '2024-01',
    salesAmount: 2800000,
    commission: 0,
    commissionRate: 0,
    settlementAmount: 2800000,
    status: 'completed',
    settledAt: new Date('2024-02-15'),
  },
]

export const MOCK_STATS = {
  monthSales: 2340000,
  monthSalesChange: 12.5,
  totalOrders: 23,
  totalOrdersChange: 8.3,
  productCount: MOCK_PRODUCTS.length,
  scheduledLives: MOCK_LIVES.filter(l => l.status === 'scheduled').length,
}
