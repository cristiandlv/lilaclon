"use client";

import { useParams } from "next/navigation";
import { Search, User, Package, Home, Settings } from "lucide-react";
import SlideBar from "@/components/slidebar/slidebar";

const Dashboard = () => {
  const { userId } = useParams(); // Obtiene el ID del usuario desde la URL

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SlideBar />
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar superior */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Barra de búsqueda */}
          <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-gray-600">
            <Search className="h-5 w-5 mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="outline-none bg-transparent text-sm w-32 md:w-64"
            />
          </div>
          {/* Icono de usuario */}
          <User className="h-6 w-6 cursor-pointer hover:text-blue-500" />
        </header>

        {/* Contenido */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">Perfil de {userId}</h2>

          {/* Tarjetas de información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Información de Usuario</h3>
              <p className="text-gray-600">Email: usuario@email.com</p>
              <p className="text-gray-600">Phone: +123456789</p>
              <p className="text-gray-600">Address: Calle Falsa 123</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
              <h3 className="text-lg font-semibold">Gestiona tus Pedidos</h3>
              <p className="text-gray-600">Status del pedido: En camino</p>
              <p className="text-gray-600">Fecha estimada: 20 de marzo</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
