import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatTime(timestamp: Date): string {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return 'Il y a moins d\'une heure'
    if (hours < 24) return `Il y a ${hours}h`
    return timestamp.toLocaleDateString('fr-FR')
}

export interface BBQPost {
    id: number
    user: string
    location: string
    lat: number
    lng: number
    image: string
    description: string
    recipe?: string
    likes: number
    attendees: number
    timestamp: Date
    category: 'Familial' | 'Traditionnel' | 'Compétition' | 'Gourmet'
}

export const mockPosts: BBQPost[] = [
    {
        id: 1,
        user: "Jean-Pierre",
        location: "Paris, France",
        lat: 48.8566,
        lng: 2.3522,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
        description: "Barbecue familial au jardin avec merguez et côtes de bœuf",
        recipe: "Marinade : huile d'olive, herbes de Provence, ail",
        likes: 24,
        attendees: 8,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: "Familial"
    },
    {
        id: 2,
        user: "Maria Santos",
        location: "São Paulo, Brésil",
        lat: -23.5505,
        lng: -46.6333,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        description: "Churrasco traditionnel brésilien avec picanha",
        recipe: "Picanha grillée avec gros sel, pão de açúcar",
        likes: 67,
        attendees: 15,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        category: "Traditionnel"
    },
    {
        id: 3,
        user: "Mike Johnson",
        location: "Austin, Texas",
        lat: 30.2672,
        lng: -97.7431,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop",
        description: "BBQ texan avec brisket fumé 12h",
        recipe: "Rub sec : paprika, cumin, cassonade, sel",
        likes: 89,
        attendees: 25,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        category: "Compétition"
    },
    {
        id: 4,
        user: "Hiroshi Tanaka",
        location: "Tokyo, Japon",
        lat: 35.6762,
        lng: 139.6503,
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
        description: "Yakiniku sur balcon avec wagyu",
        recipe: "Sauce tare : soja, mirin, saké, gingembre",
        likes: 43,
        attendees: 6,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        category: "Gourmet"
    }
]