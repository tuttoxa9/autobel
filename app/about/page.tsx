import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Clock } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Довольных клиентов", value: "2500+" },
    { icon: Award, label: "Лет на рынке", value: "12" },
    { icon: Shield, label: "Проданных автомобилей", value: "5000+" },
    { icon: Clock, label: "Среднее время продажи", value: "7 дней" },
  ]

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
            <li className="text-gray-900">О нас</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">О компании АвтоБизнес</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы помогаем людям найти идеальный автомобиль уже более 12 лет. Наша миссия — сделать покупку автомобиля
            простой, безопасной и выгодной.
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Компания АвтоБизнес была основана в 2012 году с простой идеей: сделать покупку подержанного автомобиля
                максимально прозрачной и безопасной для покупателя.
              </p>
              <p>
                За годы работы мы выработали строгие стандарты отбора автомобилей, создали собственную систему проверки
                технического состояния и юридической чистоты каждого автомобиля в нашем каталоге.
              </p>
              <p>
                Сегодня АвтоБизнес — это команда профессионалов, которая помогает тысячам белорусов найти автомобиль
                мечты по справедливой цене.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Наши принципы</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Честность и прозрачность</h3>
                  <p className="text-gray-600">
                    Мы предоставляем полную информацию о каждом автомобиле, включая историю обслуживания и возможные
                    недостатки.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Качество превыше всего</h3>
                  <p className="text-gray-600">
                    Каждый автомобиль проходит тщательную проверку нашими специалистами перед попаданием в каталог.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Клиент — наш приоритет</h3>
                  <p className="text-gray-600">
                    Мы сопровождаем клиента на всех этапах покупки: от выбора до оформления документов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Услуги */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Проверка автомобилей</h3>
                <p className="text-gray-600">
                  Комплексная диагностика технического состояния и проверка юридической чистоты
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Гарантия</h3>
                <p className="text-gray-600">
                  Предоставляем гарантию на каждый проданный автомобиль сроком до 6 месяцев
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Кредитование</h3>
                <p className="text-gray-600">
                  Помощь в оформлении автокредита в партнерских банках на выгодных условиях
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Реквизиты */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Реквизиты компании</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Общая информация</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Полное наименование:</span> ООО "АвтоБизнес"
                  </p>
                  <p>
                    <span className="font-medium">УНП:</span> 123456789
                  </p>
                  <p>
                    <span className="font-medium">Дата регистрации:</span> 15.03.2012
                  </p>
                  <p>
                    <span className="font-medium">Юридический адрес:</span> г. Минск, ул. Примерная, 123
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Банковские реквизиты</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Расчетный счет:</span> BY12 ALFA 1234 5678 9012 3456 7890
                  </p>
                  <p>
                    <span className="font-medium">Банк:</span> ОАО "Альфа-Банк"
                  </p>
                  <p>
                    <span className="font-medium">БИК:</span> ALFABY2X
                  </p>
                  <p>
                    <span className="font-medium">Адрес банка:</span> г. Минск, пр. Дзержинского, 1
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
