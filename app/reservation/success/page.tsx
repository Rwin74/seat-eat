'use client'

import { useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Users, MapPin, Home, User } from 'lucide-react'
import Navbar from '@/components/Navbar'

function SuccessContent() {
    const searchParams = useSearchParams()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const tableLabel = searchParams.get('tableLabel') || 'Masa'
    const restaurantName = searchParams.get('restaurantName') || 'Restoran'
    const date = searchParams.get('date') || ''
    const time = searchParams.get('time') || ''
    const partySize = searchParams.get('partySize') || '2'
    const name = searchParams.get('name') || 'Misafir'

    useEffect(() => {
        // Confetti explosion
        const launchConfetti = async () => {
            const confetti = (await import('canvas-confetti')).default
            const end = Date.now() + 3000

            const colors = ['#6c63ff', '#a78bfa', '#c084fc', '#22c55e', '#fbbf24', '#f472b6']

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors,
                })
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors,
                })
                if (Date.now() < end) requestAnimationFrame(frame)
            }
            frame()

            // Big burst in the middle
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { x: 0.5, y: 0.4 },
                    colors,
                })
            }, 300)
        }

        launchConfetti()
    }, [])

    const formattedDate = date
        ? new Date(date).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : ''

    return (
        <main className="min-h-screen pt-16 flex flex-col items-center justify-center px-6" style={{ background: 'var(--bg-primary)' }}>
            <Navbar />

            <div className="w-full max-w-lg text-center">
                {/* Animated checkmark */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                    style={{ background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', boxShadow: '0 0 60px rgba(108,99,255,0.5)' }}
                >
                    <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        width="48" height="48" viewBox="0 0 48 48" fill="none"
                    >
                        <motion.path
                            d="M12 24L20 32L36 16"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        />
                    </motion.svg>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-3">
                        <span className="gradient-text">{tableLabel.split(' - ')[0]}</span>
                        <br />
                        <span className="text-white">senin {name}!</span>
                    </h1>
                    <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Seni bekliyoruz. 🎉
                    </p>
                </motion.div>

                {/* Reservation details card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 rounded-2xl mb-8 text-left space-y-4"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                    <h3 className="font-bold text-lg mb-4">Rezervasyon Detayları</h3>

                    {[
                        { icon: MapPin, label: 'Restoran', value: restaurantName },
                        { icon: MapPin, label: 'Masa', value: tableLabel },
                        { icon: Calendar, label: 'Tarih', value: formattedDate },
                        { icon: Clock, label: 'Saat', value: time },
                        { icon: Users, label: 'Kişi Sayısı', value: `${partySize} kişi` },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: 'rgba(108,99,255,0.15)' }}>
                                <item.icon size={16} className="text-violet-400" />
                            </div>
                            <div>
                                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</div>
                                <div className="font-medium text-sm">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Trust score earned */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="p-4 rounded-xl mb-8 flex items-center gap-3"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}
                >
                    <span className="text-2xl">🏆</span>
                    <div className="text-left">
                        <div className="font-bold text-emerald-400">Rezervasyona git, +10 puan kazan!</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Güven puanın artacak, VIP masalara erişim hakkı kazanacaksın.</div>
                    </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex gap-3"
                >
                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    >
                        <Home size={16} />
                        Ana Sayfa
                    </Link>
                    <Link
                        href="/profile"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
                        style={{ background: 'linear-gradient(135deg, #6c63ff, #a78bfa)' }}
                    >
                        <User size={16} />
                        Profilim
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--bg-primary)' }} />}>
            <SuccessContent />
        </Suspense>
    )
}
