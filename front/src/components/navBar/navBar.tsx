"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  LogIn,
  UserPlus,
  X,
  Home,
  Package,
  Star,
  Tag,
  Users,
  Mail,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "../../app/contexts/AuthContext"
import { useState, useEffect, useCallback } from "react"

// Create a custom event for cart updates
declare global {
  interface WindowEventMap {
    cartUpdated: CustomEvent
  }
}

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  // Function to update cart count - extracted for reuse
  const updateCartCount = useCallback(() => {
    if (isLoggedIn && userId) {
      try {
        const cartKey = `cart_${userId}`
        const storedCart = JSON.parse(localStorage.getItem(cartKey) || "[]")
        const itemCount = storedCart.reduce((total: number, item: any) => total + item.quantity, 0)
        setCartItemsCount(itemCount)
      } catch (error) {
        console.error("Error loading cart:", error)
        setCartItemsCount(0)
      }
    } else {
      setCartItemsCount(0)
    }
  }, [isLoggedIn, userId])

  // Load cart items count and set up listeners
  useEffect(() => {
    // Initial load
    updateCartCount()

    // Create custom event for cart updates
    if (typeof window !== "undefined") {
      // Custom event listener for cart updates
      const handleCustomCartUpdate = () => {
        updateCartCount()
      }

      // Listen for the custom event
      window.addEventListener("cartUpdated", handleCustomCartUpdate)

      // Set up polling as a fallback (every 2 seconds)
      const intervalId = setInterval(() => {
        updateCartCount()
      }, 2000)

      // Clean up
      return () => {
        window.removeEventListener("cartUpdated", handleCustomCartUpdate)
        clearInterval(intervalId)
      }
    }
  }, [isLoggedIn, userId, updateCartCount])

  // Dispatch custom event when cart is updated
  // This function should be called in any component that modifies the cart
  const dispatchCartUpdatedEvent = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cartUpdated"))
    }
  }

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setIsLoggedIn(false)
    setUserId(null)
    router.replace("/login")
  }

  const handleProfileClick = () => {
    if (isLoggedIn && userId) {
      router.push(`/dashboard/${userId}`)
    } else {
      router.push("/login")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setSearchFocused(false)
    }
  }

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/") return true
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <>
      <nav
        className={`bg-white/90 backdrop-blur-md text-[#1d1d1f] px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md border-b border-[#e8e8ed]" : "shadow-sm border-b border-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-1.5 text-[#1d1d1f] hover:text-[#0071e3] transition-colors rounded-full hover:bg-[#f5f5f7]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            <Menu size={22} />
          </button>
          <Link href="/home" className="transition-opacity hover:opacity-80 py-2">
            <Image
              src="/logo2.png"
              width={120}
              height={120}
              alt="Logo de Mi Tienda"
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link
                href="/home"
                className={`py-1 border-b-2 ${
                  isActive("/home")
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent hover:text-[#0071e3] transition-colors"
                }`}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`py-1 border-b-2 ${
                  isActive("/products")
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent hover:text-[#0071e3] transition-colors"
                }`}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=destacados"
                className={`py-1 border-b-2 ${
                  pathname?.includes("destacados")
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent hover:text-[#0071e3] transition-colors"
                }`}
              >
                Destacados
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=ofertas"
                className={`py-1 border-b-2 ${
                  pathname?.includes("ofertas")
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent hover:text-[#0071e3] transition-colors"
                }`}
              >
                Ofertas
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`py-1 border-b-2 ${
                  isActive("/about")
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent hover:text-[#0071e3] transition-colors"
                }`}
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`py-1 border-b-2 ${
                  isActive("/contact")
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent hover:text-[#0071e3] transition-colors"
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <form
            onSubmit={handleSearch}
            className={`hidden sm:flex items-center rounded-full px-3 py-1.5 transition-all duration-300 ${
              searchFocused
                ? "bg-[#f5f5f7] w-40 md:w-48 ring-2 ring-[#0071e3]"
                : "bg-[#f5f5f7]/80 w-32 md:w-40 hover:bg-[#f5f5f7]"
            }`}
          >
            <Search className="h-4 w-4 text-[#86868b] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="ml-2 outline-none bg-transparent text-sm w-full text-[#1d1d1f]"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </form>

          <div className="relative group">
            <Link
              href="/cart"
              className="p-1.5 text-[#1d1d1f] hover:text-[#0071e3] transition-colors flex items-center rounded-full hover:bg-[#f5f5f7]"
              aria-label="Carrito de compras"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0071e3] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium animate-fadeIn">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </Link>
            <div className="absolute -bottom-12 right-0 bg-white text-[#1d1d1f] text-xs px-3 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#e8e8ed] z-10 pointer-events-none">
              {cartItemsCount > 0 ? `${cartItemsCount} producto${cartItemsCount !== 1 ? "s" : ""}` : "Carrito vacío"}
            </div>
          </div>

          {isLoggedIn ? (
            <>
              <div className="relative group">
                <button
                  className="p-1.5 text-[#1d1d1f] hover:text-[#0071e3] transition-colors rounded-full hover:bg-[#f5f5f7]"
                  onClick={handleProfileClick}
                  aria-label="Perfil de usuario"
                >
                  <User size={20} strokeWidth={1.5} />
                </button>
                <div className="absolute -bottom-12 right-0 bg-white text-[#1d1d1f] text-xs px-3 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#e8e8ed] z-10 pointer-events-none">
                  Mi Perfil
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="hidden md:flex items-center text-xs font-medium px-3 py-1.5 rounded-full text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] transition-colors"
              >
                <LogIn size={16} className="mr-1" />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center text-xs font-medium px-3 py-1.5 rounded-full text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] transition-colors"
              >
                <LogIn size={16} className="mr-1" />
                Iniciar Sesión
              </Link>

              <Link
                href="/register"
                className="flex items-center text-xs font-medium px-3 py-1.5 rounded-full text-white bg-[#0071e3] hover:bg-[#0077ed] transition-colors"
              >
                <UserPlus size={16} className="mr-1" />
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md pt-16 animate-fadeIn">
          <div className="p-4 max-h-screen overflow-y-auto">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-[#86868b] hover:text-[#1d1d1f] transition-colors p-2 rounded-full hover:bg-[#f5f5f7]"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>

            <form
              onSubmit={(e) => {
                handleSearch(e)
                setMobileMenuOpen(false)
              }}
              className="flex items-center rounded-full px-3 py-2 bg-[#f5f5f7] w-full mb-6"
            >
              <Search className="h-4 w-4 text-[#86868b] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="ml-2 outline-none bg-transparent text-sm w-full text-[#1d1d1f]"
              />
            </form>

            <ul className="flex flex-col space-y-1">
              <li>
                <Link
                  href="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                    isActive("/home")
                      ? "bg-[#f5f5f7] text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                  }`}
                >
                  <Home size={18} className="mr-3" />
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                    isActive("/products") && !pathname?.includes("category")
                      ? "bg-[#f5f5f7] text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=destacados"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                    pathname?.includes("destacados")
                      ? "bg-[#f5f5f7] text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                  }`}
                >
                  <Star size={18} className="mr-3" />
                  Destacados
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=ofertas"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                    pathname?.includes("ofertas")
                      ? "bg-[#f5f5f7] text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                  }`}
                >
                  <Tag size={18} className="mr-3" />
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                    isActive("/about")
                      ? "bg-[#f5f5f7] text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                  }`}
                >
                  <Users size={18} className="mr-3" />
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                    isActive("/contact")
                      ? "bg-[#f5f5f7] text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                  }`}
                >
                  <Mail size={18} className="mr-3" />
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                    isActive("/cart")
                      ? "bg-[#f5f5f7] text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                  }`}
                >
                  <ShoppingBag size={18} className="mr-3" />
                  Carrito
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-[#0071e3] text-white text-xs px-2 py-0.5 rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      href={`/dashboard/${userId}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center py-3 px-4 rounded-xl w-full transition-colors ${
                        pathname?.includes("/dashboard")
                          ? "bg-[#f5f5f7] text-[#0071e3]"
                          : "text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center py-3 px-4 rounded-xl w-full text-[#ff3b30] hover:bg-[#fff5f5] transition-colors"
                    >
                      <LogIn size={18} className="mr-3" />
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center py-3 px-4 rounded-xl w-full text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] transition-colors"
                    >
                      <LogIn size={18} className="mr-3" />
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center py-3 px-4 rounded-xl w-full bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors mt-2"
                    >
                      <UserPlus size={18} className="mr-3" />
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar

