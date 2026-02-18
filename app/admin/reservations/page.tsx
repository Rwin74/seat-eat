'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, List, Map, Settings, Search, Filter, ChevronDown, MoreHorizontal, Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { mockReservations } from '@/lib/mock-data'
import { getTrustScoreTier, formatDate } from '@/lib/utils'

export default function AdminReservationsPage() {
    const [filter, setFilter] = useState('all')

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

                <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: false },
                        { icon: List, label: 'Rezervasyonlar', href: '/admin/reservations', active: true },
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

                <div style={{ padding: '16px', borderTop: '1px solid #2a2a3a' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af', textDecoration: 'none' }}>
                        ← Siteye Dön
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
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
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Rezervasyonlar</h1>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Tüm rezervasyonları yönet</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            padding: '8px 16px',
                            borderRadius: '12px',
                            background: '#16161f',
                            border: '1px solid #2a2a3a',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Filter size={16} />
                            Filtrele
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <div style={{ padding: '32px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
                    {/* Search */}
                    <div style={{ marginBottom: '24px', position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="İsim, telefon veya rezervasyon no ile ara..."
                            style={{
                                width: '100%',
                                padding: '16px 16px 16px 48px',
                                borderRadius: '16px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a',
                                color: '#fff',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Table */}
                    <div style={{
                        background: '#16161f',
                        borderRadius: '24px',
                        border: '1px solid #2a2a3a',
                        overflow: 'hidden'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#111118', borderBottom: '1px solid #2a2a3a' }}>
                                <tr>
                                    <th style={{ padding: '20px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Müşteri</th>
                                    <th style={{ padding: '20px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Tarih & Saat</th>
                                    <th style={{ padding: '20px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Masa</th>
                                    <th style={{ padding: '20px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Kişi</th>
                                    <th style={{ padding: '20px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Durum</th>
                                    <th style={{ padding: '20px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockReservations.map((res, i) => {
                                    const sc = statusConfig[res.status as keyof typeof statusConfig]
                                    return (
                                        <tr key={res.id} style={{ borderBottom: '1px solid #2a2a3a', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ fontWeight: 600, color: '#fff' }}>Ahmet Yılmaz</div>
                                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>+90 555 123 45 67</div>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#fff' }}>
                                                    <Calendar size={14} style={{ color: '#9ca3af' }} />
                                                    {formatDate(res.reservation_date)}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', marginTop: '4px', color: '#9ca3af' }}>
                                                    <Clock size={14} />
                                                    {res.reservation_time}
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ fontWeight: 500, color: '#fff' }}>{res.tables?.label}</div>
                                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{res.restaurants?.name}</div>
                                            </td>
                                            <td style={{ padding: '20px', color: '#9ca3af' }}>
                                                {res.party_size} kişi
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <span style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '9999px',
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    background: sc.bg,
                                                    color: sc.color,
                                                    border: `1px solid ${sc.color}33`,
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {sc.label}
                                                </span>
                                            </td>
                                            <td style={{ padding: '20px', textAlign: 'right' }}>
                                                <button style={{ padding: '8px', cursor: 'pointer', background: 'transparent', border: 'none', color: '#9ca3af' }}>
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
