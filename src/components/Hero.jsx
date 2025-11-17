import { useEffect, useRef, useState } from 'react'

// Subtle 3D Hero with mouse-tilt, gentle z-drift, and a mini rotating biscuit cube
// Uses only CSS transforms + requestAnimationFrame for performance.

export default function Hero() {
  const wrapRef = useRef(null)
  const groupRef = useRef(null)
  const driftRef = useRef(0)
  const rafRef = useRef(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducedMotion(mq.matches)
    setReducedMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(32, now - last)
      last = now
      driftRef.current += dt * 0.0005 // gentle drift speed
      const el = groupRef.current
      if (el) {
        const z = Math.sin(driftRef.current) * 12 // subtle z-breathe
        el.style.transform = `${el.dataset.baseTransform || ''} translateZ(${z}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reducedMotion])

  const handleMove = (e) => {
    if (reducedMotion) return
    const wrap = wrapRef.current
    const group = groupRef.current
    if (!wrap || !group) return
    const rect = wrap.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    const rx = dy * -10 // tilt up/down
    const ry = dx * 12 // tilt left/right
    const base = `rotateX(${rx}deg) rotateY(${ry}deg)`
    group.dataset.baseTransform = base
    group.style.transform = `${base}`
  }

  const handleLeave = () => {
    const group = groupRef.current
    if (!group) return
    group.dataset.baseTransform = ''
    group.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  // Image sources (CC/Unsplash/Wikimedia)
  const heroMain = {
    src: 'https://images.unsplash.com/photo-1611063038552-28f27efa2b6a?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQYXJsZS1HJTIwYmlzY3VpdHMlMjBpbiUyMGElMjBib3dsfGVufDB8MHx8fDE3NjM0MDY3Mzh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    alt: 'Parle-G biscuits in a bowl',
    caption: 'Your ₹50 feeds a pup today — every 10 biscuits matter.'
  }

  const biscuitFaces = [
    {
      src: 'https://images.unsplash.com/photo-1627388483909-3c712c62d834?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQYXJsZS1HJTIwYmlzY3VpdCUyMGNsb3NlLXVwfGVufDB8MHx8fDE3NjM0MDY3Mzl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      alt: 'Parle-G biscuit close-up'
    },
    {
      src: 'https://images.unsplash.com/photo-1627388483909-3c712c62d834?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQYXJsZS1HJTIwYmlzY3VpdCUyMGNsb3NlLXVwfGVufDB8MHx8fDE3NjM0MDY3Mzl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      alt: 'Biscuits on a plate'
    },
    {
      src: 'https://images.unsplash.com/photo-1509460711270-4affad6eef6a?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCaXNjdWl0cyUyMG9uJTIwYSUyMHBsYXRlfGVufDB8MHx8fDE3NjM0MDY3Mzl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      alt: 'Crunchy biscuits stacked'
    },
    {
      src: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop',
      alt: 'Cookies in warm light'
    },
    {
      src: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop',
      alt: 'Snack biscuits texture'
    },
    {
      src: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=800&auto=format&fit=crop',
      alt: 'Tea and biscuits ambiance'
    }
  ]

  return (
    <section className="relative w-full bg-white">
      <div className="container mx-auto px-6 pt-8 pb-4 sm:pt-12" aria-label="Hero section with subtle 3D visuals">
        <div
          ref={wrapRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative mx-auto max-w-5xl perspective-[1000px]"
          aria-live="polite"
        >
          {/* 3D group */}
          <div
            ref={groupRef}
            className="relative grid gap-6 sm:gap-8 [transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform"
          >
            {/* Main hero image */}
            <figure className="relative mx-auto w-full">
              <img
                src={heroMain.src}
                alt={heroMain.alt}
                loading="eager"
                className="w-full h-auto rounded-2xl border border-slate-200 shadow-[0_12px_30px_rgba(2,6,23,0.12)] object-cover select-none"
                draggable={false}
              />
              <figcaption className="sr-only">{heroMain.caption}</figcaption>

              {/* Floating biscuit overlay - gentle bob */}
              {!reducedMotion && (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Parle_G_Biscuit.jpg/512px-Parle_G_Biscuit.jpg"
                  alt="Floating Parle-G biscuit"
                  loading="lazy"
                  className="hidden sm:block absolute -top-6 left-6 h-20 w-28 object-cover rounded-lg border border-slate-200 bg-white/70 shadow-md [transform:translateZ(40px)] animate-[floatY_6s_ease-in-out_infinite]"
                  style={{
                    animationDelay: '0.2s'
                  }}
                />
              )}

              {!reducedMotion && (
                <img
                  src="https://images.unsplash.com/photo-1606313563890-9ea5b0ceb1d2?q=80&w=640&auto=format&fit=crop"
                  alt="Floating biscuits stack"
                  loading="lazy"
                  className="hidden sm:block absolute -bottom-6 right-6 h-24 w-32 object-cover rounded-xl border border-slate-200 bg-white/70 shadow-md [transform:translateZ(55px)] animate-[floatY_7s_ease-in-out_infinite]"
                  style={{ animationDelay: '1.1s' }}
                />
              )}
            </figure>

            {/* Mini 3D rotating biscuit cube */}
            <div className="mx-auto grid place-items-center perspective-[800px] mt-2 sm:mt-0" aria-hidden={reducedMotion ? 'true' : 'false'}>
              <div
                className="relative h-[160px] w-[160px] [transform-style:preserve-3d] transition-transform duration-700 will-change-transform"
                style={{ animation: reducedMotion ? 'none' : 'cubeSpin 18s linear infinite' }}
                role="img"
                aria-label="Rotating cube made of biscuit images"
              >
                {biscuitFaces.slice(0, 6).map((f, i) => {
                  const faceTransforms = [
                    'rotateY(0deg) translateZ(80px)',
                    'rotateY(90deg) translateZ(80px)',
                    'rotateY(180deg) translateZ(80px)',
                    'rotateY(-90deg) translateZ(80px)',
                    'rotateX(90deg) translateZ(80px)',
                    'rotateX(-90deg) translateZ(80px)'
                  ]
                  return (
                    <figure
                      key={i}
                      className="absolute inset-0 rounded-lg overflow-hidden border border-slate-200 shadow-[0_8px_20px_rgba(2,6,23,0.12)] bg-white"
                      style={{ transform: faceTransforms[i] }}
                    >
                      <img src={f.src} alt={f.alt} loading="lazy" className="h-full w-full object-cover" />
                      <figcaption className="sr-only">{f.alt}</figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Minimal heading + CTA context (kept simple; donate flow exists below) */}
        <div className="mx-auto max-w-3xl text-center mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Feed a street pup with 10 Parle-G biscuits
          </h1>
          <p className="mt-2 text-slate-600">
            Subtle 3D visuals are decorative only. All actions are keyboard accessible below.
          </p>
        </div>
      </div>

      {/* Keyframes for float and cube spin */}
      <style>{`
        @keyframes floatY { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-8px); } }
        @keyframes cubeSpin { 0%{ transform: translateZ(-80px) rotateX(6deg) rotateY(0); } 100%{ transform: translateZ(-80px) rotateX(6deg) rotateY(360deg); } }
      `}</style>
    </section>
  )
}
