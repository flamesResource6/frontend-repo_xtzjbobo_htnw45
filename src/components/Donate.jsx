import { useEffect, useMemo, useState } from 'react'
import { track } from '../lib/analytics'
import { Plus, Minus, CheckCircle2 } from 'lucide-react'

function OptionCard({title, subtitle, packets, cta, onSelect}){
  return (
    <button onClick={()=>onSelect(packets)} className="text-left relative rounded-2xl p-6 bg-[#0b1327]/70 ring-1 ring-white/10 hover:ring-[#16F2FF]/40 transition-all overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F2FF]">
      <div className="absolute -top-24 -right-24 h-48 w-48 bg-[#16F2FF]/10 rounded-full blur-3xl" />
      <h4 className="text-xl font-semibold text-[#F9F9F9]">{title}</h4>
      <p className="text-[#8C8C8C] mt-1">{subtitle}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-[#16F2FF] drop-shadow-[0_0_20px_rgba(22,242,255,0.35)]">{packets}</div>
        <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6A3D] text-black font-semibold shadow-[0_0_24px_#FF6A3D]">
          {cta}
        </span>
      </div>
    </button>
  )
}

function GlassQR({ upiId, amount }){
  return (
    <div className="relative rounded-3xl p-6 ring-1 ring-white/10 bg-white/5" style={{perspective:'1000px'}}>
      <div className="relative mx-auto h-64 w-64 [transform-style:preserve-3d] animate-[spin_20s_linear_infinite]">
        <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_40px_rgba(22,242,255,0.25)] [transform:rotateY(18deg)_rotateX(6deg)_translateZ(20px)]" />
        <div className="absolute inset-3 rounded-xl grid place-items-center bg-[#000814]/60 border border-white/20">
          {/* Replace with actual QR image in /public later */}
          <svg width="200" height="200" viewBox="0 0 100 100" role="img" aria-label="UPI QR code placeholder">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <rect x="5" y="5" width="20" height="20" fill="#000" />
            <rect x="75" y="5" width="20" height="20" fill="#000" />
            <rect x="5" y="75" width="20" height="20" fill="#000" />
            <rect x="35" y="35" width="30" height="30" fill="#000" />
            <rect x="85" y="85" width="10" height="10" fill="#000" />
          </svg>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-[#8C8C8C]">UPI • {upiId}</p>
        <a href={`upi://pay?pa=${encodeURIComponent(upiId)}&pn=Voiceless&cu=INR&am=${amount}`} className="inline-flex items-center justify-center mt-2 rounded-xl bg-[#16F2FF] text-black font-semibold px-4 py-2 shadow-[0_0_24px_rgba(22,242,255,0.4)] hover:brightness-110">
          Pay in UPI App
        </a>
      </div>
    </div>
  )
}

export default function Donate(){
  const [packets, setPackets] = useState(10)
  const [confirmed, setConfirmed] = useState(false)
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
  const confirm = ()=>{ setConfirmed(true); track('confirm_donate', { packets: Math.max(minPackets, Number(packets)||minPackets), amount }) }

  return (
    <section id="donate" className="relative py-24 bg-[#000009]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9]">Donate Biscuit Packets</h2>
          <p className="mt-3 text-[#8C8C8C]">One packet = a meal for 2–3 dogs. Today: 0 packets donated.</p>
          <p className="mt-1 text-[#16F2FF]">Minimum donation = 10 packets</p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <OptionCard title="10 Biscuit Packets" subtitle="Small step. Big impact." packets={10} cta="Donate 10" onSelect={selectAndTrack} />
          <OptionCard title="50 Biscuit Packets" subtitle="Feed an entire street." packets={50} cta="Donate 50" onSelect={selectAndTrack} />
          <OptionCard title="100 Biscuit Packets" subtitle="Feed multiple colonies." packets={100} cta="Donate 100" onSelect={selectAndTrack} />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-[#0b1327]/70 ring-1 ring-white/10">
            <h4 className="text-xl font-semibold text-[#F9F9F9]">Custom Packets</h4>
            <p className="text-[#8C8C8C] mt-1">Use the controls or type a number. Live pricing below.</p>
            <div className="mt-4 flex items-center gap-3">
              <button aria-label="Decrease" onClick={dec} className="p-3 rounded-xl bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F2FF]"><Minus size={16} /></button>
              <input aria-label="Packet count" value={packets} onChange={handleCustomChange} inputMode="numeric" pattern="[0-9]*" placeholder="e.g. 27" className="w-28 text-center rounded-xl bg-[#000814] ring-1 ring-white/10 focus:ring-2 focus:ring-[#16F2FF] px-3 py-3 text-[#F9F9F9] placeholder:text-[#8C8C8C] outline-none" />
              <button aria-label="Increase" onClick={inc} className="p-3 rounded-xl bg-white/10 hover:bg:white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F2FF]"><Plus size={16} /></button>
            </div>
            <div className="mt-4 text-[#F9F9F9] flex items-center justify-between">
              <span>Packets: <b>{Math.max(minPackets, Number(packets)||minPackets)}</b></span>
              <span>Price: <b>₹{amount}</b> (₹{pricePerPacket}/packet)</span>
            </div>
            <button onClick={confirm} className="mt-5 inline-flex items-center gap-2 justify-center rounded-xl bg-[#FF6A3D] text-black font-semibold py-3 px-6 hover:brightness-110 transition shadow-[0_0_24px_#FF6A3D]">
              Confirm
            </button>
            {confirmed && (
              <div className="mt-4 grid grid-cols-10 gap-1" aria-live="polite">
                {Array.from({length: Math.min(50, Math.max(minPackets, Number(packets)||minPackets))}).map((_,i)=> (
                  <div key={i} className="h-2 bg-gradient-to-r from-[#FF6A3D] to-[#16F2FF] rounded animate-[grow_0.8s_ease-in-out_forwards]" style={{animationDelay: `${i*0.02}s`}} />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl p-6 bg-[#0b1327]/70 ring-1 ring-white/10">
            <h4 className="text-xl font-semibold text-[#F9F9F9]">Payment (UPI)</h4>
            <div className="mt-3 space-y-2 text-[#8C8C8C]">
              <p><span className="text-[#F9F9F9]">UPI ID:</span> {upiId}</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Scan the QR code or tap to open your UPI app</li>
                <li>Amount auto-fills; you can edit in the app</li>
              </ul>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <a href={`upi://pay?pa=${encodeURIComponent(upiId)}&pn=Voiceless&cu=INR&am=${amount}`}
                 onClick={()=>track('click_upi', { amount })}
                 className="inline-flex items-center justify-center rounded-xl bg-[#16F2FF] text-black font-semibold py-3 hover:brightness-110 transition shadow-[0_0_24px_rgba(22,242,255,0.4)]">
                Pay via UPI App
              </a>
              <a href="#quick-donate" className="inline-flex items-center justify-center rounded-xl bg-[#FF6A3D] text-black font-semibold py-3 hover:brightness-110 transition shadow-[0_0_24px_#FF6A3D]">
                View QR Code
              </a>
            </div>
            <p className="mt-3 text-sm text-[#8C8C8C]">Suggested amount auto-fills based on packets × ₹5. Minimum 10 packets.</p>

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
