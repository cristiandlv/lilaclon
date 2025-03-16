"use client";

import { useParams } from "next/navigation";
import { notProducts } from "../../../Helpers/products";
import Image from "next/image"; 

const Product = () => {
 

    const params = useParams();
    const productId = params.id; // Obtiene el ID desde la URL
  
    const product = notProducts.find((p) => p.id === Number(productId));
  
    if (!product) return <h1>Producto no encontrado</h1>;
  
    return (
      <div className="flex flex-wrap gap-6 justify-center">
      <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden font-apple text-slate-900">
        <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill" 
                  objectFit="cover" 
                  priority
                  unoptimized
                />
              </div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
              <p>{product.categoryId}</p>
             </div>
            </div>
    );
  };
  

export default Product;
