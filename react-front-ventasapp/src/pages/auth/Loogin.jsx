import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarCamposRegistro, setMostrarCamposRegistro] = useState(false);
  const [mostrarContrasenas, setMostrarContrasenas] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      console.log("Inicio de sesión exitoso");
      console.log("Token:", token);

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Validar el formato del correo electrónico antes de enviar la solicitud de registro
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setEmailError("El correo electrónico debe ser de Gmail.");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await axios.post("http://localhost:9090/auth/create", {
        email,
        password,
        confirmPassword,
      });

      console.log("Registro exitoso");
      console.log(response);

      // Inicia sesión automáticamente después del registro
      await handleLogin(e);
    } catch (error) {
      console.error(error);
    }
  };

  const irARegistro = () => {
    setMostrarCamposRegistro(true);
  };

  const irAInicioSesion = () => {
    setMostrarCamposRegistro(false);
  };

  const toggleMostrarContrasenas = () => {
    setMostrarContrasenas(!mostrarContrasenas);
  };

  return (
    <div className="py-60 h-screen"
      style={{
        background: "linear-gradient(115deg, #0b3968, #0b3a6852)", // Puedes ajustar los colores del degradado
      }}
    >
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/fotos-premium/primer-plano-fondo-abstracto-azul-dorado-patron-diagonal-generativo-ai_900833-22852.jpg')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Marca
          </h2>
          <p className="text-xl text-gray-600 text-center">¡Bienvenido de nuevo!</p>

          {mostrarCamposRegistro ? (
            <form onSubmit={handleRegistro} className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Correo Electrónico
              </label>
              <input
                className={`bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4 ${
                  emailError ? "border-red-500" : ""
                }`}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(""); // Limpiar el mensaje de error al escribir
                }}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mb-4">{emailError}</p>
              )}

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4"
                  type={mostrarContrasenas ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4"
                  type={mostrarContrasenas ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <label className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="mostrarContrasenas"
                  className="mr-2 cursor-pointer"
                  checked={mostrarContrasenas}
                  onChange={toggleMostrarContrasenas}
                />
                <span className="text-gray-700 cursor-pointer text-sm">
                  Mostrar Contraseña
                </span>
              </label>

              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Registrarse
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="mt-4">
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Correo Electrónico
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contraseña
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type={mostrarContrasenas ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="mostrarContrasenas"
                  className="mr-2 cursor-pointer"
                  checked={mostrarContrasenas}
                  onChange={toggleMostrarContrasenas}
                />
                <label htmlFor="mostrarContrasenas" className="text-gray-700 cursor-pointer text-sm">
                  Mostrar Contraseñas
                </label>
              </div>
              <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <button
              className="text-xs text-gray-500 uppercase cursor-pointer"
              onClick={mostrarCamposRegistro ? irAInicioSesion : irARegistro}
            >
              {mostrarCamposRegistro ? "Iniciar Sesión" : "o registrarse"}
            </button>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLogin;
