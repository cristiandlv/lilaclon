"use client"

import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import Link from "next/link"

// Importa los estilos de Swiper
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const ImageSlider = () => {
  // Array de slides con imágenes y contenido
  const slides = [
    {
      image: "/slider6.jpg",
      title: "iPhone 15 Pro",
      subtitle: "Potencia revolucionaria",
      link: "/products?category=iphone",
    },
    {
      image: "/slider_1.png",
      title: "MacBook Air M2",
      subtitle: "Ligero. Rápido. Increíble.",
      link: "/products?category=mac",
    },
    {
      image: "/slider2.png",
      title: "iPad Pro",
      subtitle: "Creatividad sin límites",
      link: "/products?category=ipad",
    },
    {
      image: "/slider4.png",
      title: "Apple Watch Series 9",
      subtitle: "Salud avanzada en tu muñeca",
      link: "/products?category=watch",
    },
  ]

  // Aplicar estilos personalizados a los elementos de Swiper después de que se monte el componente
  useEffect(() => {
    // Estilizar los bullets de paginación
    const bullets = document.querySelectorAll(".swiper-pagination-bullet")
    bullets.forEach((bullet) => {
      const el = bullet as HTMLElement
      el.style.width = "10px"
      el.style.height = "10px"
      el.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
      el.style.opacity = "0.7"
    })

    // Estilizar el bullet activo
    const activeBullet = document.querySelector(".swiper-pagination-bullet-active")
    if (activeBullet) {
      const el = activeBullet as HTMLElement
      el.style.backgroundColor = "white"
      el.style.opacity = "1"
    }

    // Estilizar los botones de navegación
    const navButtons = document.querySelectorAll(".swiper-button-next, .swiper-button-prev")
    navButtons.forEach((button) => {
      const el = button as HTMLElement
      el.style.color = "white"
      el.style.opacity = "0.7"
      el.style.width = "48px"
      el.style.height = "48px"
      el.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
      el.style.borderRadius = "50%"
      el.style.transition = "opacity 0.3s"
    })

    // Estilizar el contenido de los botones de navegación
    const navButtonsContent = document.querySelectorAll(".swiper-button-next::after, .swiper-button-prev::after")
    navButtonsContent.forEach((content) => {
      const el = content as HTMLElement
      el.style.fontSize = "18px"
    })

    // Añadir eventos hover a los botones de navegación
    navButtons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        ;(button as HTMLElement).style.opacity = "1"
      })
      button.addEventListener("mouseleave", () => {
        ;(button as HTMLElement).style.opacity = "0.7"
      })
    })

    return () => {
      // Limpiar event listeners al desmontar
      navButtons.forEach((button) => {
        button.removeEventListener("mouseenter", () => {})
        button.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[400px] md:h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
            <img
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-6 text-white/90">{slide.subtitle}</p>
              <Link
                href={slide.link}
                className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Explorar
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider

