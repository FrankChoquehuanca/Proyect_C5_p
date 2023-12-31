import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import AppLayout from "../component/admin/AppLayout";
import backgroundTabla from "../public/images/tablo.jpg";
const ClienteProds = () => {
  // token
  const token = localStorage.getItem("token");
  // end token

  // paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClienteProds, setFilteredClienteProds] = useState([]);



  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredClienteProds.slice(startIndex, endIndex);
  };

  // end paginacion
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // end modal
  const API_URL = "http://localhost:9090";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clienteProds, setClienteProds] = useState([]);
  //fracmento de paginacion
  const totalPages = Math.ceil(clienteProds.length / itemsPerPage);
  const hasNextPage = () => {
    return currentPage < totalPages && clienteProds.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).length > 0;
  };
  // end fracmento de paginacion
  const [clienteProdEditado, setClienteProdEditado] = useState({
    id: null,
    nombre: "",
    apellidopaterno: "",
    apellidomaterno: "",
    dni: "",
    sexo: "",
    telefono: "",
    celular: "",
    direccion: "",
  });

  const getClienteProds = () => {
    axios
      .get(`${API_URL}/cliente`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const sortedClienteProds = response.data.sort();
        setClienteProds(sortedClienteProds.reverse());
        const filtered = response.data.filter((clienteProd) => {
          const tituloCompleto = `${clienteProd.nombre} ${clienteProd.apellidopaterno}${clienteProd.apellidomaterno}${clienteProd.dni}${clienteProd.sexo}${clienteProd.telefono}${clienteProd.celular}`;
          return tituloCompleto.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredClienteProds(filtered);
      })
      .catch((error) => {
        // handle error clienteProd.direccion,
        console.log(error);
      });
  }

  const editarClienteProd = (id) => {
    const clienteProd = clienteProds.find((p) => p.id === id);
    setClienteProdEditado({
      id: clienteProd.id,
      nombre: clienteProd.nombre,
      apellidopaterno: clienteProd.apellidopaterno,
      apellidomaterno: clienteProd.apellidomaterno,
      dni: clienteProd.dni,
      sexo: clienteProd.sexo,
      telefono: clienteProd.telefono,
      celular: clienteProd.celular,
      direccion: clienteProd.direccion,
    });
    openModal()
  }

  const crearClienteProd = async (event) => {
    event.preventDefault();
    if (
      !clienteProdEditado.nombre.trim() ||
      !clienteProdEditado.apellidopaterno.trim() ||
      !clienteProdEditado.apellidomaterno.trim() ||
      !clienteProdEditado.dni.trim() ||
      !clienteProdEditado.sexo.trim() ||
      !clienteProdEditado.telefono.trim() ||
      !clienteProdEditado.celular.trim() ||
      !clienteProdEditado.direccion.trim()
    ) {
      return;
    }

    try {
      const nuevoClienteProd = {
        nombre: clienteProdEditado.nombre,
        apellidopaterno: clienteProdEditado.apellidopaterno,
        apellidomaterno: clienteProdEditado.apellidomaterno,
        dni: clienteProdEditado.dni,
        sexo: clienteProdEditado.sexo,
        telefono: clienteProdEditado.telefono,
        celular: clienteProdEditado.celular,
        direccion: clienteProdEditado.direccion,
      };


      axios
        .post(`${API_URL}/cliente`, nuevoClienteProd, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setClienteProdEditado({
            id: null,
            nombre: "",
            apellidopaterno: "",
            apellidomaterno: "",
            dni: "",
            sexo: "",
            telefono: "",
            celular: "",
            direccion: "",
          });
          getClienteProds();
          closeModal()
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const actualizarClienteProd = async (event) => {
    event.preventDefault();

    try {


      const clienteProdActualizado = {
        id: clienteProdEditado.id,
        nombre: clienteProdEditado.nombre,
        apellidopaterno: clienteProdEditado.apellidopaterno,
        apellidomaterno: clienteProdEditado.apellidomaterno,
        dni: clienteProdEditado.dni,
        sexo: clienteProdEditado.sexo,
        telefono: clienteProdEditado.telefono,
        celular: clienteProdEditado.celular,
        direccion: clienteProdEditado.direccion,
      };

      // Realizar la solicitud PUT para actualizar el clienteProd
      const response = await axios.put(
        `${API_URL}/cliente`,
        clienteProdActualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      // Actualizar la lista de clienteProds
      getClienteProds();
      closeModal()
      setClienteProdEditado({
        id: null,
        nombre: "",
        apellidopaterno: "",
        apellidomaterno: "",
        dni: "",
        sexo: "",
        telefono: "",
        celular: "",
        direccion: "",

      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarClienteProd = async (id) => {
    try {
      // Realizar la solicitud DELETE para eliminar el clienteProd
      const response = await axios.delete(`${API_URL}/cliente/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar la lista de clienteProds
      getClienteProds();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClienteProds();
  }, []);

  const contenidoModal = (


    <div className="px-6 py-6 mx-2 mt-2 mb-2 text-left bg-black bg-opacity-40  shadow-white shadow-md">
      <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a4 4 0 100 8 4 4 0 000-8zm0 10a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-center">{clienteProdEditado.id ? 'Editar ClienteProd' : 'Crear ClienteProd'}</h2>
      <form onSubmit={clienteProdEditado.id ? actualizarClienteProd : crearClienteProd}>

        <div className="mt-4">
          <div className="flex flex-wrap">
            <div className="w-full">
              <label className="block">Nombre</label>
              <input
                value={clienteProdEditado.nombre}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    nombre: event.target.value,
                  })
                }
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="ml-1 w-full">
              <label className="block">apellidopaterno</label>
              <input
                value={clienteProdEditado.apellidopaterno}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    apellidopaterno: event.target.value,
                  })
                }
                type="text"
                placeholder="apellidopaterno"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-1 w-full">
              <label className="block">apellidomaterno</label>
              <input
                value={clienteProdEditado.apellidomaterno}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    apellidomaterno: event.target.value,
                  })
                }
                type="text"
                placeholder="apellidomaterno"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-1 w-full">
              <label className="block">dni</label>
              <input
                value={clienteProdEditado.dni}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    dni: event.target.value,
                  })
                }
                type="text"
                placeholder="dni"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-1 w-full">
              <label className="block">Sexo</label>
              <select
                value={clienteProdEditado.sexo}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    sexo: event.target.value,
                  })
                }
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="true">Femenino</option>
                <option value="false">Masculino</option>
              </select>
            </div>

            <div className="ml-1 w-full">
              <label className="block">telefono</label>
              <input
                value={clienteProdEditado.telefono}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    telefono: event.target.value,
                  })
                }
                type="text"
                placeholder="telefono"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-1 w-full">
              <label className="block">celular</label>
              <input
                value={clienteProdEditado.celular}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    celular: event.target.value,
                  })
                }
                type="text"
                placeholder="celular"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-1 w-full">
              <label className="block">direccion</label>
              <input
                value={clienteProdEditado.direccion}
                onChange={(event) =>
                  setClienteProdEditado({
                    ...clienteProdEditado,
                    direccion: event.target.value,
                  })
                }
                type="text"
                placeholder="direccion"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="mt-4">
          </div>
          <div className="flex  flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              type="button"
              onClick={closeModal}
              className="ml-1 text-red-800  font-bold inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Close
            </button>

            <div
              type="button"
              className="ml-1 text-blue-700 font-bold inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              {clienteProdEditado.id ? (
                <button onClick={actualizarClienteProd} >Actualizar</button>
              ) : (
                <button onClick={crearClienteProd} >Crear </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const currentItems = getCurrentItems();
  return (
    <AppLayout>
      <div className="">
        <Modal className="w-1/3 mx-auto" isOpen={isModalOpen} onRequestClose={closeModal}>
          {contenidoModal}
        </Modal>

        <div class="flex flex-wrap -mx-3">
          <div class="flex-none w-full max-w-full px-3">
            <div class=" flex flex-col min-w-0 mb-6 break-words border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border"
              style={{
                backgroundImage: `url(${backgroundTabla})`,
                backgroundSize: "cover", // O ajusta según sea necesario
              }}>
              <div class="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 class="dark:text-white font-bold">Lista De ClienteProd</h6>
              </div>
              <div class="flex-auto px-0 pt-0 pb-2">
                <div class="p-0 overflow-x-auto ps">

                  <nav class=" flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" >
                    <div class="flex  items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit ">
                      <nav className=" flex ">

                        <div class="mb-0 font-bold capitalize m-2">

                          <button type="button" className="" onClick={openModal}>
                            <div className="text-white h-10 rounded-md hover:bg-green-500 duration-300 p-2 text-center bg-green-700">Agregar</div>
                          </button>
                        </div>
                      </nav>
                      <div class="flex   items-center mt-2 grow sm:mt-0 sm:mr-16 md:mr-0 lg:flex  lg:basis-auto">
                        <div class="flex items-center md:ml-auto md:pr-4">
                          <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                            <span class="text-sm ease-soft absolute leading-5.6  z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                              <button onClick={getClienteProds} >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  class="h-4 w-4 ">
                                  <path
                                    fill-rule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clip-rule="evenodd" />
                                </svg>
                              </button>
                            </span>
                            <input
                              className="p-8  text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                              type="text"
                              id="searchInput"
                              value={searchTerm}
                              onChange={(event) => setSearchTerm(event.target.value)}
                              placeholder="Buscar"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                  <table class="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                    <thead class="align-bottom">
                      <tr>
                        <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">ID</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">nombre</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">apellidopaterno</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">apellidomaterno</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">dni</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">sexo</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">telefono</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">celular</th>
                        <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">direccion</th>
                        <th class="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">Creado</th>
                        <th class="px-6 py-3  font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400  ">Actualizado</th>
                        <th class="px-6 py-3  font-semibold capitalize align-middle bg-transparent border-b border-collapse border-solid shadow-none dark:border-white/40 dark:text-white tracking-none whitespace-nowrap text-slate-400  "></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((clienteProd) => (
                        <tr key={clienteProd.id}>
                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <div class="flex px-2 py-1">
                              <div class="flex flex-col justify-center">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-500 text-white">
                                  {clienteProd.id}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.nombre}</p>
                          </td>
                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.apellidopaterno}</p>
                          </td>
                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.apellidomaterno}</p>
                          </td>
                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.dni}</p>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
  <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
    {clienteProd.sexo ? 'Femenino' : 'Masculino'}
  </p>
</td>

                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.telefono}</p>
                          </td>
                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.celular}</p>
                          </td>
                          <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.direccion}</p>
                          </td>
                          <td class="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <span class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.created_at}</span>
                          </td>
                          <td class="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <span class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">{clienteProd.updated_at}</span>
                          </td>
                          <td class=" sticky right-0 p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            {/* <div class="ml-auto text-right"> */}
                            <div className=" m-1 btns inline-block px-4 py-3 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-150 hover:scale-102 active:opacity-85 bg-x-25" href="javascript:;">
                              <button onClick={() => eliminarClienteProd(clienteProd.id)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-400 ">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                            </div>
                            <a class="btns inline-block px-4 py-3 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-150 hover:scale-102 active:opacity-85 bg-x-25 " href="javascript:;">
                              <button onClick={() => editarClienteProd(clienteProd.id)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-400">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                              </button>
                            </a>
                            {/* </div> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* paginacion */}
                  <div className="  left-0 flex mt-4 text-blue-700 font-bold  rounded bg-primary px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <div className="">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-blue-500 font-bold inline-block rounded bg-primary  px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                      ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <span className=" p-2 font-semibold  text-reed-700  inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">{` ${currentPage} DE ${totalPages}`}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ClienteProds;
