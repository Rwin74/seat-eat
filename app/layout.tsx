import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'Seat & Eat — Masanı Seç, Deneyimini Yarat',
  description: 'Restoran rezervasyonunu görsel olarak yap. Masanı seç, SMS ile doğrula, güven puanı kazan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
