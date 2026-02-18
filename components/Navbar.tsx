'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Utensils, User, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
    const pathname = usePathname()

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Utensils size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">
                        <span className="gradient-text">Seat</span>
                        <span className="text-white/80"> & </span>
                        <span className="gradient-text">Eat</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-1">
                    <NavLink href="/restaurants" active={pathname.startsWith('/restaurants')}>
                        Restoranlar
                    </NavLink>
                    <NavLink href="/profile" active={pathname === '/profile'}>
                        <User size={16} />
                        Profilim
                    </NavLink>
                    <NavLink href="/admin/dashboard" active={pathname.startsWith('/admin')}>
                        <LayoutDashboard size={16} />
                        Admin
                    </NavLink>
                </div>
            </div>
        </motion.nav>
    )
}

function NavLink({
    href,
    active,
    children,
}: {
    href: string
    active: boolean
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                active
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
            )}
        >
            {children}
        </Link>
    )
}
