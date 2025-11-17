import { useEffect, useMemo, useState } from 'react'
import { track } from '../lib/analytics'
import { Plus, Minus } from 'lucide-react'

function OptionCard({title, subtitle, packets, cta, onSelect}){
  return (
    <button onClick={()=>onSelect(packets)} className="text-left relative rounded-2xl p-6 bg-white ring-1 ring-slate-200 hover:ring-cyan-400/50 transition-all overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
      <div className="absolute -top-24 -right-24 h-48 w-48 bg-cyan-400/10 rounded-full blur-3xl" />
      <h4 className="text-xl font-semibold text-slate-900">{title}</h4>
      <p className="text-slate-600 mt-1">{subtitle}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-cyan-600 drop-shadow-[0_0_12px_rgba(6,182,212,0.25)]">{packets}</div>
        <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-400 text-white font-semibold shadow-[0_0_24px_rgba(251,146,60,0.55)]">
          {cta}
        </span>
      </div>
    </button>
  )
}

function GlassQR({ upiId, amount }){
  return (
    <div className="relative rounded-3xl p-6 ring-1 ring-slate-200 bg-white" style={{perspective:'1000px'}}>
      <div className="relative mx-auto h-64 w-64 [transform-style:preserve-3d] animate-[spin_20s_linear_infinite]" aria-hidden>
        <div className="absolute inset-0 rounded-2xl bg-white backdrop-blur-md border border-slate-200 shadow-[0_10px_40px_rgba(2,6,23,0.08)] [transform:rotateY(18deg)_rotateX(6deg)_translateZ(20px)]" />
        <div className="absolute inset-3 rounded-xl grid place-items-center bg-slate-50 border border-slate-200">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi%3A%2F%2Fpay%3Fpa%3D8726446470%40ptaxis%26pn%3DVoiceless%26cu%3DINR" alt="UPI QR for Voiceless" width={220} height={220} className="rounded" loading="lazy" />
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600">UPI • {upiId}</p>
        <a href={`upi://pay?pa=${encodeURIComponent(upiId)}&pn=Voiceless&cu=INR&am=${amount}`} className="inline-flex items-center justify-center mt-2 rounded-xl bg-cyan-500 text-white font-semibold px-4 py-2 shadow-[0_10px_24px_rgba(6,182,212,0.35)] hover:brightness-110">
          Pay in UPI App
        </a>
      </div>
    </div>
  )
}

export default function Donate(){
  const [packets, setPackets] = useState(10)
  const [confirmed, setConfirmed] = useState(false)
  const [todayCount, setTodayCount] = useState(0)
  const upiId = '8726446470@ptaxis'
  const pricePerPacket = 5
  const minPackets = 10
  const amount = useMemo(()=> Math.max(minPackets, Number(packets)||minPackets) * pricePerPacket, [packets])

  useEffect(()=>{ track('view_donate', { at: Date.now() }) },[])

  const inc = ()=> setPackets(p=> Math.max(minPackets, Number(p)||minPackets) + 1)
  const dec = ()=> setPackets(p=> Math.max(minPackets, (Number(p)||minPackets) - 1))
  const handleCustomChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/g,'')
    setPackets(v ? parseInt(v) : '')
  }
  const selectAndTrack = (n)=>{ setPackets(n); track('select_packets', { n }) }
  const confirm = ()=>{
    const count = Math.max(minPackets, Number(packets)||minPackets)
    setConfirmed(true)
    setTodayCount(c=> c + count)
    track('confirm_donate', { packets: count, amount: count*pricePerPacket })
  }

  return (
    <section id="donate" className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Donate Biscuit Packets</h2>
          <p className="mt-3 text-slate-600">One packet = a meal for 2–3 dogs. <span aria-live="polite">Today: {todayCount} packets donated.</span></p>
          <p className="mt-1 text-cyan-600">Minimum donation = 10 packets</p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <OptionCard title="10 Biscuit Packets" subtitle="Small step. Big impact." packets={10} cta="Donate 10" onSelect={selectAndTrack} />
          <OptionCard title="50 Biscuit Packets" subtitle="Feed an entire street." packets={50} cta="Donate 50" onSelect={selectAndTrack} />
          <OptionCard title="100 Biscuit Packets" subtitle="Feed multiple colonies." packets={100} cta="Donate 100" onSelect={selectAndTrack} />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-white ring-1 ring-slate-200">
            <h4 className="text-xl font-semibold text-slate-900">Custom Packets</h4>
            <p className="text-slate-600 mt-1">Use the controls or type a number. Live pricing below.</p>
            <div className="mt-4 flex items-center gap-3">
              <button aria-label="Decrease" onClick={dec} className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"><Minus size={16} /></button>
              <input aria-label="Packet count" value={packets} onChange={handleCustomChange} inputMode="numeric" pattern="[0-9]*" placeholder="e.g. 27" className="w-28 text-center rounded-xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 px-3 py-3 text-slate-900 placeholder:text-slate-400 outline-none" />
              <button aria-label="Increase" onClick={inc} className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"><Plus size={16} /></button>
            </div>
            <div className="mt-4 text-slate-900 flex items-center justify-between">
              <span>Packets: <b>{Math.max(minPackets, Number(packets)||minPackets)}</b></span>
              <span>Price: <b>₹{amount}</b> (₹{pricePerPacket}/packet)</span>
            </div>
            <button onClick={confirm} className="mt-5 inline-flex items-center gap-2 justify-center rounded-xl bg-orange-400 text-white font-semibold py-3 px-6 hover:brightness-110 transition shadow-[0_10px_24px_rgba(251,146,60,0.45)]">
              Confirm
            </button>
            {confirmed && (
              <div className="mt-4 grid grid-cols-10 gap-1" aria-live="polite">
                {Array.from({length: Math.min(50, Math.max(minPackets, Number(packets)||minPackets))}).map((_,i)=> (
                  <div key={i} className="h-2 bg-gradient-to-r from-orange-400 to-cyan-500 rounded animate-[grow_0.8s_ease-in-out_forwards]" style={{animationDelay: `${i*0.02}s`}} />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl p-6 bg-white ring-1 ring-slate-200">
            <h4 className="text-xl font-semibold text-slate-900">Payment (UPI)</h4>
            <div className="mt-3 space-y-2 text-slate-600">
              <p><span className="text-slate-900">UPI ID:</span> {upiId}</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Scan the QR code or tap to open your UPI app</li>
                <li>Amount auto-fills; you can edit in the app</li>
              </ul>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <a href={`upi://pay?pa=${encodeURIComponent(upiId)}&pn=Voiceless&cu=INR&am=${amount}`}
                 onClick={()=>track('click_upi', { amount })}
                 className="inline-flex items-center justify-center rounded-xl bg-cyan-500 text-white font-semibold py-3 hover:brightness-110 transition shadow-[0_10px_24px_rgba(6,182,212,0.35)]">
                Pay via UPI App
              </a>
              <a href="#quick-donate" className="inline-flex items-center justify-center rounded-xl bg-orange-400 text-white font-semibold py-3 hover:brightness-110 transition shadow-[0_10px_24px_rgba(251,146,60,0.45)]">
                View QR Code
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-600">Suggested amount auto-fills based on packets × ₹5. Minimum 10 packets.</p>

            <div className="mt-6" aria-hidden>
              <GlassQR upiId={upiId} amount={amount} />
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  )
}
