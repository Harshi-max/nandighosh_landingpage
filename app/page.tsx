"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import {
  Bus,
  MapPin,
  Clock,
  Shield,
  Wifi,
  Snowflake,
  Phone,
  Mail,
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Download,
  CalendarIcon,
  CreditCard,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

interface BookingData {
  route: string
  date: Date | undefined
  passengers: string
  name: string
  phone: string
  email: string
}

interface ContactData {
  name: string
  phone: string
  email: string
  message: string
}

export default function NandighoshBusLanding() {
  const [bookingData, setBookingData] = useState<BookingData>({
    route: "",
    date: undefined,
    passengers: "",
    name: "",
    phone: "",
    email: "",
  })

  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const routes = [
    { id: "balasore-sambalpur", name: "Balasore to Sambalpur", price: 450, duration: "8 hours" },
    { id: "balasore-jamshedpur", name: "Balasore to Jamshedpur", price: 280, duration: "4 hours" },
    { id: "balasore-berhampur", name: "Balasore to Berhampur", price: 380, duration: "6 hours" },
  ]

  const handleBooking = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId)
    if (route) {
      setBookingData((prev) => ({ ...prev, route: route.name }))
      setIsBookingOpen(true)
      setBookingStep(1)
    }
  }

  const handleBookingSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your seat has been booked for ${bookingData.route}. Confirmation details sent to ${bookingData.email}`,
    })

    setIsSubmitting(false)
    setIsBookingOpen(false)
    setBookingStep(1)
    setBookingData({
      route: "",
      date: undefined,
      passengers: "",
      name: "",
      phone: "",
      email: "",
    })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message Sent! ✅",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    })

    setIsSubmitting(false)
    setContactData({ name: "", phone: "", email: "", message: "" })
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in booking a bus ticket with Nandighosh Bus. Can you help me?",
    )
    const whatsappUrl = `https://wa.me/919876543210?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+919876543210"
  }

  const handleAppDownload = (store: "play" | "app") => {
    const urls = {
      play: "https://play.google.com/store",
      app: "https://apps.apple.com/app-store",
    }

    toast({
      title: "Redirecting to Store",
      description: `Opening ${store === "play" ? "Google Play Store" : "App Store"}...`,
    })

    setTimeout(() => {
      window.open(urls[store], "_blank")
    }, 1000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/nandighosh-logo.png"
              alt="Nandighosh Tours & Travels"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection("routes")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Routes
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">Premium Bus Service in Odisha</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to
              <span className="text-blue-600 block">Nandighosh Tours & Travels</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience premium bus travel across Odisha with our modern fleet, comfortable seating, and reliable
              service. Your journey matters to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                    <Bus className="w-5 h-5 mr-2" />
                    Book Your Seat
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book Your Journey</DialogTitle>
                    <DialogDescription>
                      {bookingStep === 1
                        ? "Select your travel details"
                        : bookingStep === 2
                          ? "Enter passenger information"
                          : "Confirm your booking"}
                    </DialogDescription>
                  </DialogHeader>

                  {bookingStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Route</label>
                        <Select
                          value={bookingData.route}
                          onValueChange={(value) => setBookingData((prev) => ({ ...prev, route: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your route" />
                          </SelectTrigger>
                          <SelectContent>
                            {routes.map((route) => (
                              <SelectItem key={route.id} value={route.name}>
                                {route.name} - ₹{route.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Travel Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingData.date ? format(bookingData.date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={bookingData.date}
                              onSelect={(date) => setBookingData((prev) => ({ ...prev, date }))}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Number of Passengers</label>
                        <Select
                          value={bookingData.passengers}
                          onValueChange={(value) => setBookingData((prev) => ({ ...prev, passengers: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select passengers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Passenger</SelectItem>
                            <SelectItem value="2">2 Passengers</SelectItem>
                            <SelectItem value="3">3 Passengers</SelectItem>
                            <SelectItem value="4">4 Passengers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => setBookingStep(2)}
                        className="w-full"
                        disabled={!bookingData.route || !bookingData.date || !bookingData.passengers}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Full Name</label>
                        <Input
                          value={bookingData.name}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone Number</label>
                        <Input
                          value={bookingData.phone}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Email Address</label>
                        <Input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setBookingStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button
                          onClick={() => setBookingStep(3)}
                          className="flex-1"
                          disabled={!bookingData.name || !bookingData.phone || !bookingData.email}
                        >
                          Review Booking
                        </Button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Route:</span>
                          <span>{bookingData.route}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Date:</span>
                          <span>{bookingData.date ? format(bookingData.date, "PPP") : ""}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Passengers:</span>
                          <span>{bookingData.passengers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Name:</span>
                          <span>{bookingData.name}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-bold">Total Amount:</span>
                          <span className="font-bold text-blue-600">
                            ₹
                            {routes.find((r) => r.name === bookingData.route)?.price ||
                              0 * Number.parseInt(bookingData.passengers || "1")}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setBookingStep(2)} className="flex-1">
                          Back
                        </Button>
                        <Button
                          onClick={handleBookingSubmit}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Confirm Booking"}
                          <CreditCard className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 bg-transparent"
                onClick={handlePhoneCall}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 rounded-2xl p-8 mx-auto max-w-4xl shadow-2xl">
              <div className="bg-white rounded-lg p-6 shadow-inner">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Modern Fleet</h3>
                    <p className="text-gray-600">
                      Experience comfort with our premium AC sleeper buses equipped with modern amenities
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Snowflake className="w-4 h-4 mr-1 text-blue-500" />
                        <span>AC Sleeper</span>
                      </div>
                      <div className="flex items-center">
                        <Wifi className="w-4 h-4 mr-1 text-green-500" />
                        <span>Free WiFi</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-purple-500" />
                        <span>Safe & Clean</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {/* Bus Illustration using CSS and Icons */}
                    <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg min-h-[200px] flex items-center justify-center relative overflow-hidden">
                      {/* Bus Body */}
                      <div className="relative">
                        <div className="bg-white rounded-lg p-4 shadow-md">
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <Bus className="w-12 h-12 text-blue-600" />
                            <div className="text-center">
                              <h4 className="font-bold text-gray-900">Nandighosh</h4>
                              <p className="text-xs text-gray-600">Premium AC Sleeper</p>
                            </div>
                          </div>

                          {/* Bus Features */}
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center p-2 bg-blue-50 rounded">
                              <Snowflake className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                              <span className="text-gray-700">AC</span>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                              <Wifi className="w-4 h-4 mx-auto text-green-600 mb-1" />
                              <span className="text-gray-700">WiFi</span>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <Shield className="w-4 h-4 mx-auto text-purple-600 mb-1" />
                              <span className="text-gray-700">Safe</span>
                            </div>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                          Premium Service
                        </div>
                      </div>

                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                          <Star className="w-4 h-4 text-yellow-300" />
                        </div>
                        <div className="absolute top-1/3 right-2">
                          <CheckCircle className="w-4 h-4 text-green-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Bar */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">On-Time</p>
                        <p className="text-xs text-gray-500">98% Punctual</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">Rated</p>
                        <p className="text-xs text-gray-500">4.8/5 Stars</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">Safe</p>
                        <p className="text-xs text-gray-500">CCTV Monitored</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">Routes</p>
                        <p className="text-xs text-gray-500">15+ Cities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section id="routes" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Routes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most traveled routes connecting major cities across Odisha and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Route 1 */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Daily Service
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>
                <CardTitle className="text-xl">Balasore to Sambalpur</CardTitle>
                <CardDescription>Comfortable journey through scenic Odisha</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>8 hours journey</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Multiple pickup points</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-blue-600">₹450</span>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBooking("balasore-sambalpur")}
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route 2 */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Express Service
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                </div>
                <CardTitle className="text-xl">Balasore to Jamshedpur</CardTitle>
                <CardDescription>Quick interstate connection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>4 hours journey</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Direct route</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-blue-600">₹280</span>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBooking("balasore-jamshedpur")}
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route 3 */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Luxury Service
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.7</span>
                  </div>
                </div>
                <CardTitle className="text-xl">Balasore to Berhampur</CardTitle>
                <CardDescription>Coastal route with premium comfort</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>6 hours journey</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Scenic coastal route</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-blue-600">₹380</span>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBooking("balasore-berhampur")}
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Nandighosh Bus?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium services and customer-first approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div
              className="text-center group cursor-pointer"
              onClick={() =>
                toast({
                  title: "AC Sleeper Coaches",
                  description:
                    "Experience premium comfort with our fully air-conditioned sleeper buses featuring individual reading lights and charging points.",
                })
              }
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Snowflake className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AC Sleeper Coaches</h3>
              <p className="text-gray-600">
                Premium air-conditioned sleeper buses with comfortable berths for a restful journey
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="text-center group cursor-pointer"
              onClick={() =>
                toast({
                  title: "Online Ticketing",
                  description:
                    "Book your tickets instantly through our website or mobile app with secure payment options and instant confirmation.",
                })
              }
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Online Ticketing</h3>
              <p className="text-gray-600">Easy online booking system with instant confirmation and digital tickets</p>
            </div>

            {/* Feature 3 */}
            <div
              className="text-center group cursor-pointer"
              onClick={() =>
                toast({
                  title: "Timely Departure",
                  description:
                    "We pride ourselves on punctuality with 98% on-time performance and real-time tracking updates.",
                })
              }
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Departure</h3>
              <p className="text-gray-600">Punctual service with on-time departures and arrivals you can count on</p>
            </div>

            {/* Feature 4 */}
            <div
              className="text-center group cursor-pointer"
              onClick={() =>
                toast({
                  title: "Clean & Safe",
                  description:
                    "Regular sanitization, clean restrooms, CCTV monitoring, and trained drivers ensure your safety and comfort.",
                })
              }
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean & Safe</h3>
              <p className="text-gray-600">
                Hygienic facilities, clean toilets, and safety measures for your peace of mind
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div
                className="flex items-center justify-center space-x-3 cursor-pointer hover:bg-white/10 rounded-lg p-3 transition-colors"
                onClick={() =>
                  toast({
                    title: "Free WiFi",
                    description:
                      "Stay connected throughout your journey with complimentary high-speed WiFi on all our buses.",
                  })
                }
              >
                <Wifi className="w-6 h-6" />
                <span className="font-medium">Free WiFi</span>
              </div>
              <div
                className="flex items-center justify-center space-x-3 cursor-pointer hover:bg-white/10 rounded-lg p-3 transition-colors"
                onClick={() =>
                  toast({
                    title: "24/7 Support",
                    description:
                      "Our customer support team is available round the clock to assist you with any queries or emergencies.",
                  })
                }
              >
                <Phone className="w-6 h-6" />
                <span className="font-medium">24/7 Support</span>
              </div>
              <div
                className="flex items-center justify-center space-x-3 cursor-pointer hover:bg-white/10 rounded-lg p-3 transition-colors"
                onClick={() =>
                  toast({
                    title: "GPS Tracking",
                    description:
                      "Track your bus in real-time and share your location with family for added peace of mind.",
                  })
                }
              >
                <MapPin className="w-6 h-6" />
                <span className="font-medium">GPS Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? Need assistance? We're here to help you plan your perfect journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                      <Input
                        value={contactData.name}
                        onChange={(e) => setContactData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                      <Input
                        value={contactData.phone}
                        onChange={(e) => setContactData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <Textarea
                      value={contactData.message}
                      onChange={(e) => setContactData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="How can we help you?"
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & WhatsApp */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Quick Contact</CardTitle>
                  <CardDescription>Reach us directly for immediate assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">WhatsApp Support</h3>
                      <p className="text-gray-600">Get instant help on WhatsApp</p>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleWhatsAppClick}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-4 mb-4">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <button onClick={handlePhoneCall} className="font-medium hover:text-blue-600 transition-colors">
                        +91 98765 43210
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a
                        href="mailto:info@nandighoshbus.com"
                        className="font-medium hover:text-blue-600 transition-colors"
                      >
                        info@nandighoshbus.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile App Banner */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Download Our App</h3>
                      <p className="text-purple-100 mb-4">
                        Book tickets, track buses, and manage your journey on the go
                      </p>
                      <div className="flex space-x-3">
                        <Button variant="secondary" size="sm" onClick={() => handleAppDownload("play")}>
                          <Download className="w-4 h-4 mr-2" />
                          Play Store
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleAppDownload("app")}>
                          <Download className="w-4 h-4 mr-2" />
                          App Store
                        </Button>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Mobile App"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/images/nandighosh-logo.png"
                  alt="Nandighosh Tours & Travels"
                  width={180}
                  height={54}
                  className="h-10 w-auto invert dark:invert-0 transition-all duration-300"

                />
                <p className="text-gray-400 text-sm">Connecting Odisha, Comfortably</p>
              </div>
              <p className="text-gray-400">
                Your trusted travel partner for comfortable and reliable bus journeys across Odisha.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("routes")} className="hover:text-white transition-colors">
                    Routes
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">
                    Why Choose Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsBookingOpen(true)} className="hover:text-white transition-colors">
                    Book Tickets
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AC Sleeper Buses</li>
                <li>Online Booking</li>
                <li>24/7 Support</li>
                <li>GPS Tracking</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <button onClick={handlePhoneCall} className="block hover:text-white transition-colors">
                  +91 98765 43210
                </button>
                <a href="mailto:info@nandighoshbus.com" className="block hover:text-white transition-colors">
                  info@nandighoshbus.com
                </a>
                <p>Balasore, Odisha, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nandighosh Bus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
