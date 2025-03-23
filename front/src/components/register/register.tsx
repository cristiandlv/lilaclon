"use client";
import React, { useState } from "react";

const Register = () => {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Estados para los errores y el mensaje de éxito
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Función para validar en tiempo real
  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "El nombre es obligatorio.";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "El nombre no puede contener símbolos especiales.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Ingresa un email válido.";
        }
        break;
      case "address":
        if (!value.trim()) error = "La dirección es obligatoria.";
        break;
      case "phone":
        if (!/^\d{10,}$/.test(value)) {
          error = "El teléfono debe tener al menos 10 dígitos.";
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
    validateField("name", name);
    validateField("email", email);
    validateField("address", address);
    validateField("phone", phone);
    validateField("password", password);

    // Verificar si hay errores
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    // Si no hay errores, mostrar mensaje de éxito y limpiar el formulario
    setSuccessMessage("¡Usuario registrado!");
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Regístrate</h2>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Campo Nombre */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu nombre"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

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

        {/* Campo Dirección */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              validateField("address", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu dirección"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Campo Teléfono */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validateField("phone", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu teléfono"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;