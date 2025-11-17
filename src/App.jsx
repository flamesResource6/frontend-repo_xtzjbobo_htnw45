import Hero from './components/Hero'
import About from './components/About'
import Donate from './components/Donate'
import Emotional from './components/Emotional'
import HowWeUse from './components/HowWeUse'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingDonate from './components/FloatingDonate'

function App() {
  return (
    <div className="min-h-screen bg-[#000009] text-[#F9F9F9]">
      <Hero />
      <About />
      <Donate />
      <Emotional />
      <HowWeUse />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingDonate />
    </div>
  )
}

export default App
