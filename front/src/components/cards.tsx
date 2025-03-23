"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CardProps = {
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  id: number;
};

export default function Card({ title, description, price, image, categoryId, id }: CardProps) {
  const router = useRouter();

  return (
    <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden font-apple text-slate-900">
      <div className="relative w-full h-48">
        <Image src={image} alt={title} layout="fill" objectFit="cover" priority unoptimized />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-lg font-semibold">${price.toFixed(2)}</p>
        <p className="text-gray-500">Categoría: {categoryId}</p>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push(`/product/${id}`)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
