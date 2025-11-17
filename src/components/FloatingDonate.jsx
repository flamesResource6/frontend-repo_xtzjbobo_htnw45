import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function FloatingDonate(){
  const [open, setOpen] = useState(false)
  const upiId = '8726446470@ptaxis'
  const ref = useRef(null)

  useEffect(()=>{
    const onKey = (e)=>{
      if(e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[])

  useEffect(()=>{
    const hash = window.location.hash
    if(hash === '#quick-donate') setOpen(true)
  },[])

  useEffect(()=>{
    function onClickOutside(e){
      if(open && ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return ()=>document.removeEventListener('mousedown', onClickOutside)
  },[open])

  return (
    <>
      <button
        aria-label="Donate Quick"
        onClick={()=>setOpen(true)}
        className="fixed z-40 right-5 bottom-5 rounded-2xl bg-[#FF6A3D] text-black font-semibold px-5 py-3 shadow-[0_0_25px_#FF6A3D] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F2FF]"
      >
        Donate Quick
      </button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4">
          <div ref={ref} className="relative w-full max-w-md rounded-3xl p-6 ring-1 ring-white/10 bg-white/5 text-[#F9F9F9]" style={{perspective:'1000px'}}>
            <button aria-label="Close" onClick={()=>setOpen(false)} className="absolute right-4 top-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F2FF]">
              <X size={18} />
            </button>
            <div className="relative mx-auto h-64 w-64 [transform-style:preserve-3d] animate-[spin_18s_linear_infinite]">
              <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_40px_rgba(22,242,255,0.25)] [transform:rotateY(18deg)_rotateX(6deg)_translateZ(20px)]" />
              <div className="absolute inset-3 rounded-xl grid place-items-center bg-[#000814]/60 border border-white/20">
                {/* Inline simple QR placeholder */}
                <svg width="200" height="200" viewBox="0 0 100 100" role="img" aria-label="UPI QR code placeholder" className="opacity-90">
                  <rect x="0" y="0" width="100" height="100" fill="white" />
                  <rect x="5" y="5" width="10" height="10" fill="#000" />
                  <rect x="25" y="5" width="10" height="10" fill="#000" />
                  <rect x="45" y="5" width="10" height="10" fill="#000" />
                  <rect x="65" y="5" width="10" height="10" fill="#000" />
                  <rect x="85" y="5" width="10" height="10" fill="#000" />
                  <rect x="5" y="25" width="10" height="10" fill="#000" />
                  <rect x="35" y="35" width="30" height="30" fill="#000" />
                  <rect x="85" y="85" width="10" height="10" fill="#000" />
                  <rect x="65" y="65" width="10" height="10" fill="#000" />
                </svg>
              </div>
            </div>
            <div className="mt-6 text-center space-y-1">
              <p className="text-sm text-[#8C8C8C]">UPI • {upiId}</p>
              <a href={`upi://pay?pa=${encodeURIComponent(upiId)}&pn=Voiceless&cu=INR`} className="inline-flex items-center justify-center rounded-xl bg-[#16F2FF] text-black font-semibold px-4 py-2 shadow-[0_0_24px_rgba(22,242,255,0.4)] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F2FF]">
                Open UPI App
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}