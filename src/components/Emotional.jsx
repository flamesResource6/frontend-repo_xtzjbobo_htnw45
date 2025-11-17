export default function Emotional(){
  const items = [
    'Dogs searching dustbins',
    'Puppies eating plastic',
    'Mothers feeding hungry pups',
    'Seniors lying weak and ignored',
  ]
  return (
    <section className="relative py-20 bg-[#000009]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9]">Why Your Biscuit Matters</h2>
        <p className="mt-3 text-[#8C8C8C] max-w-2xl">For us, a biscuit is small. For them, it’s survival.</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((t, i)=> (
            <div key={i} className="rounded-2xl bg-[#0b1327]/70 ring-1 ring-white/10 p-5 text-[#F9F9F9]">
              <div className="h-28 rounded-xl bg-gradient-to-br from-[#0A1A3A] to-[#001829] ring-1 ring-white/10 mb-4 flex items-center justify-center text-[#16F2FF]/70">3D Sad Visual</div>
              <p className="text-sm text-[#F9F9F9]">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[#F9F9F9]">Your biscuit packet = Their happiest moment of the day.</p>
      </div>
    </section>
  )
}
