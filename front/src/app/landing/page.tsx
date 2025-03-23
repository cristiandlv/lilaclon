import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-gray-300 overflow-hidden p-0 m-0">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/products.mp4" type="video/mp4" />
        Tu navegador no soporta videos en HTML5.
      </video>

      {/* desenfocar el fondo loco */}
      <div className="absolute inset-0 backdrop-blur-3xl"></div>

      <div className="relative w-4/5 h-4/5 flex items-center justify-center shadow-md">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-lg shadow-2xl "
        >
          <source src="/video/products.mp4" type="video/mp4" />
          Tu navegador no soporta videos en HTML5.
        </video>
      </div>

      
      <div className="absolute rounded-lg text-center max-w-2xl p-8 bg-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tus productos favoritos aquí</h1>
        <p className="text-lg md:text-xl mb-6">Regístrate y recibe descuentos exclusivos en productos Apple.</p>
        <a
          href="/register"
          className="bg-gray-200 text-blue-300 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
        >
          Regístrate ahora
        </a>
      </div>
    </div>
  );
};

export default Landing;