import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Particles(){
  const dots = Array.from({length: 28}).map((_,i)=>({
    id:i,
    top: Math.random()*100,
    left: Math.random()*100,
    size: 2 + Math.random()*2,
    delay: Math.random()*5,
  }))
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {dots.map(d=> (
        <span key={d.id} style={{top:`${d.top}%`, left:`${d.left}%`, width:d.size, height:d.size, animationDelay:`${d.delay}s`}} className="absolute rounded-full bg-[#16F2FF]/60 shadow-[0_0_12px_rgba(22,242,255,0.6)] animate-[float_6s_ease-in-out_infinite]" />
      ))}
    </div>
  )
}

function HologramDog(){
  // Simple breathing silhouette + scanlines to imply 3D hologram
  const [t, setT] = useState(0)
  useEffect(()=>{
    let raf
    const loop = ()=>{ setT(performance.now()); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return ()=> cancelAnimationFrame(raf)
  },[])
  const breathe = 1 + Math.sin(t/900) * 0.02
  return (
    <div role="img" aria-label="Hologram of a sad dog breathing" className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80">
      <div className="absolute inset-0 rounded-full blur-2xl bg-[#16F2FF]/20" />
      <div className="absolute inset-0 rounded-xl border border-[#16F2FF]/30" style={{transform:`scale(${breathe})`, boxShadow:'0 0 40px rgba(22,242,255,0.25), inset 0 0 30px rgba(22,242,255,0.15)'}} />
      <svg viewBox="0 0 200 200" className="relative z-10 h-full w-full opacity-95">
        <defs>
          <linearGradient id="holo" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#16F2FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#16F2FF" stopOpacity="0.4" />
          </linearGradient>
          <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="1" fill="#16F2FF" opacity="0.15" />
          </pattern>
        </defs>
        {/* dog silhouette path (abstract) */}
        <path d="M25 120 Q 35 80 60 70 Q 90 50 120 60 Q 150 80 165 110 Q 150 100 130 105 Q 115 135 90 140 Q 70 150 55 145 Q 40 140 25 120 Z" fill="url(#holo)" stroke="#16F2FF" strokeOpacity="0.6" strokeWidth="2" />
        <path d="M25 120 Q 35 80 60 70 Q 90 50 120 60 Q 150 80 165 110 Q 150 100 130 105 Q 115 135 90 140 Q 70 150 55 145 Q 40 140 25 120 Z" fill="url(#scan)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 60])

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" style={{background:"radial-gradient(1200px 600px at 80% -10%, rgba(22,242,255,0.15), transparent), radial-gradient(1000px 500px at 10% -20%, rgba(255,106,61,0.10), transparent)"}}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3A] to-[#001829]" />
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl bg-[#16F2FF]/10" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full blur-3xl bg-[#FF6A3D]/10" />
      </div>
      <Particles />

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div style={{y}}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F9F9F9] drop-shadow-[0_0_20px_rgba(22,242,255,0.15)]">
            Give a Voice to the Voiceless.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-[#8C8C8C]">
            Donate minimum 10 biscuit packets — one small packet = one happy meal.
          </p>
        </motion.div>

        <div className="mt-8 flex items-center justify-center">
          <HologramDog />
        </div>

        <motion.a
          href="#donate"
          initial={{opacity:0, scale:0.96}}
          animate={{opacity:1, scale:1}}
          transition={{duration:0.6, delay:0.2}}
          whileHover={{scale:1.03}}
          whileTap={{scale:0.98}}
          className="group relative inline-flex items-center justify-center mt-10 px-8 py-4 text-lg font-semibold text-[#000009] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F2FF]"
        >
          <span className="absolute inset-0 rounded-2xl bg-[#FF6A3D] blur-md opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
          <span className="absolute inset-0 rounded-2xl bg-[#FF6A3D] opacity-90" aria-hidden />
          <span className="relative z-10 tracking-wide text-black drop-shadow-[0_0_24px_rgba(255,106,61,0.65)]">
            Donate Biscuit Packets
          </span>
          <span className="absolute -z-10 inset-0 rounded-2xl shadow-[0_0_25px_5px_rgba(255,106,61,0.7)]" aria-hidden />
        </motion.a>
        <p className="mt-3 text-sm text-[#8C8C8C]">UPI • 8726446470@ptaxis • Scan QR</p>
      </div>
    </section>
  )
}

/*
CSS keyframes used via arbitrary values:
@keyframes float { 0%,100%{ transform: translateY(0) } 50% { transform: translateY(-6px) } }
*/
