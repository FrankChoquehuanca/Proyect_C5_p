// Importa Link y useParams
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../component/admin/AppLayout';
import { Link, useParams } from 'react-router-dom';

const token = localStorage.getItem('token');
const API_URL = 'http://localhost:9090';

const DetalleProducto = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cproductos, setCproductos] = useState([]);
  const [producto, setProducto] = useState(null);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [tituloCategoria, setTituloCategoria] = useState('');

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(cproductos.length / itemsPerPage);

  const hasNextPage = () => {
    return (
      currentPage < totalPages &&
      cproductos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).length > 0
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const obtenerDetallesProducto = async () => {
    try {
      // Obtén el producto específico por ID
      const responseProducto = await axios.get(`${API_URL}/producto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseCategoria = await axios.get(`${API_URL}/categoria/${responseProducto.data.categoriaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducto(responseProducto.data);
      setNombreCategoria(responseCategoria.data.nombre);
      setTituloCategoria(responseCategoria.data.titulo);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    // Obtén detalles del producto seleccionado
    obtenerDetallesProducto();
  }, [id, token]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  // Realiza lógica para obtener detalles del producto según su ID
  return (
    <AppLayout>
      <div className="mt-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 border-slate-200">
          {/* Muestra detalles del producto seleccionado */}
          <div key={producto.id} className="col-span-2 md:col-span-2 shadow-2xl p-4">
            <header className="p-3">
              <h1 className="text-gray-800 font-bold text-2xl mb-2 uppercase">
                {producto.nombre}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{producto.descripcion}</p>
              <img
                className="rounded-sm"
                src={producto.foto}
                width="100%" height="auto"
                alt={`Imagen de ${producto.nombre}`}
              />
            </header>
          </div>
        </div>
      </div>

    </AppLayout>
  );
};

export default DetalleProducto;
