export default function Emotional(){
  const items = [
    'Dogs searching dustbins',
    'Puppies eating plastic',
    'Mothers feeding hungry pups',
    'Seniors lying weak and ignored',
  ]
  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Your Biscuit Matters</h2>
        <p className="mt-3 text-slate-600 max-w-2xl">For us, a biscuit is small. For them, it’s survival.</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((t, i)=> (
            <div key={i} className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 text-slate-900">
              <div className="h-28 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-slate-200 mb-4 flex items-center justify-center text-cyan-600">3D Sad Visual</div>
              <p className="text-sm">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-slate-900">Your biscuit packet = Their happiest moment of the day.</p>
      </div>
    </section>
  )
}
