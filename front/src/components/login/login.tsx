"use client";
import React, { useState } from "react";

const Login = () => {
  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para los errores y el mensaje de éxito
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Función para validar en tiempo real
  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Ingresa un email válido.";
        }
        break;
      case "password":
        if (value.length < 6) {
          error = "La contraseña debe tener al menos 6 caracteres.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    validateField("email", email);
    validateField("password", password);

    // Verificar si hay errores
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    // Simulación de inicio de sesión exitoso
    setSuccessMessage("¡Inicio de sesión exitoso!");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu contraseña"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>

        {/* Enlace para registrarse */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;