import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileDock from "@/components/mobile-dock"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: "БелАвто Центр - Продажа автомобилей с пробегом в Беларуси",
  description:
    "Большой выбор качественных автомобилей с пробегом. Гарантия, кредит, лизинг. Более 500 проверенных автомобилей в наличии.",
  keywords: "автомобили с пробегом, купить авто, автосалон Минск, подержанные автомобили Беларусь",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  )
}
