"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react"

export default function ContactsPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.startsWith("375")) {
      const formatted = numbers.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3-$4-$5")
      return formatted
    }
    return value
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Сохранение заявки в Firebase
    console.log("Обратная связь:", contactForm)
    setContactForm({ name: "", phone: "", message: "" })
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
            <li className="text-gray-900">Контакты</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600">Свяжитесь с нами любым удобным способом</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Карта */}
          <div>
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Здесь должна быть интеграция с Яндекс.Картами */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <p>Яндекс.Карта будет здесь</p>
                      <p className="text-sm mt-2">г. Минск, ул. Примерная, 123</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Контактная информация */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Адрес</h3>
                    <p className="text-gray-600">г. Минск, ул. Примерная, 123</p>
                    <p className="text-sm text-gray-500 mt-1">Рядом с торговым центром "Примерный"</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Телефон</h3>
                    <a href="tel:+375291234567" className="text-blue-600 hover:text-blue-800 font-medium">
                      +375 29 123-45-67
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Звонки принимаем ежедневно</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href="mailto:info@avtobusiness.by" className="text-blue-600 hover:text-blue-800">
                      info@avtobusiness.by
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Отвечаем в течение часа</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Время работы</h3>
                    <div className="text-gray-600">
                      <p>Понедельник - Пятница: 9:00 - 21:00</p>
                      <p>Суббота - Воскресенье: 10:00 - 19:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Социальные сети */}
            <Card>
              <CardHeader>
                <CardTitle>Мы в социальных сетях</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Instagram className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-gray-500">@avtobusiness_by</p>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Telegram</p>
                      <p className="text-sm text-gray-500">@avtobusiness</p>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-6 w-6 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zM12 18.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5zm6.5-11.5c-.828 0-1.5-.672-1.5-1.5S17.672 4 18.5 4 20 4.672 20 5.5 19.328 7 18.5 7z" />
                    </svg>
                    <div>
                      <p className="font-medium">VKontakte</p>
                      <p className="text-sm text-gray-500">vk.com/avtobusiness</p>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium">Viber</p>
                      <p className="text-sm text-gray-500">+375 29 123-45-67</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Форма обратной связи */}
        <div className="mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Остались вопросы? Напишите нам</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input
                      id="phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: formatPhoneNumber(e.target.value) })}
                      placeholder="+375 XX XXX-XX-XX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Ваше сообщение</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Расскажите, чем мы можем помочь..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
