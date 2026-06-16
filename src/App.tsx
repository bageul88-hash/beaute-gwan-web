import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useIsMobile } from './hooks/useBreakpoint'
import GNB from './components/layout/GNB'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/partner/ProtectedRoute'

// 웹 페이지
import HomePage from './pages/HomePage'

// 앱 페이지 (모바일)
import AppHome from './pages/app/AppHome'
import AppLive from './pages/app/AppLive'
import AppLiveDetail from './pages/app/AppLiveDetail'
import AppCategory from './pages/app/AppCategory'
import AppCategoryDetail from './pages/app/AppCategoryDetail'
import AppBrandDetail from './pages/app/AppBrandDetail'
import AppCart from './pages/app/AppCart'
import AppOrder from './pages/app/AppOrder'
import AppProductDetail from './pages/app/AppProductDetail'
import AppMypage from './pages/app/AppMypage'

// 파트너 페이지
import RegisterPage from './pages/partner/RegisterPage'
import LoginPage from './pages/partner/LoginPage'
import ApplyPage from './pages/partner/ApplyPage'
import ApplyCompletePage from './pages/partner/ApplyCompletePage'
import DashboardPage from './pages/partner/DashboardPage'
import ProductsPage from './pages/partner/ProductsPage'
import ProductNewPage from './pages/partner/ProductNewPage'
import ProductEditPage from './pages/partner/ProductEditPage'
import LivePage from './pages/partner/LivePage'
import LiveNewPage from './pages/partner/LiveNewPage'
import LiveDetailPage from './pages/partner/LiveDetailPage'
import OrdersPage from './pages/partner/OrdersPage'
import SettlementPage from './pages/partner/SettlementPage'
import ProfilePage from './pages/partner/ProfilePage'

function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      {children}
      <Footer />
    </>
  )
}

// "/" 루트: 화면 크기에 따라 자동 전환
function RootPage() {
  const isMobile = useIsMobile()
  if (isMobile) return <AppHome />
  return <WebLayout><HomePage /></WebLayout>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 — 반응형 자동 전환 */}
        <Route path="/" element={<RootPage />} />

        {/* 앱 전용 라우트 */}
        <Route path="/app/home" element={<AppHome />} />
        <Route path="/app/live" element={<AppLive />} />
        <Route path="/app/live/:id" element={<AppLiveDetail />} />
        <Route path="/app/category" element={<AppCategory />} />
        <Route path="/app/category/:id" element={<AppCategoryDetail />} />
        <Route path="/app/brand/:id" element={<AppBrandDetail />} />
        <Route path="/app/cart" element={<AppCart />} />
        <Route path="/app/order" element={<AppOrder />} />
        <Route path="/app/product/:id" element={<AppProductDetail />} />
        <Route path="/app/mypage" element={<AppMypage />} />

        {/* 웹 전용 라우트 */}
        <Route path="/web" element={<WebLayout><HomePage /></WebLayout>} />

        {/* 파트너 공개 페이지 */}
        <Route path="/partner/register" element={<RegisterPage />} />
        <Route path="/partner/login" element={<LoginPage />} />

        {/* 입점 신청 (로그인 필요) */}
        <Route path="/partner/apply" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
        <Route path="/partner/apply/complete" element={<ProtectedRoute><ApplyCompletePage /></ProtectedRoute>} />

        {/* 파트너 전용 페이지 */}
        <Route path="/partner/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/partner/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/partner/products/new" element={<ProtectedRoute><ProductNewPage /></ProtectedRoute>} />
        <Route path="/partner/products/:id/edit" element={<ProtectedRoute><ProductEditPage /></ProtectedRoute>} />
        <Route path="/partner/live" element={<ProtectedRoute><LivePage /></ProtectedRoute>} />
        <Route path="/partner/live/new" element={<ProtectedRoute><LiveNewPage /></ProtectedRoute>} />
        <Route path="/partner/live/:id" element={<ProtectedRoute><LiveDetailPage /></ProtectedRoute>} />
        <Route path="/partner/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/partner/settlement" element={<ProtectedRoute><SettlementPage /></ProtectedRoute>} />
        <Route path="/partner/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
