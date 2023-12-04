import React from "react";
import backgroundJordan from "../public/images/nike.jpg";
const Modal = ({ isOpen, onClose, children }) => {
  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    // Contenedor principal que abarca toda la pantalla
    <div className="fixed left-0 top-0 z-[1055] w-full h-full flex items-center justify-center">
      {/* Fondo semitransparente para el modal */}
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>

      {/* Contenedor interno para centrar el modal verticalmente */}
      <div className="absolute flex items-center justify-center w-full h-full">
        {/* Modal real con sombra, ancho variable y márgenes */}
        <div className="shadow-lg w-full md:w-[500px] p-4 rounded overflow-auto max-h-full mt-10 mb-10" 
        style={{ backgroundImage: `url(${backgroundJordan})`, backgroundSize: 'cover' }}
        >
          {/* Contenido del modal */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
