'use client'

import React, { useState } from 'react'
import { X, Camera, MapPin, User, FileText, ChefHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BBQPost } from '@/lib/utils'

interface AddPostFormProps {
    onAddPost: (formData: Omit<BBQPost, 'id' | 'lat' | 'lng' | 'image' | 'likes' | 'attendees' | 'timestamp'>) => void
    onClose: () => void
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost, onClose }) => {
    const [formData, setFormData] = useState({
        user: '',
        location: '',
        description: '',
        recipe: '',
        category: 'Familial' as const
    })

    const categories = ['Familial', 'Traditionnel', 'Compétition', 'Gourmet'] as const

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.user && formData.location && formData.description) {
            onAddPost(formData)
            onClose()
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-smoke-800 border-smoke-700 max-h-[90vh] overflow-y-auto">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-foreground flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-fire-500 to-ember-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm animate-flame">🔥</span>
                            </div>
                            <span>Partager votre BBQ</span>
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Photo upload placeholder */}
                        <div className="border-2 border-dashed border-smoke-600 rounded-lg p-6 text-center hover:border-fire-600 transition-colors">
                            <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Ajouter une photo</p>
                        </div>

                        {/* Nom utilisateur */}
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Votre nom"
                                value={formData.user}
                                onChange={(e) => handleChange('user', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-smoke-700 border border-smoke-600 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-all"
                                required
                            />
                        </div>

                        {/* Localisation */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Localisation (ex: Paris, France)"
                                value={formData.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-smoke-700 border border-smoke-600 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-all"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <textarea
                                placeholder="Décrivez votre barbecue..."
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-smoke-700 border border-smoke-600 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-all h-20 resize-none"
                                required
                            />
                        </div>

                        {/* Recette */}
                        <div className="relative">
                            <ChefHat className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <textarea
                                placeholder="Partagez votre recette ou technique (optionnel)"
                                value={formData.recipe}
                                onChange={(e) => handleChange('recipe', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-smoke-700 border border-smoke-600 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-all h-16 resize-none"
                            />
                        </div>

                        {/* Catégorie */}
                        <select
                            value={formData.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            className="w-full px-4 py-3 bg-smoke-700 border border-smoke-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-all"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="bg-smoke-700 text-foreground">
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* Boutons */}
                        <div className="flex space-x-3 pt-4">
                            <Button
                                type="submit"
                                variant="fire"
                                className="flex-1"
                                disabled={!formData.user || !formData.location || !formData.description}
                            >
                                <span>Publier</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 border-smoke-600 hover:bg-smoke-700"
                            >
                                Annuler
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddPostForm