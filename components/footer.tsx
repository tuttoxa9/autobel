"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Settings {
  companyName: string
  phone: string
  email: string
  address: string
  workingHours: string
  socialMedia: {
    instagram: string
    telegram: string
    vk: string
    viber: string
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [settings, setSettings] = useState<Settings>({
    companyName: "БелАвто Центр",
    phone: "+375 29 123-45-67",
    email: "info@belavto.by",
    address: "г. Минск, ул. Примерная, 123",
    workingHours: "Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-19:00",
    socialMedia: {
      instagram: "#",
      telegram: "#",
      vk: "#",
      viber: "#",
    },
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, "settings", "main"))
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data() as Settings)
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек:", error)
    }
  }

  return (
    <footer className="bg-gray-900 text-white mb-16 md:mb-0">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Колонка 1: Логотип и слоган */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="БелАвто Центр" className="h-8 w-8 object-contain" />
              <span className="font-bold text-xl">{settings.companyName}</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Надежный партнер в выборе качественного автомобиля с пробегом в Беларуси
            </p>
          </div>

          {/* Колонка 2: Карта сайта */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Навигация</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                Главная
              </Link>
              <Link href="/catalog" className="text-gray-400 hover:text-white transition-colors text-sm">
                Каталог
              </Link>
              <Link href="/credit" className="text-gray-400 hover:text-white transition-colors text-sm">
                Кредит
              </Link>
              <Link href="/leasing" className="text-gray-400 hover:text-white transition-colors text-sm">
                Лизинг
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                О нас
              </Link>
              <Link href="/contacts" className="text-gray-400 hover:text-white transition-colors text-sm">
                Контакты
              </Link>
              <Link href="/reviews" className="text-gray-400 hover:text-white transition-colors text-sm">
                Отзывы
              </Link>
            </nav>
          </div>

          {/* Колонка 3: Контактная информация */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  {settings.workingHours.split(", ").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Колонка 4: Социальные сети */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Мы в соцсетях</h3>
            <div className="flex space-x-4">
              <a href={settings.socialMedia.instagram} className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href={settings.socialMedia.telegram} className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href={settings.socialMedia.vk} className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zM12 18.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5zm6.5-11.5c-.828 0-1.5-.672-1.5-1.5S17.672 4 18.5 4 20 4.672 20 5.5 19.328 7 18.5 7z" />
                </svg>
              </a>
              <a href={settings.socialMedia.viber} className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.789l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя строка */}
      <div className="border-t border-gray-800">
        <div className="container px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {settings.companyName}. Все права защищены.
            </p>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
