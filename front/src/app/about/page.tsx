import React from 'react'
import Link from "next/link"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-20">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="relative overflow-hidden rounded-2xl shadow-sm">
          <img
            src="https://digitalassets-retail.cdn-apple.com//retail-image-server/d92/c94/e4f/67b/8e6/45e/f9d/5f5/859/5e6/1c8b32a0-eefe-3695-9895-94b1dbf1f751_Passeig_de_Gracia_Gallery_04_large_1x.jpg"
            alt="Nuestra tienda"
            className="w-full h-[350px] object-cover"
          /> </div>
          
     
      
      
      <div className="text-center mb-12 mt-8">
    <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mb-8">Nuestra Misión</h2>

    <p className="text-[#1d1d1f] text-lg leading-relaxed mb-6">
      Somos el Apple Premium Reseller más reconocido de Argentina. Nuestra tienda te brinda la oportunidad de
      conocer y probar cada uno de los innovadores productos Apple. Buscamos crear una excelente experiencia con
      la más amplia gama de productos, incluyendo todos los accesorios necesarios para que los disfrutes al
      máximo.
    </p>

    <p className="text-[#1d1d1f] text-lg leading-relaxed">
      Ofrecemos una excepcional asistencia personalizada de asesoramiento profesional para todos los usuarios:
      ya seas experto, fanático o empresarial. Nuestra misión es brindarte la mejor experiencia día a día. ¡Te
      esperamos!
    </p>
  </div>
      
         <div className="flex justify-center mb-8 mt-8">
          <Link href="/home">
            <Image
              src="/logo2.png"
              width={120}
              height={120}
              alt="Logo de Ringo"
              className="h-10 w-auto object-contain opacity-90"
            />
          </Link>
        </div>
    </section>
    </div>
    
  )
}

