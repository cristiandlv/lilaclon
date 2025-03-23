"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, CircleUser, ShoppingCart } from "lucide-react";

const NavBar = () => {
  return (
    <nav className=" bg-gradient-to-b from-blue-300 to-blue-500 text-white px-8 h-16 flex items-center justify-between ">
      
      <div className="flex items-center">
        <Image
          src="/logo2.png"
          width={120} 
          height={120} 
          alt="Logo de Mi Tienda"
          className="h-12 w-auto object-contain"
        />
      </div>

      
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-6 text-lg">
          <li className="hover:text-blue-200">
            <Link href="/home">Home</Link>
          </li>
          <li className="hover:text-blue-200">
            <Link href="/products">Productos</Link>
          </li>
          <li className="hover:text-blue-200">
            <Link href="/register">Registrate</Link>
          </li>
          <li className="hover:text-blue-200">
            <Link href="/login">Login</Link>
          </li>
          
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        
        
        <div className="flex items-center bg-white rounded-full px-3 py-1 text-gray-600">
        <Search className="h-5 w-5 mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar..."
          className="outline-none bg-transparent text-sm w-32 md:w-40"
        />
      </div>
        <button className="p-2 hover:text-blue-200">
          <Link href="/cart"><ShoppingCart size={24} /></Link>
        </button>
      
        <button className="p-2 hover:text-blue-200">
          <CircleUser size={24} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
