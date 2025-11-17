import { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''})
  const handleChange = (e)=> setForm({...form, [e.target.name]: e.target.value})
  const handleSubmit = (e)=>{
    e.preventDefault()
    alert('Thanks for reaching out! We will get back to you soon.')
  }
  return (
    <section className="relative py-20 bg-[#000009]">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9]">Reach Out to Us</h2>
          <p className="mt-2 text-[#8C8C8C]">Have questions? Want to volunteer? Fill the form below.</p>
          <div className="mt-6 space-y-2 text-[#8C8C8C]">
            <p><span className="text-[#F9F9F9]">Email:</span> support@voiceless.org</p>
            <p><span className="text-[#F9F9F9]">Instagram:</span> @voiceless.ngo</p>
            <p><span className="text-[#F9F9F9]">Location:</span> India</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 bg-[#0b1327]/70 ring-1 ring-white/10">
          <label className="block text-sm text-[#8C8C8C]">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-xl bg-[#000814] ring-1 ring-white/10 focus:ring-2 focus:ring-[#16F2FF] px-4 py-3 text-[#F9F9F9] outline-none" />
          <label className="block mt-4 text-sm text-[#8C8C8C]">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-xl bg-[#000814] ring-1 ring-white/10 focus:ring-2 focus:ring-[#16F2FF] px-4 py-3 text-[#F9F9F9] outline-none" />
          <label className="block mt-4 text-sm text-[#8C8C8C]">Message</label>
          <textarea name="message" rows="5" value={form.message} onChange={handleChange} className="mt-1 w-full rounded-xl bg-[#000814] ring-1 ring-white/10 focus:ring-2 focus:ring-[#16F2FF] px-4 py-3 text-[#F9F9F9] outline-none" />
          <button className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#16F2FF] text-black font-semibold py-3 px-6 hover:brightness-110 transition shadow-[0_0_24px_rgba(22,242,255,0.4)]">Send Message</button>
        </form>
      </div>
    </section>
  )
}
