"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Stories from "@/components/stories"
import CarCard from "@/components/car-card"
import { CheckCircle } from "lucide-react"
import { collection, query, orderBy, limit, getDocs, doc, getDoc, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface HomepageSettings {
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
  ctaTitle: string
  ctaSubtitle: string
}

// Моковые данные удалены

export default function HomePage() {
  const [searchForm, setSearchForm] = useState({
    make: "",
    model: "",
    priceFrom: "",
    priceTo: "",
  })

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
  })

  const [cars, setCars] = useState([])
  const [settings, setSettings] = useState<HomepageSettings>({
    heroTitle: "Найди свой автомобиль надежным способом",
    heroSubtitle: "Более 500 проверенных автомобилей. Гарантия качества. Помощь в оформлении кредита.",
    heroButtonText: "Посмотреть каталог",
    ctaTitle: "Не нашли подходящий автомобиль?",
    ctaSubtitle: "Оставьте заявку, и мы подберем автомобиль специально для вас",
  })

  useEffect(() => {
    loadHomepageSettings()
    loadFeaturedCars()
  }, [])

  const loadHomepageSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, "settings", "homepage"))
      if (settingsDoc.exists()) {
        const data = settingsDoc.data() as Partial<HomepageSettings>
        setSettings((prev) => ({
          ...prev,
          ...data,
        }))
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек главной страницы:", error)
    }
  }

  const loadFeaturedCars = async () => {
    try {
      const carsQuery = query(collection(db, "cars"), orderBy("createdAt", "desc"), limit(4))
      const snapshot = await getDocs(carsQuery)
      const carsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      if (carsData.length > 0) {
        setCars(carsData as any)
      }
    } catch (error) {
      console.error("Ошибка загрузки автомобилей:", error)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchForm.make) params.set("make", searchForm.make)
    if (searchForm.model) params.set("model", searchForm.model)
    if (searchForm.priceFrom) params.set("priceFrom", searchForm.priceFrom)
    if (searchForm.priceTo) params.set("priceTo", searchForm.priceTo)

    window.location.href = `/catalog?${params.toString()}`
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "leads"), {
        ...contactForm,
        type: "car_selection",
        status: "new",
        createdAt: new Date(),
      })
      setContactForm({ name: "", phone: "" })
      alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.")
    } catch (error) {
      console.error("Ошибка отправки заявки:", error)
      alert("Произошла ошибка. Попробуйте еще раз.")
    }
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.startsWith("375")) {
      const formatted = numbers.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3-$4-$5")
      return formatted
    }
    return value
  }

  return (
    <div className="min-h-screen">
      {/* Главный баннер */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/audi-bg.jpg')`,
          }}
        />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{settings.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">{settings.heroSubtitle}</p>

          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4" asChild>
            <a href="/catalog">{settings.heroButtonText}</a>
          </Button>
        </div>
      </section>

      {/* Блок "Свежие поступления и новости" */}
      <Stories />

      {/* Блок "Специальное предложение" */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Специальное предложение</h2>
            <p className="text-xl text-gray-600">Лучшие автомобили по выгодным ценам</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <a href="/catalog">Посмотреть весь каталог</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Блок призыва к действию */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{settings.ctaTitle}</h2>
            <p className="text-xl mb-8 text-blue-100">{settings.ctaSubtitle}</p>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="contactName" className="text-gray-700">
                      Ваше имя
                    </Label>
                    <Input
                      id="contactName"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone" className="text-gray-700">
                      Номер телефона
                    </Label>
                    <Input
                      id="contactPhone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: formatPhoneNumber(e.target.value) })}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Подобрать автомобиль
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
