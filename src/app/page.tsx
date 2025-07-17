'use client'

import { useState, useEffect } from 'react'
import { Plus, Flame, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WorldMap from '@/components/WorldMap'
import PostCard from '@/components/PostCard'
import Navigation from '@/components/Navigation'
import AddPostForm from '@/components/AddPostForm'
import { usePosts } from '@/hooks/usePosts'
import { useAuth } from '@/hooks/useAuth'
import { BBQPost } from '@/lib/utils'

export default function Home() {
  const { user, loading, logout, redirectToLogin } = useAuth()
  const { posts, handleLike, handleAddPost, getSortedPosts } = usePosts()
  const [currentView, setCurrentView] = useState<'map' | 'feed'>('map')
  const [selectedPost, setSelectedPost] = useState<BBQPost | null>(null)
  const [sortBy, setSortBy] = useState<'recent' | 'likes' | 'attendees'>('recent')
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      redirectToLogin()
    }
  }, [user, loading, redirectToLogin])

  if (loading) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-fire-600 to-ember-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-8 h-8 text-white animate-flame" />
            </div>
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
    )
  }

  if (!user) return null

  return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto bg-smoke-900 min-h-screen">
          {/* Header */}
          <header className="bg-gradient-to-r from-fire-600 to-ember-600 text-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-fire-700 rounded-full flex items-center justify-center shadow-lg">
                  <Flame className="w-6 h-6 text-white animate-flame" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">BBQ World</h1>
                  <p className="text-xs text-fire-200">👋 {user.name}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                    variant="fire"
                    size="icon"
                    onClick={() => setShowAddForm(true)}
                    className="bg-fire-700 hover:bg-fire-800 shadow-lg ember-glow"
                >
                  <Plus className="w-5 h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={logout}
                    className="border-fire-400 text-fire-200 hover:bg-fire-700"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Navigation */}
          <div className="p-4 pb-0">
            <Navigation
                currentView={currentView}
                setCurrentView={setCurrentView}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
          </div>

          {/* Content */}
          <main className="p-4">
            {currentView === 'map' ? (
                <div className="space-y-4">
                  <WorldMap
                      posts={posts}
                      selectedPost={selectedPost}
                      setSelectedPost={setSelectedPost}
                  />

                  {selectedPost && (
                      <Card className="bg-smoke-800 border-smoke-700 border-fire-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-fire-400 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-fire-500 rounded-full animate-pulse"></div>
                            <span>BBQ sélectionné</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <PostCard post={selectedPost} onLike={handleLike} />
                        </CardContent>
                      </Card>
                  )}
                </div>
            ) : (
                <div className="space-y-4">
                  {getSortedPosts(sortBy).map(post => (
                      <PostCard key={post.id} post={post} onLike={handleLike} />
                  ))}
                </div>
            )}
          </main>

          {/* Add Post Modal */}
          {showAddForm && (
              <AddPostForm
                  onAddPost={handleAddPost}
                  onClose={() => setShowAddForm(false)}
              />
          )}
        </div>
      </div>
  )
}