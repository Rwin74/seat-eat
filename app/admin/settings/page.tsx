'use client'

import { useState } from 'react'
import { LayoutDashboard, List, Map, Settings, Save, Bell, Lock, User, Store } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettingsPage() {
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
                        { icon: List, label: 'Rezervasyonlar', href: '/admin/reservations', active: false },
                        { icon: Map, label: 'Kat Planı', href: '/admin/floor-plan', active: false },
                        { icon: Settings, label: 'Ayarlar', href: '/admin/settings', active: true },
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
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Ayarlar</h1>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Restoran ve hesap ayarları</p>
                    </div>
                    <button style={{
                        padding: '8px 16px',
                        borderRadius: '12px',
                        background: '#6c63ff',
                        color: 'white',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}>
                        <Save size={16} />
                        Değişiklikleri Kaydet
                    </button>
                </div>

                <div style={{ padding: '32px', maxWidth: '800px', width: '100%', margin: '0 0' }}>

                    {/* General Settings */}
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Store size={18} color="#a78bfa" />
                            Restoran Bilgileri
                        </h2>
                        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a3a', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#9ca3af' }}>Restoran Adı</label>
                                <input type="text" defaultValue="Deniz Kızı" style={{ width: '100%', padding: '12px', background: '#111118', border: '1px solid #2a2a3a', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#9ca3af' }}>Açıklama</label>
                                <textarea defaultValue="Kadıköy rıhtımında, deniz manzaralı balık restoranı." rows={3} style={{ width: '100%', padding: '12px', background: '#111118', border: '1px solid #2a2a3a', borderRadius: '12px', color: '#fff', outline: 'none', resize: 'none' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#9ca3af' }}>Telefon</label>
                                    <input type="text" defaultValue="+90 216 333 44 55" style={{ width: '100%', padding: '12px', background: '#111118', border: '1px solid #2a2a3a', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#9ca3af' }}>Semt</label>
                                    <input type="text" defaultValue="Kadıköy" style={{ width: '100%', padding: '12px', background: '#111118', border: '1px solid #2a2a3a', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Bell size={18} color="#a78bfa" />
                            Bildirim Ayarları
                        </h2>
                        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a3a', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                'Yeni rezervasyon geldiğinde SMS gönder',
                                'Rezervasyon iptallerinde e-posta gönder',
                                'Günlük özet raporu gönder'
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                                    <span style={{ fontSize: '14px', color: '#d1d5db' }}>{item}</span>
                                    <div style={{ width: '40px', height: '22px', background: i === 0 ? '#6c63ff' : '#2a2a3a', borderRadius: '9999px', position: 'relative', cursor: 'pointer' }}>
                                        <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: i === 0 ? '20px' : '2px', transition: 'left 0.2s' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Lock size={18} color="#a78bfa" />
                            Güvenlik
                        </h2>
                        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a3a', padding: '24px' }}>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.3)',
                                color: '#f87171',
                                fontWeight: 600,
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}>
                                Şifreyi Sıfırla
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}
