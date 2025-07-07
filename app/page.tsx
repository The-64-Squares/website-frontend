"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Trophy, Users, Menu, X, Sun, Moon, Star, Clock, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/Header"
import { useTheme } from "next-themes"
// Chess piece Unicode symbols
const chessPieces = ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"]

export default function ChessClubWebsite() {
  const { theme } = useTheme()
  const [animatedPieces, setAnimatedPieces] = useState<
    Array<{ id: number; piece: string; x: number; y: number; delay: number }>
  >([])

  useEffect(() => {
    // Generate animated chess pieces for background
    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      piece: chessPieces[Math.floor(Math.random() * chessPieces.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setAnimatedPieces(pieces)
  }, [])


  const upcomingEvents = [
    {
      title: "Fall Championship",
      date: "Nov 15, 2024",
      time: "2:00 PM",
      location: "Student Center",
      participants: 24,
    },
    {
      title: "Blitz Tournament",
      date: "Nov 22, 2024",
      time: "6:00 PM",
      location: "Chess Room",
      participants: 16,
    },
    {
      title: "Beginner Workshop",
      date: "Nov 29, 2024",
      time: "4:00 PM",
      location: "Library Hall",
      participants: 12,
    },
  ]

  const topMembers = [
    { name: "Alex Chen", rating: 1850, wins: 23, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Sarah Johnson", rating: 1820, wins: 21, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Mike Rodriguez", rating: 1795, wins: 19, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Emma Davis", rating: 1780, wins: 18, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const recentNews = [
    {
      title: "Chess Club Wins Regional Championship",
      excerpt: "Our team dominated the inter-collegiate tournament with outstanding performances...",
      date: "Nov 10, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "New Chess Tactics Workshop Series",
      excerpt: "Join us every Wednesday for intensive tactical training sessions...",
      date: "Nov 8, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Guest Master Class with GM Sarah Williams",
      excerpt: "International Grandmaster Sarah Williams will conduct a special masterclass...",
      date: "Nov 5, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme==="dark" ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        {animatedPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute text-6xl animate-pulse"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: "4s",
            }}
          >
            {piece.piece}
          </div>
        ))}
      </div>

      <Header/>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className=" space-y-8">
              <div className="space-y-4">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                  Est. 2010 • 150+ Active Members
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Master the Game of
                  <span className="text-yellow-600 block">Kings & Queens</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Join our vibrant community of strategic thinkers, compete in tournaments, and elevate your chess
                  skills to new heights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/join">
                  <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    Join the Club
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Games Live
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>15 Tournaments Won</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-yellow-600" />
                  <span>150+ Members</span>
                </div>
              </div>
            </div>

            {/* Interactive Chessboard Preview */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="grid grid-cols-8 gap-1 aspect-square">
                  {Array.from({ length: 64 }, (_, i) => {
                    const row = Math.floor(i / 8)
                    const col = i % 8
                    const isLight = (row + col) % 2 === 0
                    const pieces = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"]
                    const showPiece = row === 0 || row === 7 || row === 1 || row === 6
                    let piece = ""
                    if (row === 0) piece = pieces[col]
                    else if (row === 1) piece = "♟"
                    else if (row === 6) piece = "♙"
                    else if (row === 7)
                      piece = pieces[col].replace(
                        /♜|♞|♝|♛|♚/,
                        (m) => ({ "♜": "♖", "♞": "♘", "♝": "♗", "♛": "♕", "♚": "♔" })[m] || m,
                      )

                    return (
                      <div
                        key={i}
                        className={`aspect-square flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 transition-transform ${isLight ? "bg-amber-100 dark:bg-amber-200" : "bg-amber-800 dark:bg-amber-900"
                          }`}
                      >
                        {piece}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Chess Puzzle */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Daily Chess Puzzle</h2>
            <p className="text-gray-600 dark:text-gray-400">Challenge yourself with today's tactical puzzle</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Puzzle #247 - Intermediate</span>
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    White to Move
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-inner">
                    <div className="grid grid-cols-8 gap-1 aspect-square">
                      {/* Simplified puzzle position */}
                      {Array.from({ length: 64 }, (_, i) => {
                        const row = Math.floor(i / 8)
                        const col = i % 8
                        const isLight = (row + col) % 2 === 0
                        // Sample puzzle position
                        const puzzlePieces: { [key: number]: string } = {
                          4: "♚",
                          12: "♛",
                          20: "♖",
                          28: "♔",
                          36: "♙",
                          44: "♙",
                        }

                        return (
                          <div
                            key={i}
                            className={`aspect-square flex items-center justify-center text-xl font-bold cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors ${isLight ? "bg-amber-100 dark:bg-amber-200" : "bg-amber-800 dark:bg-amber-900"
                              }`}
                          >
                            {puzzlePieces[i] || ""}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Find the Best Move</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        White has a forced mate in 3 moves. Can you find the winning sequence?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 bg-transparent">
                          Qh5+
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 bg-transparent">
                          Rxf7
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 bg-transparent">
                          Bg5
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 bg-transparent">
                          Nf6+
                        </Button>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Solved by 847 players</span>
                        <span>Success rate: 73%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Club Leaderboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Our top performing members this season</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Top Players - Fall 2024</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMembers.map((member, index) => (
                    <div
                      key={member.name}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-bold">
                        {index + 1}
                      </div>
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {member.rating}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600 dark:text-green-400">{member.wins} Wins</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">This Season</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join us for exciting tournaments and learning opportunities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                    <span>{event.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{event.participants} participants registered</span>
                    </div>
                  </div>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Blog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest News</h2>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with club activities and chess insights</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentNews.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  <CardDescription>{article.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{article.excerpt}</p>
                  <Button variant="outline" size="sm">
                    Read More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">About Our Chess Club</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded in 2010, our Chess Club has grown into one of the most active and successful student
                  organizations on campus. We welcome players of all skill levels, from complete beginners to seasoned
                  tournament players.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Our mission is to promote the game of chess, provide a supportive learning environment, and compete at
                  the highest collegiate level. We offer regular training sessions, tournaments, and social events that
                  bring together chess enthusiasts from across the university.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">150+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">15</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tournaments Won</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Chess Club Members"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">♔</div>
                <div>
                  <h3 className="font-bold">College Chess Club</h3>
                  <p className="text-sm text-gray-400">Strategic Minds Unite</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Empowering students through the royal game of chess since 2010.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="#about" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="#events" className="block text-gray-400 hover:text-white transition-colors">
                  Events
                </Link>
                <Link href="/members" className="block text-gray-400 hover:text-white transition-colors">
                  Members
                </Link>
                <Link href="/resources" className="block text-gray-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Student Center, Room 204</p>
                <p>chess@college.edu</p>
                <p>(555) 123-4567</p>
                <p>Mon-Fri: 6:00 PM - 10:00 PM</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}