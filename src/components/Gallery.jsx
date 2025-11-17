import GalleryCube from './GalleryCube'

export default function Gallery(){
  const images = [
    { src: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=1600&auto=format&fit=crop', alt:'Dog with kind eyes', caption:'Those eyes say it all' },
    { src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop', alt:'Puppy being fed', caption:'Feeding a hungry puppy' },
    { src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop', alt:'Street dog resting', caption:'Street friend resting' },
    { src: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=1600&auto=format&fit=crop', alt:'Volunteer and dog', caption:'Care and kindness' },
    { src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1600&auto=format&fit=crop', alt:'Happy dog smiling', caption:'Joy after food' },
    { src: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=1600&auto=format&fit=crop', alt:'Dog eating from hand', caption:'Trust and love' }
  ]

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Moments that matter</h2>
        <p className="mt-2 text-slate-600">Real feeding photos — rotating in a 3D cube.</p>
        <div className="mt-10 flex items-center justify-center">
          <GalleryCube images={images} />
        </div>
      </div>
    </section>
  )
}
