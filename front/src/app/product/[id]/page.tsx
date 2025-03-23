// "use client";

// import { useParams } from "next/navigation";
// import { notProducts } from "../../../Helpers/products";
// import Image from "next/image"; 

// const Product = () => {


//     const  { id } = useParams();

//     const product = notProducts.find((p) => p.id === Number(id));
  
//     if (!product) return <h1>Producto no encontrado</h1>;
  
//     return (
//       <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20">
//       <div className="flex flex-wrap gap-6 justify-center ">
//       <div className="w-180 h-full bg-white shadow-lg rounded-lg overflow-hidden font-apple text-slate-900">
//         <h1 className="text-center text-4xl m-6">{product.name}</h1>
//         <div className="relative w-180 h-180">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   layout="fill" 
//                   objectFit="cover" 
//                   priority
//                   unoptimized
//                 />
//               </div>
              
//               <p>{product.description}</p>
//               <p>${product.price.toFixed(2)}</p>
//               <p>{product.categoryId}</p>
//              </div>
//             </div>
//             </div>
//     );
//   };
  

// export default Product;

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
};

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (!res.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const product = products.find((p) => p.id === Number(id));

  if (loading) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return <h1 className="text-center text-gray-500">Producto no encontrado</h1>;
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Imagen del producto */}
        <div className="relative w-full h-150">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg bg-white"
            priority
            unoptimized
          />
        </div>

        {/* Detalles del producto */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Precio y categoría */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-2xl font-semibold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Categoría: {product.categoryId}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-4">
            <button
              onClick={() => {
                // Lógica para agregar al carrito
                alert(`${product.name} agregado al carrito`);
              }}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar al carrito
            </button>
            <button
              onClick={() => router.back()} // Volver a la página anterior
              className="flex-1 bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;