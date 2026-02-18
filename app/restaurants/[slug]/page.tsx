'use client'

import { useState, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { notFound } from 'next/navigation'
import { MapPin, Users, Star, Calendar, Clock, ChevronLeft, X, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import FloorPlan from '@/components/FloorPlan'
import { mockRestaurants, mockTables } from '@/lib/mock-data'
import { TableWithStatus } from '@/lib/types'
import { getTrustScoreTier } from '@/lib/utils'

const USER_TRUST_SCORE = 100 // Demo: logged-in user's score

export default function RestaurantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const router = useRouter()
    const restaurant = mockRestaurants.find(r => r.slug === slug)
    if (!restaurant) notFound()

    const tables = mockTables.filter(t => t.restaurant_id === restaurant.id)
    const [selectedTable, setSelectedTable] = useState<TableWithStatus | null>(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [partySize, setPartySize] = useState(2)

    const tier = getTrustScoreTier(USER_TRUST_SCORE)

    const handleReserve = () => {
        if (!selectedTable || !selectedDate || !selectedTime) return
        const params = new URLSearchParams({
            tableId: selectedTable.id,
            tableLabel: selectedTable.label,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            date: selectedDate,
            time: selectedTime,
            partySize: String(partySize),
        })
        router.push(`/reservation?${params.toString()}`)
    }

    const today = new Date().toISOString().split('T')[0]

    return (
        <main style={{ minHeight: '100vh', paddingTop: '80px', background: '#0a0a0f', color: '#f0f0f8', fontFamily: 'sans-serif' }}>
            <Navbar />

            {/* Back button */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 0' }}>
                <Link href="/restaurants" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#9ca3af',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                }}>
                    <ChevronLeft size={16} />
                    Tüm Restoranlar
                </Link>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px'
                }}>

                    {/* Left: Floor Plan + Info */}
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Restaurant header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <h1 style={{ fontSize: '1.875rem', fontWeight: 900 }}>{restaurant.name}</h1>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    fontSize: '14px',
                                    background: 'rgba(251,191,36,0.1)',
                                    border: '1px solid rgba(251,191,36,0.3)',
                                    color: '#fbbf24'
                                }}>
                                    <Star size={14} fill="#fbbf24" />
                                    4.9
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '12px', color: '#9ca3af' }}>
                                <MapPin size={14} />
                                {restaurant.address}
                            </div>
                            <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>{restaurant.description}</p>
                        </motion.div>

                        {/* Floor Plan */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Kat Planı</h2>
                                <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                                    Masaya tıklayarak seç
                                </span>
                            </div>
                            <FloorPlan
                                tables={tables}
                                userTrustScore={USER_TRUST_SCORE}
                                onTableSelect={setSelectedTable}
                                selectedTableId={selectedTable?.id}
                            />
                        </motion.div>

                        {/* Selected table details */}
                        <AnimatePresence>
                            {selectedTable && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: 'rgba(108,99,255,0.1)',
                                        border: '1px solid rgba(108,99,255,0.3)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div>
                                            <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#c4b5fd' }}>{selectedTable.label}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', marginTop: '4px', color: '#9ca3af' }}>
                                                <Users size={14} />
                                                {selectedTable.capacity} kişilik
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedTable(null)}
                                            style={{
                                                padding: '4px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#9ca3af'
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {selectedTable.features.map(f => (
                                            <span key={f} style={{
                                                padding: '4px 12px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                background: 'rgba(108,99,255,0.2)',
                                                color: '#c4b5fd'
                                            }}>
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                    {selectedTable.min_trust_score > 0 && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '14px', color: '#fbbf24' }}>
                                            <Star size={14} />
                                            Bu masa için minimum {selectedTable.min_trust_score} güven puanı gerekiyor
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Reservation Panel */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* User trust score */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                padding: '16px',
                                borderRadius: '16px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#9ca3af' }}>Güven Puanın</span>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: tier.color === '#a78bfa' ? '#a78bfa' : tier.color === '#22c55e' ? '#22c55e' : '#f59e0b' }}>
                                    {tier.emoji} {tier.label}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    fontSize: '1.875rem',
                                    fontWeight: 900,
                                    background: 'linear-gradient(to right, #6c63ff, #a78bfa)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>{USER_TRUST_SCORE}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ height: '8px', borderRadius: '9999px', background: '#2a2a3a', overflow: 'hidden' }}>
                                        <div
                                            style={{
                                                height: '100%',
                                                width: `${Math.min(100, (USER_TRUST_SCORE / 200) * 100)}%`,
                                                background: 'linear-gradient(90deg, #6c63ff, #a78bfa)',
                                                borderRadius: '9999px'
                                            }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '12px', marginTop: '4px', color: '#9ca3af' }}>200 üzerinden</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Reservation form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                padding: '20px',
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a'
                            }}
                        >
                            <h3 style={{ fontWeight: 700, fontSize: '1.125rem' }}>Rezervasyon Yap</h3>

                            {/* Selected table indicator */}
                            <div style={{
                                padding: '12px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                background: selectedTable ? 'rgba(108,99,255,0.1)' : '#111118',
                                border: `1px solid ${selectedTable ? 'rgba(108,99,255,0.3)' : '#2a2a3a'}`
                            }}>
                                {selectedTable ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c4b5fd' }}>
                                        <CheckCircle size={16} />
                                        {selectedTable.label}
                                    </div>
                                ) : (
                                    <span style={{ color: '#9ca3af' }}>← Kat planından masa seç</span>
                                )}
                            </div>

                            {/* Date */}
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#9ca3af' }}>
                                    <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                    Tarih
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        outline: 'none',
                                        fontSize: '14px',
                                        background: '#111118',
                                        border: '1px solid #2a2a3a',
                                        color: '#fff',
                                        colorScheme: 'dark'
                                    }}
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#9ca3af' }}>
                                    <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                    Saat
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                    {['18:00', '19:00', '20:00', '20:30', '21:00', '21:30'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedTime(t)}
                                            style={{
                                                padding: '8px',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                background: selectedTime === t ? 'rgba(108,99,255,0.2)' : '#111118',
                                                border: selectedTime === t ? '1px solid rgba(108,99,255,0.5)' : '1px solid #2a2a3a',
                                                color: selectedTime === t ? '#a78bfa' : '#9ca3af',
                                            }}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Party size */}
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#9ca3af' }}>
                                    <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                    Kişi Sayısı
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <button
                                        onClick={() => setPartySize(p => Math.max(1, p - 1))}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            cursor: 'pointer',
                                            background: '#111118',
                                            border: '1px solid #2a2a3a',
                                            color: '#fff'
                                        }}
                                    >
                                        −
                                    </button>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', width: '32px', textAlign: 'center' }}>{partySize}</span>
                                    <button
                                        onClick={() => setPartySize(p => Math.min(selectedTable?.capacity || 8, p + 1))}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            cursor: 'pointer',
                                            background: '#111118',
                                            border: '1px solid #2a2a3a',
                                            color: '#fff'
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Reserve button */}
                            <button
                                onClick={handleReserve}
                                disabled={!selectedTable || !selectedDate || !selectedTime}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    color: '#fff',
                                    fontSize: '16px',
                                    cursor: selectedTable && selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                                    opacity: selectedTable && selectedDate && selectedTime ? 1 : 0.4,
                                    background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                                    boxShadow: selectedTable && selectedDate && selectedTime ? '0 0 30px rgba(108,99,255,0.4)' : 'none',
                                    border: 'none',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                {selectedTable && selectedDate && selectedTime
                                    ? `${selectedTable.label.split(' - ')[0]} Rezerve Et →`
                                    : 'Masa ve Tarih Seç'}
                            </button>

                            <p style={{ fontSize: '12px', textAlign: 'center', color: '#9ca3af' }}>
                                Kaparo yok • SMS ile doğrulama • Ücretsiz iptal
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}
