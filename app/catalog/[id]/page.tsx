"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Car,
  Phone,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react"

// Моковые данные для демонстрации
const mockCar = {
  id: "1",
  make: "BMW",
  model: "X5",
  year: 2020,
  price: 95000,
  currency: "BYN",
  mileage: 45000,
  engineVolume: 3.0,
  fuelType: "Дизель",
  transmission: "Автомат",
  driveTrain: "Полный",
  bodyType: "Внедорожник",
  color: "Черный металлик",
  description:
    "Автомобиль в отличном состоянии. Один владелец, полная сервисная история. Все ТО проводились у официального дилера. Автомобиль не участвовал в ДТП, не требует дополнительных вложений.",
  imageUrls: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  isAvailable: true,
  features: [
    "Кожаный салон",
    "Панорамная крыша",
    "Навигационная система",
    "Камера заднего вида",
    "Парктроник",
    "Климат-контроль",
    "Подогрев сидений",
    "Ксеноновые фары",
    "Легкосплавные диски",
    "Круиз-контроль",
  ],
  specifications: {
    Двигатель: "3.0л Дизель",
    Мощность: "265 л.с.",
    "Коробка передач": "Автомат 8-ступ.",
    Привод: "Полный",
    "Расход топлива": "7.2л/100км",
    "Разгон 0-100": "6.5 сек",
    "Максимальная скорость": "230 км/ч",
    "Количество мест": "5",
    "Объем багажника": "650л",
    Масса: "2100 кг",
  },
}

export default function CarDetailsPage() {
  const params = useParams()
  const [car, setCar] = useState(mockCar)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", message: "" })
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "" })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-BY", {
      style: "currency",
      currency: "BYN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("ru-BY").format(mileage)
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.startsWith("375")) {
      const formatted = numbers.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3-$4-$5")
      return formatted
    }
    return value
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Сохранение заявки в Firebase
    console.log("Бронирование:", bookingForm)
    setIsBookingOpen(false)
    setBookingForm({ name: "", phone: "", message: "" })
  }

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Сохранение заявки в Firebase
    console.log("Заявка на звонок:", callbackForm)
    setIsCallbackOpen(false)
    setCallbackForm({ name: "", phone: "" })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.imageUrls.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.imageUrls.length) % car.imageUrls.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-blue-600">
                Главная
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/catalog" className="hover:text-blue-600">
                Каталог
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900">
              {car.make} {car.model}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Фотогалерея */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={car.imageUrls[currentImageIndex] || "/placeholder.svg"}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />

                {/* Навигация по фото */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Индикаторы */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {car.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Миниатюры */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {car.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Информация и действия */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {car.make} {car.model} {car.year}
                    </h1>
                    <div className="flex items-center space-x-2 mt-2">
                      {car.isAvailable ? (
                        <Badge className="bg-green-100 text-green-800">В наличии</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Продан</Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-blue-600">{formatPrice(car.price)}</div>

                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />В избранное
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Поделиться
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{car.year} г.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gauge className="h-4 w-4 text-gray-500" />
                      <span>{formatMileage(car.mileage)} км</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-4 w-4 text-gray-500" />
                      <span>
                        {car.engineVolume}л {car.fuelType}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-gray-500" />
                      <span>{car.driveTrain} привод</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                      <span>{car.color}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Рассчитать кредит
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Действия */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-transparent" size="lg" variant="outline">
                      Забронировать
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Забронировать автомобиль</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="bookingName">Ваше имя</Label>
                        <Input
                          id="bookingName"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="bookingPhone">Номер телефона</Label>
                        <Input
                          id="bookingPhone"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: formatPhoneNumber(e.target.value) })}
                          placeholder="+375 XX XXX-XX-XX"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="bookingMessage">Комментарий</Label>
                        <Textarea
                          id="bookingMessage"
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                          placeholder="Дополнительная информация..."
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Забронировать
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      <Phone className="h-5 w-5 mr-2" />
                      Заказать звонок
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Заказать обратный звонок</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCallbackSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="callbackName">Ваше имя</Label>
                        <Input
                          id="callbackName"
                          value={callbackForm.name}
                          onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="callbackPhone">Номер телефона</Label>
                        <Input
                          id="callbackPhone"
                          value={callbackForm.phone}
                          onChange={(e) =>
                            setCallbackForm({ ...callbackForm, phone: formatPhoneNumber(e.target.value) })
                          }
                          placeholder="+375 XX XXX-XX-XX"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Заказать звонок
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Детальная информация */}
        <div className="mt-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="equipment">Комплектация</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">{car.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(car.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
