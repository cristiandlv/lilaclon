"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "../../app/contexts/AuthContext" // Adjust the path as needed
import { ShoppingBag, ArrowLeft, CreditCard, CheckCircle, AlertCircle, X, Trash2, Plus, Minus } from "lucide-react"

interface CartItem {
  id: number | string
  title: string
  price: number
  image: string
  quantity: number
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { isLoggedIn, userId } = useAuth() // Use the auth context

  // Checkout states
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Card form states
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  // Validation states
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

  // Touched states
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
    // Check if user is logged in using the context
    if (!isLoggedIn || !userId) {
      console.warn("🔴 Usuario no autenticado. Redirigiendo a login...")
      router.push("/login")
      return
    }

    try {
      //fetch get a /users/orders
      // Load the cart specific to the user
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`) || "[]")
      console.log("🛒 Carrito cargado:", storedCart)
      setCart(storedCart)
    } catch (error) {
      console.error("⚠️ Error al cargar el carrito:", error)
      setCart([])
    } finally {
      setLoading(false)
    }
  }, [isLoggedIn, userId, router])

  // Function to remove an item from cart
  const removeFromCart = (productId: string | number) => {
    const updatedCart = cart.filter((item) => item.id !== productId)
    setCart(updatedCart)
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart))
  }

  // Function to update quantity
  const updateQuantity = (productId: string | number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedCart = cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    setCart(updatedCart)
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart))
  }

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === "number" ? item.price : 0
      return total + price * item.quantity
    }, 0)
  }

  // Format card number with spaces
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

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Validate card number
  const validateCardNumber = (number: string) => {
    const cardNumberWithoutSpaces = number.replace(/\s+/g, "")
    if (!cardNumberWithoutSpaces) {
      return "El número de tarjeta es requerido"
    }
    if (cardNumberWithoutSpaces.length < 16) {
      return "El número de tarjeta debe tener 16 dígitos"
    }
    return ""
  }

  // Validate card name
  const validateCardName = (name: string) => {
    if (!name.trim()) {
      return "El nombre es requerido"
    }
    if (name.trim().length < 3) {
      return "Ingrese un nombre válido"
    }
    return ""
  }

  // Validate expiry date
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

  // Validate CVV
  const validateCvv = (cvvCode: string) => {
    if (!cvvCode) {
      return "El código CVV es requerido"
    }

    if (cvvCode.length < 3) {
      return "El CVV debe tener al menos 3 dígitos"
    }

    return ""
  }

  // Handle field blur
  const handleBlur = (field: "cardNumber" | "cardName" | "expiry" | "cvv") => {
    setTouched({
      ...touched,
      [field]: true,
    })

    validateField(field)
  }

  // Validate a specific field
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

  // Validate the entire form
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

  // Handle payment submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toISOString(),
        items: cart,
        total: calculateTotal(),
        status: "completed",
      }

      // Save to order history
      const ordersKey = `orders_${userId}`
      const storedOrders = JSON.parse(localStorage.getItem(ordersKey) || "[]")
      const updatedOrders = [...storedOrders, newOrder]
      localStorage.setItem(ordersKey, JSON.stringify(updatedOrders))

      // Clear cart
      localStorage.setItem(`cart_${userId}`, JSON.stringify([]))
      setCart([])

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

      // Hide success message after 3 seconds
      setTimeout(() => {
        setOrderSuccess(false)
        setShowCheckout(false)
        // Redirect to dashboard after successful purchase
        router.push(`/dashboard/${userId}`)
      }, 3000)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#f5f5f7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0071e3]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <header className=" shadow-sm p-4 sticky top-0 z-10 backdrop-blur-md bg-white/90">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#0071e3] hover:text-[#0077ed] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Volver</span>
          </button>
          <h1 className="text-xl font-semibold text-[#1d1d1f]">Carrito de Compras</h1>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-[#e8e8ed]">
            <ShoppingBag className="h-16 w-16 mx-auto text-[#86868b] mb-4" />
            <p className="text-[#1d1d1f] text-xl font-medium mb-2">Tu carrito está vacío</p>
            <p className="text-[#86868b] mb-6">Agrega productos para comenzar tu compra</p>
            <button
              className="px-6 py-3 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors font-medium"
              onClick={() => router.push("/products")}
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8ed] overflow-hidden">
                <div className="p-4 border-b border-[#e8e8ed]">
                  <h2 className="text-lg font-semibold text-[#1d1d1f]">
                    Productos ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </h2>
                </div>

                <ul className="divide-y divide-[#e8e8ed]">
                  {cart.map((product) => (
                    <li key={product.id} className="p-4 flex items-center">
                      <div className="w-20 h-20 relative flex-shrink-0 bg-[#f5f5f7] rounded-xl overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg?height=80&width=80"}
                          alt={product.title || "Producto"}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-[#1d1d1f]">{product.title}</h3>
                        <p className="text-[#86868b] text-sm">
                          ${typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-[#e8e8ed] rounded-full overflow-hidden">
                          <button
                            className="p-1 hover:bg-[#f5f5f7] transition-colors"
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="h-4 w-4 text-[#1d1d1f]" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium text-[#1d1d1f]">{product.quantity}</span>
                          <button
                            className="p-1 hover:bg-[#f5f5f7] transition-colors"
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-4 w-4 text-[#1d1d1f]" />
                          </button>
                        </div>
                        <button
                          className="text-[#ff3b30] hover:text-[#ff453a] transition-colors"
                          onClick={() => removeFromCart(product.id)}
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e8ed] p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Resumen del Pedido</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#86868b]">Subtotal</span>
                    <span className="text-[#1d1d1f]">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#86868b]">Envío</span>
                    <span className="text-[#1d1d1f]">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-[#1d1d1f] pt-4 border-t border-[#e8e8ed] mb-6">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full py-3 px-4 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors font-medium flex items-center justify-center"
                    onClick={() => setShowCheckout(true)}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Finalizar Compra
                  </button>
                  <button
                    className="w-full py-3 px-4 bg-[#f5f5f7] text-[#1d1d1f] rounded-full hover:bg-[#e8e8ed] transition-colors font-medium"
                    onClick={() => router.push("/products")}
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
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
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#86868b]">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-[#e8e8ed]">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
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

export default Cart

