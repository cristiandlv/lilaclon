// "use client";

// import { useParams } from "next/navigation";
// import { notProducts } from "../../../Helpers/products";
// import Image from "next/image"; 

// const Product = () => {


//     const  { id } = useParams();

//     const product = notProducts.find((p) => p.id === Number(id));
  
//     if (!product) return <h1>Producto no encontrado</h1>;
  
//     return (
//       <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20">
//       <div className="flex flex-wrap gap-6 justify-center ">
//       <div className="w-180 h-full bg-white shadow-lg rounded-lg overflow-hidden font-apple text-slate-900">
//         <h1 className="text-center text-4xl m-6">{product.name}</h1>
//         <div className="relative w-180 h-180">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   layout="fill" 
//                   objectFit="cover" 
//                   priority
//                   unoptimized
//                 />
//               </div>
              
//               <p>{product.description}</p>
//               <p>${product.price.toFixed(2)}</p>
//               <p>{product.categoryId}</p>
//              </div>
//             </div>
//             </div>
//     );
//   };
  

// export default Product;

"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useAuth } from "../../contexts/AuthContext"
import { ShoppingBag, ArrowLeft, Plus, Minus, CheckCircle } from "lucide-react"

type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  categoryId: number
}

const ProductDetail = () => {
  const { id } = useParams()
  const router = useRouter()
  const { isLoggedIn, userId } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products")
        if (!res.ok) throw new Error("Error al obtener los productos")

        const data: Product[] = await res.json()
        setProducts(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ocurrió un error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const product = products.find((p) => p.id === Number(id))

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const addToCart = () => {
    if (!product) return

    if (!isLoggedIn || !userId) {
      alert("Debes iniciar sesión para agregar productos al carrito")
      router.push("/login")
      return
    }

    setIsAdding(true)

    try {
      const cartKey = `cart_${userId}`
      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]")

      const existingItemIndex = cart.findIndex((item: any) => item.id === product.id)

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity
      } else {
        cart.push({ id: product.id, title: product.name, price: product.price, image: product.image, quantity })
      }

      localStorage.setItem(cartKey, JSON.stringify(cart))
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
    } finally {
      setIsAdding(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="animate-pulse text-gray-600 text-lg">Cargando producto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">{error || "El producto no existe o ha sido eliminado."}</p>
          <button
            onClick={() => router.push("/products")}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-black transition"
          >
            Explorar Productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 lg:px-20">
      <button onClick={() => router.back()} className="mb-6 flex items-center text-gray-700 hover:text-black">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border border-gray-100">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{product.description}</p>
            <div className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decrementQuantity}
              className="border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Minus />
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Plus />
            </button>
          </div>

          <button
            onClick={addToCart}
            className={`w-full bg-gray-900 text-white text-lg font-semibold py-4 rounded-lg hover:bg-black transition flex items-center justify-center gap-2 ${
              isAdding && "opacity-50 cursor-not-allowed"
            }`}
          >
            {addedToCart ? <CheckCircle className="w-5 h-5 text-green-500" /> : <ShoppingBag className="w-5 h-5" />}
            {isAdding ? "Agregando..." : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
