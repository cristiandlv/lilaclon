"use client";
import { Search, User, Package, Home, Settings } from "lucide-react";
const SlideBar = () => {
return (
<div>
    <aside className="w-60 h-full bg-blue-400 text-white flex flex-col p-6 ">
        
            <nav className="space-y-4">
            <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md">
                <Home className="w-5 h-5" />
                <span>Home</span>
            </a>
            <a href="cart" className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md">
                <Package className="w-5 h-5" />
                <span>Mis Pedidos</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md">
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
            </a>
            </nav>
        </aside>
    
    
</div>)
};

export default SlideBar;



