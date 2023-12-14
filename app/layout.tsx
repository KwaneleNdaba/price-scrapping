import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  
  subsets: ["latin"],
  weight : ["300","400","500","600","700"]

})

export const metadata: Metadata = {
  title: 'Price Tracker',
  description: 'Track product prices effortlessly and save money on your online shopping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <main className="max-w-10xl mx-auto">
        <Navbar/>
      <body className={inter.className}>{children}</body>
      </main>
    </html>
  )
}
