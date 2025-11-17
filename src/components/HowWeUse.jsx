export default function HowWeUse(){
  const items = ['Biscuits','Chapati dough','Milk feeding for puppies','Occasional rice packs']
  const zones = ['Markets','Bus stands','Railway side streets','Construction areas','Empty parking spaces']
  return (
    <section className="relative py-20 bg-[#000009]">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9]">100% Transparency</h2>
          <p className="mt-3 text-[#8C8C8C]">No salaries. No office cost. No marketing cost. Every donation goes directly into buying:</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {items.map((x,i)=>(
              <li key={i} className="rounded-xl bg-[#0b1327]/70 ring-1 ring-white/10 px-4 py-3 text-[#F9F9F9]">{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#F9F9F9]">Daily Feeding Zones</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {zones.map((x,i)=>(
              <li key={i} className="rounded-xl bg-[#0b1327]/70 ring-1 ring-white/10 px-4 py-3 text-[#F9F9F9]">{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
