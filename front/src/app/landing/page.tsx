"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
};

const Landing: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (!res.ok) throw new Error("Error al obtener los productos");
        const data: Product[] = await res.json();
        // Tomamos solo los primeros 3 productos
        setFeaturedProducts(data.slice(0, 3));
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        >
          <source src="/video/products.mp4" type="video/mp4" />
          Tu navegador no soporta videos en HTML5.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10"></div>

        <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center text-center">
          <div className="mb-8">
            <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Nuevos Productos Disponibles
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Descubre la <span className="text-blue-400">experiencia</span> Apple
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Productos premium, calidad excepcional y servicio personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                Regístrate ahora
                <ArrowRight size={20} />
              </a>
              <a
                href="/products"
                className="bg-transparent border-2 border-gray-600 hover:border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Explorar productos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de beneficios */}
      <div className="w-full py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Por qué elegirnos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚚',
                title: 'Envío rápido',
                description: 'Recibe tus productos Apple en 24-48 horas con envío express gratuito.'
              },
              {
                icon: '🔒',
                title: 'Garantía oficial',
                description: 'Todos nuestros productos incluyen garantía oficial de Apple.'
              },
              {
                icon: '💳',
                title: 'Pago seguro',
                description: 'Procesamos tus pagos con la máxima seguridad y cifrado.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-400/30 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de 3 productos destacados */}
      <div className="w-full py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Productos Destacados</h2>
            <a 
              href="/products" 
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              Ver todos <ArrowRight size={16} />
            </a>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 animate-pulse">
                  <div className="h-64 bg-gray-700/30"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4 w-full"></div>
                    <div className="h-5 bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : featuredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No hay productos disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <a 
                  key={product.id} 
                  href={`/product/${product.id}`}
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 block"
                >
                  <div className="h-64 bg-gray-700/30 flex items-center justify-center p-4">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-500">Imagen no disponible</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${product.price.toLocaleString()}</span>
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                        Destacado
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA final */}
      <div className="w-full py-20 bg-gradient-to-r from-blue-900/30 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para vivir la experiencia Apple?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos y descubre por qué somos los líderes en productos Apple.
          </p>
          <a
            href="/register"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Comenzar ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;