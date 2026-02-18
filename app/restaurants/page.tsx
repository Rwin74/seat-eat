'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { mockRestaurants, mockTables, mockOccupiedTableIds } from '@/lib/mock-data'

const districts = ['Tümü', 'Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu', 'Üsküdar']

export default function RestaurantsPage() {
    const [selectedDistrict, setSelectedDistrict] = useState('Tümü')
    const [search, setSearch] = useState('')

    const filtered = mockRestaurants.filter(r => {
        const matchDistrict = selectedDistrict === 'Tümü' || r.district === selectedDistrict
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.district.toLowerCase().includes(search.toLowerCase())
        return matchDistrict && matchSearch
    })

    return (
        <main style={{ minHeight: '100vh', paddingTop: '80px', background: '#0a0a0f', color: '#f0f0f8', fontFamily: 'sans-serif' }}>
            <Navbar />

            {/* Header */}
            <div style={{ padding: '60px 24px', background: '#111118', borderBottom: '1px solid #2a2a3a' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}
                    >
                        Restoranları <span style={{
                            background: 'linear-gradient(to right, #6c63ff, #a78bfa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Keşfet</span>
                    </motion.h1>
                    <p style={{ marginBottom: '32px', color: '#9ca3af', fontSize: '1.1rem' }}>
                        İstanbul&apos;un en iyi mekanlarında masanı görsel olarak seç.
                    </p>

                    {/* Search */}
                    <div style={{ position: 'relative', maxWidth: '500px', marginBottom: '32px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Restoran veya semt ara..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                paddingLeft: '48px',
                                paddingRight: '16px',
                                paddingTop: '16px',
                                paddingBottom: '16px',
                                borderRadius: '16px',
                                outline: 'none',
                                fontSize: '16px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a',
                                color: '#fff'
                            }}
                        />
                    </div>

                    {/* District filters */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {districts.map(d => (
                            <button
                                key={d}
                                onClick={() => setSelectedDistrict(d)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: selectedDistrict === d ? 'rgba(108,99,255,0.2)' : '#16161f',
                                    border: selectedDistrict === d ? '1px solid rgba(108,99,255,0.5)' : '1px solid #2a2a3a',
                                    color: selectedDistrict === d ? '#a78bfa' : '#9ca3af',
                                }}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Restaurant Grid */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '32px'
                }}>
                    {filtered.map((restaurant, i) => {
                        const tables = mockTables.filter(t => t.restaurant_id === restaurant.id)
                        const availableCount = tables.filter(t => !mockOccupiedTableIds.includes(t.id)).length
                        const totalCount = tables.length

                        return (
                            <motion.div
                                key={restaurant.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    background: '#16161f',
                                    border: '1px solid #2a2a3a',
                                    transition: 'transform 0.3s'
                                }}
                            >
                                {/* Image */}
                                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                                    <img
                                        src={restaurant.cover_image}
                                        alt={restaurant.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.8), transparent)' }} />

                                    {/* Availability badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 16px',
                                        borderRadius: '9999px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        background: 'rgba(10,10,15,0.85)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <span style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: availableCount > 0 ? '#4ade80' : '#f87171',
                                            display: 'block'
                                        }} />
                                        <span style={{ color: availableCount > 0 ? '#4ade80' : '#f87171' }}>
                                            {availableCount > 0 ? `${availableCount} masa müsait` : 'Dolu'}
                                        </span>
                                    </div>

                                    {/* District */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '16px',
                                        left: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        fontSize: '14px',
                                        color: 'rgba(255,255,255,0.9)',
                                        fontWeight: 500
                                    }}>
                                        <MapPin size={16} />
                                        {restaurant.district}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{restaurant.name}</h3>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '24px', color: '#9ca3af', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {restaurant.description}
                                    </p>

                                    {/* Table count visual */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                        <Users size={16} style={{ color: '#9ca3af' }} />
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {tables.slice(0, 9).map(t => (
                                                <div
                                                    key={t.id}
                                                    style={{
                                                        width: '12px',
                                                        height: '12px',
                                                        borderRadius: '3px',
                                                        background: mockOccupiedTableIds.includes(t.id)
                                                            ? 'rgba(239,68,68,0.6)'
                                                            : 'rgba(34,197,94,0.6)',
                                                    }}
                                                    title={t.label}
                                                />
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: 'auto' }}>
                                            {availableCount}/{totalCount} müsait
                                        </span>
                                    </div>

                                    <Link
                                        href={`/restaurants/${restaurant.slug}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            padding: '16px',
                                            borderRadius: '16px',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            background: 'rgba(108,99,255,0.15)',
                                            border: '1px solid rgba(108,99,255,0.3)',
                                            color: '#a78bfa',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Kat Planını Gör
                                        <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                        <p style={{ fontSize: '1.25rem' }}>Arama kriterlerine uygun restoran bulunamadı.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
