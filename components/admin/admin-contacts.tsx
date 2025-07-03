"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2 } from "lucide-react"

export default function AdminContacts() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contactsData, setContactsData] = useState({
    title: "Контакты",
    subtitle: "Свяжитесь с нами любым удобным способом",
    address: "г. Минск, ул. Примерная, 123",
    addressNote: 'Рядом с торговым центром "Примерный"',
    phone: "+375 29 123-45-67",
    phoneNote: "Звонки принимаем ежедневно",
    email: "info@avtobusiness.by",
    emailNote: "Отвечаем в течение часа",
    workingHours: {
      weekdays: "Понедельник - Пятница: 9:00 - 21:00",
      weekends: "Суббота - Воскресенье: 10:00 - 19:00",
    },
    socialMedia: {
      instagram: "@avtobusiness_by",
      telegram: "@avtobusiness",
      vk: "vk.com/avtobusiness",
      viber: "+375 29 123-45-67",
    },
  })

  useEffect(() => {
    loadContactsData()
  }, [])

  const loadContactsData = async () => {
    try {
      const contactsDoc = await getDoc(doc(db, "pages", "contacts"))
      if (contactsDoc.exists()) {
        setContactsData(contactsDoc.data())
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveContactsData = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, "pages", "contacts"), contactsData)
      alert("Данные сохранены!")
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      alert("Ошибка сохранения данных")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Страница "Контакты"</h2>
        <Button onClick={saveContactsData} disabled={saving} className="bg-gradient-to-r from-purple-500 to-blue-500">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Сохранить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Основная информация */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Основная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Заголовок</Label>
              <Input
                value={contactsData.title}
                onChange={(e) => setContactsData({ ...contactsData, title: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Подзаголовок</Label>
              <Input
                value={contactsData.subtitle}
                onChange={(e) => setContactsData({ ...contactsData, subtitle: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Контактная информация */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Контактная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Адрес</Label>
              <Input
                value={contactsData.address}
                onChange={(e) => setContactsData({ ...contactsData, address: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Примечание к адресу</Label>
              <Input
                value={contactsData.addressNote}
                onChange={(e) => setContactsData({ ...contactsData, addressNote: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Телефон</Label>
              <Input
                value={contactsData.phone}
                onChange={(e) => setContactsData({ ...contactsData, phone: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Примечание к телефону</Label>
              <Input
                value={contactsData.phoneNote}
                onChange={(e) => setContactsData({ ...contactsData, phoneNote: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Email</Label>
              <Input
                value={contactsData.email}
                onChange={(e) => setContactsData({ ...contactsData, email: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Примечание к email</Label>
              <Input
                value={contactsData.emailNote}
                onChange={(e) => setContactsData({ ...contactsData, emailNote: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Время работы */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Время работы</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Будние дни</Label>
              <Input
                value={contactsData.workingHours.weekdays}
                onChange={(e) =>
                  setContactsData({
                    ...contactsData,
                    workingHours: { ...contactsData.workingHours, weekdays: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Выходные дни</Label>
              <Input
                value={contactsData.workingHours.weekends}
                onChange={(e) =>
                  setContactsData({
                    ...contactsData,
                    workingHours: { ...contactsData.workingHours, weekends: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Социальные сети */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Социальные сети</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Instagram</Label>
              <Input
                value={contactsData.socialMedia.instagram}
                onChange={(e) =>
                  setContactsData({
                    ...contactsData,
                    socialMedia: { ...contactsData.socialMedia, instagram: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Telegram</Label>
              <Input
                value={contactsData.socialMedia.telegram}
                onChange={(e) =>
                  setContactsData({
                    ...contactsData,
                    socialMedia: { ...contactsData.socialMedia, telegram: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">VKontakte</Label>
              <Input
                value={contactsData.socialMedia.vk}
                onChange={(e) =>
                  setContactsData({
                    ...contactsData,
                    socialMedia: { ...contactsData.socialMedia, vk: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Viber</Label>
              <Input
                value={contactsData.socialMedia.viber}
                onChange={(e) =>
                  setContactsData({
                    ...contactsData,
                    socialMedia: { ...contactsData.socialMedia, viber: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
