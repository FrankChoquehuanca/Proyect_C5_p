import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../component/admin/AppLayout';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
const API_URL = 'http://localhost:9090';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredCproductos, setFilteredCproductos] = useState([]);
  const [cproductos, setCproductos] = useState([]);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/producto`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Datos de productos:', response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Obtener los nombres de las categorías para cada cproducto
        const categoriaPromises = response.data.map((cproducto) => {
          return axios.get(`${API_URL}/categoria/${cproducto.categoriaId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        });

        // Realizar las solicitudes en paralelo
        axios.all(categoriaPromises)
          .then((responses) => {
            // Mapear los nombres de las categorías a los cproductos correspondientes
            const cproductosConCategorias = response.data.map((cproducto, index) => {
              const nombreCategoria = responses[index].data.nombre;
              const tituloCategoria = responses[index].data.titulo;
              return { ...cproducto, nombreCategoria, tituloCategoria };
            });

            setFilteredCproductos(cproductosConCategorias);
          })
          .catch((error) => {
            console.log(error);
          });

        // Filtrar productos según la búsqueda
        const filtered = response.data.filter((cproducto) => {
          const nombreCompleto = `${cproducto.nombre}`;
          return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredProducts(filtered);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [searchTerm]);

  const currentItems = getCurrentItems();

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {currentItems.map((cproducto) => (
           <Link to={`/producto/${cproducto.id}`} className="text-sm text-indigo-500 hover:text-indigo-600">


            {/* Contenido del producto */}

            <div className="flex-grow">
              {/* Contenedor principal */}
              <div className="bg-white overflow-hidden relative">

                {/* Imagen del producto */}
                <img
                  className="rounded-t-sm"
                  src={cproducto.foto}
                  width="100%"
                  height="auto"
                  alt={`Job Offer ${cproducto.id}`}
                />

                {/* Botón de categoría */}
                {/* Botón de categoría */}
                <button className="absolute top-4 left-4 bg-gray-800 bg-opacity-50 rounded-full">
                  <div className="inline-flex items-center">
                    <svg className="w-3 h-3 ml-1 text-white" viewBox="0 0 12 12">
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z"></path>
                    </svg>
                    <span className="text-white tracking-wider ml-2 mr-2 text-sm capitalize">
                      {cproducto.categoriaId}
                    </span>
                  </div>
                </button>

                {/* Precio del producto */}
                <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 rounded-full">
                  <div className="inline-flex items-center">
                    <div className="inline-flex text-sm rounded-full mx-2 text-white font-bold">
                      $ {cproducto.costo}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles del producto */}
              <div className="flex flex-col">
                <header className="m-4">
                  {/* Nombre del producto */}
                  <h3 className="text-slate-800 text-xl font-bold mb-2">{cproducto.nombre}</h3>

                  {/* Descripción del producto */}
                  <div className="text-sm leading-relaxed line-clamp-3">{cproducto.descripcion}</div>

                  {/* Detalles adicionales y estadísticas del producto */}
                  <div className="flex flex-wrap justify-between items-center mt-4">
                    {/* Cantidad en stock */}
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        <span>{cproducto.cantidadStock}</span>
                      </div>
                    </div>

                    {/* Proveedor del producto */}
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          className="inline-block w-4 h-4 mr-1 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                        </svg>
                        {cproducto.proveedor}
                      </div>
                    </div>
                  </div>
                </header>
              </div>
            </div>

          </Link>
        ))}
      </div>  <div className="  left-0 flex mt-4 text-blue-700 font-bold  rounded bg-primary px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
        <div className="">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-blue-500 font-bold inline-block rounded bg-primary  px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <span className=" p-2 font-semibold  text-green-700  inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">{` ${currentPage} DE ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentItems.length < itemsPerPage || !hasNextPage()}
            className="text-red-700 font-bold inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <div>
        </div>
      </div>
      
    </AppLayout>
  );
};

export default Home;