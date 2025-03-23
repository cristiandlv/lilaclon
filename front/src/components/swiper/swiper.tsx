"use client"; // Indica que este es un componente del lado del cliente

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImageSlider = () => {
  // Array de imágenes para el slider
  const images = [
    "https://ishop.com.gh/images/fpslide/wslide16_ipad_pro.jpg",
    "https://ishop.com.gh/images/fpslide/wslide12_watch_series_9.png",
    "https://ishop.com.gh/images/fpslide/wslide07_airpods_pro_2.png",
    "https://ishop.com.gh/images/fpslide/wslide11_iPhone_15_titanium.png",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        spaceBetween={30} // Espacio entre slides
        centeredSlides={true} // Centrar el slide activo
        autoplay={{
          delay: 2500, // Cambia de slide cada 2.5 segundos
          disableOnInteraction: false, // No detener el autoplay al interactuar
        }}
        pagination={{
          clickable: true, // Permite hacer clic en los puntos de paginación
        }}
        navigation={true} // Habilita la navegación con flechas
        modules={[Autoplay, Pagination, Navigation]} // Módulos de Swiper
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;