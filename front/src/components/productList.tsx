

// import { notProducts } from "../Helpers/products"; 

// const ProductList = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//       {notProducts.map((product) => (
//         <Card 
//           key={product.id}
//           id={product.id} 
//           title={product.name}
//           description={product.description}
//           price={product.price}
//           image={product.image}
//           categoryId={product.categoryId}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductList;

"use client";

import { useEffect, useState } from "react";
import Card from "./cards";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (!res.ok) throw new Error("Error al obtener los productos");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (products.length === 0) return <p className="text-center text-gray-500">No hay productos disponibles.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          title={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          categoryId={product.categoryId}
        />
      ))}
    </div>
  );
}
