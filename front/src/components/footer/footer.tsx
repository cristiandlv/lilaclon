"use client";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-300 to-blue-500 text-gray-800 py-8">
      <div className="container mx-auto px-4">
        {/* Sección superior: Redes sociales y contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Redes sociales */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-pink-600 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              
            </div>
          </div>

          {/* Enlaces útiles */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">Enlaces útiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-blue-600 transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-600 transition-colors">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-600 transition-colors">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p>Email: info@ringo.com</p>
            <p>Teléfono: +11 444 789</p>
            <p>Dirección: Av Siempre Viva 123, Ciudad BA</p>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-gray-300 my-6" />

        {/* Sección inferior: Derechos de autor */}
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Ringo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;