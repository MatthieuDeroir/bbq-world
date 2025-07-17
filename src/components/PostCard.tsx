'use client'

import React from 'react'
import { Heart, Users, MapPin, Clock, ChefHat } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BBQPost, formatTime } from '@/lib/utils'

interface PostCardProps {
    post: BBQPost
    onLike: (postId: number) => void
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
    return (
        <Card className="mb-4 bg-smoke-800 border-smoke-700 hover:border-fire-600 transition-all duration-300">
            <div className="relative">
                <img
                    src={post.image}
                    alt="BBQ"
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-full text-xs text-white">
                    {post.category}
                </div>
            </div>

            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-fire-500 to-ember-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {post.user.charAt(0)}
              </span>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-foreground">{post.user}</p>
                            <p className="text-xs text-muted-foreground flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {post.location}
                            </p>
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="w-3 h-3 mr-1" />
                        {formatTime(post.timestamp)}
          </span>
                </div>

                <p className="text-sm mb-3 text-foreground leading-relaxed">
                    {post.description}
                </p>

                {post.recipe && (
                    <div className="bg-fire-950 border border-fire-800 p-3 rounded-lg mb-3">
                        <p className="text-xs text-fire-200 flex items-center">
                            <ChefHat className="w-3 h-3 mr-1" />
                            {post.recipe}
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onLike(post.id)}
                            className="flex items-center space-x-1 text-ember-500 hover:text-ember-400 hover:bg-ember-950 p-2"
                        >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">{post.likes}</span>
                        </Button>
                        <div className="flex items-center space-x-1 text-fire-500">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium">{post.attendees}</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-fire-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">En ligne</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PostCard