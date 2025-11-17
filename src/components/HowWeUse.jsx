export default function HowWeUse(){
  const items = ['Biscuits','Chapati dough','Milk feeding for puppies','Occasional rice packs']
  const zones = ['Markets','Bus stands','Railway side streets','Construction areas','Empty parking spaces']
  const photo = { src:'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=1600&auto=format&fit=crop', alt:'Volunteer feeding street dogs' }
  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">100% Transparency</h2>
          <p className="mt-3 text-slate-600">No salaries. No office cost. No marketing cost. Every donation goes directly into buying:</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {items.map((x,i)=>(
              <li key={i} className="rounded-xl bg-white ring-1 ring-slate-200 px-4 py-3 text-slate-900">{x}</li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-slate-900">Daily Feeding Zones</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {zones.map((x,i)=>(
                <li key={i} className="rounded-xl bg-white ring-1 ring-slate-200 px-4 py-3 text-slate-900">{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <figure className="rounded-3xl overflow-hidden border border-slate-200 shadow-[0_15px_35px_rgba(2,6,23,0.12)]">
          <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-[360px] object-cover" />
          <figcaption className="text-center text-sm text-slate-600 py-2 bg-white/70">Every rupee goes into meals</figcaption>
        </figure>
      </div>
    </section>
  )
}
