"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";



const Card = ({
  title,
  description,
  price,
  image,
  categoryId,
  id
}: {
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  id: number;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden font-apple text-slate-900">
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            layout="fill" 
            objectFit="cover" 
            priority
            unoptimized
          />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>${price.toFixed(2)}</p>
        <p>{categoryId}</p>
        <button onClick={ () => {
          router.push(`/product/${id}`)
        }}>ver detalles</button>
      </div>
    </div>
  );
};

export default Card;
