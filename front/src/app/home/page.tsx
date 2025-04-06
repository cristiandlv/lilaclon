"use client"

import ProductList from "@/components/productList"
import ImageSlider from "@/components/swiper/swiper"
import { Gift, Percent, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Slider - Full Width */}
      <section className="w-full">
        <ImageSlider />
      </section>

      {/* Featured Products Grid */}
      <section className="container mx-auto px-4 py-12 md:py-20 bg-gray-50 rounded-3xl my-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Productos Destacados</h2>
          <Link
            href="/products"
            className="text-base md:text-lg font-medium text-gray-900 hover:text-gray-700 flex items-center gap-2 transition-colors"
          >
            Ver colección completa
            <ArrowRight size={18} />
          </Link>
        </div>
        <ProductList limit={4} />

      </section>

      {/* Promotional Section - MacBook Air */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-gray-900 rounded-3xl overflow-hidden flex flex-col lg:flex-row items-stretch">
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 md:mb-6 w-fit">
              Nuevo
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">MacBook Air 15"</h2>
            <p className="text-gray-300 text-base md:text-xl mb-6 md:mb-8">
              Imponentemente grande. Imposiblemente delgado. El portátil perfecto para todo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products/macbook-air-15"
                className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-base md:text-lg font-semibold hover:bg-blue-700 transition-all duration-300 text-center"
              >
                Comprar desde $1,299
              </Link>
              <Link
                href="/products/mac"
                className="border border-white text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-base md:text-lg font-semibold hover:bg-white/10 transition-all duration-300 text-center"
              >
                Ver todos los Mac
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 h-[300px] md:h-[400px] lg:h-auto relative bg-gray-800">
            <img
              src="https://i.blogs.es/ae42e3/macbook-air-colores/1366_2000.jpeg"
              alt="MacBook Air 15 pulgadas"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-16 text-center">Por qué elegir Ringo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: <Gift size={36} className="text-blue-600" />,
              title: "Envío gratuito",
              description: "Recibe tus productos rápidamente con envío express gratuito en compras superiores a $999.",
              url: "/shipping",
            },
            {
              icon: <Percent size={36} className="text-green-600" />,
              title: "Financiación",
              description: "Paga en hasta 12 cuotas sin interés con tarjetas participantes.",
              url: "/financing",
            },
            {
              icon: <ShieldCheck size={36} className="text-purple-600" />,
              title: "Garantía extendida",
              description: "Protección adicional para tu tranquilidad en todos nuestros productos.",
              url: "/warranty",
            },
          ].map((feature, index) => (
            <Link
              key={index}
              href={feature.url}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
            >
              <div className="bg-gray-50 p-4 rounded-full mb-4 md:mb-6">{feature.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-base md:text-lg">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Apple Watch Series 9 */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[500px] md:h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1470&auto=format&fit=crop"
            alt="Apple Watch Series 9"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 flex flex-col justify-end px-8 md:px-20 pb-12 md:pb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">Apple Watch Series 9</h2>
            <p className="text-white/90 text-lg md:text-2xl mb-6 md:mb-8 max-w-2xl">
              Más brillante. Más potente. Más inteligente.
            </p>
            <Link
              href="/products/apple-watch-series-9"
              className="bg-white text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 w-fit"
            >
              Descubrir
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="container mx-auto px-4 py-12 md:py-20 bg-gray-50 rounded-3xl">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-16 text-center">
          Categorías Destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              name: "iPhone",
              image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1000&auto=format&fit=crop",
              url: "/products/iphone",
            },
            {
              name: "Mac",
              image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
              url: "/products/mac",
            },
            {
              name: "iPad",
              image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
              url: "/products/ipad",
            },
            {
              name: "Apple Watch",
              image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1000&auto=format&fit=crop",
              url: "/products/apple-watch",
            },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.url}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={category.image || "/placeholder.svg"}
                alt={`Categoría ${category.name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-gray-900 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=2000&auto=format&fit=crop"
              alt="Newsletter background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-gray-900/70"></div>
          </div>
          <div className="p-8 md:p-16 flex flex-col items-center text-center relative z-10">
            <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4 md:mb-6 w-fit">
              Newsletter
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Mantente informado</h2>
            <p className="text-gray-300 text-base md:text-xl mb-8 max-w-2xl">
              Suscríbete a nuestro newsletter para recibir las últimas noticias, ofertas exclusivas y lanzamientos de
              productos.
            </p>
            <div className="flex flex-col sm:flex-row w-full max-w-xl gap-4 relative">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-grow px-6 py-3 md:py-4 rounded-full text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 text-gray-800 shadow-lg"
              />
              <button className="bg-blue-600 text-white px-6 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
                Suscribirse
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">+10k</span>
                <span className="text-gray-400 text-sm">Suscriptores</span>
              </div>
              <div className="h-10 w-px bg-gray-700"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">Semanal</span>
                <span className="text-gray-400 text-sm">Frecuencia</span>
              </div>
              <div className="h-10 w-px bg-gray-700"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">100%</span>
                <span className="text-gray-400 text-sm">Personalizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

