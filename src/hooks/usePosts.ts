'use client'

import { useState } from 'react'
import { BBQPost, mockPosts } from '@/lib/utils'

export const usePosts = () => {
    const [posts, setPosts] = useState<BBQPost[]>(mockPosts)

    const handleLike = (postId: number) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ))
    }

    const handleAddPost = (formData: Omit<BBQPost, 'id' | 'lat' | 'lng' | 'image' | 'likes' | 'attendees' | 'timestamp'>) => {
        const newPost: BBQPost = {
            id: posts.length + 1,
            ...formData,
            lat: Math.random() * 180 - 90,
            lng: Math.random() * 360 - 180,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
            likes: 0,
            attendees: 1,
            timestamp: new Date()
        }
        setPosts([newPost, ...posts])
    }

    const getSortedPosts = (sortBy: 'recent' | 'likes' | 'attendees') => {
        const sorted = [...posts]
        switch (sortBy) {
            case 'likes':
                return sorted.sort((a, b) => b.likes - a.likes)
            case 'attendees':
                return sorted.sort((a, b) => b.attendees - a.attendees)
            case 'recent':
            default:
                return sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        }
    }

    return { posts, handleLike, handleAddPost, getSortedPosts }
}