"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, ImageIcon } from "lucide-react"
import ImageUpload from "./image-upload"

export default function AdminStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingStory, setEditingStory] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [storyForm, setStoryForm] = useState({
    mediaUrl: "",
    mediaType: "image",
    caption: "",
    order: 1,
  })

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      const storiesQuery = query(collection(db, "stories"), orderBy("order", "asc"))
      const snapshot = await getDocs(storiesQuery)
      const storiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setStories(storiesData)
    } catch (error) {
      console.error("Ошибка загрузки историй:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const storyData = {
        ...storyForm,
        order: Number(storyForm.order),
        createdAt: editingStory ? editingStory.createdAt : new Date(),
        updatedAt: new Date(),
      }

      if (editingStory) {
        await updateDoc(doc(db, "stories", editingStory.id), storyData)
      } else {
        await addDoc(collection(db, "stories"), storyData)
      }

      setIsDialogOpen(false)
      setEditingStory(null)
      resetForm()
      loadStories()
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      alert("Ошибка сохранения истории")
    }
  }

  const handleEdit = (story) => {
    setEditingStory(story)
    setStoryForm({
      mediaUrl: story.mediaUrl,
      mediaType: story.mediaType,
      caption: story.caption,
      order: story.order.toString(),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (storyId) => {
    if (confirm("Удалить эту историю?")) {
      try {
        await deleteDoc(doc(db, "stories", storyId))
        loadStories()
      } catch (error) {
        console.error("Ошибка удаления:", error)
        alert("Ошибка удаления истории")
      }
    }
  }

  const resetForm = () => {
    setStoryForm({
      mediaUrl: "",
      mediaType: "image",
      caption: "",
      order: stories.length + 1,
    })
  }

  if (loading) {
    return <div className="text-center py-8 text-white">Загрузка...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Управление новостями</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm()
                setEditingStory(null)
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Добавить новость
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">{editingStory ? "Редактировать" : "Добавить"} новость</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white">Изображение</Label>
                <ImageUpload
                  onUpload={(url) => setStoryForm({ ...storyForm, mediaUrl: url })}
                  path="stories"
                  currentImage={storyForm.mediaUrl}
                />
              </div>

              <div>
                <Label className="text-white">Тип медиа</Label>
                <Select
                  value={storyForm.mediaType}
                  onValueChange={(value) => setStoryForm({ ...storyForm, mediaType: value })}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="image">Изображение</SelectItem>
                    <SelectItem value="video">Видео</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Подпись</Label>
                <Input
                  value={storyForm.caption}
                  onChange={(e) => setStoryForm({ ...storyForm, caption: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <Label className="text-white">Порядок отображения</Label>
                <Input
                  type="number"
                  value={storyForm.order}
                  onChange={(e) => setStoryForm({ ...storyForm, order: e.target.value })}
                  min="1"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500">
                  {editingStory ? "Сохранить" : "Добавить"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  Отмена
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
            <CardContent className="p-4">
              <div className="aspect-square bg-slate-700 rounded-lg mb-3 overflow-hidden">
                <img
                  src={story.mediaUrl || "/placeholder.svg"}
                  alt={story.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm text-white">{story.caption}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Порядок: {story.order}</span>
                  <span>{story.mediaType === "video" ? "Видео" : "Фото"}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(story)}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(story.id)}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <p className="text-slate-400">Новости не добавлены</p>
        </div>
      )}
    </div>
  )
}
