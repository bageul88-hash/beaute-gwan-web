import PartnerSidebar from './PartnerSidebar'
import PartnerHeader from './PartnerHeader'

interface PartnerLayoutProps {
  title: string
  children: React.ReactNode
}

export default function PartnerLayout({ title, children }: PartnerLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f7f4ef]">
      <PartnerSidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <PartnerHeader title={title} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
