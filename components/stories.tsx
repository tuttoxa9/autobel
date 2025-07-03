"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Story {
  id: string
  mediaUrl: string
  mediaType: "image" | "video"
  caption: string
  order: number
  createdAt: Date
}

interface StoriesSettings {
  title: string
  subtitle: string
}

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const [settings, setSettings] = useState<StoriesSettings>({
    title: "Свежие поступления и новости",
    subtitle: "Следите за нашими обновлениями",
  })
  const [selectedStory, setSelectedStory] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStories()
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, "settings", "stories"))
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data() as StoriesSettings)
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек историй:", error)
    }
  }

  const loadStories = async () => {
    try {
      const storiesQuery = query(collection(db, "stories"), orderBy("order", "asc"))
      const snapshot = await getDocs(storiesQuery)
      const storiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Story[]

      setStories(storiesData)
    } catch (error) {
      console.error("Ошибка загрузки историй:", error)
      // Используем моковые данные в случае ошибки
      setStories([
        {
          id: "1",
          mediaUrl: "/placeholder.svg?height=600&width=400",
          mediaType: "image",
          caption: "Новое поступление BMW X5 2020",
          order: 1,
          createdAt: new Date(),
        },
        {
          id: "2",
          mediaUrl: "/placeholder.svg?height=600&width=400",
          mediaType: "image",
          caption: "Audi A6 в отличном состоянии",
          order: 2,
          createdAt: new Date(),
        },
        {
          id: "3",
          mediaUrl: "/placeholder.svg?height=600&width=400",
          mediaType: "image",
          caption: "Mercedes-Benz C-Class готов к продаже",
          order: 3,
          createdAt: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (selectedStory !== null && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [selectedStory, isPlaying])

  const handleStoryClick = (index: number) => {
    setSelectedStory(index)
    setCurrentIndex(index)
    setProgress(0)
    setIsPlaying(true)
    setViewedStories((prev) => new Set([...prev, stories[index].id]))
  }

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setProgress(0)
      setViewedStories((prev) => new Set([...prev, stories[nextIndex].id]))
    } else {
      setSelectedStory(null)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setProgress(0)
    }
  }

  const handleClose = () => {
    setSelectedStory(null)
    setProgress(0)
    setIsPlaying(true)
  }

  if (loading) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="container px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-24 h-24 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (stories.length === 0) return null

  return (
    <>
      {/* Лента историй */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{settings.title}</h2>
            <p className="text-xl text-gray-600">{settings.subtitle}</p>
          </div>
          <div className="flex space-x-6 overflow-x-auto pb-4 justify-center">
            {stories.map((story, index) => (
              <button key={story.id} onClick={() => handleStoryClick(index)} className="flex-shrink-0 relative group">
                <div
                  className={`w-24 h-24 rounded-xl p-1 transition-all duration-300 border-2 ${
                    viewedStories.has(story.id) ? "border-gray-300" : "border-blue-400 shadow-lg shadow-blue-200"
                  } group-hover:scale-110`}
                >
                  <div className="w-full h-full rounded-lg overflow-hidden bg-white">
                    <img
                      src={story.mediaUrl || "/placeholder.svg"}
                      alt={story.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {story.mediaType === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                )}
                <p className="text-xs text-center mt-2 text-gray-600 max-w-24 truncate">{story.caption}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Полноэкранный просмотрщик */}
      <Dialog open={selectedStory !== null} onOpenChange={handleClose}>
        <DialogContent className="max-w-md p-0 bg-black border-none">
          {selectedStory !== null && (
            <div className="relative h-[600px] w-full">
              {/* Индикаторы прогресса */}
              <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
                {stories.map((_, index) => (
                  <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100"
                      style={{
                        width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Контент истории */}
              <div className="relative h-full">
                {stories[currentIndex].mediaType === "image" ? (
                  <img
                    src={stories[currentIndex].mediaUrl || "/placeholder.svg"}
                    alt={stories[currentIndex].caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={stories[currentIndex].mediaUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  />
                )}

                {/* Подпись */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium drop-shadow-lg">{stories[currentIndex].caption}</p>
                </div>
              </div>

              {/* Кнопки управления */}
              <div className="absolute inset-0 flex">
                <button
                  onClick={handlePrevious}
                  className="flex-1 flex items-center justify-start pl-4"
                  disabled={currentIndex === 0}
                >
                  {currentIndex > 0 && <ChevronLeft className="h-8 w-8 text-white/70 hover:text-white" />}
                </button>

                <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center justify-center px-4">
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white/70 hover:text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white/70 hover:text-white" />
                  )}
                </button>

                <button onClick={handleNext} className="flex-1 flex items-center justify-end pr-4">
                  <ChevronRight className="h-8 w-8 text-white/70 hover:text-white" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
