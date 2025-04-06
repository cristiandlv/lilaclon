"use client";

import type React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/contexts/AuthContext";
import { ShoppingBag, Eye, CheckCircle } from "lucide-react";
import { useState } from "react";

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
  const { isLoggedIn, userId } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn || !userId) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      router.push("/login");
      return;
    }

    const cartKey = `cart_${userId}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    const existingItemIndex = cart.findIndex((item: any) => item.id === id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ id, title, price, image, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    setAddedToCart(true);

    setTimeout(() => setAddedToCart(false), 2000);
  };

  const navigateToDetails = () => {
    router.push(`/product/${id}`);
  };

  const categoryNames: Record<number, string> = {
    1: "iPhone",
    2: "iPad",
    3: "Mac",
    4: "Watch",
    5: "AirPods",
    6: "Accesorios",
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer w-[250px]"
      onClick={navigateToDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className={`transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
          priority
          unoptimized
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>

          {/* Botón de carrito */}
          <button
            className="text-gray-700 hover:text-gray-900 transition-colors"
            onClick={addToCart}
            aria-label="Agregar al carrito"
          >
            {addedToCart ? <CheckCircle size={22} className="text-green-600" /> : <ShoppingBag size={22} />}
          </button>
        </div>

        {/* Categoría */}
        <span className="block mt-2 text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full text-center">
          {categoryNames[categoryId] || `Categoría ${categoryId}`}
        </span>

        {/* Botón "Ver detalles" */}
        <button
          className="flex items-center justify-center w-full mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            navigateToDetails();
          }}
        >
          <Eye size={16} className="mr-1" />
          Ver detalles
        </button>
      </div>
    </div>
  );
}
