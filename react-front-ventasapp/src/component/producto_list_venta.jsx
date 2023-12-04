import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function ListaProductoIns({ onChange, selectedProductoIds }) {
  const [productos, setProductos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios
      .get(`${API_URL}/producto`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSeleccionarProducto = (productoId) => {
    const isSelected = selectedProductoIds.includes(productoId);
    onChange(productoId, !isSelected);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {productos.map((producto) => (
      <div key={producto.id} className="flex items-center">
        <input
          type="checkbox"
          id={`producto-${producto.id}`}
          value={producto.id}
          checked={selectedProductoIds.includes(producto.id)}
          onChange={() => handleSeleccionarProducto(producto.id)}
          className="mr-2 rounded-full bg-yellow-600"
        />
        <label htmlFor={`producto-${producto.id}`}>
          <span>{producto.nombre}</span> - S/. {producto.costo}
        </label>
      </div>
    ))}
  </div>
  );
}

export default ListaProductoIns;
