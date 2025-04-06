"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { CreditCard, Package, ShoppingCart, User, LogOut, ArrowRight, CheckCircle, AlertCircle, X } from "lucide-react"

interface CartItem {
  id: number | string
  title: string
  price: number
  image: string
  quantity: number
}

interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: string
}

const Dashboard = () => {
  const { userId } = useParams() as { userId: string }
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [showOrderHistory, setShowOrderHistory] = useState(false)

  // Add validation states
  const [errors, setErrors] = useState<{
    cardNumber: string
    cardName: string
    expiry: string
    cvv: string
  }>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  // Add touched states to only show errors after user interaction
  const [touched, setTouched] = useState<{
    cardNumber: boolean
    cardName: boolean
    expiry: boolean
    cvv: boolean
  }>({
    cardNumber: false,
    cardName: false,
    expiry: false,
    cvv: false,
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUserId = localStorage.getItem("userId")

    if (!token || !storedUserId || storedUserId !== userId) {
      router.replace("/login")
      return
    }

    // Obtener información del usuario desde localStorage
    const storedUser = {
      id: storedUserId,
      name: localStorage.getItem("userName") || "Usuario",
      email: localStorage.getItem("userEmail") || "No disponible",
      phone: localStorage.getItem("userPhone") || "No disponible",
      address: localStorage.getItem("userAddress") || "No disponible",
    }

    // Cargar los items del carrito
    try {
      const cartKey = `cart_${storedUserId}`
      const storedCart = JSON.parse(localStorage.getItem(cartKey) || "[]")
      setCartItems(storedCart)

      // Calcular el total del carrito
      const total = storedCart.reduce((sum: number, item: CartItem) => {
        return sum + item.price * item.quantity
      }, 0)
      setCartTotal(total)

      // Cargar historial de pedidos
      const ordersKey = `orders_${storedUserId}`
      const storedOrders = JSON.parse(localStorage.getItem(ordersKey) || "[]")
      setOrders(storedOrders)
    } catch (error) {
      console.error("Error al cargar datos:", error)
    }

    setUser(storedUser)
    setLoading(false)
  }, [userId, router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userAddress")
    router.replace("/login")
  }

  // Replace the formatCardNumber function with this enhanced version
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Replace the formatExpiryDate function with this enhanced version
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Add a new function to validate card number
  const validateCardNumber = (number: string) => {
    const cardNumberWithoutSpaces = number.replace(/\s+/g, "")
    if (!cardNumberWithoutSpaces) {
      return "El número de tarjeta es requerido"
    }
    if (cardNumberWithoutSpaces.length < 16) {
      return "El número de tarjeta debe tener 16 dígitos"
    }
    // Basic Luhn algorithm check could be added here for more validation
    return ""
  }

  // Add a new function to validate card name
  const validateCardName = (name: string) => {
    if (!name.trim()) {
      return "El nombre es requerido"
    }
    if (name.trim().length < 3) {
      return "Ingrese un nombre válido"
    }
    return ""
  }

  // Add a new function to validate expiry date
  const validateExpiry = (date: string) => {
    if (!date) {
      return "La fecha de expiración es requerida"
    }

    if (date.length < 5) {
      return "Formato inválido (MM/YY)"
    }

    const [month, year] = date.split("/")
    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1

    if (Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
      return "Mes inválido"
    }

    if (
      Number.parseInt(year) < currentYear ||
      (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
    ) {
      return "La tarjeta ha expirado"
    }

    return ""
  }

  // Add a new function to validate CVV
  const validateCvv = (cvvCode: string) => {
    if (!cvvCode) {
      return "El código CVV es requerido"
    }

    if (cvvCode.length < 3) {
      return "El CVV debe tener al menos 3 dígitos"
    }

    return ""
  }

  // Add a function to handle field blur events
  const handleBlur = (field: "cardNumber" | "cardName" | "expiry" | "cvv") => {
    setTouched({
      ...touched,
      [field]: true,
    })

    // Validate the field on blur
    validateField(field)
  }

  // Add a function to validate a specific field
  const validateField = (field: "cardNumber" | "cardName" | "expiry" | "cvv") => {
    let errorMessage = ""

    switch (field) {
      case "cardNumber":
        errorMessage = validateCardNumber(cardNumber)
        break
      case "cardName":
        errorMessage = validateCardName(cardName)
        break
      case "expiry":
        errorMessage = validateExpiry(expiry)
        break
      case "cvv":
        errorMessage = validateCvv(cvv)
        break
    }

    setErrors({
      ...errors,
      [field]: errorMessage,
    })

    return errorMessage === ""
  }

  // Replace the validateForm function with this enhanced version
  const validateForm = () => {
    const cardNumberValid = validateField("cardNumber")
    const cardNameValid = validateField("cardName")
    const expiryValid = validateField("expiry")
    const cvvValid = validateField("cvv")

    // Set all fields as touched to show all errors
    setTouched({
      cardNumber: true,
      cardName: true,
      expiry: true,
      cvv: true,
    })

    return cardNumberValid && cardNameValid && expiryValid && cvvValid
  }

  // Update the handlePaymentSubmit function
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      // Crear orden
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toISOString(),
        items: cartItems,
        total: cartTotal,
        status: "completed",
      }

      // Guardar en historial
      const ordersKey = `orders_${userId}`
      const updatedOrders = [...orders, newOrder]
      //aca va el fetch a orders post
      // localStorage.setItem(ordersKey, JSON.stringify(updatedOrders))
      setOrders(updatedOrders)

      // Limpiar carrito
      localStorage.setItem(`cart_${userId}`, JSON.stringify([]))
      setCartItems([])
      setCartTotal(0)

      setIsProcessing(false)
      setOrderSuccess(true)

      // Reset form fields
      setCardNumber("")
      setCardName("")
      setExpiry("")
      setCvv("")
      setErrors({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
      })
      setTouched({
        cardNumber: false,
        cardName: false,
        expiry: false,
        cvv: false,
      })

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setOrderSuccess(false)
        setShowCheckout(false)
      }, 3000)
    }, 1500)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Replace the return statement's checkout modal section with this enhanced version
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Navbar */}
      <header className=" shadow-sm p-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-white/90">
        <div className="flex items-center space-x-4">
          <div className="bg-[#f5f5f7] rounded-full px-4 py-1 text-[#1d1d1f] flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">ID: {userId}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/products")}
            className="px-4 py-2 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors flex items-center text-sm font-medium"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Ver Productos
          </button>

          <button
            onClick={() => router.push("/cart")}
            className="px-4 py-2 bg-[#1d1d1f] text-white rounded-full hover:bg-[#2d2d2f] transition-colors flex items-center relative text-sm font-medium"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span>Carrito</span>
            {cartItems.length > 0 && (
              <span className="ml-2 bg-[#0071e3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#1d1d1f]">Bienvenido, {user?.name}!</h1>

        {/* Sección de Información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tarjeta de Información de Usuario */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e8ed]">
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-[#0071e3]" />
              Información de Usuario
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#86868b]">Email</p>
                <p className="text-[#1d1d1f]">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-[#86868b]">Teléfono</p>
                <p className="text-[#1d1d1f]">{user?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-[#86868b]">Dirección</p>
                <p className="text-[#1d1d1f]">{user?.address}</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/profile/edit")}
              className="mt-4 px-4 py-2 bg-[#f5f5f7] text-[#1d1d1f] rounded-full hover:bg-[#e8e8ed] transition-colors text-sm flex items-center font-medium"
            >
              Editar Perfil
            </button>
          </div>

          {/* Tarjeta de Historial de Pedidos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e8ed]">
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-[#0071e3]" />
                Historial de Pedidos
              </div>
              <button
                onClick={() => setShowOrderHistory(!showOrderHistory)}
                className="text-sm text-[#0071e3] hover:text-[#0077ed] font-medium"
              >
                {showOrderHistory ? "Ocultar" : "Ver historial"}
              </button>
            </h3>

            {!showOrderHistory ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm text-[#86868b]">Pedidos realizados</p>
                  <p className="font-medium text-[#1d1d1f]">{orders.length}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-[#86868b]">Último pedido</p>
                  <p className="font-medium text-[#1d1d1f]">
                    {orders.length > 0 ? new Date(orders[orders.length - 1].date).toLocaleDateString() : "Sin pedidos"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-[#86868b]">Total gastado</p>
                  <p className="font-medium text-[#1d1d1f]">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {orders.length === 0 ? (
                  <p className="text-center text-[#86868b] py-4">No hay pedidos realizados</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border border-[#e8e8ed] rounded-xl overflow-hidden">
                      <div className="bg-[#f5f5f7] p-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-[#1d1d1f]">Pedido #{order.id}</p>
                          <p className="text-xs text-[#86868b]">{formatDate(order.date)}</p>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-[#34c759] mr-1" />
                          <span className="text-xs font-medium text-[#34c759]">Completado</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="space-y-2 mb-3">
                          {order.items.map((item) => (
                            <div key={`${order.id}-${item.id}`} className="flex items-center text-sm">
                              <span className="flex-grow truncate text-[#1d1d1f]">{item.title}</span>
                              <span className="ml-2 text-[#86868b]">x{item.quantity}</span>
                              <span className="ml-2 font-medium text-[#1d1d1f]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between pt-2 border-t border-[#e8e8ed] text-sm">
                          <span className="text-[#86868b]">Total</span>
                          <span className="font-bold text-[#1d1d1f]">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sección del Carrito */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e8ed] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#1d1d1f] flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-[#0071e3]" />
              Tu Carrito de Compras
            </h3>
            <span className="text-lg font-bold text-[#1d1d1f]">${cartTotal.toFixed(2)}</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#86868b] mb-4">Tu carrito está vacío</p>
              <button
                onClick={() => router.push("/products")}
                className="px-4 py-2 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors font-medium"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b border-[#e8e8ed] pb-4">
                    <div className="w-16 h-16 relative flex-shrink-0 bg-[#f5f5f7] rounded-xl overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="font-medium text-[#1d1d1f]">{item.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-[#86868b] text-sm">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                        <p className="font-semibold text-[#1d1d1f]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#86868b]">
                    Total de productos:{" "}
                    <span className="font-semibold text-[#1d1d1f]">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  </p>
                  <p className="text-[#86868b]">
                    Total a pagar: <span className="font-semibold text-[#1d1d1f]">${cartTotal.toFixed(2)}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push("/cart")}
                    className="px-4 py-2 bg-[#f5f5f7] text-[#1d1d1f] rounded-full hover:bg-[#e8e8ed] transition-colors font-medium"
                  >
                    Ver Carrito
                  </button>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="px-4 py-2 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors font-medium"
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Botón de Cerrar Sesión */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#ff3b30] text-white rounded-full hover:bg-[#ff453a] transition-colors flex items-center font-medium"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </main>
      {/* Modal de Checkout */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Finalizar Compra</h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e8f3ec] mb-4">
                  <CheckCircle className="h-8 w-8 text-[#34c759]" />
                </div>
                <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-2">¡Compra Realizada!</h2>
                <p className="text-[#86868b] mb-6">
                  Tu pedido ha sido procesado correctamente. Puedes ver los detalles en tu historial de compras.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-6">
                  <h4 className="font-medium text-[#1d1d1f] mb-4">Resumen del Pedido</h4>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#86868b]">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#86868b]">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-[#e8e8ed]">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-1">Nombre en la tarjeta</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => {
                      setCardName(e.target.value)
                      if (touched.cardName) {
                        validateField("cardName")
                      }
                    }}
                    onBlur={() => handleBlur("cardName")}
                    placeholder="Juan Pérez"
                    className={`w-full px-3 py-2 border ${
                      touched.cardName && errors.cardName ? "border-[#ff3b30] bg-[#fff5f5]" : "border-[#e8e8ed]"
                    } rounded-lg focus:outline-none focus:ring-1 ${
                      touched.cardName && errors.cardName ? "focus:ring-[#ff3b30]" : "focus:ring-[#0071e3]"
                    } transition-colors`}
                  />
                  {touched.cardName && errors.cardName && (
                    <p className="mt-1 text-sm text-[#ff3b30] flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.cardName}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-1">Número de tarjeta</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(formatCardNumber(e.target.value))
                      if (touched.cardNumber) {
                        validateField("cardNumber")
                      }
                    }}
                    onBlur={() => handleBlur("cardNumber")}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full px-3 py-2 border ${
                      touched.cardNumber && errors.cardNumber ? "border-[#ff3b30] bg-[#fff5f5]" : "border-[#e8e8ed]"
                    } rounded-lg focus:outline-none focus:ring-1 ${
                      touched.cardNumber && errors.cardNumber ? "focus:ring-[#ff3b30]" : "focus:ring-[#0071e3]"
                    } transition-colors`}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <p className="mt-1 text-sm text-[#ff3b30] flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-1">Fecha de expiración</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => {
                        setExpiry(formatExpiryDate(e.target.value))
                        if (touched.expiry) {
                          validateField("expiry")
                        }
                      }}
                      onBlur={() => handleBlur("expiry")}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full px-3 py-2 border ${
                        touched.expiry && errors.expiry ? "border-[#ff3b30] bg-[#fff5f5]" : "border-[#e8e8ed]"
                      } rounded-lg focus:outline-none focus:ring-1 ${
                        touched.expiry && errors.expiry ? "focus:ring-[#ff3b30]" : "focus:ring-[#0071e3]"
                      } transition-colors`}
                    />
                    {touched.expiry && errors.expiry && (
                      <p className="mt-1 text-sm text-[#ff3b30] flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.expiry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-1">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => {
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                        if (touched.cvv) {
                          validateField("cvv")
                        }
                      }}
                      onBlur={() => handleBlur("cvv")}
                      placeholder="123"
                      maxLength={4}
                      className={`w-full px-3 py-2 border ${
                        touched.cvv && errors.cvv ? "border-[#ff3b30] bg-[#fff5f5]" : "border-[#e8e8ed]"
                      } rounded-lg focus:outline-none focus:ring-1 ${
                        touched.cvv && errors.cvv ? "focus:ring-[#ff3b30]" : "focus:ring-[#0071e3]"
                      } transition-colors`}
                    />
                    {touched.cvv && errors.cvv && (
                      <p className="mt-1 text-sm text-[#ff3b30] flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors flex items-center justify-center font-medium ${
                    isProcessing ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Completar Compra
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

