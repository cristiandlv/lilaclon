import SlideBar from "@/components/slidebar/slidebar";

const Cart = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SlideBar />

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Carrito de compras</h1>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Producto 1</h3>
            <p className="text-gray-600">Descripción del producto 1</p>
            <p className="text-gray-600">Precio: $20.00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Producto 2</h3>
            <p className="text-gray-600">Descripción del producto 2</p>
            <p className="text-gray-600">Precio: $25.00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Producto 3</h3>
            <p className="text-gray-600">Descripción del producto 3</p>
            <p className="text-gray-600">Precio: $30.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;