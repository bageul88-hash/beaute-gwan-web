import AppTabBar from './AppTabBar'

interface AppLayoutProps {
  children: React.ReactNode
  hideTabBar?: boolean
}

export default function AppLayout({ children, hideTabBar = false }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f4ef] max-w-[480px] mx-auto">
      <main className="flex-1 overflow-y-auto pb-[60px]">
        {children}
      </main>
      {!hideTabBar && <AppTabBar />}
    </div>
  )
}
