'use client'

import React from 'react'
import { Clock, Heart, Users, Map, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface NavigationProps {
    currentView: 'map' | 'feed'
    setCurrentView: (view: 'map' | 'feed') => void
    sortBy: 'recent' | 'likes' | 'attendees'
    setSortBy: (sort: 'recent' | 'likes' | 'attendees') => void
}

const Navigation: React.FC<NavigationProps> = ({
                                                   currentView,
                                                   setCurrentView,
                                                   sortBy,
                                                   setSortBy
                                               }) => {
    return (
        <div className="space-y-4">
            {/* Navigation principale */}
            <Card className="bg-smoke-800 border-smoke-700">
                <div className="flex p-1">
                    <Button
                        variant={currentView === 'map' ? 'fire' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentView('map')}
                        className="flex-1 flex items-center justify-center space-x-2"
                    >
                        <Map className="w-4 h-4" />
                        <span>Carte</span>
                    </Button>
                    <Button
                        variant={currentView === 'feed' ? 'fire' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentView('feed')}
                        className="flex-1 flex items-center justify-center space-x-2"
                    >
                        <List className="w-4 h-4" />
                        <span>Feed</span>
                    </Button>
                </div>
            </Card>

            {/* Options de tri (seulement pour le feed) */}
            {currentView === 'feed' && (
                <Card className="bg-smoke-800 border-smoke-700">
                    <div className="flex p-1 space-x-1">
                        <Button
                            variant={sortBy === 'recent' ? 'fire' : 'ghost'}
                            size="sm"
                            onClick={() => setSortBy('recent')}
                            className="flex-1 flex items-center justify-center space-x-1"
                        >
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">Récents</span>
                        </Button>
                        <Button
                            variant={sortBy === 'likes' ? 'ember' : 'ghost'}
                            size="sm"
                            onClick={() => setSortBy('likes')}
                            className="flex-1 flex items-center justify-center space-x-1"
                        >
                            <Heart className="w-3 h-3" />
                            <span className="text-xs">Populaires</span>
                        </Button>
                        <Button
                            variant={sortBy === 'attendees' ? 'fire' : 'ghost'}
                            size="sm"
                            onClick={() => setSortBy('attendees')}
                            className="flex-1 flex items-center justify-center space-x-1"
                        >
                            <Users className="w-3 h-3" />
                            <span className="text-xs">Animés</span>
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}

export default Navigation