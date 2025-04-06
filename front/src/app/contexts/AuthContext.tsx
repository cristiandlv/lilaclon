"use client"
import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

// Define el tipo del contexto
interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void // Exponemos el estado de autenticación
  userId: string | null
  setUserId: (value: string | null) => void // Exponemos el userId
}

// Crea el contexto con un valor predeterminado vacío
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Crea el proveedor de contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)

  // Verifica el estado de login en el almacenamiento local
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUserId = localStorage.getItem("userId")
    if (token && storedUserId) {
      setIsLoggedIn(true)
      setUserId(storedUserId) // Establece el userId desde el almacenamiento local
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}>{children}</AuthContext.Provider>
  )
}

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

