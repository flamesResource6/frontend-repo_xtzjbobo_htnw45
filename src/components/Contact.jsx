import { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''})
  const handleChange = (e)=> setForm({...form, [e.target.name]: e.target.value})
  const handleSubmit = (e)=>{
    e.preventDefault()
    alert('Thanks for reaching out! We will get back to you soon.')
  }
  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Reach Out to Us</h2>
          <p className="mt-2 text-slate-600">Have questions? Want to volunteer? Fill the form below.</p>
          <div className="mt-6 space-y-2 text-slate-600">
            <p><span className="text-slate-900 font-medium">Email:</span> support@voiceless.org</p>
            <p><span className="text-slate-900 font-medium">Instagram:</span> @voiceless.ngo</p>
            <p><span className="text-slate-900 font-medium">Location:</span> India</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 bg-white ring-1 ring-slate-200">
          <label className="block text-sm text-slate-600">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 px-4 py-3 text-slate-900 outline-none" />
          <label className="block mt-4 text-sm text-slate-600">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 px-4 py-3 text-slate-900 outline-none" />
          <label className="block mt-4 text-sm text-slate-600">Message</label>
          <textarea name="message" rows="5" value={form.message} onChange={handleChange} className="mt-1 w-full rounded-xl bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 px-4 py-3 text-slate-900 outline-none" />
          <button className="mt-5 inline-flex items-center justify-center rounded-xl bg-cyan-500 text-white font-semibold py-3 px-6 hover:brightness-110 transition shadow-[0_10px_24px_rgba(6,182,212,0.35)]">Send Message</button>
        </form>
      </div>
    </section>
  )
}
