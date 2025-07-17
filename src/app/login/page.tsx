'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flame, User, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulation d'une connexion
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Stocker l'état de connexion
        localStorage.setItem('bbq-auth', 'true')
        localStorage.setItem('bbq-user', JSON.stringify({
            email,
            name: email.split('@')[0]
        }))

        router.push('/')
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-fire-600 to-ember-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                        <Flame className="w-10 h-10 text-white animate-flame" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">BBQ World</h1>
                    <p className="text-muted-foreground">Rejoignez la communauté mondiale du barbecue</p>
                </div>

                {/* Login Form */}
                <Card className="bg-smoke-800 border-smoke-700 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl text-center text-foreground">
                            Se connecter
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-smoke-700 border border-smoke-600 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-all"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-smoke-700 border border-smoke-600 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="fire"
                                className="w-full py-3 text-lg font-semibold ember-glow"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Connexion...</span>
                                    </div>
                                ) : (
                                    'Se connecter'
                                )}
                            </Button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-fire-950 border border-fire-800 rounded-lg">
                            <p className="text-fire-200 text-sm font-medium mb-2">🔥 Compte de démonstration :</p>
                            <p className="text-fire-300 text-xs">Email : demo@bbq.world</p>
                            <p className="text-fire-300 text-xs">Mot de passe : barbecue123</p>
                        </div>

                        {/* Quick Login */}
                        <div className="mt-4 space-y-2">
                            <Button
                                variant="outline"
                                className="w-full border-smoke-600 hover:bg-smoke-700"
                                onClick={() => {
                                    setEmail('demo@bbq.world')
                                    setPassword('barbecue123')
                                }}
                            >
                                Utiliser le compte démo
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 text-muted-foreground text-sm">
                    <p>Pas encore de compte ? <span className="text-fire-500 cursor-pointer hover:text-fire-400">Rejoindre BBQ World</span></p>
                </div>
            </div>
        </div>
    )
}