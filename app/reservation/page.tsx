'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { Phone, Shield, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

// Test phone numbers for Supabase Phone Auth test mode
const TEST_PHONE = '+905551234567'
const TEST_OTP = '123456'

function ReservationContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const tableLabel = searchParams.get('tableLabel') || 'Masa'
    const restaurantName = searchParams.get('restaurantName') || 'Restoran'
    const date = searchParams.get('date') || ''
    const time = searchParams.get('time') || ''
    const partySize = searchParams.get('partySize') || '2'
    const tableId = searchParams.get('tableId') || ''
    const restaurantId = searchParams.get('restaurantId') || ''

    const [step, setStep] = useState<'phone' | 'otp' | 'confirming'>('phone')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')

    const handleSendOtp = async () => {
        if (!phone || phone.length < 10) {
            setError('Geçerli bir telefon numarası girin.')
            return
        }
        setError('')
        setLoading(true)
        // Simulate OTP send (in production: Supabase signInWithOtp)
        await new Promise(r => setTimeout(r, 1200))
        setLoading(false)
        setStep('otp')
    }

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            setError('6 haneli kodu girin.')
            return
        }
        setError('')
        setLoading(true)
        await new Promise(r => setTimeout(r, 1000))
        // Demo: accept test OTP or any 6-digit code
        if (otp === TEST_OTP || otp.length === 6) {
            setStep('confirming')
            await new Promise(r => setTimeout(r, 800))
            // Navigate to success
            const params = new URLSearchParams({
                tableLabel,
                restaurantName,
                date,
                time,
                partySize,
                name: name || 'Misafir',
            })
            router.push(`/reservation/success?${params.toString()}`)
        } else {
            setError('Hatalı kod. Tekrar deneyin.')
            setLoading(false)
        }
    }

    const steps = [
        { id: 'phone', label: 'Telefon' },
        { id: 'otp', label: 'Doğrulama' },
        { id: 'confirming', label: 'Tamamlandı' },
    ]

    return (
        <main className="min-h-screen pt-16 flex flex-col" style={{ background: 'var(--bg-primary)' }}>
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Progress steps */}
                    <div className="flex items-center justify-center gap-2 mb-10">
                        {steps.map((s, i) => (
                            <div key={s.id} className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                                        style={{
                                            background: step === s.id || (steps.findIndex(x => x.id === step) > i)
                                                ? 'linear-gradient(135deg, #6c63ff, #a78bfa)'
                                                : 'var(--bg-card)',
                                            border: '1px solid var(--border)',
                                            color: step === s.id || (steps.findIndex(x => x.id === step) > i) ? 'white' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {steps.findIndex(x => x.id === step) > i ? <CheckCircle size={16} /> : i + 1}
                                    </div>
                                    <span className="text-sm hidden sm:block" style={{ color: step === s.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="w-8 h-px mx-1" style={{ background: 'var(--border)' }} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Reservation summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl mb-6"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    >
                        <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Rezervasyon Özeti</div>
                        <div className="font-bold text-lg">{tableLabel}</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{restaurantName} • {date} • {time} • {partySize} kişi</div>
                    </motion.div>

                    {/* Step content */}
                    <AnimatePresence mode="wait">
                        {step === 'phone' && (
                            <motion.div
                                key="phone"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 rounded-2xl space-y-5"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center">
                                        <Phone size={20} className="text-violet-400" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Telefon Numaranı Gir</h2>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>SMS ile doğrulama kodu göndereceğiz</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Adın</label>
                                    <input
                                        type="text"
                                        placeholder="Ahmet"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Telefon Numarası</label>
                                    <input
                                        type="tel"
                                        placeholder="+90 555 123 45 67"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                    />
                                </div>

                                {/* Test mode hint */}
                                <div className="p-3 rounded-xl text-xs" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}>
                                    🧪 <strong>Test Modu:</strong> Herhangi bir numara gir. Doğrulama kodu: <strong>123456</strong>
                                </div>

                                {error && <p className="text-sm text-red-400">{error}</p>}

                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
                                    style={{ background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', boxShadow: '0 0 25px rgba(108,99,255,0.4)' }}
                                >
                                    {loading ? 'Gönderiliyor...' : 'SMS Kodu Gönder →'}
                                </button>
                            </motion.div>
                        )}

                        {step === 'otp' && (
                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 rounded-2xl space-y-5"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                                        <Shield size={20} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">Kodu Gir</h2>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{phone} numarasına gönderdik</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>6 Haneli Kod</label>
                                    <input
                                        type="text"
                                        placeholder="123456"
                                        maxLength={6}
                                        value={otp}
                                        onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                                        className="w-full px-4 py-4 rounded-xl outline-none text-2xl font-bold tracking-widest text-center"
                                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                        autoFocus
                                    />
                                </div>

                                <div className="p-3 rounded-xl text-xs" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}>
                                    🧪 <strong>Test Modu:</strong> Kod: <strong>123456</strong>
                                </div>

                                {error && <p className="text-sm text-red-400">{error}</p>}

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading || otp.length !== 6}
                                    className="w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
                                    style={{ background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', boxShadow: '0 0 25px rgba(108,99,255,0.4)' }}
                                >
                                    {loading ? 'Doğrulanıyor...' : 'Rezervasyonu Tamamla ✓'}
                                </button>

                                <button
                                    onClick={() => setStep('phone')}
                                    className="w-full py-2 text-sm transition-colors"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    ← Geri dön
                                </button>
                            </motion.div>
                        )}

                        {step === 'confirming' && (
                            <motion.div
                                key="confirming"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 rounded-2xl text-center"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                                    className="w-12 h-12 rounded-full border-2 border-violet-500 border-t-transparent mx-auto mb-4"
                                />
                                <p className="font-bold">Rezervasyonun tamamlanıyor...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}

export default function ReservationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--bg-primary)' }} />}>
            <ReservationContent />
        </Suspense>
    )
}
