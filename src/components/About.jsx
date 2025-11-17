export default function About(){
  return (
    <section className="relative bg-[#000009] py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9]">Who We Are</h2>
          <p className="mt-4 text-[#8C8C8C] leading-relaxed">
            Voiceless is a community-driven initiative focused on feeding stray dogs across the city.
            No extra drama. No unnecessary overhead. Just pure intention — Feed the dogs who can’t ask for help.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#F9F9F9]">Our Mission</h3>
          <p className="mt-4 text-[#8C8C8C] leading-relaxed">
            To ensure that every stray dog gets at least ONE meal of love every day.
          </p>
        </div>
      </div>
    </section>
  )
}
