'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, List, Map, Settings, Save, GripVertical, Plus, Trash2, X, Users, Type } from 'lucide-react'
import Link from 'next/link'
import { mockTables } from '@/lib/mock-data'
import { TableWithStatus } from '@/lib/types'

export default function FloorPlanEditor() {
    // Local state for tables (initializing from mock data)
    const [tables, setTables] = useState<TableWithStatus[]>(
        mockTables
            .filter(t => t.restaurant_id === '1')
            .map(t => ({ ...t, isOccupied: false }))
    )
    const [draggedId, setDraggedId] = useState<string | null>(null)
    const [selectedTable, setSelectedTable] = useState<TableWithStatus | null>(null)

    // Editing state
    const [editLabel, setEditLabel] = useState('')
    const [editCapacity, setEditCapacity] = useState(2)

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (!draggedId) return

        const rect = e.currentTarget.getBoundingClientRect()
        // Calculate percentage position relative to the container
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

        setTables(prev => prev.map(t =>
            t.id === draggedId ? { ...t, x_pos: x, y_pos: y } : t
        ))
        setDraggedId(null)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const openEditModal = (table: TableWithStatus) => {
        setSelectedTable(table)
        setEditLabel(table.label)
        setEditCapacity(table.capacity)
    }

    const saveTableChanges = () => {
        if (!selectedTable) return
        setTables(prev => prev.map(t =>
            t.id === selectedTable.id ? { ...t, label: editLabel, capacity: editCapacity } : t
        ))
        setSelectedTable(null)
    }

    const deleteTable = () => {
        if (!selectedTable) return
        if (confirm('Bu masayı silmek istediğinize emin misiniz?')) {
            setTables(prev => prev.filter(t => t.id !== selectedTable.id))
            setSelectedTable(null)
        }
    }

    const addNewTable = () => {
        const newTable: TableWithStatus = {
            id: `new-${Date.now()}`,
            restaurant_id: '1',
            label: `Masa ${tables.length + 1}`,
            capacity: 2,
            x_pos: 50,
            y_pos: 50,
            isOccupied: false,
            is_active: true,
            features: [],
            min_trust_score: 0
        }
        setTables(prev => [...prev, newTable])
    }

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f', color: '#f0f0f8', fontFamily: 'sans-serif', overflow: 'hidden' }}>
            {/* Sidebar with Inline Styles */}
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
                        { icon: Map, label: 'Kat Planı', href: '/admin/floor-plan', active: true },
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

            {/* Editor Area with Inline Styles */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{
                    padding: '16px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#111118',
                    borderBottom: '1px solid #2a2a3a'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Kat Planı Düzenle</h1>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Masaları sürükleyip bırakın, düzenlemek için tıklayın.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={addNewTable}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '12px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Plus size={16} />
                            Masa Ekle
                        </button>
                        <button style={{
                            padding: '10px 16px',
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
                            Kaydet
                        </button>
                    </div>
                </div>

                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0a0f',
                    backgroundImage: 'radial-gradient(#2a2a3a 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    padding: '32px',
                    overflow: 'hidden'
                }}>
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '1000px',
                            aspectRatio: '100/65',
                            borderRadius: '16px',
                            background: '#16161f',
                            border: '1px solid #2a2a3a',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            overflow: 'hidden'
                        }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {/* Grid lines inside container for precision feel */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                            pointerEvents: 'none'
                        }} />

                        {tables.map(table => (
                            <motion.div
                                key={table.id}
                                layoutId={table.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e as any, table.id)}
                                onClick={() => openEditModal(table)}
                                style={{
                                    position: 'absolute',
                                    left: `${table.x_pos}%`,
                                    top: `${table.y_pos}%`,
                                    width: table.capacity <= 2 ? '8%' : table.capacity <= 4 ? '10%' : '13%',
                                    height: table.capacity <= 2 ? '12%' : table.capacity <= 4 ? '15%' : '20%',
                                    transform: 'translate(-50%, -50%)',
                                    background: selectedTable?.id === table.id ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.05)',
                                    border: selectedTable?.id === table.id ? '1px solid #6c63ff' : '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'move',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    zIndex: selectedTable?.id === table.id ? 10 : 1
                                }}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            >
                                <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '2px' }}>{table.label}</div>
                                <GripVertical size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '4px',
                                    right: '4px',
                                    fontSize: '9px',
                                    fontWeight: 'bold',
                                    color: 'rgba(255,255,255,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1px'
                                }}>
                                    {table.capacity} <Users size={8} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Edit Modal / Panel */}
            <AnimatePresence>
                {selectedTable && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 50,
                        backdropFilter: 'blur(4px)'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                width: '360px',
                                padding: '24px',
                                background: '#16161f',
                                border: '1px solid #2a2a3a',
                                borderRadius: '24px',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Masa Düzenle</h3>
                                <button onClick={() => setSelectedTable(null)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>
                                        <Type size={14} style={{ display: 'inline', marginRight: '6px' }} />
                                        Masa Adı
                                    </label>
                                    <input
                                        type="text"
                                        value={editLabel}
                                        onChange={(e) => setEditLabel(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: '#111118',
                                            border: '1px solid #2a2a3a',
                                            color: '#fff',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>
                                        <Users size={14} style={{ display: 'inline', marginRight: '6px' }} />
                                        Kişi Kapasitesi
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <button
                                            onClick={() => setEditCapacity(c => Math.max(1, c - 1))}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: '#2a2a3a',
                                                border: 'none',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                fontSize: '18px'
                                            }}
                                        >−</button>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{editCapacity}</span>
                                        <button
                                            onClick={() => setEditCapacity(c => c + 1)}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: '#2a2a3a',
                                                border: 'none',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                fontSize: '18px'
                                            }}
                                        >+</button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <button
                                        onClick={deleteTable}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: 'rgba(239,68,68,0.1)',
                                            color: '#ef4444',
                                            border: '1px solid rgba(239,68,68,0.2)',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <Trash2 size={16} />
                                        Sil
                                    </button>
                                    <button
                                        onClick={saveTableChanges}
                                        style={{
                                            flex: 2,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: '#6c63ff',
                                            color: '#fff',
                                            border: 'none',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
