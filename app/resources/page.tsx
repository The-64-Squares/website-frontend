"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, ExternalLink, Video, FileText, Puzzle, Trophy, Users, Star } from "lucide-react"
import Link from "next/link"

const resources = {
  beginnerGuides: [
    {
      title: "Chess Basics: How to Play",
      description: "Complete guide for absolute beginners covering rules, piece movements, and basic strategies.",
      type: "PDF Guide",
      downloadUrl: "#",
      rating: 4.9,
      downloads: 1250,
    },
    {
      title: "Opening Principles",
      description: "Learn the fundamental principles of chess openings and common opening moves.",
      type: "Video Series",
      downloadUrl: "#",
      rating: 4.8,
      downloads: 980,
    },
    {
      title: "Basic Tactics Workbook",
      description: "Practice essential tactical patterns like pins, forks, and skewers.",
      type: "Interactive PDF",
      downloadUrl: "#",
      rating: 4.7,
      downloads: 1100,
    },
  ],
  intermediateResources: [
    {
      title: "Middlegame Strategy Guide",
      description: "Advanced strategies for the middlegame including pawn structures and piece coordination.",
      type: "PDF Guide",
      downloadUrl: "#",
      rating: 4.9,
      downloads: 750,
    },
    {
      title: "Endgame Essentials",
      description: "Master the most important endgame positions and techniques.",
      type: "Video Course",
      downloadUrl: "#",
      rating: 4.8,
      downloads: 650,
    },
    {
      title: "Tactical Puzzle Collection",
      description: "500+ tactical puzzles ranging from intermediate to advanced difficulty.",
      type: "PDF Collection",
      downloadUrl: "#",
      rating: 4.9,
      downloads: 890,
    },
  ],
  advancedMaterials: [
    {
      title: "Grandmaster Game Analysis",
      description: "Detailed analysis of classic games by world champions and grandmasters.",
      type: "Annotated Games",
      downloadUrl: "#",
      rating: 5.0,
      downloads: 420,
    },
    {
      title: "Opening Repertoire Builder",
      description: "Build a complete opening repertoire for both white and black pieces.",
      type: "Interactive Guide",
      downloadUrl: "#",
      rating: 4.8,
      downloads: 380,
    },
    {
      title: "Tournament Preparation",
      description: "Mental preparation, time management, and competitive strategies.",
      type: "PDF Guide",
      downloadUrl: "#",
      rating: 4.7,
      downloads: 290,
    },
  ],
}

const tools = [
  {
    name: "Chess.com",
    description: "Play online, solve puzzles, and watch educational content",
    url: "https://chess.com",
    type: "Online Platform",
    free: true,
  },
  {
    name: "Lichess",
    description: "Free and open-source chess server with analysis tools",
    url: "https://lichess.org",
    type: "Online Platform",
    free: true,
  },
  {
    name: "ChessBase",
    description: "Professional chess database and analysis software",
    url: "https://chessbase.com",
    type: "Software",
    free: false,
  },
  {
    name: "Stockfish",
    description: "Powerful open-source chess engine for analysis",
    url: "https://stockfishchess.org",
    type: "Chess Engine",
    free: true,
  },
]

const clubResources = [
  {
    title: "Club Tournament Rules",
    description: "Official rules and regulations for club tournaments",
    type: "PDF",
    memberOnly: false,
  },
  {
    title: "Meeting Minutes Archive",
    description: "Historical records of club meetings and decisions",
    type: "Archive",
    memberOnly: true,
  },
  {
    title: "Training Schedule",
    description: "Weekly training sessions and workshop calendar",
    type: "Calendar",
    memberOnly: false,
  },
  {
    title: "Member Directory",
    description: "Contact information for all club members",
    type: "Directory",
    memberOnly: true,
  },
]

export default function ResourcesPage() {
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

      <div className="container mx-auto px-4 py-12">
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
                            className={`h-4 w-4 ${
                              i < Math.floor(resource.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
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
                            className={`h-4 w-4 ${
                              i < Math.floor(resource.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
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
                            className={`h-4 w-4 ${
                              i < Math.floor(resource.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
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
    </div>
  )
}
