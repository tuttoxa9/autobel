"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu, Phone } from "lucide-react"
import { doc, getDoc, collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Каталог", href: "/catalog" },
  { name: "Кредит", href: "/credit" },
  { name: "Лизинг", href: "/leasing" },
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
  { name: "Отзывы", href: "/reviews" },
]

interface Settings {
  companyName: string
  phone: string
  workingHours: string
}

export default function Header() {
  const pathname = usePathname()
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "" })
  const [settings, setSettings] = useState<Settings>({
    companyName: "БелАвто Центр",
    phone: "+375 29 123-45-67",
    workingHours: "Ежедневно 9:00-21:00",
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

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        type: "callback",
        status: "new",
        createdAt: new Date(),
      })
      setIsCallbackOpen(false)
      setFormData({ name: "", phone: "" })
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Мобильное меню */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="flex items-center space-x-3 mb-8 p-4 border-b">
              <img src="/logo.png" alt="БелАвто Центр" className="h-14 w-14 object-contain" />
              <span className="font-bold text-xl text-gray-900">{settings.companyName}</span>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              {navigation
                .filter((item) => !["/", "/catalog", "/leasing", "/contacts"].includes(item.href))
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                      pathname === item.href ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
            <div className="mt-8 p-4 border-t">
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="text-blue-600 font-semibold text-lg block mb-4"
              >
                {settings.phone}
              </a>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Связаться</Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Логотип */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.png" alt="БелАвто Центр" className="h-12 w-12 object-contain" />
          <span className="font-display font-bold text-lg sm:text-xl text-gray-900 tracking-tight">{settings.companyName}</span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-blue-600 ${
                pathname === item.href ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Контакты и кнопка звонка */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex flex-col items-end">
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-sm font-bold text-gray-900 tracking-tight">
              {settings.phone}
            </a>
            <span className="text-xs text-gray-500 font-medium">{settings.workingHours}</span>
          </div>

          <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Заказать звонок
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Заказать обратный звонок</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
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
        </div>
      </div>
    </header>
  )
}
