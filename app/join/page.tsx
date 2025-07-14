"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import CheckBackLater from "@/components/Checkbacklater"
export default function JoinPage() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    major: "",
    year: "",
    experience: "",
    interests: ""
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Join form submitted:", formData)
    alert("Welcome to the Chess Club! We'll contact you soon with meeting details.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      major: "",
      year: "",
      experience: "",
      interests: ""
    })
  }
  if(true){return <CheckBackLater/>}
  return (
     <div className={`min-h-screen transition-colors duration-300 ${theme=='dark'? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Join the Chess Club</CardTitle>
              <CardDescription>
                Fill out this form to become a member. Already have an account?{" "}
                <Link href="/login" className="text-yellow-600 hover:underline">
                  Sign in
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields same as in your modal */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {/* Include all other form fields from your modal */}

                <div className="flex justify-between pt-6">
                  <Button asChild variant="outline">
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700">
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
    
  )
}