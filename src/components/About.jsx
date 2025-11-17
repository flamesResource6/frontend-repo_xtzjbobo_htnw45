export default function About(){
  const stats = [
    { label:'Meals served', value:'25,000+' },
    { label:'Areas covered', value:'35+' },
    { label:'Volunteers', value:'120+' },
  ]
  const photos = [
    { src:'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=1200&auto=format&fit=crop', alt:'Volunteer caring for dog' },
    { src:'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1200&auto=format&fit=crop', alt:'Puppy looking up' },
  ]
  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Who We Are</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Voiceless is a community-driven initiative focused on feeding stray dogs across the city.
            No extra drama. No unnecessary overhead. Just pure intention — Feed the dogs who can’t ask for help.
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-4">
            {stats.map((s,i)=> (
              <div key={i} className="rounded-xl bg-white ring-1 ring-slate-200 p-4 text-center">
                <dt className="text-xs text-slate-600">{s.label}</dt>
                <dd className="text-lg font-semibold text-slate-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 gap-4 items-start">
          <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-[0_10px_24px_rgba(2,6,23,0.10)] rotate-[-2deg]">
            <img src={photos[0].src} alt={photos[0].alt} loading="lazy" className="w-full h-56 object-cover" />
          </figure>
          <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-[0_10px_24px_rgba(2,6,23,0.10)] rotate-[3deg] translate-y-6">
            <img src={photos[1].src} alt={photos[1].alt} loading="lazy" className="w-full h-56 object-cover" />
          </figure>
        </div>
      </div>
    </section>
  )
}
