import './globals.css'

export const metadata = {
  title: 'Sweet Reveal — Clone',
  description: 'A Next.js clone of sweet-reveal.vercel.app',
}

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}