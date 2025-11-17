export default function Hero() {
  return (
    <section className="relative w-full bg-white">
      <div className="container mx-auto px-6 py-10 sm:py-12">
        <figure className="mx-auto max-w-3xl">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Parle-G_biscuits_in_a_bowl.jpg/1024px-Parle-G_biscuits_in_a_bowl.jpg"
            alt="Parle-G biscuits in a bowl"
            loading="eager"
            className="w-full h-auto rounded-2xl border border-slate-200 shadow-[0_12px_30px_rgba(2,6,23,0.12)] object-cover"
          />
          <figcaption className="sr-only">Featured product image representing Parle-G biscuits for donation packets.</figcaption>
        </figure>
      </div>
    </section>
  )
}
