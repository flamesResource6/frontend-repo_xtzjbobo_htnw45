export default function Emotional(){
  const items = [
    {
      title: 'Dogs searching dustbins',
      src: 'https://images.unsplash.com/photo-1632933828205-73b4e62b63d6?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdHJheSUyMGRvZyUyMHNlYXJjaGluZyUyMG5lYXJ8ZW58MHwwfHx8MTc2MzQwNTg0NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      alt: 'Stray dog searching near trash bins'
    },
    {
      title: 'Puppies eating plastic',
      src: 'https://images.unsplash.com/photo-1632933828205-73b4e62b63d6?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdHJheSUyMGRvZyUyMHNlYXJjaGluZyUyMG5lYXJ8ZW58MHwwfHx8MTc2MzQwNTg0NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      alt: 'Hungry puppies on the street'
    },
    {
      title: 'Mothers feeding hungry pups',
      src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1600&auto=format&fit=crop',
      alt: 'Mother dog with puppies looking for food'
    },
    {
      title: 'Seniors lying weak and ignored',
      src: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1600&auto=format&fit=crop',
      alt: 'Old street dog resting on pavement'
    },
  ]
  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Your Biscuit Matters</h2>
        <p className="mt-3 text-slate-600 max-w-2xl">For us, a biscuit is small. For them, it’s survival.</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i)=> (
            <figure key={i} className="group rounded-2xl bg-white ring-1 ring-slate-200 p-4 text-slate-900 transition-transform duration-300 will-change-transform hover:-translate-y-1" style={{perspective:'1000px'}}>
              <div className="relative h-40 rounded-xl overflow-hidden border border-slate-200 shadow-[0_10px_24px_rgba(2,6,23,0.10)] [transform-style:preserve-3d]">
                <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                <span className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" aria-hidden></span>
              </div>
              <figcaption className="mt-3 text-sm">{item.title}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-slate-900">Your biscuit packet = Their happiest moment of the day.</p>
      </div>
    </section>
  )
}
