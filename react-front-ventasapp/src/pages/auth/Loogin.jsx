import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from "../../public/images/fondo.jpg"; // Asegúrate de proporcionar la ruta correcta
import backgroundLogo from "../../public/images/logo1.jpeg";
import { faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faShoePrints);

const CustomLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarCamposRegistro, setMostrarCamposRegistro] = useState(false);
  const [mostrarContrasenas, setMostrarContrasenas] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState(""); // Agregar esta línea
  const [error, setError] = useState("");

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

      setMensajeConfirmacion("Inicio de sesión exitoso. Redirigiendo a la página de inicio...");
    setTimeout(() => {
      setMensajeConfirmacion("");
      navigate("/dashboard");
    }, 3000); // El mensaje se limpiará después de 3 segundos
  } catch (error) {
    console.error(error);

    if (error.response && error.response.status === 401) {
      setError("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
    } else {
      setError("Contraseña o correo electronico incorrecto, intente nuevamente");
    }

    setTimeout(() => {
      setError("");
    }, 3000); // El mensaje de error se limpiará después de 3 segundos
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
    
    <div
    className="flex items-center justify-center"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}
    >
      <div className="container mx-auto">
      <div
  className="flex bg-gray-800 rounded-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl shadow-lg border border-yellow-500"
  style={{
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra opcional, ajusta según sea necesario
  }}
>
      <div
  className="hidden lg:block lg:w-1/2 bg-cover"
  style={{
    backgroundImage: `url(${backgroundLogo})`,
    backgroundSize: "cover", // O ajusta según sea necesario
  }}
></div>
        <div className="w-full p-16 lg:w-1/2 border-gray-800">
          <p className="text-xl text-white border-b border-white text-center">INGRESA A TU CUENTA</p>
          {mensajeConfirmacion && (
    <div className="bg-green-200 text-green-800 p-2 rounded mt-4 text-center">
      {mensajeConfirmacion}
    </div>
  )}
  {error && (
  <div className="bg-red-200 text-red-800 p-2 rounded mt-4 text-center">
    {error}
  </div>
)}
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
                <span className="text-white cursor-pointer text-sm">
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
                <label className="block text-white text-sm font-bold mb-2">
                  Correo Electrónico
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required // Campo requerido
                />
              </div>
              <div className="mt-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Contraseña
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type={mostrarContrasenas ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required // Campo requerido
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
                <label htmlFor="mostrarContrasenas" className="text-white cursor-pointer text-sm">
                  Mostrar Contraseñas
                </label>
              </div>
              <div className="mt-8">
                <button className="bg-gray-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-yellow-700">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <button
              className="text-xs text-white uppercase cursor-pointer"
              onClick={mostrarCamposRegistro ? irAInicioSesion : irARegistro}
            >
              {mostrarCamposRegistro ? "Iniciar Sesión" : "Registrarse"}
            </button>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CustomLogin;
