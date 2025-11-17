import { useEffect, useRef } from 'react'

export default function GalleryCube({ images = [] }){
  const cubeRef = useRef(null)

  useEffect(()=>{
    let raf
    const rotate = ()=>{
      const el = cubeRef.current
      if(!el) return
      const t = performance.now() / 9000
      el.style.transform = `translateZ(-150px) rotateX(${Math.sin(t)*6}deg) rotateY(${t*360}deg)`
      raf = requestAnimationFrame(rotate)
    }
    raf = requestAnimationFrame(rotate)
    return ()=> cancelAnimationFrame(raf)
  },[])

  const faces = images.slice(0,6)

  return (
    <div className="relative grid place-items-center perspective-[800px]" aria-label="3D rotating cube gallery">
      <div className="relative h-[260px] w-[260px] [transform-style:preserve-3d] transition-transform duration-700 will-change-transform" ref={cubeRef}>
        {faces.map((src, i)=>{
          const faceTransforms = [
            'rotateY(0deg) translateZ(150px)',
            'rotateY(90deg) translateZ(150px)',
            'rotateY(180deg) translateZ(150px)',
            'rotateY(-90deg) translateZ(150px)',
            'rotateX(90deg) translateZ(150px)',
            'rotateX(-90deg) translateZ(150px)'
          ]
          return (
            <figure key={i} className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 shadow-[0_0_25px_rgba(22,242,255,0.25)]" style={{transform: faceTransforms[i]}}>
              <img src={src.src} alt={src.alt} loading="lazy" className="h-full w-full object-cover" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-black/40 text-center text-sm text-white/90 py-1">
                {src.caption}
              </figcaption>
            </figure>
          )
        })}
      </div>
    </div>
  )
}