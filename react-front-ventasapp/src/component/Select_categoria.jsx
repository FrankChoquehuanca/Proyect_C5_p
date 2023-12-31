import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
function SelectCategoria({ onChange }) {
     // token
     const token = localStorage.getItem("token");
     // end token
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState('');

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = () => {
    axios
      .get(`${API_URL}/categoria`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSeleccionarCategoria = (event) => {
    const categoriaId = event.target.value;
    setSelectedCategoriaId(categoriaId);
    onChange(categoriaId);
  };

  return (
    <select value={selectedCategoriaId} onChange={handleSeleccionarCategoria}>
      <option value="">Seleccionar Categoria</option>
      {categorias.map((categoria) => (
        <option key={categoria.id} value={categoria.id}>
          {categoria.titulo}
        </option>
      ))}
    </select>
  );
}

export default SelectCategoria;