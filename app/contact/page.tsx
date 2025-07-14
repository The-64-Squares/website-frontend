"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Users, Calendar, MessageSquare, Send } from "lucide-react"
import Link from "next/link"
import api from "../utils/api"
import ChessLoading from "@/components/Loading"
import { ContactFormData, ContactInfoType, FaqType, initialContactFormData, initialContactInfo, OfficerType } from "./types"


export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData)
  const [contactInfo, setContactInfo] = useState<ContactInfoType>(initialContactInfo)
  const [officers, setOfficers] = useState<OfficerType>([])
  const [faqs, setFaqs] = useState<FaqType>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [contactInfoRes, officersRes, faqsRes] = await Promise.all([
        api.get("api/contact/contact_info/"),
        api.get("api/contact/officers/"),
        api.get("api/contact/faqs/"),
      ])

      setContactInfo(contactInfoRes.data.contact_info)
      setOfficers(officersRes.data.officers)
      setFaqs(faqsRes.data.faqs)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "general",
    })
  }
  if (loading) {
    return <ChessLoading />
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">Get in touch with our chess club</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-yellow-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Have questions about joining, tournaments, or club activities? We'd love to hear from you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-2">
                      Message Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="membership">Membership Question</option>
                      <option value="tournament">Tournament Information</option>
                      <option value="workshop">Workshop/Training</option>
                      <option value="feedback">Feedback/Suggestion</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Basic Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Hours</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{contactInfo.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/join">
                    <Users className="h-4 w-4 mr-2" />
                    Join the Club
                  </Link>
                </Button>
                <Button
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/#events">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Events
                  </Link>
                </Button>
                <Button
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/resources">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Access Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Club Officers */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Officers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {officers.map((officer, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{officer.name}</h3>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                        {officer.title}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{officer.responsibilities}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${officer.email}`} className="text-yellow-600 hover:underline">
                          {officer.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{officer.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-12">
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
