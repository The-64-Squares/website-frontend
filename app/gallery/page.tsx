"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CheckBackLater from "@/components/Checkbacklater"
import api from "../utils/api"
import ChessLoading from "@/components/Loading"
import { GalleryItems } from "./types"



const categories = [
  { id: "all", name: "All Photos", icon: Users },
  { id: "tournament", name: "Tournaments", icon: Trophy },
  { id: "workshop", name: "Workshops", icon: Calendar },
  { id: "social", name: "Social Events", icon: Users },
  { id: "achievement", name: "Achievements", icon: Trophy },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [galleryItems, setGalleryItems] = useState<GalleryItems>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get("/api/gallery/all_images")
        setGalleryItems(data.gallery)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredItems[newIndex].id)
  }

  const selectedImageData = selectedImage ? filteredItems.find((item) => item.id === selectedImage) : null

  if(loading) return <ChessLoading />
  if(error) return <div>{error}</div>
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
              <p className="text-xl opacity-90">Capturing moments from our chess journey</p>
            </div>
          </div>
        </div>
        {!galleryItems ? (
          <CheckBackLater />
        ) : <>
          <div className="container mx-auto px-4 py-12">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 ${selectedCategory !== category.id ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" : ""}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Button>
                )
              })}
            </div>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative aspect-video" onClick={() => openLightbox(item.id)}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/70 text-white dark:bg-black/80">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No photos found in this category.</p>
              </div>
            )}

            {/* Back to Home */}
            <div className="text-center mt-12">
              <Link href="/">
                <Button variant="outline" size="lg">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedImage && selectedImageData && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
              <div className="relative max-w-4xl w-full">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigateLightbox("prev")}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigateLightbox("next")}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Image */}
                <div className="relative aspect-video">
                  <Image
                    src={selectedImageData.image || "/placeholder.svg"}
                    alt={selectedImageData.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Image Info */}
                <div className="bg-white dark:bg-gray-800 p-4 mt-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{selectedImageData.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{selectedImageData.description}</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                      {selectedImageData.category}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{selectedImageData.date}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>}


      </div>
    </>
  )
}
