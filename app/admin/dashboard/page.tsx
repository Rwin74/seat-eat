'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users, Clock, CheckCircle, XCircle, Bell,
    TrendingUp, Calendar, ChevronRight, LayoutDashboard,
    Map, List, Settings
} from 'lucide-react'
import Link from 'next/link'
import { mockReservations, mockRestaurants } from '@/lib/mock-data'
import { Reservation } from '@/lib/types'
import { getTrustScoreTier } from '@/lib/utils'

// Simulated admin reservations for today
const todayReservations: (Reservation & { userName: string; userTrustScore: number })[] = [
    {
        id: 'r1',
        user_id: 'u1',
        table_id: 't4',
        restaurant_id: '1',
        reservation_date: '2026-02-19',
        reservation_time: '18:00',
        party_size: 2,
        status: 'arrived',
        created_at: '2026-02-18T17:00:00Z',
        userName: 'Mehmet Kaya',
        userTrustScore: 160,
        tables: { id: 't4', restaurant_id: '1', label: 'Deniz Manzarası - Masa 4', capacity: 4, x_pos: 70, y_pos: 20, features: ['Deniz Manzarası'], min_trust_score: 0, is_active: true },
    },
    {
        id: 'r2',
        user_id: 'u2',
        table_id: 't3',
        restaurant_id: '1',
        reservation_date: '2026-02-19',
        reservation_time: '19:00',
        party_size: 4,
        status: 'confirmed',
        created_at: '2026-02-18T18:00:00Z',
        userName: 'Ayşe Demir',
        userTrustScore: 85,
        tables: { id: 't3', restaurant_id: '1', label: 'Deniz Manzarası - Masa 3', capacity: 2, x_pos: 50, y_pos: 20, features: ['Sessiz Alan'], min_trust_score: 0, is_active: true },
    },
    {
        id: 'r3',
        user_id: 'u3',
        table_id: 't7',
        restaurant_id: '1',
        reservation_date: '2026-02-19',
        reservation_time: '20:00',
        party_size: 2,
        status: 'confirmed',
        created_at: '2026-02-18T19:00:00Z',
        userName: 'Ahmet Yılmaz',
        userTrustScore: 100,
        tables: { id: 't7', restaurant_id: '1', label: 'İç Mekan - Masa 7', capacity: 2, x_pos: 65, y_pos: 50, features: ['Sessiz Köşe'], min_trust_score: 0, is_active: true },
    },
    {
        id: 'r4',
        user_id: 'u4',
        table_id: 't1',
        restaurant_id: '1',
        reservation_date: '2026-02-19',
        reservation_time: '20:30',
        party_size: 2,
        status: 'no_show',
        created_at: '2026-02-18T20:00:00Z',
        userName: 'Can Öztürk',
        userTrustScore: 40,
        tables: { id: 't1', restaurant_id: '1', label: 'Deniz Manzarası - Masa 1', capacity: 2, x_pos: 15, y_pos: 20, features: ['Romantik'], min_trust_score: 0, is_active: true },
    },
    {
        id: 'r5',
        user_id: 'u5',
        table_id: 't9',
        restaurant_id: '1',
        reservation_date: '2026-02-19',
        reservation_time: '21:00',
        party_size: 3,
        status: 'confirmed',
        created_at: '2026-02-18T21:00:00Z',
        userName: 'Fatma Şahin',
        userTrustScore: 120,
        tables: { id: 't9', restaurant_id: '1', label: 'Teras - Masa 9', capacity: 4, x_pos: 80, y_pos: 75, features: ['Teras', 'Açık Hava'], min_trust_score: 0, is_active: true },
    },
]

export default function AdminDashboard() {
    const [reservations, setReservations] = useState(todayReservations)
    const [notification, setNotification] = useState<string | null>(null)

    const arrived = reservations.filter(r => r.status === 'arrived').length
    const confirmed = reservations.filter(r => r.status === 'confirmed').length
    const noShow = reservations.filter(r => r.status === 'no_show').length

    const handleStatus = (id: string, newStatus: 'arrived' | 'no_show') => {
        setReservations(prev =>
            prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
        )
        const res = reservations.find(r => r.id === id)
        if (newStatus === 'arrived') {
            setNotification(`✅ ${res?.userName} geldi! +10 güven puanı eklendi.`)
        } else {
            setNotification(`❌ ${res?.userName} gelmedi. -30 güven puanı düşüldü.`)
        }
        setTimeout(() => setNotification(null), 4000)
    }

    const statusConfig = {
        confirmed: { label: 'Bekliyor', color: '#6c63ff', bg: 'rgba(108,99,255,0.15)' },
        arrived: { label: 'Geldi ✅', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
        no_show: { label: 'Gelmedi ❌', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
        cancelled: { label: 'İptal', color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f', color: '#f0f0f8', fontFamily: 'sans-serif' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                flexShrink: 0,
                borderRight: '1px solid #2a2a3a',
                display: 'flex',
                flexDirection: 'column',
                background: '#111118'
            }}>
                {/* Logo */}
                <div style={{ padding: '24px', borderBottom: '1px solid #2a2a3a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #6c63ff, #a78bfa)'
                        }}>
                            <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>S</span>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Seat & Eat</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Admin Paneli</div>
                        </div>
                    </div>
                </div>

                {/* Restaurant selector */}
                <div style={{ padding: '16px', borderBottom: '1px solid #2a2a3a' }}>
                    <div style={{ padding: '12px', borderRadius: '12px', background: '#16161f', border: '1px solid #2a2a3a' }}>
                        <div style={{ fontSize: '12px', marginBottom: '4px', color: '#9ca3af' }}>Aktif Restoran</div>
                        <div style={{ fontWeight: 600, fontSize: '14px' }}>Deniz Kızı</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Kadıköy</div>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
                        { icon: List, label: 'Rezervasyonlar', href: '/admin/reservations', active: false },
                        { icon: Map, label: 'Kat Planı', href: '/admin/floor-plan', active: false },
                        { icon: Settings, label: 'Ayarlar', href: '/admin/settings', active: false },
                    ].map(item => (
                        <Link
                            key={item.label}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 12px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: 500,
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                                background: item.active ? 'rgba(108,99,255,0.15)' : 'transparent',
                                border: item.active ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent',
                                color: item.active ? '#a78bfa' : '#9ca3af',
                            }}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Back to site */}
                <div style={{ padding: '16px', borderTop: '1px solid #2a2a3a' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af', textDecoration: 'none' }}>
                        ← Siteye Dön
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                {/* Top bar */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    padding: '16px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#111118',
                    borderBottom: '1px solid #2a2a3a'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Dashboard</h1>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={12} />
                            19 Şubat 2026, Perşembe
                        </p>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        color: '#4ade80'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'block' }} />
                        Canlı
                    </div>
                </div>

                <div style={{ padding: '32px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
                    {/* Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '32px'
                    }}>
                        {[
                            { label: 'Toplam', value: reservations.length, icon: Users, color: '#6c63ff' },
                            { label: 'Bekliyor', value: confirmed, icon: Clock, color: '#6c63ff' },
                            { label: 'Geldi', value: arrived, icon: CheckCircle, color: '#22c55e' },
                            { label: 'Gelmedi', value: noShow, icon: XCircle, color: '#ef4444' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    background: '#16161f',
                                    border: '1px solid #2a2a3a'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>{stat.label}</span>
                                    <stat.icon size={18} style={{ color: stat.color }} />
                                </div>
                                <div style={{ fontSize: '1.875rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Reservations list */}
                    <div>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>Bugünkü Rezervasyonlar</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {reservations
                                .sort((a, b) => a.reservation_time.localeCompare(b.reservation_time))
                                .map((res, i) => {
                                    const tier = getTrustScoreTier(res.userTrustScore)
                                    const sc = statusConfig[res.status as keyof typeof statusConfig]
                                    return (
                                        <motion.div
                                            key={res.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            style={{
                                                padding: '20px',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                background: '#16161f',
                                                border: '1px solid #2a2a3a'
                                            }}
                                        >
                                            {/* Time */}
                                            <div style={{ textAlign: 'center', flexShrink: 0, width: '56px' }}>
                                                <div style={{ fontSize: '1.125rem', fontWeight: 900 }}>{res.reservation_time}</div>
                                            </div>

                                            {/* Divider */}
                                            <div style={{ width: '1px', height: '40px', background: '#2a2a3a', flexShrink: 0 }} />

                                            {/* Guest info */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                                    <span style={{ fontWeight: 700 }}>{res.userName}</span>
                                                    <span style={{ fontSize: '12px', fontWeight: 500, color: tier.color === '#a78bfa' ? '#a78bfa' : tier.color === '#22c55e' ? '#22c55e' : '#f59e0b' }}>
                                                        {tier.emoji} {tier.label}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                                                    {res.tables?.label} • {res.party_size} kişi
                                                </div>
                                                <div style={{ fontSize: '12px', marginTop: '2px', color: '#9ca3af' }}>
                                                    Güven: {res.userTrustScore} puan
                                                </div>
                                            </div>

                                            {/* Status badge */}
                                            <span style={{
                                                padding: '6px 12px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                flexShrink: 0,
                                                background: sc.bg,
                                                color: sc.color,
                                                border: `1px solid ${sc.color}33`
                                            }}>
                                                {sc.label}
                                            </span>

                                            {/* Action buttons */}
                                            {res.status === 'confirmed' && (
                                                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                                    <button
                                                        onClick={() => handleStatus(res.id, 'arrived')}
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '12px',
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            cursor: 'pointer',
                                                            background: 'rgba(34,197,94,0.15)',
                                                            border: '1px solid rgba(34,197,94,0.4)',
                                                            color: '#4ade80',
                                                            transition: 'transform 0.2s'
                                                        }}
                                                    >
                                                        GELDİ ✓
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatus(res.id, 'no_show')}
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '12px',
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            cursor: 'pointer',
                                                            background: 'rgba(239,68,68,0.15)',
                                                            border: '1px solid rgba(239,68,68,0.4)',
                                                            color: '#f87171',
                                                            transition: 'transform 0.2s'
                                                        }}
                                                    >
                                                        GELMEDİ ✗
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </main>

            {/* Notification toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 80, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 80, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            bottom: '32px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '16px 24px',
                            borderRadius: '16px',
                            fontWeight: 500,
                            fontSize: '14px',
                            zIndex: 50,
                            background: '#16161f',
                            border: '1px solid #2a2a3a',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#fff'
                        }}
                    >
                        <Bell size={16} color="#a78bfa" />
                        {notification}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
