"use client"

import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Settings, Car, FileText, MessageSquare, Users, Building, CreditCard, Star } from "lucide-react"
import AdminSettings from "@/components/admin/admin-settings"
import AdminCars from "@/components/admin/admin-cars"
import AdminStories from "@/components/admin/admin-stories"
import AdminLeads from "@/components/admin/admin-leads"
import AdminAbout from "@/components/admin/admin-about"
import AdminCredit from "@/components/admin/admin-credit"
import AdminContacts from "@/components/admin/admin-contacts"
import AdminReviews from "@/components/admin/admin-reviews"

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError("")

    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
    } catch (error) {
      setLoginError("Неверный email или пароль")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Ошибка выхода:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-xl">БА</span>
            </div>
            <CardTitle className="text-white text-2xl">Админ-панель</CardTitle>
            <p className="text-purple-200">БелАвто Центр</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white">
                  Пароль
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>
              {loginError && <div className="text-red-400 text-sm text-center">{loginError}</div>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Войти в админ-панель
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Шапка админки */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">БА</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Админ-панель</h1>
                <p className="text-sm text-purple-200">БелАвто Центр</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-purple-200">{user.email}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <div className="container px-4 py-8">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-black/20 backdrop-blur-lg border-white/10">
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
            <TabsTrigger
              value="cars"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Автомобили</span>
            </TabsTrigger>
            <TabsTrigger
              value="stories"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Новости</span>
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Заявки</span>
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">О нас</span>
            </TabsTrigger>
            <TabsTrigger
              value="credit"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Кредит</span>
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Контакты</span>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-200"
            >
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Отзывы</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6">
            <AdminSettings />
          </TabsContent>

          <TabsContent value="cars" className="mt-6">
            <AdminCars />
          </TabsContent>

          <TabsContent value="stories" className="mt-6">
            <AdminStories />
          </TabsContent>

          <TabsContent value="leads" className="mt-6">
            <AdminLeads />
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <AdminAbout />
          </TabsContent>

          <TabsContent value="credit" className="mt-6">
            <AdminCredit />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <AdminContacts />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <AdminReviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
