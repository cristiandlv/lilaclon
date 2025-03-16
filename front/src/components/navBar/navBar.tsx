"use client";

import Link from "next/link";
const NavBar = () => {
    return (
      
      <nav className=" bg-blue-400 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Mi Tienda</h1>
        <ul className= "flex space-x-4">
        <li className="px-4 py-2 hover:text-blue-500">
          <Link href="/home">Home</Link>
        </li>
        <li className="px-4 py-2 hover:text-blue-500">
          <Link href="/products">Productos</Link>
        </li>
        <li className="px-4 py-2 hover:text-blue-500">
          <Link href="/register">Registrate</Link>
        </li>
        <li className="px-4 py-2 hover:text-blue-500">
          <Link href="/login">Login</Link>
        </li>
        <li className="px-4 py-2 hover:text-blue-500">
          <Link href="/cart">Carrito</Link>
        </li>
        </ul>
      </nav>
    );
  };
  
  export default NavBar;

  