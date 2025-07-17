'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    email: string
    name: string
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const authState = localStorage.getItem('bbq-auth')
        const userData = localStorage.getItem('bbq-user')

        if (authState === 'true' && userData) {
            setUser(JSON.parse(userData))
        }
        setLoading(false)
    }, [])

    const logout = () => {
        localStorage.removeItem('bbq-auth')
        localStorage.removeItem('bbq-user')
        setUser(null)
        router.push('/login')
    }

    const redirectToLogin = () => {
        router.push('/login')
    }

    return { user, loading, logout, redirectToLogin }
}