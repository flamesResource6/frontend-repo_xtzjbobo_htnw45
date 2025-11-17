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
        className="fixed z-40 right-5 bottom-5 rounded-2xl bg-orange-400 text-white font-semibold px-5 py-3 shadow-[0_10px_25px_rgba(251,146,60,0.55)] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        Donate Quick
      </button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm p-4">
          <div ref={ref} className="relative w-full max-w-md rounded-3xl p-6 ring-1 ring-slate-200 bg-white text-slate-900" style={{perspective:'1000px'}}>
            <button aria-label="Close" onClick={()=>setOpen(false)} className="absolute right-4 top-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
              <X size={18} />
            </button>
            <div className="relative mx-auto h-64 w-64 [transform-style:preserve-3d] animate-[spin_18s_linear_infinite]">
              <div className="absolute inset-0 rounded-2xl bg-white backdrop-blur-md border border-slate-200 shadow-[0_10px_40px_rgba(2,6,23,0.08)] [transform:rotateY(18deg)_rotateX(6deg)_translateZ(20px)]" />
              <div className="absolute inset-3 rounded-xl grid place-items-center bg-slate-50 border border-slate-200">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi%3A%2F%2Fpay%3Fpa%3D8726446470%40ptaxis%26pn%3DVoiceless%26cu%3DINR" alt="UPI QR code" width={220} height={220} loading="lazy" className="rounded" />
              </div>
            </div>
            <div className="mt-6 text-center space-y-1">
              <p className="text-sm text-slate-600">UPI • {upiId}</p>
              <a href={`upi://pay?pa=${encodeURIComponent(upiId)}&pn=Voiceless&cu=INR`} className="inline-flex items-center justify-center rounded-xl bg-cyan-500 text-white font-semibold px-4 py-2 shadow-[0_10px_24px_rgba(6,182,212,0.35)] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                Open UPI App
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
