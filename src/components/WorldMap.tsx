'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { BBQPost } from '@/lib/utils'

// Fix icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

// Icône BBQ personnalisée
const bbqIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNmOTczMTYiIHN0cm9rZT0iI2M5NDEwYyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjEwIiBmaWxsPSIjZWE1ODBjIi8+Cjx0ZXh0IHg9IjE2IiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPvCdlZU8L3RleHQ+Cjwvc3ZnPg==',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

interface WorldMapProps {
    posts: BBQPost[]
    selectedPost: BBQPost | null
    setSelectedPost: (post: BBQPost) => void
}

const WorldMap: React.FC<WorldMapProps> = ({ posts, selectedPost, setSelectedPost }) => {
    return (
        <div className="w-full h-64 rounded-xl overflow-hidden border shadow-lg">
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {posts.map(post => (
                    <Marker
                        key={post.id}
                        position={[post.lat, post.lng]}
                        icon={bbqIcon}
                        eventHandlers={{
                            click: () => setSelectedPost(post)
                        }}
                    >
                        <Popup>
                            <div className="w-48 p-2">
                                <img
                                    src={post.image}
                                    alt="BBQ"
                                    className="w-full h-24 object-cover rounded-lg mb-2"
                                />
                                <h3 className="font-semibold text-sm text-foreground">{post.user}</h3>
                                <p className="text-xs text-muted-foreground">{post.location}</p>
                                <p className="text-xs mt-1 text-foreground">{post.description}</p>
                                <div className="flex justify-between mt-2 text-xs">
                                    <span className="text-ember-500">👥 {post.attendees}</span>
                                    <span className="text-fire-500">❤️ {post.likes}</span>
                                    <span className="text-muted-foreground">{post.category}</span>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default WorldMap