'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Star, Lock, X, CheckCircle } from 'lucide-react'
import { Table, TableWithStatus } from '@/lib/types'
import { mockOccupiedTableIds } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface FloorPlanProps {
    tables: Table[]
    userTrustScore?: number
    onTableSelect: (table: TableWithStatus | null) => void
    selectedTableId?: string | null
}

export default function FloorPlan({
    tables,
    userTrustScore = 100,
    onTableSelect,
    selectedTableId,
}: FloorPlanProps) {
    const [occupiedIds, setOccupiedIds] = useState<string[]>(mockOccupiedTableIds)

    // Simulate real-time: randomly toggle a table every 8 seconds (demo)
    useEffect(() => {
        const interval = setInterval(() => {
            const randomTable = tables[Math.floor(Math.random() * tables.length)]
            if (!randomTable) return
            setOccupiedIds(prev =>
                prev.includes(randomTable.id)
                    ? prev.filter(id => id !== randomTable.id)
                    : [...prev, randomTable.id]
            )
        }, 8000)
        return () => clearInterval(interval)
    }, [tables])

    const tablesWithStatus: TableWithStatus[] = tables.map(t => ({
        ...t,
        isOccupied: occupiedIds.includes(t.id),
    }))

    const getTableStyle = (table: TableWithStatus) => {
        const isSelected = selectedTableId === table.id
        const isLocked = table.min_trust_score > userTrustScore
        if (isLocked) return 'table-locked cursor-not-allowed'
        if (isSelected) return 'table-selected cursor-pointer'
        if (table.isOccupied) return 'table-occupied cursor-not-allowed'
        return 'table-available cursor-pointer hover:scale-110'
    }

    const getTableIcon = (table: TableWithStatus) => {
        const isLocked = table.min_trust_score > userTrustScore
        if (isLocked) return <Lock size={12} className="text-white/40" />
        if (table.isOccupied) return <X size={12} className="text-red-300" />
        if (selectedTableId === table.id) return <CheckCircle size={12} className="text-violet-300" />
        return <span className="text-xs font-bold text-emerald-300">{table.capacity}</span>
    }

    const handleTableClick = (table: TableWithStatus) => {
        const isLocked = table.min_trust_score > userTrustScore
        if (isLocked || table.isOccupied) return
        if (selectedTableId === table.id) {
            onTableSelect(null)
        } else {
            onTableSelect(table)
        }
    }

    return (
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: '65%', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            {/* Floor plan background */}
            <div className="absolute inset-0">
                {/* Restaurant layout lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 65" preserveAspectRatio="none">
                    {/* Walls */}
                    <rect x="2" y="2" width="96" height="61" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" rx="1" />
                    {/* Window area */}
                    <rect x="2" y="2" width="96" height="18" fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3" />
                    {/* Window label */}
                    <text x="50" y="8" textAnchor="middle" fill="rgba(147,197,253,0.4)" fontSize="2.5" fontFamily="Inter, sans-serif">🌊 Deniz Manzarası</text>
                    {/* Divider */}
                    <line x1="2" y1="38" x2="98" y2="38" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" strokeDasharray="2,2" />
                    {/* VIP area */}
                    <rect x="2" y="60" width="96" height="3" fill="rgba(167,139,250,0.05)" />
                    <text x="50" y="62.5" textAnchor="middle" fill="rgba(167,139,250,0.3)" fontSize="2" fontFamily="Inter, sans-serif">VIP & Teras Bölgesi</text>
                    {/* Entry */}
                    <rect x="44" y="60" width="12" height="3" fill="rgba(255,255,255,0.05)" />
                    <text x="50" y="67" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="2" fontFamily="Inter, sans-serif">Giriş</text>
                </svg>

                {/* Tables */}
                {tablesWithStatus.map(table => (
                    <motion.button
                        key={table.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={() => handleTableClick(table)}
                        className={cn(
                            'absolute flex items-center justify-center rounded-xl transition-all duration-300',
                            getTableStyle(table)
                        )}
                        style={{
                            left: `${table.x_pos}%`,
                            top: `${table.y_pos}%`,
                            width: table.capacity <= 2 ? '8%' : table.capacity <= 4 ? '10%' : '13%',
                            height: table.capacity <= 2 ? '10%' : table.capacity <= 4 ? '12%' : '16%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        title={table.label}
                    >
                        <div className="flex flex-col items-center gap-0.5">
                            {getTableIcon(table)}
                            <span className="text-[8px] font-medium text-white/50 leading-none hidden sm:block">
                                {table.label.split(' - ')[0].replace('Masa ', 'M')}
                            </span>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex gap-3">
                {[
                    { color: '#22c55e', label: 'Müsait', shadow: 'rgba(34,197,94,0.4)' },
                    { color: '#ef4444', label: 'Dolu', shadow: 'rgba(239,68,68,0.3)' },
                    { color: '#6c63ff', label: 'Seçili', shadow: 'rgba(108,99,255,0.5)' },
                    { color: '#444455', label: 'Kilitli', shadow: 'none' },
                ].map(item => (
                    <div key={item.label} className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm" style={{ background: item.color, boxShadow: `0 0 6px ${item.shadow}` }} />
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Real-time indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
                style={{ background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span style={{ color: '#4ade80' }}>Canlı</span>
            </div>
        </div>
    )
}
