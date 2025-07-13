"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Trophy, Search, Users, Crown, Medal, Award } from "lucide-react"
import Link from "next/link"
import CheckBackLater from "@/components/Checkbacklater"
import api from "../utils/api"
import ChessLoading from "@/components/Loading"
import { MembersType, AlumnisType } from "./types"

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [members, setMembers] = useState<MembersType>([])
  const [alumni, setAlumni] = useState<AlumnisType>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await api.get("/api/members/all_members")
        setMembers(data.members)
        setAlumni(data.alumni)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.major.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterBy === "all") return matchesSearch
    if (filterBy === "officers") return matchesSearch && member.title !== "Member"
    if (filterBy === "seniors") return matchesSearch && member.year === "Senior"
    if (filterBy === "high-rated") return matchesSearch && member.rating >= 1800

    return matchesSearch
  })
  if (loading) return <ChessLoading />
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Members</h1>
            <p className="text-xl opacity-90">Meet the strategic minds behind our chess club</p>
            {
              members.length != 0 &&
              <div className="flex justify-center items-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{members.length}</div>
                  <div className="text-sm opacity-80">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{alumni.length}</div>
                  <div className="text-sm opacity-80">Alumni</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1785</div>
                  <div className="text-sm opacity-80">Avg Rating</div>
                </div>
              </div>}
          </div>
        </div>
      </div>
      {!(members.length != 0) ? <CheckBackLater /> : <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search members by name or major..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterBy === "all" ? "default" : "outline"}
              onClick={() => setFilterBy("all")}
              size="sm"
              className={
                filterBy !== "all" ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300" : ""
              }
            >
              All
            </Button>
            <Button
              variant={filterBy === "officers" ? "default" : "outline"}
              onClick={() => setFilterBy("officers")}
              size="sm"
              className={
                filterBy !== "officers" ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300" : ""
              }
            >
              Officers
            </Button>
            <Button
              variant={filterBy === "high-rated" ? "default" : "outline"}
              onClick={() => setFilterBy("high-rated")}
              size="sm"
              className={
                filterBy !== "high-rated" ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300" : ""
              }
            >
              Top Rated
            </Button>
          </div>
        </div>

        {/* Club Officers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Crown className="h-6 w-6 text-yellow-600 mr-2" />
            Club Officers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members
              .filter((member) => member.title !== "Member")
              .map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                        {member.title}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-yellow-600">Rating</div>
                        <div>{member.rating}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-yellow-600">Record</div>
                        <div>
                          {member.wins}W-{member.losses}L-{member.draws}D
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-yellow-600">Major</div>
                      <div>
                        {member.major} • {member.year}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-yellow-600">Favorite Opening</div>
                      <div>{member.favoriteOpening}</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs mr-1">
                          <Trophy className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Members */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Users className="h-6 w-6 text-yellow-600 mr-2" />
            All Members ({filteredMembers.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{member.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{member.major}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {member.rating}
                        </Badge>
                        <span className="text-xs text-gray-500">{member.year}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Alumni Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Medal className="h-6 w-6 text-yellow-600 mr-2" />
            Notable Alumni
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {alumni.map((alum, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={alum.avatar || "/placeholder.svg"} alt={alum.name} />
                      <AvatarFallback>
                        {alum.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{alum.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{alum.title}</p>
                      <div className="flex items-center space-x-4 text-sm mb-3">
                        <span>Rating: {alum.rating}</span>
                        <span>Class of {alum.graduationYear}</span>
                      </div>
                      <div className="space-y-1">
                        {alum.achievements.map((achievement, achIndex) => (
                          <Badge key={achIndex} variant="secondary" className="text-xs mr-1">
                            <Award className="h-3 w-3 mr-1" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
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
