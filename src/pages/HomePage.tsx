import HeroSection from '../components/sections/HeroSection'
import StatsBar from '../components/sections/StatsBar'
import IntroSection from '../components/sections/IntroSection'
import BASplitSection from '../components/sections/BASplitSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import BrandsSection from '../components/sections/BrandsSection'
import TargetSection from '../components/sections/TargetSection'
import ScheduleSection from '../components/sections/ScheduleSection'
import JoinSection from '../components/sections/JoinSection'
import ContactSection from '../components/sections/ContactSection'
import CareerSection from '../components/sections/CareerSection'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <IntroSection />
      <BASplitSection />
      <FeaturesSection />
      <BrandsSection />
      <TargetSection />
      <ScheduleSection />
      <JoinSection />
      <ContactSection />
      <CareerSection />
      <CTASection />
    </main>
  )
}
