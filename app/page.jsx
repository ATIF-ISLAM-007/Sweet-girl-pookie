import Reveal from '../components/Reveal'

export default function Page(){
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Reveal image={'/reveal-bg.jpg'} />
    </main>
  )
}