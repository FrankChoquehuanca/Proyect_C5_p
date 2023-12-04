import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
function SelectCliente({ onChange }) {
     // token
     const token = localStorage.getItem("token");
     // end token
     const [clientes, setClientes] = useState([]);
     const [selectedClienteId, setSelectedClienteId] = useState('');
    
     // end token
     useEffect(() => {
         obtenerClientes();
     }, []);
 
     const obtenerClientes = () => {
         axios
             .get(`${API_URL}/cliente`, {
                 headers: {
                     Authorization: `Bearer ${token}`,
                 },
             })
             .then((response) => {
                 setClientes(response.data);
             })
             .catch((error) => {
                 console.log(error);
             });
     };
     const handleSeleccionarCliente = (event) => {
         const clienteId = event.target.value;
         setSelectedClienteId(clienteId);
         onChange(clienteId);
     };
 
     return (
         <select value={selectedClienteId} onChange={handleSeleccionarCliente}>
             <option value="">Seleccionar cliente</option>
             {clientes.map((cliente) => (
                 <option key={cliente.id} value={cliente.id}>
                     {cliente.nombre}
                 </option>
             ))}
         </select>
     );
 }

export default SelectCliente;