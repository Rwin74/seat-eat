// Database types matching Supabase schema

export interface User {
    id: string
    phone: string
    name: string
    trust_score: number
    is_banned: boolean
    created_at: string
}

export interface Restaurant {
    id: string
    name: string
    slug: string
    description: string
    address: string
    district: string
    cover_image: string
    floor_plan_bg: string
    created_at: string
}

export interface Table {
    id: string
    restaurant_id: string
    label: string
    capacity: number
    x_pos: number
    y_pos: number
    features: string[]
    min_trust_score: number
    is_active: boolean
}

export interface Reservation {
    id: string
    user_id: string
    table_id: string
    restaurant_id: string
    reservation_date: string
    reservation_time: string
    party_size: number
    status: 'confirmed' | 'arrived' | 'no_show' | 'cancelled'
    created_at: string
    // Joined fields
    tables?: Table
    restaurants?: Restaurant
    users?: User
}

export interface TableWithStatus extends Table {
    isOccupied: boolean
    reservation?: Reservation
}
