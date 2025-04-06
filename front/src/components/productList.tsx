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

type ProductListProps = {
  limit?: number; // Prop opcional para limitar la cantidad de productos a mostrar
};

export default function ProductList({ limit }: ProductListProps) {
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

  // Aplicar el límite si existe
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {displayedProducts.map((product) => (
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
