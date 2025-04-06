"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../app/contexts/AuthContext"; // Usamos el contexto

const Login = () => {
  const router = useRouter();
  const { setIsLoggedIn, setUserId } = useAuth(); // Extraemos los valores del contexto

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error para la interfaz
  const [loading, setLoading] = useState(false);

  // Si ya hay un token, redirigir automáticamente
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      router.replace(`/dashboard/${userId}`);
    }
  }, [router]);

  // Manejo del login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensajes previos
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage("Hubo un problema al iniciar sesión. Por favor, revisa tus credenciales.");
        return;
      }

      // Guardar token y ID de usuario en el localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name); // Guardar el nombre
      localStorage.setItem("userEmail", data.user.email); // Guardar el email
      localStorage.setItem("userPhone",data.user.phone);
      localStorage.setItem("userAddress",data.user.address);

      



      // Actualizar el contexto de autenticación
      setIsLoggedIn(true);
      setUserId(data.user.id);

      // Redirigir a /dashboard/{userId}
      router.replace(`/dashboard/${data.user.id}`);
    } catch (err: any) {
      setErrorMessage("Hubo un problema al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu email"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        {/* Botón de login */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} transition-colors`}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
