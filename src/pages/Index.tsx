import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import InteractiveMap from '@/components/InteractiveMap';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">АгроТех</div>
            <div className="hidden md:flex items-center gap-8">
              {['О нас', 'Реализация', 'Вакансии', 'Контакты'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(['about', 'products', 'careers', 'contacts'][idx])}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <Button className="bg-primary hover:bg-primary/90">Связаться</Button>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-agro-green/20 via-agro-lime/10 to-agro-yellow/20"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in text-foreground">
              Технологии будущего в агробизнесе
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Инновационные решения для современного сельского хозяйства
            </p>
            <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button onClick={() => scrollToSection('about')} size="lg" className="bg-primary hover:bg-primary/90">
                Узнать больше
              </Button>
              <Button onClick={() => scrollToSection('contacts')} size="lg" variant="outline">
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-primary" />
        </div>
      </section>

      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center text-foreground">О нас</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {[
              { icon: 'MapPin', title: 'География', desc: '15+ филиалов по всей стране', delay: '0s' },
              { icon: 'Building2', title: 'Структура', desc: 'Единая корпоративная система', delay: '0.1s' },
              { icon: 'Calendar', title: 'История', desc: '25 лет на рынке', delay: '0.2s' },
              { icon: 'Heart', title: 'Социальная ответственность', desc: 'Забота о людях и природе', delay: '0.3s' }
            ].map((item, idx) => (
              <Card key={idx} className="hover-lift hover:shadow-xl transition-all animate-scale-in" style={{ animationDelay: item.delay }}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={item.icon as any} size={32} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-lg">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <h3 className="text-3xl font-bold mb-8 text-center">География присутствия</h3>
            <InteractiveMap />
          </div>
        </div>
      </section>

      <section id="timeline" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-5xl font-bold text-center mb-4">История компании</h2>
          <p className="text-center text-muted-foreground text-lg">25 лет инноваций и роста</p>
        </div>
        <div className="overflow-x-auto pb-8">
          <div className="flex gap-8 px-6" style={{ width: 'max-content' }}>
            {[
              { year: '1999', title: 'Основание', desc: 'Создание первого филиала в Москве' },
              { year: '2005', title: 'Расширение', desc: 'Открытие 5 региональных представительств' },
              { year: '2012', title: 'Цифровизация', desc: 'Внедрение автоматизированных систем' },
              { year: '2018', title: 'Инновации', desc: 'Запуск собственного R&D центра' },
              { year: '2024', title: 'Лидерство', desc: 'Топ-3 агрокомпаний страны' }
            ].map((item, idx) => (
              <div key={idx} className="w-80 hover-lift">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-full">
                  <div className="text-5xl font-bold text-primary mb-4">{item.year}</div>
                  <h4 className="text-2xl font-semibold mb-3">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="responsibility" className="py-24 bg-gradient-to-br from-agro-green/5 to-agro-lime/5">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center">Социальная ответственность</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌱', title: 'Экология', value: '100%', desc: 'Экологичное производство' },
              { icon: '👥', title: 'Сотрудники', value: '2500+', desc: 'Рабочих мест создано' },
              { icon: '🎓', title: 'Обучение', value: '500+', desc: 'Специалистов обучено ежегодно' }
            ].map((item, idx) => (
              <Card key={idx} className="hover-lift hover:shadow-xl transition-all text-center">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center">Реализация</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-lift hover:shadow-2xl transition-all overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-agro-green to-agro-lime" />
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-4">Товарная продукция</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Высококачественная сельхозпродукция: зерновые, масличные, бобовые культуры
                </p>
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Связаться с отделом реализации
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-lift hover:shadow-2xl transition-all overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-agro-yellow to-agro-earth" />
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-4">Техника БУ</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Надежная сельхозтехника с полным техническим обслуживанием и документацией
                </p>
                <Button variant="outline" className="w-full">
                  <Icon name="FileText" size={20} className="mr-2" />
                  Скачать каталог техники
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="careers" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center">Вакансии</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Агроном', location: 'Краснодар', type: 'Полная занятость', salary: 'от 80 000 ₽' },
              { title: 'Специалист по закупкам', location: 'Москва', type: 'Полная занятость', salary: 'от 100 000 ₽' },
              { title: 'Механизатор', location: 'Ставрополь', type: 'Сезонная работа', salary: 'от 70 000 ₽' }
            ].map((job, idx) => (
              <Card key={idx} className="hover-lift hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                      <div className="flex gap-4 text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={16} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Briefcase" size={16} />
                          {job.type}
                        </span>
                      </div>
                      <Badge className="bg-primary text-white">{job.salary}</Badge>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Откликнуться</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-3xl font-semibold mb-6">Свяжитесь с нами</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">info@agrotech.ru</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Отправить сообщение</h3>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Ваше имя" className="h-12" />
                  </div>
                  <div>
                    <Input placeholder="Email" type="email" className="h-12" />
                  </div>
                  <div>
                    <Input placeholder="Телефон" type="tel" className="h-12" />
                  </div>
                  <div>
                    <Textarea placeholder="Ваше сообщение" rows={5} />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12">
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">АгроТех</h4>
              <p className="text-white/70">Технологии будущего в агробизнесе</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <div className="space-y-2 text-white/70">
                <div>О нас</div>
                <div>История</div>
                <div>Вакансии</div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Продукция</h5>
              <div className="space-y-2 text-white/70">
                <div>Товарная продукция</div>
                <div>Техника</div>
                <div>Услуги</div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-white/70">
                <div>+7 (495) 123-45-67</div>
                <div>info@agrotech.ru</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/70">
            © 2024 АгроТех. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;