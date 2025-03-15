import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Menu, Home, Building2, UserPlus, MapPin, Phone, Mail, Star, Menu as MenuIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const welcomeSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80",
    title: "Bem-vindo ao Elite Club",
    description: "Um clube exclusivo para os apreciadores da mais alta arquitetura",
    subtitle: "Onde luxo encontra exclusividade",
    features: ["Acesso VIP", "Eventos Exclusivos", "Consultoria Personalizada"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    title: "Experiências Únicas",
    description: "Descubra um mundo de privilégios e oportunidades exclusivas",
    subtitle: "Seu estilo de vida, elevado",
    features: ["Network Seleto", "Previews Privados", "Concierge 24/7"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
    title: "Clube Elite Properties",
    description: "Uma comunidade de distinção e refinamento",
    subtitle: "Sua jornada começa aqui",
    features: ["Membros Selecionados", "Benefícios Exclusivos", "Lifestyle Premium"]
  },
  {
    id: 4,
    image: "https://images.dwell.com/photos-6176523132546707456/6382668261784788992-large/soaring-great-rooms-boast-seamless-indoor-outdoor-access-with-sliding-walls-of-glass-showcasing-striking-city-views.jpg",
    title: "Arquitetura Excepcional",
    description: "Espaços que transcendem o ordinário",
    subtitle: "Design sem limites",
    features: ["Vistas Panorâmicas", "Acabamentos Premium", "Integração Total"]
  },
  {
    id: 5,
    image: "https://swellconstrucoes.com.br/wp-content/uploads/2020/11/SWELL_SILVA_duplex_v04_01-1.jpg",
    title: "Residências Únicas",
    description: "Cada detalhe pensado para sua excelência",
    subtitle: "Luxo em cada detalhe",
    features: ["Projetos Exclusivos", "Personalização Total", "Localização Premium"]
  }
];

const featuredProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80",
    title: "Villa Moderna",
    description: "Luxuosa mansão contemporânea com vista para o mar",
    features: ["6 Quartos", "8 Banheiros", "Piscina infinita", "1200m²"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    title: "Residência Elegance",
    description: "Casa moderna com acabamentos premium",
    features: ["5 Quartos", "6 Banheiros", "Jardim zen", "800m²"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
    title: "Penthouse Sky",
    description: "Cobertura duplex com terraço panorâmico",
    features: ["4 Quartos", "5 Banheiros", "Terraço", "600m²"]
  }
];

const featuredLocations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1920&q=80",
    title: "Alphaville",
    properties: 12
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
    title: "Jardins",
    properties: 8
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80",
    title: "Vila Nova ",
    properties: 15
  }
];

const testimonials = [
  {
    id: 1,
    name: "Roberto Silva",
    role: "Membro Elite desde 2022",
    text: "Fazer parte do Elite Club transformou minha experiência com imóveis de luxo. O networking e os eventos exclusivos são incomparáveis.",
    rating: 5
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Membro Elite desde 2021",
    text: "A exclusividade e o atendimento personalizado do clube excedem todas as expectativas. Uma experiência verdadeiramente premium.",
    rating: 5
  }
];

function App() {
  const homeRef = useRef<HTMLDivElement>(null);
  const apartmentsRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    investment: ''
  });

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare the template parameters with all form data
      // Make sure these parameter names match exactly with your EmailJS template variables
      const templateParams = {
        to_name: 'Administrador',
        to_email: 'sadilsonsamuel4@gmail.com',
        name: formData.name,           // Variable for user's name
        email: formData.email,         // Variable for user's email
        phone: formData.phone,         // Variable for user's phone
        investment: formData.investment, // Variable for investment range
        message: `Nova solicitação de associação ao Elite Club:\n\n
Nome Completo: ${formData.name}\n
Email: ${formData.email}\n
Telefone: ${formData.phone}\n
Faixa de Investimento: ${formData.investment}\n\n
Data de envio: ${new Date().toLocaleString('pt-BR')}`
      };

      console.log('Sending data to EmailJS:', templateParams);

      // Send the email using EmailJS
      const response = await emailjs.send(
        'service_h8j0a6u',
        'template_njt6j09',
        templateParams,
        'KuUbgrhlXxe9fpam9'
      );

      console.log('Email enviado com sucesso:', response);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        investment: ''
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-stone-900/95 backdrop-blur-sm text-white p-4 fixed w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-amber-400" />
            <span className="text-xl font-serif">Elite Club</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection(homeRef)}
              className="flex items-center space-x-2 hover:text-amber-400 transition-colors duration-300"
            >
              <Menu className="w-5 h-5" />
              <span>Clube</span>
            </button>
            <button 
              onClick={() => scrollToSection(apartmentsRef)}
              className="flex items-center space-x-2 hover:text-amber-400 transition-colors duration-300"
            >
              <Building2 className="w-5 h-5" />
              <span>Propriedades</span>
            </button>
            <button 
              onClick={() => scrollToSection(joinRef)}
              className="flex items-center space-x-2 hover:text-amber-400 transition-colors duration-300"
            >
              <UserPlus className="w-5 h-5" />
              <span>Associe-se</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-stone-900/95 backdrop-blur-sm transition-all duration-300 ${mobileMenuOpen ? 'max-h-48 py-4' : 'max-h-0 overflow-hidden'}`}>
          <div className="container mx-auto flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection(homeRef)}
              className="flex items-center space-x-2 hover:text-amber-400 transition-colors duration-300 px-4"
            >
              <Menu className="w-5 h-5" />
              <span>Clube</span>
            </button>
            <button 
              onClick={() => scrollToSection(apartmentsRef)}
              className="flex items-center space-x-2 hover:text-amber-400 transition-colors duration-300 px-4"
            >
              <Building2 className="w-5 h-5" />
              <span>Propriedades</span>
            </button>
            <button 
              onClick={() => scrollToSection(joinRef)}
              className="flex items-center space-x-2 hover:text-amber-400 transition-colors duration-300 px-4"
            >
              <UserPlus className="w-5 h-5" />
              <span>Associe-se</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Home Section */}
        <div ref={homeRef} className="pt-16">
          <div className="relative">
            <Slider {...sliderSettings}>
              {welcomeSlides.map((slide) => (
                <div key={slide.id} className="relative h-[90vh]">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto text-center px-4">
                      <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">{slide.title}</h1>
                      <p className="text-xl md:text-3xl text-amber-400 mb-6">{slide.subtitle}</p>
                      <p className="text-lg md:text-2xl text-stone-200 mb-8">{slide.description}</p>
                      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
                        {slide.features.map((feature, index) => (
                          <span key={index} className="text-white/90 text-sm md:text-xl border border-amber-400/30 px-4 md:px-6 py-2 rounded-full backdrop-blur-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <section className="container mx-auto py-20 px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-12 text-center">Localizações Exclusivas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredLocations.map((location) => (
                <div key={location.id} className="group relative overflow-hidden rounded-lg shadow-xl">
                  <img 
                    src={location.image} 
                    alt={location.title}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-serif text-white mb-2">{location.title}</h3>
                    <p className="text-amber-400">{location.properties} propriedades exclusivas</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-stone-900 text-white py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Depoimentos dos Membros</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-stone-800/50 p-6 md:p-8 rounded-lg backdrop-blur-sm">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-base md:text-lg italic mb-4">{testimonial.text}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-stone-400">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Properties Section */}
        <div ref={apartmentsRef} className="py-20 bg-stone-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-12">Propriedades Exclusivas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-amber-400 text-stone-900 px-4 py-1 rounded-full font-semibold">
                      Exclusivo
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-serif text-stone-800 mb-3">{property.title}</h3>
                    <p className="text-stone-600 mb-4">{property.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {property.features.map((feature, index) => (
                        <span key={index} className="text-stone-500 flex items-center gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-amber-400 rounded-full" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join Section */}
        <div ref={joinRef} className="py-20 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-12">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-8 text-center">Associe-se ao Elite Club</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700">Nome Completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="investment" className="block text-sm font-medium text-stone-700">Faixa de Investimento Pretendida</label>
                  <input
                    type="text"
                    id="investment"
                    name="investment"
                    value={formData.investment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Enviando...' : 'ENVIAR'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-center mt-4">Mensagem enviada com sucesso!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-center mt-4">Erro ao enviar mensagem. Por favor, tente novamente.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="w-6 h-6 text-amber-400" />
                <span className="text-xl font-serif">Elite Club</span>
              </div>
              <p className="text-stone-400">Sua porta de entrada para o mundo da exclusividade.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-400">
                  <MapPin className="w-5 h-5" />
                  <span>Patriota</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-400">
                  <Phone className="w-5 h-5" />
                  <span>+244 927439908</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-400">
                  <Mail className="w-5 h-5" />
                  <span>contato@eliteclub.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-stone-400 mb-4">Receba novidades exclusivas do clube.</p>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-4 py-2 rounded-md bg-stone-800 border border-stone-700 focus:outline-none focus:border-amber-400"
                />
                <button className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200">
                  Assinar
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-stone-400">
            <p>&copy; 2025 Elite Club. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;