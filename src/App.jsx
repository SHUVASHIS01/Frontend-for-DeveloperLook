import './index.css'
import './responsive.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandsIntro from './components/BrandsIntro'
import FeaturedWork from './components/FeaturedWork'
import Services from './components/Services'
import ChasingMarquee from './components/ChasingMarquee'
import WhyUs from './components/WhyUs'
import WhatsNew from './components/WhatsNew'
import ReadyToScroll from './components/ReadyToScroll'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen" style={{ background: '#efeeec', fontFamily: "'saans', ui-sans-serif, system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <BrandsIntro />
        <FeaturedWork />
        <Services />
        <ChasingMarquee />
        <WhyUs />
        <WhatsNew />
        <div className="hidden lg:block"><ReadyToScroll /></div>
      </main>
      <Footer />
    </div>
  )
}

export default App
