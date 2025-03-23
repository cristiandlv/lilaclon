"use client";

import ProductList from "@/components/productList";
import ImageSlider from "@/components/swiper/swiper";
import { useRouter } from "next/navigation";
import { Gift, Percent, Tag } from "lucide-react";

const Home = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100">
      <br />
      {/* Slider  */}
      <div className="w-full">
        <ImageSlider />
      </div>
      <div className=" w-full flex justify-center mb-8">
          <img
            src="https://i.pinimg.com/1200x/0a/15/b1/0a15b1430208652bf32aba8cccf0c66c.jpg"
            alt="Ofertas Especiales"
            className="w-[60%] h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
      

      {/* "Productos seleccionados" */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Productos Seleccionados
        </h2>
        <ProductList />
      </div>

      {/*  Ofertas Especiales */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          
        </h2>
        
        {/* Banner chico*/}
        <div className=" w-full flex justify-center mb-8">
          <img
            src="https://i.pinimg.com/1200x/7c/e7/d8/7ce7d88597e81bb08c68387ba7e5b3a9.jpg"
            alt="Ofertas Especiales"
            className="w-[40%] h-[180px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Tarjetas de ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => router.push(`/product/2`)}
          >
            <div className="bg-red-500 text-white p-4 rounded-full mb-4">
              <Gift size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              ¡Regalo Sorpresa!
            </h3>
            <p className="text-gray-600 text-center">
              Compra y recibe un obsequio especial con tu pedido.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => router.push(`/product/4`)}
          >
            <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
              <Percent size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              ¡Descuento Exclusivo!
            </h3>
            <p className="text-gray-600 text-center">
              Aprovecha un 20% de descuento por tiempo limitado.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => router.push(`/product/3`)}
          >
            <div className="bg-green-500 text-white p-4 rounded-full mb-4">
              <Tag size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              ¡Oferta Relámpago!
            </h3>
            <p className="text-gray-600 text-center">
              Solo por hoy: consigue tu producto favorito con un súper descuento.
            </p>
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className=" w-full flex justify-center mb-8">
          <img
            src="https://i.pinimg.com/1200x/c0/d1/67/c0d1675f5c24645cdf4cfacdd942d863.jpg"
            alt="Ofertas Especiales"
            className="w-[50%] h-[290px] object-cover rounded-lg shadow-lg"
          />
        </div>

      {/* Sección de Categorías Destacadas */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Categorías Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Ipads", "AirPods", "Apple Tv", "Apple watch"].map((categoria) => (
            <div
              key={categoria}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {categoria}
              </h3>
              <p className="text-gray-600">Explora nuestros mejores productos.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
