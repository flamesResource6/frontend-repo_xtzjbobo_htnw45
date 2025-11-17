import GalleryCube from './GalleryCube'

export default function Gallery(){
  const images = [
    { src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop', alt:'Puppy being fed', caption:'Feeding a hungry puppy' },
    { src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop', alt:'Street dog resting', caption:'Street friend resting' },
    { src: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=1200&auto=format&fit=crop', alt:'Dog with kind eyes', caption:'Those eyes say it all' },
    { src: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=1200&auto=format&fit=crop', alt:'Volunteer and dog', caption:'Care and kindness' },
    { src: 'https://images.unsplash.com/photo-1644678948127-a022d61f8d25?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQdXBweSUyMGJlaW5nJTIwZmVkfGVufDB8MHx8fDE3NjM0MDQ5NTh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', alt:'Dog silhouette', caption:'Waiting for a meal' },
    { src: 'https://images.unsplash.com/photo-1644678948127-a022d61f8d25?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQdXBweSUyMGJlaW5nJTIwZmVkfGVufDB8MHx8fDE3NjM0MDQ5NTh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', alt:'Happy dog', caption:'Joy after food' }
  ]

  return (
    <section className="relative py-20 bg-[#000009]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9]">Moments that matter</h2>
        <p className="mt-2 text-[#8C8C8C]">Real feeding photos — rotating in a 3D cube.</p>
        <div className="mt-10 flex items-center justify-center">
          <GalleryCube images={images} />
        </div>
      </div>
    </section>
  )
}
