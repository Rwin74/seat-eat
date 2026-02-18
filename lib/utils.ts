import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getTrustScoreTier(score: number): {
    label: string
    color: string
    emoji: string
} {
    if (score >= 150) return { label: 'VIP', color: 'text-amber-400', emoji: '👑' }
    if (score >= 70) return { label: 'Güvenilir', color: 'text-emerald-400', emoji: '✅' }
    if (score >= 40) return { label: 'Orta', color: 'text-orange-400', emoji: '⚠️' }
    return { label: 'Riskli', color: 'text-red-400', emoji: '🚫' }
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
