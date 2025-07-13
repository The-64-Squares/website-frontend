"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, ExternalLink, Video, FileText, Puzzle, Trophy, Users, Star } from "lucide-react"
import Link from "next/link"
import CheckBackLater from "@/components/Checkbacklater"
import api from "../utils/api"
import ChessLoading from "@/components/Loading"
import { useEffect, useState } from "react"
import { set } from "date-fns"
import { ClubResources, Resources, Tools } from "./types"

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resources>()
  const [tools, setTools] = useState<Tools>([])
  const [clubResources, setClubResources] = useState<ClubResources>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await api.get("/api/resource/allresources")
        setResources(data.resources)
        setTools(data.tools)
        setClubResources(data.clubResources)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])
  if (loading) return <ChessLoading />
  if (error) return <div>{error}</div>
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Chess Resources</h1>
            <p className="text-xl opacity-90">Everything you need to improve your chess game</p>
          </div>
        </div>
      </div>
      {!resources || !tools || !clubResources ? <CheckBackLater /> : <div className="container mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Study Guides</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Video className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Video Lessons</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Puzzle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tactical Puzzles</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Analyzed Games</div>
            </CardContent>
          </Card>
        </div>

        {/* Beginner Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Users className="h-6 w-6 text-yellow-600 mr-2" />
            Beginner Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.beginnerGuides.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {resource.type}
                    </Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(resource.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{resource.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                  </div>
                  <Button
                    className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Intermediate Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="h-6 w-6 text-yellow-600 mr-2" />
            Intermediate Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.intermediateResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {resource.type}
                    </Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(resource.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{resource.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                  </div>
                  <Button
                    className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Advanced Materials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Trophy className="h-6 w-6 text-yellow-600 mr-2" />
            Advanced Materials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.advancedMaterials.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {resource.type}
                    </Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(resource.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{resource.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                  </div>
                  <Button
                    className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Online Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Online Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant={tool.free ? "default" : "secondary"}>{tool.free ? "Free" : "Paid"}</Badge>
                      <Badge variant="outline">{tool.type}</Badge>
                    </div>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                    variant="outline"
                    asChild
                  >
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Club-Specific Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Club Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {clubResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-yellow-600" />
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{resource.type}</Badge>
                      {resource.memberOnly && <Badge variant="secondary">Members Only</Badge>}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant={resource.memberOnly ? "default" : "outline"}
                    disabled={resource.memberOnly}
                  >
                    {resource.memberOnly ? "Login Required" : "Access"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
      }
    </div>
  )
}
