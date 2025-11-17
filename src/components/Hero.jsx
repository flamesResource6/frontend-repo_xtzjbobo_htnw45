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
        <span key={d.id} style={{top:`${d.top}%`, left:`${d.left}%`, width:d.size, height:d.size, animationDelay:`${d.delay}s`}} className="absolute rounded-full bg-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.5)] animate-[float_6s_ease-in-out_infinite]" />
      ))}
    </div>
  )
}

function HologramDog(){
  // Minimal, soft 3D-like breathing badge adapted for light background
  const [t, setT] = useState(0)
  useEffect(()=>{
    let raf
    const loop = ()=>{ setT(performance.now()); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return ()=> cancelAnimationFrame(raf)
  },[])
  const breathe = 1 + Math.sin(t/900) * 0.02
  return (
    <div role="img" aria-label="Stylized dog silhouette breathing" className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80">
      <div className="absolute inset-0 rounded-full blur-2xl bg-cyan-400/20" />
      <div className="absolute inset-0 rounded-xl border border-cyan-500/30" style={{transform:`scale(${breathe})`, boxShadow:'0 0 40px rgba(6,182,212,0.15), inset 0 0 30px rgba(6,182,212,0.12)'}} />
      <svg viewBox="0 0 200 200" className="relative z-10 h-full w-full opacity-95">
        <defs>
          <linearGradient id="holo" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
          <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="1" fill="#06b6d4" opacity="0.12" />
          </pattern>
        </defs>
        <path d="M25 120 Q 35 80 60 70 Q 90 50 120 60 Q 150 80 165 110 Q 150 100 130 105 Q 115 135 90 140 Q 70 150 55 145 Q 40 140 25 120 Z" fill="url(#holo)" stroke="#06b6d4" strokeOpacity="0.6" strokeWidth="2" />
        <path d="M25 120 Q 35 80 60 70 Q 90 50 120 60 Q 150 80 165 110 Q 150 100 130 105 Q 115 135 90 140 Q 70 150 55 145 Q 40 140 25 120 Z" fill="url(#scan)" />
      </svg>
    </div>
  )
}

function FloatingPhotos(){
  const overlays = [
    { src:'https://images.unsplash.com/photo-1725972289052-a041e940556d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdHJheSUyMGRvZyUyMG5lYXIlMjBiaW5zfGVufDB8MHx8fDE3NjM0MDU4NDV8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', alt:'Stray dog near bins', className:'top-6 -left-4 sm:-left-10', rotate:-6 },
    // Creative Commons: Parle-G biscuits photo from Wikimedia Commons (thumb, optimized)
    { src:'https://images.unsplash.com/photo-1725972289052-a041e940556d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdHJheSUyMGRvZyUyMG5lYXIlMjBiaW5zfGVufDB8MHx8fDE3NjM0MDU4NDV8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', alt:'Parle-G biscuits in a bowl', className:'-bottom-2 left-10 sm:left-24', rotate:4 },
    { src:'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop', alt:'Street dog resting', className:'top-8 -right-6 sm:-right-12', rotate:7 },
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative w-[420px] h-[420px] sm:w-[520px] sm:h-[520px]">
        {overlays.map((o,i)=> (
          <motion.img
            key={i}
            src={o.src}
            alt={o.alt}
            loading="lazy"
            initial={{opacity:0, y:10, rotate:o.rotate}}
            animate={{opacity:1, y:[0,-6,0]}}
            transition={{duration:0.9, delay:0.2*i, repeat:Infinity, repeatType:'reverse'}}
            className={`absolute rounded-2xl border border-slate-200 shadow-[0_12px_30px_rgba(2,6,23,0.15)] object-cover ${o.className}`}
            style={{width:i===1? 140: 120, height:i===1? 140: 120}}
          />
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 60])

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl bg-cyan-500/10" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full blur-3xl bg-orange-400/10" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_70%_-10%,rgba(6,182,212,0.08),transparent),radial-gradient(700px_360px_at_10%_-20%,rgba(251,146,60,0.08),transparent)]" />
      </div>
      <Particles />

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div style={{y}}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Give a Voice to the Voiceless.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
            Donate minimum 10 biscuit packets — one small packet = one happy meal.
          </p>
        </motion.div>

        <div className="mt-8 flex items-center justify-center relative">
          <FloatingPhotos />
          <HologramDog />
        </div>

        <motion.a
          href="#donate"
          initial={{opacity:0, scale:0.96}}
          animate={{opacity:1, scale:1}}
          transition={{duration:0.6, delay:0.2}}
          whileHover={{scale:1.03}}
          whileTap={{scale:0.98}}
          className="group relative inline-flex items-center justify-center mt-10 px-8 py-4 text-lg font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <span className="absolute inset-0 rounded-2xl bg-orange-400 blur-md opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
          <span className="absolute inset-0 rounded-2xl bg-orange-400 opacity-90" aria-hidden />
          <span className="relative z-10 tracking-wide drop-shadow-[0_0_24px_rgba(251,146,60,0.65)]">
            Donate Biscuit Packets
          </span>
          <span className="absolute -z-10 inset-0 rounded-2xl shadow-[0_0_25px_5px_rgba(251,146,60,0.7)]" aria-hidden />
        </motion.a>
        <p className="mt-3 text-sm text-slate-500">UPI • 8726446470@ptaxis • Scan QR</p>
      </div>
    </section>
  )
}

/*
CSS keyframes used via arbitrary values:
@keyframes float { 0%,100%{ transform: translateY(0) } 50% { transform: translateY(-6px) } }
*/
