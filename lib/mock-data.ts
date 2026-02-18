import { Restaurant, Table, Reservation } from './types'

export const mockRestaurants: Restaurant[] = [
    {
        id: '1',
        name: 'Deniz Kızı',
        slug: 'deniz-kizi',
        description: 'Boğaz manzaralı, taze deniz ürünleri restoranı. Her masadan İstanbul\'un eşsiz siluetini izleyebilirsiniz.',
        address: 'Moda Caddesi No:42, Kadıköy',
        district: 'Kadıköy',
        cover_image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        floor_plan_bg: '',
        created_at: '2024-01-01',
    },
    {
        id: '2',
        name: 'Çatı Katı',
        slug: 'cati-kati',
        description: 'Şehrin zirvesinde, panoramik İstanbul manzarası eşliğinde modern Türk mutfağı.',
        address: 'Bağdat Caddesi No:118, Kadıköy',
        district: 'Kadıköy',
        cover_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        floor_plan_bg: '',
        created_at: '2024-01-01',
    },
    {
        id: '3',
        name: 'Liman Lokantası',
        slug: 'liman-lokantasi',
        description: 'Tarihi limana bakan, geleneksel Türk mutfağının en otantik adresi.',
        address: 'Rıhtım Caddesi No:7, Beşiktaş',
        district: 'Beşiktaş',
        cover_image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        floor_plan_bg: '',
        created_at: '2024-01-01',
    },
    {
        id: '4',
        name: 'Bahçe Sofra',
        slug: 'bahce-sofra',
        description: 'Gizli bahçede, doğanın ortasında yemek deneyimi. Organik ve yerel malzemeler.',
        address: 'Nişantaşı Sokak No:3, Şişli',
        district: 'Şişli',
        cover_image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
        floor_plan_bg: '',
        created_at: '2024-01-01',
    },
]

export const mockTables: Table[] = [
    // Deniz Kızı tables
    { id: 't1', restaurant_id: '1', label: 'Deniz Manzarası - Masa 1', capacity: 2, x_pos: 15, y_pos: 20, features: ['Deniz Manzarası', 'Romantik'], min_trust_score: 0, is_active: true },
    { id: 't2', restaurant_id: '1', label: 'Deniz Manzarası - Masa 2', capacity: 4, x_pos: 30, y_pos: 20, features: ['Deniz Manzarası', 'Geniş'], min_trust_score: 0, is_active: true },
    { id: 't3', restaurant_id: '1', label: 'Deniz Manzarası - Masa 3', capacity: 2, x_pos: 50, y_pos: 20, features: ['Deniz Manzarası', 'Sessiz Alan'], min_trust_score: 0, is_active: true },
    { id: 't4', restaurant_id: '1', label: 'Deniz Manzarası - Masa 4', capacity: 4, x_pos: 70, y_pos: 20, features: ['Deniz Manzarası', 'Sessiz Alan'], min_trust_score: 0, is_active: true },
    { id: 't5', restaurant_id: '1', label: 'İç Mekan - Masa 5', capacity: 6, x_pos: 20, y_pos: 50, features: ['Geniş', 'Aile Dostu'], min_trust_score: 0, is_active: true },
    { id: 't6', restaurant_id: '1', label: 'İç Mekan - Masa 6', capacity: 4, x_pos: 45, y_pos: 50, features: ['Merkezi Konum'], min_trust_score: 0, is_active: true },
    { id: 't7', restaurant_id: '1', label: 'İç Mekan - Masa 7', capacity: 2, x_pos: 65, y_pos: 50, features: ['Sessiz Köşe'], min_trust_score: 0, is_active: true },
    { id: 't8', restaurant_id: '1', label: 'VIP Salon - Masa 8', capacity: 8, x_pos: 35, y_pos: 75, features: ['VIP', 'Özel Salon', 'Deniz Manzarası'], min_trust_score: 150, is_active: true },
    { id: 't9', restaurant_id: '1', label: 'Teras - Masa 9', capacity: 4, x_pos: 80, y_pos: 75, features: ['Teras', 'Açık Hava'], min_trust_score: 0, is_active: true },
]

// Simulated occupied table IDs (for demo)
export const mockOccupiedTableIds = ['t2', 't5', 't6', 't8']

export const mockReservations: Reservation[] = [
    {
        id: 'r1',
        user_id: 'u1',
        table_id: 't4',
        restaurant_id: '1',
        reservation_date: '2026-02-19',
        reservation_time: '20:00',
        party_size: 2,
        status: 'confirmed',
        created_at: '2026-02-18T19:00:00Z',
        tables: mockTables.find(t => t.id === 't4'),
        restaurants: mockRestaurants.find(r => r.id === '1'),
    },
]
