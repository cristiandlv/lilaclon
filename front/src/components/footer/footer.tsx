"use client"

import Link from "next/link"
import Image from "next/image"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-700 py-12">
      <div className="container mx-auto px-4">
        {/* Logo section */}
        <div className="flex justify-center mb-8">
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

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Redes sociales */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase tracking-wider">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Mantente conectado con nosotros en redes sociales para conocer las últimas novedades y ofertas exclusivas.
            </p>
          </div>

          {/* Enlaces útiles */}
          <div className="text-center">
            <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase tracking-wider">Enlaces útiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=destacados"
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Destacados
                </Link>
              </li>
              <li>
                <Link href="/products?category=ofertas" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-right">
            <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                Email:{" "}
                <a href="mailto:info@ringo.com" className="hover:text-gray-800 transition-colors">
                  info@ringo.com
                </a>
              </li>
              <li>
                Teléfono:{" "}
                <a href="tel:+11444789" className="hover:text-gray-800 transition-colors">
                  +11 444 789
                </a>
              </li>
              <li>Dirección: Av Siempre Viva 123, Ciudad BA</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="max-w-md mx-auto mb-10">
          <h3 className="text-sm font-semibold mb-3 text-gray-800 uppercase tracking-wider text-center">
            Suscríbete a nuestro newsletter
          </h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button className="bg-gray-800 text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-700 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-100 pt-6">
          {/* Sección inferior: Derechos de autor */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Ringo. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0">
              Ringo no es un distribuidor oficial de Apple Inc. Apple, el logotipo de Apple y otros productos
              mencionados son marcas comerciales de Apple Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

