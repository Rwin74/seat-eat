'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, TrendingUp, Award, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { mockReservations } from '@/lib/mock-data'
import { getTrustScoreTier, formatDate } from '@/lib/utils'

const USER = {
    name: 'Ahmet Yılmaz',
    phone: '+90 555 123 45 67',
    trust_score: 100,
    joined: '2026-01-15',
}

export default function ProfilePage() {
    const tier = getTrustScoreTier(USER.trust_score)
    const scorePercent = Math.min(100, (USER.trust_score / 200) * 100)

    const statusColors: Record<string, string> = {
        confirmed: '#6c63ff',
        arrived: '#22c55e',
        no_show: '#ef4444',
        cancelled: '#6b7280',
    }

    const statusLabels: Record<string, string> = {
        confirmed: 'Onaylandı',
        arrived: 'Geldi ✅',
        no_show: 'Gelmedi ❌',
        cancelled: 'İptal',
    }

    return (
        <main style={{ minHeight: '100vh', paddingTop: '80px', background: '#0a0a0f', color: '#f0f0f8', fontFamily: 'sans-serif' }}>
            <Navbar />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px'
                }}>

                    {/* Left: Profile Side */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Avatar + info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '24px',
                                borderRadius: '16px',
                                textAlign: 'center',
                                background: '#16161f',
                                border: '1px solid #2a2a3a'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                margin: '0 auto 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '32px',
                                fontWeight: 900,
                                background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                                color: 'white'
                            }}>
                                {USER.name.charAt(0)}
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{USER.name}</h2>
                            <p style={{ fontSize: '14px', marginTop: '4px', color: '#9ca3af' }}>{USER.phone}</p>
                            <div style={{
                                marginTop: '12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                borderRadius: '9999px',
                                fontSize: '14px',
                                fontWeight: 500,
                                background: 'rgba(108,99,255,0.15)',
                                border: '1px solid rgba(108,99,255,0.3)',
                                color: '#a78bfa'
                            }}>
                                {tier.emoji} {tier.label}
                            </div>
                        </motion.div>

                        {/* Trust Score */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                padding: '20px',
                                borderRadius: '16px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <Award size={18} color="#a78bfa" />
                                <h3 style={{ fontWeight: 700 }}>Güven Puanı</h3>
                            </div>

                            <div style={{
                                fontSize: '3rem',
                                fontWeight: 900,
                                marginBottom: '12px',
                                background: 'linear-gradient(to right, #6c63ff, #a78bfa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>{USER.trust_score}</div>

                            {/* Score bar */}
                            <div style={{ height: '12px', borderRadius: '9999px', marginBottom: '8px', background: '#2a2a3a', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scorePercent}%` }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                                    style={{
                                        height: '100%',
                                        borderRadius: '9999px',
                                        background: 'linear-gradient(90deg, #6c63ff, #a78bfa)'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af' }}>
                                <span>0</span>
                                <span>200</span>
                            </div>

                            {/* Tier progress */}
                            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { label: 'Yeni Üye', min: 0, max: 70, emoji: '🌱' },
                                    { label: 'Güvenilir', min: 70, max: 150, emoji: '✅' },
                                    { label: 'VIP', min: 150, max: 200, emoji: '👑' },
                                ].map(t => (
                                    <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                                        <span>{t.emoji}</span>
                                        <span style={{ color: USER.trust_score >= t.min ? '#fff' : '#9ca3af' }}>
                                            {t.label}
                                        </span>
                                        <span style={{ marginLeft: 'auto', color: '#9ca3af' }}>{t.min}+</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                padding: '20px',
                                borderRadius: '16px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <TrendingUp size={18} color="#34d399" />
                                <h3 style={{ fontWeight: 700 }}>İstatistikler</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    { label: 'Toplam Rezervasyon', value: '1' },
                                    { label: 'Gidilen', value: '0' },
                                    { label: 'Gidilmeyen', value: '0' },
                                    { label: 'İptal', value: '0' },
                                ].map(s => (
                                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: '#9ca3af' }}>{s.label}</span>
                                        <span style={{ fontWeight: 700 }}>{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Reservations */}
                    <div style={{ flex: 1 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Rezervasyonlarım</h2>

                            {mockReservations.length === 0 ? (
                                <div style={{
                                    padding: '48px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    background: '#16161f',
                                    border: '1px solid #2a2a3a'
                                }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🍽️</div>
                                    <p style={{ color: '#9ca3af' }}>Henüz rezervasyonun yok.</p>
                                    <Link href="/restaurants" style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        marginTop: '16px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#a78bfa',
                                        textDecoration: 'none'
                                    }}>
                                        Restoran keşfet <ChevronRight size={14} />
                                    </Link>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {mockReservations.map((res, i) => (
                                        <motion.div
                                            key={res.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            style={{
                                                padding: '20px',
                                                borderRadius: '16px',
                                                background: '#16161f',
                                                border: '1px solid #2a2a3a'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                <div>
                                                    <h3 style={{ fontWeight: 700 }}>{res.tables?.label || 'Masa'}</h3>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', marginTop: '2px', color: '#9ca3af' }}>
                                                        <MapPin size={12} />
                                                        {res.restaurants?.name}
                                                    </div>
                                                </div>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '9999px',
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    background: `${statusColors[res.status]}22`,
                                                    border: `1px solid ${statusColors[res.status]}44`,
                                                    color: statusColors[res.status],
                                                }}>
                                                    {statusLabels[res.status]}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#9ca3af' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Calendar size={13} />
                                                    {formatDate(res.reservation_date)}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Clock size={13} />
                                                    {res.reservation_time}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}
